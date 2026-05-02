import type { DocPage } from '../../types';

export const pyramid: DocPage = {
  id: 'pyramid-of-confidence',
  eyebrow: 'Software Testing',
  title: 'The Pyramid of Confidence: four levels',
  lede: "Confidence in working software is built from the ground up: many small unit tests at the base, a few high-value end-to-end tests at the apex.",
  slide: 'Slide 24',
  lecture: 'Lesson 16',
  body: [
    { kind: 'h2', text: 'The four levels (bottom to top)' },
    {
      kind: 'table',
      cols: ['Level', 'Tests', 'Cost', 'Speed', 'Question answered'],
      rows: [
        ['**Unit**', 'Many', 'Cheap', 'Very fast', 'Does this single function/class do its job?'],
        ['**Integration**', 'More', 'Faster than system', 'Fast', 'Do the pieces fit together?'],
        ['**System**', 'Few', 'Expensive', 'Slow', "Does the whole product work as designed?"],
        ['**Acceptance**', 'Very few', 'Most expensive', 'Slowest', "Does it meet the customer's needs?"],
      ],
    },
    { kind: 'h2', text: 'What each level actually validates' },
    {
      kind: 'list',
      items: [
        '**Unit tests** — verify the smallest pieces of code (a single function, method, or class) in isolation.',
        '**Integration tests** — ensure individual components **work together**. Test the connections between modules: data flows, contracts, shared state.',
        '**System tests** — validate the **complete, fully integrated software** running with all its real components (databases, front-ends, services).',
        `**Acceptance tests** — confirm the system **meets the customer's needs**. Often run by or with stakeholders.`,
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Memorize the order',
      text: `Bottom-to-top: **Unit → Integration → System → Acceptance**. Each level validates the one below it. You can't have meaningful integration tests if your units are broken.`,
    },
    { kind: 'h2', text: 'Climbing the pyramid' },
    {
      kind: 'p',
      text: 'As you climb, tests become **slower**, **more expensive**, and **fewer**. Each level is more realistic but more painful to maintain. The pyramid shape is intentional: pile up the cheap fast tests, save the expensive ones for the few cases where they earn their keep.',
    },
    {
      kind: 'quote',
      text: 'Build confidence from the ground up. Each level validates the one below it.',
      cite: 'Lesson 16',
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
