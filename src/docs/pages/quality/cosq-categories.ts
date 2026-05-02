import type { DocPage } from '../../types';

export const cosqCategories: DocPage = {
  id: 'cosq-categories',
  eyebrow: 'Software Quality',
  title: 'The Four Levers of Quality Investment',
  lede: 'Prevention, Appraisal, Internal Failure, External Failure. Where you spend tells you how high your quality is — and where to spend more.',
  slide: 'Slide 92',
  lecture: 'Lesson 22',
  body: [
    { kind: 'h2', text: 'The four categories' },
    {
      kind: 'table',
      cols: ['Category', 'When', 'What it pays for', 'Examples'],
      rows: [
        ['**Prevention**', 'Before defects happen', 'Investments to **prevent** defects', "Process improvement, quality tools, team training, audits"],
        ['**Appraisal**', 'During development', 'Costs to **find** defects during development', "Design reviews, peer reviews, all forms of testing (unit, integration, system)"],
        ['**Internal Failure**', 'Before delivery', 'Fixing defects found *before* delivery to the customer', "Rework, re-testing, debugging time"],
        ['**External Failure**', 'After delivery', 'Responding to problems found *after* delivery', "Help-desk support, warranty repairs, legal fees, brand damage"],
      ],
    },
    { kind: 'h2', text: 'Investment in Quality vs Cost of Poor Quality' },
    {
      kind: 'list',
      items: [
        '**Investment in Quality (smart upfront cost):** Prevention + Appraisal.',
        '**Cost of Poor Quality (massive ongoing cost):** Internal Failure + External Failure.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'External Failure is the most expensive',
      text: "External Failure dwarfs everything else: warranty repairs, legal fees, brand damage. The whole point of investing in Prevention is to drive External Failure down. **A defect found by a customer costs ~10–100× what the same defect costs caught in development.**",
    },
    { kind: 'h2', text: 'Which side of the table the exam will probe' },
    {
      kind: 'list',
      items: [
        'Categorizing an activity ("design review" → which CoSQ?).',
        'Picking the most expensive category (External Failure).',
        'Picking the categories that occur **before delivery** (Prevention, Appraisal, Internal Failure).',
      ],
    },
    { kind: 'related', deckId: 'quality' },
  ],
};
