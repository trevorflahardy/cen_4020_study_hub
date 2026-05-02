import type { DocPage } from '../../types';

export const oneOnOnes: DocPage = {
  id: 'one-on-ones',
  eyebrow: 'SE Management',
  title: 'The most important meeting you will hold: the one-on-one',
  lede: 'Group meetings are for feedback. 1-on-1s are for connection and growth — your single most valuable tool as a manager.',
  slide: 'Slide 113',
  lecture: 'Lesson 26',
  body: [
    {
      kind: 'p',
      text: '**Group meetings are for feedback, but 1-on-1s are for connection and growth.** They are your **single most valuable tool** as a manager.',
    },
    { kind: 'h2', text: 'The cadence' },
    {
      kind: 'table',
      cols: ['Cadence', 'Purpose'],
      rows: [
        ['**Weekly**', 'Have a 1-on-1 with each member of your team. This is for **status updates, roadblocks, and general support**.'],
        ['**Monthly**', 'Dedicate at least **one** of these meetings each month to **staff career goals and ideas**. This is your investment in their **future**.'],
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Why 1-on-1s beat group settings for connection',
      text: `In a group, people perform. In a 1-on-1, people share. You learn what's actually blocking them, what they want long-term, and where they're considering leaving — none of which surfaces in stand-ups.`,
    },
    { kind: 'h2', text: 'Taming the Beast — your meeting playbook' },
    {
      kind: 'p',
      text: "More broadly, every meeting should pass three tests:",
    },
    {
      kind: 'steps',
      items: [
        { n: 1, title: 'Justify its existence', text: "Only organize a meeting if it's absolutely necessary and has a clear goal." },
        { n: 2, title: 'Curate the guest list', text: `Invite only the people who need to be there. Respect everyone else's time.` },
        { n: 3, title: 'Police the tangents', text: "As the manager, it's your job to **steer the conversation back on topic**, especially during technical debates. Ensure the time is used effectively." },
      ],
    },
    {
      kind: 'callout',
      tone: 'note',
      title: '"The most important meeting"',
      text: 'On the exam, "the most important meeting you will hold" → **the one-on-one**. Not the all-hands. Not the sprint planning. The one-on-one.',
    },
    { kind: 'related', deckId: 'management' },
  ],
};
