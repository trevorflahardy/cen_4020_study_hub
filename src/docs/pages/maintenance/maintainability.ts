import type { DocPage } from '../../types';

export const maintainability: DocPage = {
  id: 'maintainability',
  eyebrow: 'Software Maintenance',
  title: 'Why is this so hard to change? (Maintainability)',
  lede: "Maintainability is the capability of software to be modified. Built in from the start, it makes change cheap. Bolted on as an afterthought, it makes change horrifying.",
  slide: 'Slide 69',
  lecture: 'Lesson 19',
  body: [
    {
      kind: 'definition',
      term: 'Maintainability',
      body: 'The **capability of software to be modified**. Ideally built in from the start; in reality, it is often an afterthought.',
    },
    { kind: 'h2', text: 'Well-maintained vs poorly-maintained' },
    {
      kind: 'table',
      cols: ['Aspect', 'Well-maintained', 'Poorly-maintained'],
      rows: [
        ['Visual', 'A well-stocked toolkit', 'A tangled jumble of wires'],
        ['Engineer experience', 'Spend more time changing the code', 'Spend more time **understanding** the code than changing it'],
        ['Confidence in changes', 'High — clear seams, good tests', 'Low — every change risks ripple effects'],
        ['Onboarding', 'New engineers ramp up quickly', 'New engineers are afraid to touch anything'],
      ],
    },
    {
      kind: 'quote',
      text: `During development, teams are preoccupied with many other activities and frequently prove to be impediment to the maintainer's requirements.`,
      cite: 'Lesson 19',
    },
    { kind: 'h2', text: `It's not a bug — it's evolution` },
    {
      kind: 'p',
      text: `Maintainability matters because **the most significant threat to software isn't a single failure** — it's the constant, unavoidable pressure to evolve. Successful software is never 'done'. The five forces driving evolution:`,
    },
    {
      kind: 'list',
      items: [
        'New Operating Systems',
        'Changing User Demands',
        'Updated 3rd-Party APIs',
        'New Feature Requests',
        'Security Vulnerabilities',
      ],
    },
    { kind: 'h2', text: 'How to *invest* in maintainability' },
    {
      kind: 'list',
      items: [
        'Prefer small modules with **high cohesion** and **low coupling**.',
        'Write **self-documenting** code; comments explain *why*, code explains *what*.',
        'Keep dependencies **explicit** (passed in, not hidden globals).',
        `Maintain a **green test suite** — without it, refactoring isn't safe.`,
        'Document **architectural decisions** so future maintainers know the *why*.',
      ],
    },
    { kind: 'related', deckId: 'maintenance' },
  ],
};
