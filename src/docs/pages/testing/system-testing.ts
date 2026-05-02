import type { DocPage } from '../../types';

export const systemTesting: DocPage = {
  id: 'system-testing',
  eyebrow: 'Software Testing',
  title: "System testing: the user's perspective",
  lede: 'System testing evaluates the complete, fully integrated software system — with all its databases, front-ends, and services running together — from the outside in.',
  slide: 'Slide 58',
  lecture: 'Lesson 16',
  body: [
    {
      kind: 'definition',
      term: 'System testing',
      body: "Testing of the **complete, fully integrated software system**. Done from the **user's perspective** as a black-box test — we evaluate the IQon Elite in its entirety, with all its databases, front-end apps, and other components running together.",
    },
    { kind: 'h2', text: 'The black-box approach' },
    {
      kind: 'list',
      items: [
        'We do **not** care **how** the system works on the inside.',
        'We do **not** care **what language** it is written in or what database it uses.',
        '**Only** that, given input X, the system produces the correct output Y.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The architect-vs-homebuyer analogy',
      text: `We are not the **architect** checking the blueprints — we are the **homebuyer** checking that the lights turn on and the water runs. System testing speaks the user's language.`,
    },
    { kind: 'h2', text: 'Why system tests are valuable' },
    {
      kind: 'p',
      text: "Unit and integration tests prove that components are individually correct and connected. System tests prove the **whole product works as a single thing** — that all the wires are plugged in, all the credentials are right, all the timezone bugs are squashed. Most production failures are integration / configuration failures, not code logic failures.",
    },
    { kind: 'h2', text: 'Why they are also painful' },
    {
      kind: 'list',
      items: [
        "**Slow** — running the full system end-to-end isn't fast.",
        '**Expensive** — they require realistic environments and data.',
        '**Brittle** — many moving parts means many ways to break.',
        `**Few of them** — that's why they sit at the top of the pyramid.`,
      ],
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
