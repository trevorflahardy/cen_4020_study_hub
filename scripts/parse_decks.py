#!/usr/bin/env python3
"""Parse flashcard markdown files into structured deck JSON.

Reads:  ../flashcards/*.md
Writes: ../src/data/decks.json

This module is strict-typed (mypy --strict clean).
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Iterator, Literal, TypedDict, Union

# ── Config ──────────────────────────────────────────────────────────────────

ROOT: Path = Path(__file__).resolve().parent.parent
FLASH: Path = ROOT / "flashcards"
OUT: Path = ROOT / "src" / "data" / "decks.json"


class TopicMeta(TypedDict):
    """Static metadata for one concept-area deck."""

    id: str
    file: str
    name: str
    short: str
    emoji: str
    color: str
    accent: str
    glyph: str


# Topic metadata — id, display name, short subtitle, emoji, candy palette color, accent, decorative glyph.
TOPICS: list[TopicMeta] = [
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


# ── Card / deck shapes (TypedDicts) ─────────────────────────────────────────


class FlipCard(TypedDict):
    kind: Literal["flip"]
    front: str
    back: str
    tag: str


class McqCard(TypedDict):
    kind: Literal["mcq"]
    front: str
    options: list[str]
    answer: Union[int, list[int]]
    multi: bool
    explain: str
    tag: str


Card = Union[FlipCard, McqCard]


class Deck(TypedDict):
    id: str
    name: str
    short: str
    emoji: str
    color: str
    accent: str
    glyph: str
    cards: list[Card]


# ── Regex helpers ───────────────────────────────────────────────────────────

CARD_SEP: re.Pattern[str] = re.compile(r"^\s*---\s*$", re.M)
SECTION_HEADER: re.Pattern[str] = re.compile(
    r"^##\s+Section\s+([A-Z])\s+[—\-–]\s+(.+?)\s*$", re.M
)
Q_LINE: re.Pattern[str] = re.compile(r"\*\*Q:\*\*\s*(.+?)(?=\n\n|\Z)", re.S)
A_LINE: re.Pattern[str] = re.compile(r"\*\*A:\*\*\s*(.+?)(?=\Z|\n##\s|\n---\s)", re.S)
MCQ_OPTION: re.Pattern[str] = re.compile(r"^\s*([A-F])[\.\)]\s+(.+?)\s*$", re.M)
MCQ_TRIGGER: re.Pattern[str] = re.compile(r"\(\s*MCQ\b", re.I)
ANSWER_LETTER: re.Pattern[str] = re.compile(r"\*\*([A-F])[\.,]?\*\*")
ANSWER_LETTERS_SET: re.Pattern[str] = re.compile(
    r"\*\*([A-F](?:\s*,?\s*and\s+[A-F]|\s*,\s*[A-F])+)[\.,]?\*\*"
)


def clean_md(text: str) -> str:
    """Light-touch cleanup so cards render nicely in the app."""
    return "\n".join(line.rstrip() for line in text.splitlines()).strip()


# ── Parsing ────────────────────────────────────────────────────────────────


def split_into_cards(body: str) -> Iterator[tuple[str | None, str]]:
    """Walk the body keeping track of the current section title.

    Yields (section_title_or_None, card_block_md) pairs. The leading sentinel
    has a None title so cards before any ## Section header still get yielded.
    """
    sections: list[tuple[int, str | None]] = [(0, None)]
    for m in SECTION_HEADER.finditer(body):
        sections.append((m.start(), f"Section {m.group(1)} — {m.group(2)}"))
    sections.append((len(body), None))

    for i in range(len(sections) - 1):
        start, title = sections[i]
        end, _ = sections[i + 1]
        chunk = body[start:end]
        for raw in CARD_SEP.split(chunk):
            block = raw.strip()
            if not block:
                continue
            if block.startswith("##"):
                # Drop a section-header-only block; if more text follows the
                # header line, keep that.
                lines = block.split("\n", 1)
                if len(lines) < 2 or not lines[1].strip():
                    continue
                block = lines[1].strip()
            if "**Q:**" not in block:
                continue
            yield title, block


def _extract_answer_letters(answer_text: str) -> list[str]:
    """Pull the letter(s) the answer key marks correct."""
    letters: list[str] = ANSWER_LETTER.findall(answer_text)
    if not letters:
        letters = ANSWER_LETTERS_SET.findall(answer_text)
    if not letters:
        m = re.search(r"\*\*([A-F])\b", answer_text)
        if m is not None:
            letters = [m.group(1)]
    flat: list[str] = []
    for token in letters:
        for letter in re.findall(r"[A-F]", token):
            if letter not in flat:
                flat.append(letter)
    return flat


def _make_flip(front: str, back: str, tag: str | None) -> FlipCard:
    return {"kind": "flip", "front": front, "back": back, "tag": tag or ""}


def _make_mcq(
    front: str,
    options: list[str],
    answer: int | list[int],
    multi: bool,
    explain: str,
    tag: str | None,
) -> McqCard:
    return {
        "kind": "mcq",
        "front": front,
        "options": options,
        "answer": answer,
        "multi": multi,
        "explain": explain,
        "tag": tag or "",
    }


def parse_card(block: str, default_tag: str | None) -> Card | None:
    qm = Q_LINE.search(block)
    am = A_LINE.search(block)
    if qm is None or am is None:
        return None

    front: str = clean_md(qm.group(1))
    answer_text: str = clean_md(am.group(1))

    is_mcq: bool = MCQ_TRIGGER.search(front) is not None
    between: str = block[qm.end() : am.start()]
    options: list[str] = [m.group(2).strip() for m in MCQ_OPTION.finditer(between)]
    is_multi: bool = "select all that apply" in front.lower() or "select all" in front.lower()

    if is_mcq and len(options) >= 2:
        flat_letters: list[str] = _extract_answer_letters(answer_text)
        answer_indices: list[int] = [
            ord(L) - 65 for L in flat_letters if 0 <= ord(L) - 65 < len(options)
        ]
        if not answer_indices:
            return _make_flip(front, answer_text, default_tag)

        explain_match = re.search(
            r"\*\*[A-F](?:[\s,A-F]*)?\.?\*\*\s*(.+)", answer_text, re.S
        )
        explain: str = (
            clean_md(explain_match.group(1))
            if explain_match is not None and explain_match.group(1).strip()
            else ""
        )
        answer: int | list[int] = answer_indices if is_multi else answer_indices[0]
        return _make_mcq(front, options, answer, is_multi, explain, default_tag)

    return _make_flip(front, answer_text, default_tag)


def parse_file(path: Path) -> list[Card]:
    text: str = path.read_text()
    cards: list[Card] = []
    for tag, block in split_into_cards(text):
        card = parse_card(block, tag)
        if card is not None:
            cards.append(card)
    return cards


def main() -> None:
    decks: list[Deck] = []
    total_cards: int = 0
    for topic in TOPICS:
        path = FLASH / topic["file"]
        if not path.exists():
            print(f"!! missing: {path}", file=sys.stderr)
            continue
        cards = parse_file(path)
        total_cards += len(cards)
        print(f"  {topic['id']:14s} {len(cards):3d} cards  ←  {topic['file']}")
        decks.append(
            {
                "id": topic["id"],
                "name": topic["name"],
                "short": topic["short"],
                "emoji": topic["emoji"],
                "color": topic["color"],
                "accent": topic["accent"],
                "glyph": topic["glyph"],
                "cards": cards,
            }
        )
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(decks, indent=2))
    print(f"\nWrote {OUT}  ({total_cards} cards across {len(decks)} decks)")


if __name__ == "__main__":
    main()
