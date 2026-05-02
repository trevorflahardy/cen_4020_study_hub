import type { DocPage } from '../../types';

export const identification: DocPage = {
  id: 'identification',
  eyebrow: 'Software Configuration Mgmt',
  title: 'The first step to control is identification',
  lede: '"You cannot control what you cannot identify." Software configuration identification is the process of identifying items to be controlled and giving them unique identification schemes.',
  slide: 'Slide 100',
  lecture: 'Lesson 23',
  body: [
    {
      kind: 'quote',
      text: 'You cannot control what you cannot identify.',
      cite: 'Lesson 23',
    },
    {
      kind: 'definition',
      term: 'Software configuration identification',
      body: 'The **process of identifying items to be controlled** and **establishing unique identification schemes** for them and their versions.',
    },
    { kind: 'h2', text: 'The setup' },
    {
      kind: 'p',
      text: `To solve our bug problem, we **can't just dive into the code**. We first need a system. This discipline is called **Software Configuration Management (SCM)**. It starts with a simple, powerful idea: you cannot control what you cannot identify.`,
    },
    { kind: 'h2', text: 'In simple terms' },
    {
      kind: 'p',
      text: "We need to create a **definitive map** of all the pieces of our software. Once they're identified — given names, version numbers, owners — we can talk about them, track them, and control changes to them.",
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The order matters',
      text: '**Identification → Control → Audit → Report.** Identification comes first because nothing else is possible without it. The exam often probes this with a fill-in-the-blank: "You cannot _____ what you cannot identify."',
    },
    { kind: 'h2', text: "What gets identified" },
    {
      kind: 'list',
      items: [
        'Source-code modules and files',
        'Design documents and requirements specs',
        'Test scripts and test data',
        'Build files / configuration files',
        'Third-party libraries with specific versions',
        'Generated artifacts (binaries, images)',
      ],
    },
    { kind: 'related', deckId: 'scm' },
  ],
};
