import type { DocPage } from '../../types';

export const scmAndSqa: DocPage = {
  id: 'scm-and-sqa',
  eyebrow: 'Software Configuration Mgmt',
  title: 'SCM is the foundation of Software Quality Assurance',
  lede: 'A good SCM process is your best defense against bugs and failed releases. It supports SQA on three pillars: traceability, reproducibility, consistency.',
  slide: 'Slide 99',
  lecture: 'Lesson 23',
  body: [
    {
      kind: 'p',
      text: 'A good SCM process is your **best defense against bugs and failed releases**. SQA processes provide assurance that the software products and processes conform to their specified requirements; **SCM activities help in accomplishing this SQA goal**.',
    },
    { kind: 'h2', text: 'The three SQA pillars SCM enables' },
    {
      kind: 'table',
      cols: ['Pillar', 'What it gives you', 'Without SCM'],
      rows: [
        ['**Traceability**', 'Every line of code traces back to a specific requirement or approved change request', "You can't answer 'why does this code exist?'"],
        ['**Reproducibility**', "We can reliably recreate **any previous version** of the software for investigation", "You can't reproduce last month's release to debug a regression"],
        ['**Consistency**', 'Code, documentation, and final product are always **in sync**', 'The docs say one thing, the code does another, the build does a third'],
      ],
    },
    { kind: 'h2', text: 'Worked scenarios' },
    {
      kind: 'list',
      items: [
        `**Reproducibility:** A regression appears in production. The team needs to recreate the exact build that ran last week to debug. SCM's reproducibility makes this a one-command operation.`,
        '**Traceability:** An auditor asks "why does this line of code exist?" SCM lets you answer: "this line was added by change request X, approved by Y on date Z, in support of requirement R."',
        `**Consistency:** The documentation describes feature F that doesn't actually work. SCM forces docs and code to move together — the inconsistency would have been blocked by the change-control gate.`,
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The exam framing',
      text: `When a question asks "what does SCM contribute to quality?" — name the three pillars. They're the most efficient summary.`,
    },
    { kind: 'related', deckId: 'scm' },
  ],
};
