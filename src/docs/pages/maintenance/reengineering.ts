import type { DocPage } from '../../types';

export const reengineering: DocPage = {
  id: 'reengineering',
  eyebrow: 'Software Maintenance',
  title: 'Taming complexity: reengineering & refactoring',
  lede: "Sometimes you can readjust the code in place (refactor). Sometimes you have to remake it in a new form (reengineer). The course names both.",
  slide: 'Slide 80',
  lecture: 'Lesson 19',
  body: [
    {
      kind: 'definition',
      term: 'Reengineering',
      body: 'The **examination and alteration of software to reconstitute it in a new form**. More drastic than refactoring — typically needed when the codebase is so tangled that small refactorings are no longer enough.',
    },
    {
      kind: 'definition',
      term: 'Refactoring',
      body: "A key reengineering technique that **improves a program's internal structure without changing its external behavior**. It's how you pay down technical debt and keep complexity manageable.",
    },
    { kind: 'h2', text: 'Refactoring is a continuous loop, not a project' },
    {
      kind: 'p',
      text: `Refactoring isn't a massive, one-time project — it's a **small, continuous improvement loop** that happens during minor changes. A key refactoring technique investigates and untangles a small portion of the software **without changing its external functionality**.`,
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: `When refactoring isn't enough`,
      text: `Refactoring is a maintenance activity that should be done in concert with other tasks. When the system is so tangled that small refactorings can't make headway, the answer is **reengineering** — a more drastic structural redo.`,
    },
    { kind: 'h2', text: 'Refactoring vs reengineering — quick comparison' },
    {
      kind: 'table',
      cols: ['Aspect', 'Refactoring', 'Reengineering'],
      rows: [
        ['**Scale**', 'Small, continuous', 'Large, project-sized'],
        ['**Behavior changes?**', 'No', 'Possibly (new form)'],
        ['**When to use**', "During regular work", "When the tech debt is too deep to chip at"],
        ['**Risk**', 'Low (tests stay green)', 'Higher — substantial restructuring'],
      ],
    },
    { kind: 'h2', text: 'Why bother?' },
    {
      kind: 'p',
      text: 'Both techniques exist to keep the code **changeable for the next person who has to work on it**. Tangled code rots; refactored code accumulates value.',
    },
    { kind: 'related', deckId: 'maintenance' },
  ],
};
