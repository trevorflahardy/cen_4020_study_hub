# Stackr · CEN 4020 Final Flashcards

A Vite + React + TypeScript flashcard app covering every red-dot topic on the
CEN 4020 Software Engineering final exam. Built from the source markdown decks
in `flashcards/`, deployed to GitHub Pages on every push to `master`.

<img width="1143" height="742" alt="image" src="https://github.com/user-attachments/assets/f806cb0a-1f64-4aae-9b5c-2b2c737720dd" />
<img width="1169" height="758" alt="image" src="https://github.com/user-attachments/assets/24b24ef4-4635-4abd-bdea-6a9cb07f21a9" />

## Quick start

This project uses [Bun](https://bun.sh) as the package manager and runtime.

```bash
bun install
bun run dev          # local dev server (http://localhost:5173)
bun run build        # parses MD → JSON, type-checks, then builds dist/
bun run typecheck    # strict tsc, no emit
bun run lint         # ESLint with production-grade rules
bun run preview      # serve the production build
```

The build runs `python3 scripts/parse_decks.py` first to regenerate
`src/data/decks.json` from the markdown sources, then runs `tsc --noEmit`,
then Vite. So whenever you edit a flashcard MD file, just re-run
`bun run build` (or `bun run parse` if you only need fresh JSON during dev).

> Don't have Bun? `curl -fsSL https://bun.sh/install | bash` (macOS / Linux)
> or `powershell -c "irm bun.sh/install.ps1 | iex"` (Windows).

## TypeScript & code quality

The codebase is strict TypeScript with production-level checks enforced by
`tsconfig.json` and `eslint.config.js`:

- `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `noImplicitOverride`, `noPropertyAccessFromIndexSignature`,
  `noUnusedLocals`/`Parameters`, `noFallthroughCasesInSwitch`,
  `noImplicitReturns`.
- ESLint with `typescript-eslint` `strict-type-checked` +
  `stylistic-type-checked`, plus React Hooks rules.
- Hard caps that fail CI when exceeded:
  - **`max-lines: 400`** per file (skips blank lines + comments)
  - **`max-lines-per-function: 200`**
  - **`max-params: 5`**, **`max-depth: 4`**, **`max-nested-callbacks: 4`**
  - **`complexity: 20`** (cyclomatic)
- `@typescript-eslint/no-explicit-any`, `no-non-null-assertion`,
  `no-floating-promises`, `no-misused-promises`,
  `switch-exhaustiveness-check`, `no-unnecessary-condition`,
  `prefer-nullish-coalescing`, `prefer-optional-chain`.

The intent: keep components small, split anything that grows past ~400
lines, and make every implicit `any` or unhandled promise show up as a
build break.

## Folder Layout

```
final_exam/
├── README.md                       (this file)
├── package.json
├── tsconfig.json                   ← strict TS config
├── tsconfig.node.json              ← TS config for vite.config.ts
├── eslint.config.js                ← ESLint flat config + size caps
├── vite.config.ts
├── index.html
├── .github/workflows/deploy.yml    ← GitHub Pages CI (Bun-based)
├── content/
│   └── CONTENT.md                  ← All 38 red-dot exam topics with page refs
├── flashcards/                     ← The single source of truth for cards
│   ├── 01_software_engineering_foundations.md
│   ├── 02_testing.md
│   ├── 03_design_by_contract.md
│   ├── 04_software_maintenance.md
│   ├── 05_software_quality.md
│   ├── 06_software_configuration_management.md
│   └── 07_software_engineering_management.md
├── scripts/
│   └── parse_decks.py              ← MD → src/data/decks.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types.ts                    ← shared Deck / Card / Route types
    ├── vite-env.d.ts
    ├── styles.css
    ├── components/
    │   ├── Home.tsx                ← Topic grid
    │   ├── Study.tsx               ← Flip + MCQ session
    │   ├── SessionComplete.tsx     ← End-of-session screen
    │   └── Dashboard.tsx           ← Streak / mastery / heatmap
    ├── lib/
    │   ├── progress.ts             ← localStorage progress + streak
    │   └── study.ts                ← session builder + inline markdown
    └── data/
        ├── decks.ts                ← imports decks.json + types it
        └── decks.json              ← generated; do NOT edit by hand
```

## How studying works

- **Topics view** — pick a concept area to drill, or hit "Study" in the nav for
  a shuffled mixed deck across every topic.
- **Study screen** — flip cards (`Space`) or pick MCQ answers; rate yourself
  with `←` (miss) / `→` (got it) or by swiping.
- **Progress** is tracked in `localStorage`. Mastered counts and streaks
  persist across sessions on the same browser. Clearing site data resets.

## Scope reminder

The final is **not comprehensive**. It covers material **after Lesson 12**
(Lesson 12 is the midterm review). The decks are drawn from Lessons 13–26
plus the Lesson 30 final review.

## Deploying

Push to `master` and the workflow at `.github/workflows/deploy.yml` will
install with Bun, type-check, build the app with the right `base` path, and
ship the contents of `dist/` to GitHub Pages. The first time, you'll need to
enable Pages in the repo's **Settings → Pages → Build and deployment** and
select **GitHub Actions** as the source.
