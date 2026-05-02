import type { DocPage } from '../../types';

export const fourFunctions: DocPage = {
  id: 'four-functions',
  eyebrow: 'Software Configuration Mgmt',
  title: 'The four core functions of SCM',
  lede: 'Identify, Control, Audit, Report. Memorize the order — they form a closed loop, and exam questions probe each one individually.',
  slide: 'Slide 98',
  lecture: 'Lesson 23',
  body: [
    { kind: 'h2', text: 'Identify, Control, Audit, Report' },
    {
      kind: 'table',
      cols: ['Function', 'Question it answers', 'What it does'],
      rows: [
        ['**Identify**', 'What are we controlling?', 'Catalog every piece of the project — code, documentation, design models, test data.'],
        ['**Control**', 'How do we prevent chaos?', 'Manage changes via a formal process for **proposing, evaluating, and approving** changes.'],
        ['**Audit**', 'Is what we built what we **planned** to build?', 'Verify the product is correct — confirm approved changes were actually implemented and the final product matches the documentation.'],
        ['**Report**', 'What changed, and when?', `Document the process — track the status of all changes and provide a clear history of the project's evolution.`],
      ],
    },
    { kind: 'h2', text: 'Going deeper: each function' },
    {
      kind: 'steps',
      items: [
        { n: 1, title: 'Identify', text: 'Catalog every piece of the project. Code, documentation, design models, test data — all become **identifiable units** with names and version numbers. *"What are we controlling?"*' },
        { n: 2, title: 'Control', text: 'Manage changes through a formal process for proposing, evaluating, and approving. No ad-hoc edits to controlled artifacts. *"How do we prevent chaos?"*' },
        { n: 3, title: 'Audit', text: 'Verify the product is correct: did the approved changes actually get implemented, and does the final product match the documentation? *"Is what we built what we *planned* to build?"*' },
        { n: 4, title: 'Report', text: "Track and publish the status of all changes. Give the team — and auditors — a clear history of the project's evolution. *\"What changed, and when?\"*" },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The exam will test the verbs',
      text: `**Identify, Control, Audit, Report** — memorize the four verbs and the question each answers. "Refactor" is sometimes thrown in as a distractor — it's a maintenance technique, not an SCM function.`,
    },
    { kind: 'related', deckId: 'scm' },
  ],
};
