import type { DocPage } from '../../types';

export const scis: DocPage = {
  id: 'scis',
  eyebrow: 'Software Configuration Mgmt',
  title: 'Software Configuration Items (SCIs)',
  lede: "We don't manage a giant monolith of \"Nexus code.\" We manage individual, trackable pieces. Each is a Software Configuration Item.",
  slide: 'Slide 101',
  lecture: 'Lesson 23',
  body: [
    {
      kind: 'definition',
      term: 'Software Configuration Item (SCI)',
      body: 'Any **software entity managed as a single unit** under SCM. Think of SCIs as the **official building blocks** of your product.',
    },
    { kind: 'h2', text: 'Why not manage the whole thing as one item?' },
    {
      kind: 'p',
      text: "A monolith is too big to track. Imagine the latest release of Nexus Pro: video editor, chat client, asset library, project plans, API gateway. As an engineer, you don't talk about \"v3.1 of the Chat Server.\" You manage individual, trackable pieces.",
    },
    { kind: 'h2', text: 'The balancing act' },
    {
      kind: 'table',
      cols: ['Choice', 'Result'],
      rows: [
        ['**Too few** SCIs', 'Not enough control — coarse units mean changes happen "inside" an item without tracking'],
        ['**Too many** SCIs', 'Manageability collapses — every tiny change requires its own change request'],
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Examples of typical SCIs',
      text: 'Source-code modules, design documents, test scripts, build files, requirements specifications, third-party libraries with specific versions, configuration files. **Anything you might want to roll back, audit, or hand off to a team is a candidate.**',
    },
    { kind: 'h2', text: 'What is *not* an SCI' },
    {
      kind: 'list',
      items: [
        "A loose comment in a chat thread.",
        `A whiteboard photo from yesterday's meeting.`,
        'A coffee order. (Tongue-in-cheek, but the exam loves the trick option.)',
      ],
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'The new problem: a jumble of parts',
      text: "Once you've identified 50 SCIs across the Nexus Standard, Pro, and Enterprise editions — at slightly different versions each — you have a new problem. Which versions go together to make \"Nexus Pro 3.1\"? That's what **baselines** solve.",
    },
    { kind: 'related', deckId: 'scm' },
  ],
};
