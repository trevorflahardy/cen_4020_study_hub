import type { DocPage } from '../../types';

export const managementOverview: DocPage = {
  id: 'management-overview',
  eyebrow: 'SE Management',
  title: 'Building the team that builds the feature',
  lede: 'Software engineering management is the application of management activities — people, product, process — to ensure software is delivered efficiently, effectively, and to the benefit of stakeholders.',
  body: [
    {
      kind: 'p',
      text: "The Glanceable Directions launch — our running case study — is the perfect illustration: you don't ship a navigation feature by writing all the code yourself. You ship it by **leading a team**, **owning the product vision**, and **running a process** so the work coheres.",
    },
    {
      kind: 'quote',
      text: "Great managers are more than just experienced engineers. A manager's job isn't just to build the feature; it's to build the team that builds the feature.",
      cite: 'Lesson 24',
    },
    { kind: 'h2', text: 'The five topics on the final' },
    {
      kind: 'list',
      items: [
        '**What is SE management?** — application of management activities for stakeholder benefit.',
        '**The three pillars** — People, Product, Process.',
        '**Foundation of success** — emotional intelligence + technical depth.',
        '**The three directions of communication** — Upward, Inward, Outward.',
        '**One-on-ones** — the most important meeting you will hold.',
      ],
    },
    { kind: 'related', deckId: 'management' },
  ],
};
