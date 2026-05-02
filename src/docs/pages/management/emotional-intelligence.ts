import type { DocPage } from '../../types';

export const emotionalIntelligence: DocPage = {
  id: 'emotional-intelligence',
  eyebrow: 'SE Management',
  title: 'The foundation of your success: great managers are more than experienced engineers',
  lede: "A manager's job isn't just to build the feature — it's to build the team that builds the feature. Technical depth is necessary but not sufficient.",
  slide: 'Slide 109',
  lecture: 'Lesson 26',
  body: [
    {
      kind: 'quote',
      text: 'Great managers are more than just experienced engineers.',
      cite: 'Lesson 26',
    },
    { kind: 'h2', text: 'The combination' },
    {
      kind: 'p',
      text: "Great managers combine **deep technical knowledge** with the **emotional intelligence** required to head off workplace politics and create a safe, high-performance environment. **Your job isn't just to build the feature; it's to build the team that builds the feature.**",
    },
    { kind: 'h2', text: `Why technical depth alone isn't enough` },
    {
      kind: 'list',
      items: [
        'Engineers feel unheard when their manager only optimizes for output.',
        'Technical decisions get **politically derailed** without someone to read the room.',
        `High performers leave when they don't see growth or care.`,
        'Cross-team collaboration falls apart without a manager who can navigate human dynamics.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'What "emotional intelligence" means here',
      text: `The ability to **read the room, navigate interpersonal dynamics, and prevent or defuse politics**. It's a *technical* skill in management — practice and pattern-recognition, not personality.`,
    },
    { kind: 'h2', text: `The Manager's role in a crisis` },
    {
      kind: 'p',
      text: "When Glanceable Directions exceeds the budget, the engineering instinct is to optimize the code. The manager's job is broader: explain to upper management **how the design benefits the organization** and **justify the investment**. You are the primary advocate and defender of your team's work.",
    },
    { kind: 'related', deckId: 'management' },
  ],
};
