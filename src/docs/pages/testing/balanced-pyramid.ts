import type { DocPage } from '../../types';

export const balancedPyramid: DocPage = {
  id: 'balanced-pyramid',
  eyebrow: 'Software Testing',
  title: 'The Testing Pyramid: a balanced strategy',
  lede: 'Lots of small fast unit tests, some integration tests for critical interactions, a few end-to-end system tests for real workflows. Get the ratio wrong and the suite either lies or grinds.',
  slide: 'Slide 59',
  lecture: 'Lesson 16',
  body: [
    { kind: 'h2', text: 'The strategy' },
    {
      kind: 'list',
      items: [
        '**Many** small, fast **unit tests** at the bottom.',
        '**Some** **integration tests** for critical seams between modules.',
        '**A few** high-value, end-to-end **system tests** for the real user workflows.',
      ],
    },
    { kind: 'h2', text: 'Why this shape, not a square or inverted pyramid' },
    {
      kind: 'table',
      cols: ['Anti-pattern', 'What goes wrong'],
      rows: [
        ['**Inverted pyramid** (lots of UI tests, few units)', 'Slow CI, brittle tests, late feedback. Every refactor breaks 50 UI tests.'],
        ['**Ice cream cone** (heavy manual testing)', `Bottlenecks releases on humans. Doesn't scale.`],
        ['**Hourglass** (many units + many UI, no middle)', 'Misses integration bugs — the most common kind in production.'],
      ],
    },
    { kind: 'h2', text: 'Key principles' },
    {
      kind: 'p',
      text: 'Each layer **validates** the one below it. You build confidence from the ground up. As you climb, tests become slower, more expensive, and fewer.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: `Use higher levels for what units can't do`,
      text: `High-value end-to-end tests should focus on **simulating real user workflows** — the things that only become visible when the whole system is wired up. Don't use a system test to check arithmetic; use a unit test.`,
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
