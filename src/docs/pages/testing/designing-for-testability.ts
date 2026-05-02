import type { DocPage } from '../../types';

export const designingForTestability: DocPage = {
  id: 'designing-for-testability',
  eyebrow: 'Software Testing',
  title: "The master's mindset: designing for testability",
  lede: 'Testability is not an accident or an afterthought. If your code is hard to test, you probably will not test it — and untested code is unsustainable code.',
  slide: 'Slide 33',
  lecture: 'Lesson 18',
  body: [
    {
      kind: 'quote',
      text: `If our code is hard to test, we probably won't test it.`,
      cite: 'Lesson 18',
    },
    { kind: 'h2', text: 'Testability as a design principle' },
    {
      kind: 'p',
      text: "Designing for testability means **architecting code from the start** so writing automated tests is easy. It is not a fix you apply at the end — it's a continuous design discipline that shows up in every commit.",
    },
    { kind: 'h2', text: 'When is the right moment to think about testability?' },
    {
      kind: 'list',
      items: [
        '**Before** you write the first line of production code.',
        '**While** you are writing the code.',
        '**After** the feature is "done."',
        '**The answer: All the time.** Testability is a continuous design principle, not a phase.',
      ],
    },
    { kind: 'h2', text: 'Cost or investment?' },
    {
      kind: 'p',
      text: "Some developers argue that designing for testability is harder and adds extra lines of code. The reality: **writing tangled, untestable code costs more upfront than you think**, but the payoff debt is enormous. As the system ages, untestable code turns into spaghetti, while testable code stays sustainable.",
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The bottom line',
      text: "Testable code costs more upfront, but it is **the only way to ensure sustainable quality and long-term development speed**. The shortcut is the long way around.",
    },
    { kind: 'h2', text: 'How to make code testable' },
    {
      kind: 'list',
      items: [
        '**Single responsibility** — one job per unit, so each can be tested in isolation.',
        '**Dependency inversion** — pass collaborators in (DBs, clocks, services) so tests can substitute fakes.',
        '**Pure functions where possible** — same input → same output, no hidden state.',
        '**Small interfaces** — small surface area means few tests needed for full coverage.',
      ],
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
