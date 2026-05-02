#!/usr/bin/env python3
"""Parse flashcard markdown files into structured deck JSON.

Reads:  ../flashcards/*.md
Writes: ../src/data/decks.json
"""
from __future__ import annotations
import json, os, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FLASH = ROOT / "flashcards"
OUT = ROOT / "src" / "data" / "decks.json"

# Topic metadata — id, display name, short subtitle, emoji, candy palette color, accent, decorative glyph
TOPICS = [
    {
        "id": "foundations",
        "file": "01_software_engineering_foundations.md",
        "name": "SE Foundations",
        "short": "What software engineering really is",
        "emoji": "🧱",
        "color": "#FFE0E0",
        "accent": "#E0383A",
        "glyph": "star",
    },
    {
        "id": "testing",
        "file": "02_testing.md",
        "name": "Software Testing",
        "short": "TDD, pyramid, V&V, black/white box",
        "emoji": "🧪",
        "color": "#D7F7E1",
        "accent": "#1FA85A",
        "glyph": "flask",
    },
    {
        "id": "dbc",
        "file": "03_design_by_contract.md",
        "name": "Design by Contract",
        "short": "Pre/post-conditions, invariants",
        "emoji": "📜",
        "color": "#FFE9C7",
        "accent": "#E07A1F",
        "glyph": "list",
    },
    {
        "id": "maintenance",
        "file": "04_software_maintenance.md",
        "name": "Software Maintenance",
        "short": "Evolution, refactoring, reverse engineering",
        "emoji": "🔧",
        "color": "#FFD6E8",
        "accent": "#E0388E",
        "glyph": "sprint",
    },
    {
        "id": "quality",
        "file": "05_software_quality.md",
        "name": "Software Quality",
        "short": "CoSQ, iron triangle, V&V, SQM",
        "emoji": "✨",
        "color": "#FFF6CC",
        "accent": "#C19A1F",
        "glyph": "scale",
    },
    {
        "id": "scm",
        "file": "06_software_configuration_management.md",
        "name": "Configuration Mgmt",
        "short": "SCM, baselines, SCIs, four core functions",
        "emoji": "📦",
        "color": "#E2DCFF",
        "accent": "#6448E0",
        "glyph": "puzzle",
    },
    {
        "id": "management",
        "file": "07_software_engineering_management.md",
        "name": "SE Management",
        "short": "Three pillars, communication, 1-on-1s",
        "emoji": "👥",
        "color": "#D6F0FF",
        "accent": "#1F7AE0",
        "glyph": "diagram",
    },
]

# A card block is delimited by "---" on its own line. Inside a block we look for
# **Q:** ... **A:** ... pairs. Anything between sections (## Section X — Title)
# becomes the tag for cards underneath until the next section header.

CARD_SEP = re.compile(r"^\s*---\s*$", re.M)
SECTION_HEADER = re.compile(r"^##\s+Section\s+([A-Z])\s+[—\-–]\s+(.+?)\s*$", re.M)
Q_LINE = re.compile(r"\*\*Q:\*\*\s*(.+?)(?=\n\n|\Z)", re.S)
A_LINE = re.compile(r"\*\*A:\*\*\s*(.+?)(?=\Z|\n##\s|\n---\s)", re.S)
MCQ_OPTION = re.compile(r"^\s*([A-F])[\.\)]\s+(.+?)\s*$", re.M)
MCQ_TRIGGER = re.compile(r"\(\s*MCQ\b", re.I)
ANSWER_LETTER = re.compile(r"\*\*([A-F])[\.,]?\*\*")
ANSWER_LETTERS_SET = re.compile(r"\*\*([A-F](?:\s*,?\s*and\s+[A-F]|\s*,\s*[A-F])+)[\.,]?\*\*")


def clean_md(text: str) -> str:
    """Light-touch cleanup so cards render nicely in the app."""
    # Drop trailing whitespace per line; keep paragraph breaks; trim block.
    out = "\n".join(line.rstrip() for line in text.splitlines()).strip()
    return out


def split_into_cards(body: str):
    """Walk through the body keeping track of the current section title.

    Yields (section_title_or_None, card_block_md).
    """
    # Find all section headers (their byte offsets in the body) and split.
    sections = []  # list of (start_idx, title)
    sections.append((0, None))
    for m in SECTION_HEADER.finditer(body):
        sections.append((m.start(), f"Section {m.group(1)} — {m.group(2)}"))
    sections.append((len(body), None))

    for i in range(len(sections) - 1):
        start, title = sections[i]
        end = sections[i + 1][0]
        chunk = body[start:end]
        # within this chunk, split by --- separators
        for raw in CARD_SEP.split(chunk):
            block = raw.strip()
            if not block:
                continue
            # skip section-header-only blocks
            if block.startswith("##"):
                # remove the header line; only keep what's after it (often nothing)
                lines = block.split("\n", 1)
                if len(lines) < 2 or not lines[1].strip():
                    continue
                block = lines[1].strip()
            # must have a Q: marker to be a card
            if "**Q:**" not in block:
                continue
            yield title, block


def parse_card(block: str, default_tag: str | None) -> dict | None:
    qm = Q_LINE.search(block)
    am = A_LINE.search(block)
    if not qm or not am:
        return None
    front = clean_md(qm.group(1))
    answer_text = clean_md(am.group(1))

    is_mcq = bool(MCQ_TRIGGER.search(front))

    # collect options between Q and A — they sit on lines starting with "  A. ..." style
    between = block[qm.end():am.start()]
    options = [o.group(2).strip() for o in MCQ_OPTION.finditer(between)]
    is_multi = "select all that apply" in front.lower() or "select all" in front.lower()

    if is_mcq and len(options) >= 2:
        # find correct letter(s) from answer_text
        letters_block = ANSWER_LETTER.findall(answer_text) or ANSWER_LETTERS_SET.findall(answer_text)
        # also catch patterns like "**B and C.**"
        if not letters_block:
            # fallback: pick any single bold letter A-F mention
            m = re.search(r"\*\*([A-F])\b", answer_text)
            if m:
                letters_block = [m.group(1)]
        # if we got a combined string like "B and C" or "A, C, and E", split
        flat_letters: list[str] = []
        for token in letters_block:
            for L in re.findall(r"[A-F]", token):
                if L not in flat_letters:
                    flat_letters.append(L)

        answer_indices = [ord(L) - 65 for L in flat_letters if 0 <= ord(L) - 65 < len(options)]
        if not answer_indices:
            # could not extract — fall back to flip card
            return _mk_flip(front, answer_text, default_tag)

        # explanation: text after the first **letter.** in answer_text
        exp_match = re.search(r"\*\*[A-F](?:[\s,A-F]*)?\.?\*\*\s*(.+)", answer_text, re.S)
        explain = clean_md(exp_match.group(1)) if exp_match and exp_match.group(1).strip() else ""

        return {
            "kind": "mcq",
            "front": front,
            "options": options,
            "answer": answer_indices if is_multi else answer_indices[0],
            "multi": is_multi,
            "explain": explain,
            "tag": default_tag or "",
        }

    return _mk_flip(front, answer_text, default_tag)


def _mk_flip(front: str, back: str, tag: str | None) -> dict:
    return {
        "kind": "flip",
        "front": front,
        "back": back,
        "tag": tag or "",
    }


def parse_file(path: Path) -> list[dict]:
    text = path.read_text()
    # drop the H1 + intro lines before the first ---
    body = text
    cards = []
    for tag, block in split_into_cards(body):
        c = parse_card(block, tag)
        if c is not None:
            cards.append(c)
    return cards


def main() -> None:
    decks = []
    total_cards = 0
    for topic in TOPICS:
        path = FLASH / topic["file"]
        if not path.exists():
            print(f"!! missing: {path}", file=sys.stderr)
            continue
        cards = parse_file(path)
        total_cards += len(cards)
        print(f"  {topic['id']:14s} {len(cards):3d} cards  ←  {topic['file']}")
        decks.append({
            "id": topic["id"],
            "name": topic["name"],
            "short": topic["short"],
            "emoji": topic["emoji"],
            "color": topic["color"],
            "accent": topic["accent"],
            "glyph": topic["glyph"],
            "cards": cards,
        })
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(decks, indent=2))
    print(f"\nWrote {OUT}  ({total_cards} cards across {len(decks)} decks)")


if __name__ == "__main__":
    main()
