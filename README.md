# Stackr · CEN 4020 Final Flashcards

A Vite + React flashcard app covering every red-dot topic on the CEN 4020
Software Engineering final exam. Built from the source markdown decks in
`flashcards/`, deployed to GitHub Pages on every push to `master`.

<img width="1143" height="742" alt="image" src="https://github.com/user-attachments/assets/f806cb0a-1f64-4aae-9b5c-2b2c737720dd" />

## Quick start

```bash
npm install
npm run dev          # local dev server (http://localhost:5173)
npm run build        # parses MD → JSON, then builds dist/
npm run preview      # serve the production build
```

The build runs `python3 scripts/parse_decks.py` first to regenerate
`src/data/decks.json` from the markdown sources, then runs Vite. So whenever
you edit a flashcard MD file, just re-run `npm run build` (or
`npm run parse` if you only need fresh JSON during dev).

## Folder Layout

```
final_exam/
├── README.md                       (this file)
├── package.json
├── vite.config.js
├── index.html
├── .github/workflows/deploy.yml   ← GitHub Pages CI
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
├── mock_hub_styling/               ← Original design mock (kept for reference)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── Home.jsx                ← Topic grid
    │   ├── Study.jsx               ← Flip + MCQ session
    │   └── Dashboard.jsx           ← Streak / mastery / heatmap
    ├── lib/
    │   └── progress.js             ← localStorage progress + streak
    └── data/
        ├── decks.js                ← imports decks.json
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
build the app with the right `base` path and ship the contents of `dist/` to
GitHub Pages. The first time, you'll need to enable Pages in the repo's
**Settings → Pages → Build and deployment** and select **GitHub Actions** as
the source.
