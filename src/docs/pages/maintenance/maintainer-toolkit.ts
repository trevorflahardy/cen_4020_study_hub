import type { DocPage } from '../../types';

export const maintainerToolkit: DocPage = {
  id: 'maintainer-toolkit',
  eyebrow: 'Software Maintenance',
  title: "The maintainer's toolkit: comprehension + reverse engineering",
  lede: 'Two toolkits: one for everyday code understanding, one for major reverse-engineering / migration projects. Know what each is for.',
  slide: 'Slide 83',
  lecture: 'Lesson 19',
  body: [
    { kind: 'h2', text: 'Part 1 — Comprehension & Analysis tools' },
    {
      kind: 'p',
      text: `These tools help your team analyze and understand the existing **New Quizzes** codebase efficiently — they're for everyday work, not big projects:`,
    },
    {
      kind: 'list',
      items: [
        '**Program Slicers** — isolate and view only the parts of a program relevant to a specific question.',
        '**Static Analyzers** — inspect program content/structure **without executing it**. Find complexity, bugs, vulnerabilities.',
        '**Data Flow Analyzers** — track how data moves through a program from input to output.',
        '**Cross-References** — show where elements (variables, functions) are used.',
        '**Dynamic Analyzers** — trace the execution of a program to understand runtime behavior.',
        '**Dependency Analyzers** — understand the relationships and dependencies between modules.',
      ],
    },
    { kind: 'h2', text: 'Part 2 — Reverse Engineering tools' },
    {
      kind: 'p',
      text: 'These tools "work backward from the existing product" to create high-level artifacts. Used for **major reengineering or migration projects**:',
    },
    {
      kind: 'list',
      items: [
        '**Software Test Frameworks** — for systematically rebuilding a test suite around a legacy system.',
        '**Software Configuration Management** tools (e.g. Confluent / SCM platforms) — for understanding what versions of what existed when.',
        '**Documentation Systems** — for capturing what reverse engineering uncovers.',
        `**Software Measurement and Monitoring tools** — to quantify the health and behavior of the system you're re-mapping.`,
      ],
    },
    { kind: 'h2', text: 'Quick comparison' },
    {
      kind: 'table',
      cols: ['Toolkit', 'Scale', 'Question it answers'],
      rows: [
        ['**Part 1: Comprehension**', 'Day-to-day', 'How does *this* part of the existing code work?'],
        ['**Part 2: Reverse Engineering**', 'Project-sized', 'How do we produce high-level artifacts (docs, tests, measurements) for a system we are rebuilding?'],
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: `Don't mix the two on the exam`,
      text: 'Static analyzers, slicers, dependency analyzers → **Part 1** (comprehension). Test frameworks, SCM tools, documentation systems, monitoring → **Part 2** (reverse engineering). The exam will test the distinction.',
    },
    { kind: 'related', deckId: 'maintenance' },
  ],
};
