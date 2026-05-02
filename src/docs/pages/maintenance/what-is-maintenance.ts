import type { DocPage } from '../../types';

export const whatIsMaintenance: DocPage = {
  id: 'what-is-maintenance',
  eyebrow: 'Software Maintenance',
  title: 'What is software maintenance?',
  lede: 'The totality of activities required to provide cost-effective support to software — modifying it after delivery to correct faults, improve performance, or adapt to a changed environment.',
  slide: 'Slide 62',
  lecture: 'Lesson 19',
  body: [
    {
      kind: 'definition',
      term: 'Software maintenance',
      body: 'The **totality of activities** required to provide **cost-effective support to software**.',
    },
    { kind: 'h2', text: 'The reality: maintenance is evolution, not just repair' },
    {
      kind: 'p',
      text: 'Studies show that **over 80% of software maintenance effort is spent on non-corrective actions** — meaning maintenance is mostly **evolution, not repair**. Most time is spent on enhancements and adaptations rather than bug fixes.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The 80% statistic',
      text: 'Memorize the **80%**. It often shows up as a stat-recall MCQ. The exact phrasing: "**over 80% of software maintenance effort is spent on non-corrective actions**."',
    },
    { kind: 'h2', text: 'The four flavors of maintenance work' },
    {
      kind: 'table',
      cols: ['Flavor', 'Trigger', 'Example'],
      rows: [
        ['**Corrective**', 'A bug is reported', "Fixing the QA-found crash in `renderScanSlice`"],
        ['**Adaptive**', 'The environment changed', 'Updating to a new browser version, new OS, or new third-party API'],
        ['**Perfective**', 'A user requests an enhancement', 'Adding a new export format to New Quizzes based on user feedback'],
        ['**Preventive**', 'You see future risk', 'Refactoring tangled code to make it easier to extend ("paying down technical debt")'],
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Memory trick — only "Corrective" fixes bugs',
      text: `The other three flavors (Adaptive, Perfective, Preventive) **don't** fix bugs. The exam will test this distinction with "select all that apply" questions.`,
    },
    { kind: 'h2', text: 'Why software is never "done"' },
    {
      kind: 'p',
      text: `Successful software is **never 'done'**. It faces constant pressure to evolve from five forces:`,
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
    {
      kind: 'quote',
      text: "Software Maintenance isn't an afterthought. It's the ongoing stewardship of a live product.",
      cite: 'Lesson 19',
    },
    { kind: 'related', deckId: 'maintenance' },
  ],
};
