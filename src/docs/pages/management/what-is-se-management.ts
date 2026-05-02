import type { DocPage } from '../../types';

export const whatIsSeManagement: DocPage = {
  id: 'what-is-se-management',
  eyebrow: 'SE Management',
  title: 'What is Software Engineering Management?',
  lede: 'The application of management activities to ensure software products and software engineering services are delivered efficiently, effectively, and to the benefit of stakeholders.',
  slide: 'Slide 106',
  lecture: 'Lesson 24',
  body: [
    {
      kind: 'definition',
      term: 'Software Engineering Management',
      body: 'The **application of management activities** to ensure that **software products and software engineering services are delivered efficiently, effectively, and to the benefit of stakeholders**.',
    },
    { kind: 'h2', text: '"Efficiently, effectively, to stakeholder benefit"' },
    {
      kind: 'glossary',
      items: [
        { term: 'Efficiently', def: `Good use of resources — time, money, headcount. The team isn't spinning on overhead.` },
        { term: 'Effectively', def: "Achieving the intended outcome — the feature actually solves the user's problem." },
        { term: 'To stakeholder benefit', def: 'Delivering real value to all relevant parties — users, business, regulators, the engineers themselves.' },
      ],
    },
    { kind: 'h2', text: 'The seven sub-areas of SE management' },
    {
      kind: 'list',
      items: [
        'What do managers do?',
        'How to become a manager',
        'Manager Skills',
        'Manager Mistakes',
        'How to be a good manager',
        'Manager meetings',
        'Manager delegations',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'A unifying frame',
      text: "Whenever a question asks 'what is a manager's job?' — the highest-quality answer reaches for the **three adverbs** (efficiently, effectively, to stakeholder benefit) plus the **three pillars** (People / Product / Process).",
    },
    { kind: 'related', deckId: 'management' },
  ],
};
