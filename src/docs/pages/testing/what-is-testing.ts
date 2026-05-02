import type { DocPage } from '../../types';

export const whatIsTesting: DocPage = {
  id: 'what-is-testing',
  eyebrow: 'Software Testing',
  title: 'What is testing? The "definition of done"',
  lede: 'Software testing is dynamic verification that a program provides expected behaviors on a finite set of test cases. Memorize every word — each is exam-relevant.',
  slide: 'Slide 23',
  lecture: 'Lesson 15',
  body: [
    {
      kind: 'definition',
      term: 'Software testing',
      body: 'The **dynamic verification** that a program provides **expected** behaviors on a **finite** set of test cases.',
    },
    { kind: 'h2', text: 'Why each word matters' },
    {
      kind: 'glossary',
      items: [
        { term: 'Dynamic', def: 'The code is **actually executed**. Reading code (static analysis) can find some defects, but testing requires running the program.' },
        { term: 'Verification', def: 'We are checking conformance to specifications — does the code do what the spec says it should?' },
        { term: 'Expected', def: 'Every test compares observed output to a **known correct answer**. A test without a clear oracle is not a test.' },
        { term: 'Finite', def: "Exhaustive testing is impossible — input spaces are effectively infinite. Our challenge is **choosing** a representative subset." },
      ],
    },
    { kind: 'h2', text: "Why we can't test everything" },
    {
      kind: 'p',
      text: "The IQon Elite scanner accepts billions of input combinations per scan: tissue densities, patient profiles, scanner settings. We can't test every patient profile or scan setting — it would take years. The discipline is **intelligent test selection**: choose tests that represent the **highest risks** and **most common uses**.",
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'A test without a known answer is useless',
      text: `If you don't know what "correct" looks like, your test cannot fail. The phrase "expected behaviors" in the definition is doing the work of forcing you to define correctness *up front*.`,
    },
    { kind: 'h2', text: 'The three jobs of a test suite' },
    {
      kind: 'list',
      items: [
        "**Execute** the code (we can't catch dynamic bugs by reading).",
        "**Compare** output against the spec (we can't claim a pass without an oracle).",
        `**Sample** the input space intelligently (we can't test everything, so we pick smartly).`,
      ],
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
