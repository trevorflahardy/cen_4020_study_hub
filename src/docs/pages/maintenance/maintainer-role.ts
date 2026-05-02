import type { DocPage } from '../../types';

export const maintainerRole: DocPage = {
  id: 'maintainer-role',
  eyebrow: 'Software Maintenance',
  title: 'Your role is more than just code',
  lede: `A maintainer's job is to sustain the software product throughout its entire life cycle. That involves six distinct activities — only one of which is writing code.`,
  slide: 'Slide 65',
  lecture: 'Lesson 19',
  body: [
    { kind: 'h2', text: 'The six core activities' },
    {
      kind: 'steps',
      items: [
        { n: 1, title: 'Tracking Requests', text: 'Logging and tracking every modification request. The "ticket" is the entry point to all the rest.' },
        { n: 2, title: 'Impact Analysis', text: 'Determining the effect of proposed changes on the entire system. **Your key risk-management tool — identifying all system areas impacted before work begins.**' },
        { n: 3, title: 'Modification', text: 'Actually changing the code (and other software artifacts like documentation!). Code is just one of the artifacts you maintain.' },
        { n: 4, title: 'Testing', text: 'Rigorously testing changes before release. The same testing pyramid applies — unit, integration, system.' },
        { n: 5, title: 'Release Management', text: 'Releasing the new version of the product to users. Coordinating with stakeholders, scheduling, communicating.' },
        { n: 6, title: 'User Support', text: 'Providing training and daily support through the help desk. **Acting as the bridge between end-user support and your technical team.**' },
      ],
    },
    { kind: 'h2', text: 'The leadership toolkit (lecture-specific framing)' },
    {
      kind: 'p',
      text: 'Lesson 19 frames these activities as a **leadership toolkit** unique to maintenance. Beyond managing the standard procedures, a maintenance lead cultivates these specific skills:',
    },
    {
      kind: 'list',
      items: [
        `**Program Understanding** — Quickly gaining knowledge of how the New Quizzes software works, especially parts your team didn't write.`,
        '**Transition Management** — Overseeing the controlled transfer of new features from development to your maintenance team.',
        '**Modification Request Triage** — Deciding which requests your team can handle versus those that are too large and should be rerouted as new development projects.',
        '**Help Desk Coordination** — Acting as the bridge between end-user support and your technical team to assess, prioritize, and cost incoming requests.',
        '**Impact Analysis** — Your key risk-management tool. Identifying all system areas impacted by a proposed change *before* work begins.',
      ],
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'The maintenance lifecycle loop',
      text: "The activities form a loop: **Problem and Modification Analysis → Modification Implementation → Maintenance Review / Acceptance**. Process Implementation feeds in; **Retirement** and **Migration** are the two exit paths.",
    },
    { kind: 'related', deckId: 'maintenance' },
  ],
};
