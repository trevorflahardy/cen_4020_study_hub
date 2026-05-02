import type { DocPage } from '../../types';

export const whatIsScm: DocPage = {
  id: 'what-is-scm',
  eyebrow: 'Software Configuration Mgmt',
  title: 'What is Software Configuration Management?',
  lede: `A discipline that identifies the configuration of a system at distinct points in time, in order to systematically control changes and maintain integrity and traceability across the system's life cycle.`,
  slide: 'Slide 96',
  lecture: 'Lesson 23',
  body: [
    {
      kind: 'definition',
      term: 'Software Configuration Management (SCM)',
      body: "The **discipline of identifying the configuration of a system at distinct points in time** in order to **systematically control changes to the configuration** and **maintain the integrity and traceability of the configuration** throughout the system life cycle.",
    },
    { kind: 'h2', text: 'In plain English' },
    {
      kind: 'p',
      text: 'SCM is the **rulebook** for:',
    },
    {
      kind: 'list',
      items: [
        '**Knowing** exactly what comprises your software.',
        '**Controlling** how, when, and why it changes.',
        '**Keeping** a complete history of every change ever made.',
      ],
    },
    { kind: 'h2', text: 'The six sub-areas of SCM' },
    {
      kind: 'list',
      items: [
        'Management of the SCM process',
        'Identification',
        'Control',
        'Status Accounting',
        'Auditing',
        'Software Release Management and Delivery',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The compressed summary slogan',
      text: 'In software engineering, software configuration management is the **task of tracking and controlling changes in the software**.',
    },
    { kind: 'h2', text: 'Why this matters for an SE team' },
    {
      kind: 'p',
      text: "Without SCM you can't reproduce releases, can't investigate regressions, can't roll back, can't audit for compliance, can't branch development without losing track of what came from where. Every modern team relies on SCM tools (git, Jenkins, etc.); the *discipline* SCM names is the reason those tools exist.",
    },
    { kind: 'related', deckId: 'scm' },
  ],
};
