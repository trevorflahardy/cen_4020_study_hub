import type { DocPage } from '../../types';

export const baselines: DocPage = {
  id: 'baselines',
  eyebrow: 'Software Configuration Mgmt',
  title: 'What is a baseline?',
  lede: 'A baseline is a formally approved snapshot of a configuration item at a specific time. Once set, it can only change through formal change-control. This is how you achieve stability and predictability.',
  slide: 'Slide 104',
  lecture: 'Lesson 23',
  body: [
    {
      kind: 'definition',
      term: 'Baseline',
      body: "A **formally approved version** of a configuration item that is **formally designated and fixed at a specific time** during the configuration item's life cycle.",
    },
    { kind: 'h2', text: 'The Key Idea' },
    {
      kind: 'p',
      text: 'The baseline, **together with all approved changes to it**, represents the **current approved configuration**. The baseline is the trunk; approved changes are branches grafted on with formal sign-off.',
    },
    { kind: 'h2', text: 'The Rule' },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'No more informal substitutions',
      text: 'You can **only** change a baseline through **formal change-control procedures**. No more informal, "on-the-fly" substitutions. **This is what provides control and predictability.**',
    },
    { kind: 'h2', text: 'The metaphor' },
    {
      kind: 'p',
      text: 'A baseline is a **snapshot in time** — like taking all the correct pieces, putting them in a box, sealing it, and labeling it "Nexus Professional v2.1." Once established, it cannot be changed without going through the formal process.',
    },
    { kind: 'h2', text: 'The problem baselines solve' },
    {
      kind: 'p',
      text: "Without baselines, the SCIs you painstakingly identified are still a **jumble of versions** that don't fit together. Baselines group a specific set of SCI versions and give them a single name, so you always know exactly which versions work together to produce \"Nexus Pro 3.1\" or \"Nexus Enterprise 4.0-preview.\"",
    },
    { kind: 'h2', text: 'When are baselines created?' },
    {
      kind: 'list',
      items: [
        'At each major release — the snapshot you can reproduce later.',
        'At each milestone — the agreed-upon baseline for the next phase.',
        "Before high-risk work — so there's a known good state to roll back to.",
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Exam phrasing',
      text: 'A baseline is **formally approved**, **formally designated**, and **fixed at a specific time**. It changes **only through formal change-control**. The exam tests this exact phrasing.',
    },
    { kind: 'related', deckId: 'scm' },
  ],
};
