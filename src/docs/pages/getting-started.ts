import type { DocPage, DocSection } from '../types';

const intro: DocPage = {
  id: 'intro',
  eyebrow: 'Getting started',
  title: 'Welcome to the CEN 4020 final review',
  lede: "Everything you need to master the post-midterm half of CEN 4020 Software Engineering — distilled from the lecture decks and the Lesson 30 final review, organized by concept area.",
  body: [
    {
      kind: 'p',
      text: "This documentation site is the long-form companion to the flashcard decks. Where the flashcards force quick recall, the docs explain the **why** behind each definition, the **course-specific examples** (IQon Elite, SellAgain, New Quizzes, Glanceable Directions), and the connections between topics. Read the docs, then drill the flashcards.",
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'How to use this together',
      text: "Read a topic doc end-to-end (5–8 min), then click the **Open deck →** button at the bottom to drill the related flashcards. The mix of long-form + quick-recall is the highest-leverage way to lock these concepts in.",
    },
    { kind: 'h2', text: 'What this covers' },
    {
      kind: 'p',
      text: "Only the **post-midterm** material is on the final exam — Lessons 13 through 26, summarized by Lesson 30. Each red-dot slide on the final review deck has a dedicated doc page here.",
    },
    {
      kind: 'list',
      items: [
        '**SE Foundations** — what software engineering really is.',
        '**Testing** — TDD, the test pyramid, V&V, black/white-box, designing for testability.',
        '**Design by Contract** — pre/post-conditions, invariants, who-is-at-fault analysis.',
        '**Software Maintenance** — the four flavors, lifecycle, estimation, planning levels, refactoring, reverse engineering.',
        '**Software Quality** — quality definitions, CoSQ, the Iron Triangle, SQM processes, V&V.',
        '**Software Configuration Management** — SCM definition, the four core functions, SCIs, baselines.',
        '**Software Engineering Management** — the three pillars, emotional intelligence, communication directions, one-on-ones.',
      ],
    },
    { kind: 'h2', text: 'Source material' },
    {
      kind: 'p',
      text: 'All content traces back to one of: (a) a **red-dot slide** in `CEN 4020 - Lesson 30 - Final Review`, or (b) a deeper-dive lecture in Lessons 15–26. Each page lists its review-deck slide and the originating lecture so you can cross-check.',
    },
    { kind: 'related', deckId: 'foundations', hint: 'Start with the Foundations deck — it is the framing for everything else.' },
  ],
};

const howToStudy: DocPage = {
  id: 'how-to-study',
  eyebrow: 'Getting started',
  title: 'How to use this app',
  lede: 'Three modes, one goal: getting every red-dot topic into long-term memory before the final.',
  body: [
    { kind: 'h2', text: 'Three modes' },
    {
      kind: 'steps',
      items: [
        { n: 1, title: 'Browse a topic', text: "From the **Topics** grid, pick the concept area you're weakest on. The progress bar tells you how much of that deck you've mastered." },
        { n: 2, title: 'Read the docs', text: "Open the **Docs** tab and skim the topic's deep-dive. The docs pull in lecture context, examples, and worked scenarios that the flashcards leave out." },
        { n: 3, title: 'Drill the deck', text: 'Tap **Open deck** at the bottom of any doc page to jump straight into the matching flashcards. Flip with `space`, rate with `←` / `→`. Knowns persist in localStorage.' },
      ],
    },
    { kind: 'h2', text: 'Keyboard shortcuts (study mode)' },
    {
      kind: 'table',
      cols: ['Key', 'Action'],
      rows: [
        ['`space`', 'Flip the current card'],
        ['`→`', 'Mark "Got it" and advance'],
        ['`←`', 'Mark "Again" and advance'],
        ['`↓`', 'Mark "Hard" and advance'],
        ['`Esc`', 'Exit the study session'],
      ],
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Mastery persists, streak rewards consistency',
      text: 'The 🔥 streak counter increments by one each calendar day you mark at least one card. Skipping a day resets it to 1.',
    },
  ],
};

const glossary: DocPage = {
  id: 'glossary',
  eyebrow: 'Getting started',
  title: 'Glossary',
  lede: 'Quick definitions for the acronyms and shorthand that show up across the course.',
  body: [
    {
      kind: 'glossary',
      items: [
        { term: 'TDD', def: '**Test-Driven Development** — write a failing test first, then minimum code to pass, then refactor (Red → Green → Refactor).' },
        { term: 'V&V', def: '**Verification & Validation**. Verification: "are we building the product right?" Validation: "are we building the right product?"' },
        { term: 'SCM', def: '**Software Configuration Management** — the discipline of identifying, controlling, auditing, and reporting software changes over the system life cycle.' },
        { term: 'SQA', def: '**Software Quality Assurance** — the process-oriented part of quality management; ensures the right processes are followed.' },
        { term: 'SQC', def: '**Software Quality Control** — the product-oriented part; verifies the product meets requirements (testing, inspections).' },
        { term: 'SQM', def: '**Software Quality Management** — the umbrella term: the collection of all processes ensuring quality. Comprises SQP, SQA, SQC, SPI.' },
        { term: 'SQP', def: '**Software Quality Planning** — defining quality goals, standards, effort, and schedule.' },
        { term: 'SPI', def: '**Software Process Improvement** — continuously improving the processes themselves.' },
        { term: 'CoSQ', def: '**Cost of Software Quality** — Prevention, Appraisal, Internal Failure, External Failure. Quality level can be inferred from spending across these four buckets.' },
        { term: 'SCI', def: '**Software Configuration Item** — any artifact (code, doc, test, etc.) managed as a single trackable unit under SCM.' },
        { term: 'DbC', def: '**Design by Contract** — formal pre-conditions (Client owes), post-conditions (Server promises), and invariants (always hold) on a method or class.' },
        { term: 'IQon Elite', def: 'The CT-scanner case study used in lectures for unit/integration/system testing examples (`calculateTissueDensity`, `savePatientRecord`, `renderScanSlice`).' },
        { term: 'SellAgain', def: 'The ticket-resale platform used in lectures for software-quality, contract, and stakeholder examples (Artist, Seller, Buyer, Fan).' },
        { term: 'New Quizzes', def: 'The course-management feature used as the maintenance case study (post-launch evolution, retirement planning).' },
        { term: 'Glanceable Directions', def: 'The driving-app feature used as the management case study (kickoff meeting, leadership, deadline-extension scenarios).' },
        { term: 'Nexus', def: "The 'jumble of parts' platform used as the SCM case study (Standard / Pro / Enterprise editions, baseline grouping)." },
      ],
    },
  ],
};

export const gettingStartedSection: DocSection = {
  id: 'getting-started',
  label: 'Getting started',
  icon: '🚀',
  pages: [intro, howToStudy, glossary],
};
