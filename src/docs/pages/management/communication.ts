import type { DocPage } from '../../types';

export const communication: DocPage = {
  id: 'communication',
  eyebrow: 'SE Management',
  title: 'The three directions of communication',
  lede: 'Upward (to Leadership), Inward (to Your Team), Outward (to Customers / Partner Teams). Different audiences, different tones — but one job: keep everyone aligned.',
  slide: 'Slide 111',
  lecture: 'Lesson 26',
  body: [
    {
      kind: 'p',
      text: 'As a manager, you must **tailor your communication for different audiences** to build positive relationships and align everyone on common objectives.',
    },
    { kind: 'h2', text: 'The three directions' },
    {
      kind: 'table',
      cols: ['Direction', 'Audience', 'Focus on', 'Tone'],
      rows: [
        ['**Upward**', 'Leadership', 'Progress, risks, resource needs', '**Concise and strategic**'],
        ['**Inward**', 'Your team', 'Goals, feedback, removing blockers', '**Clear and supportive**'],
        ['**Outward**', 'Customers / Partner teams', 'What the feature does, how to use it', '**Simple and direct**'],
      ],
    },
    { kind: 'h2', text: `Don't forget to manage **up** and **out**` },
    {
      kind: 'p',
      text: "Your role as a **communication hub** is critical. You are the primary liaison between your team and the rest of the company. Two specific examples:",
    },
    {
      kind: 'list',
      items: [
        `**To Senior Management:** Submit clear, concise proposals and progress reports. Keep stakeholders informed of your team's successes and roadblocks.`,
        "**To Partner Teams** (e.g. SRE, UX, Marketing): Collaborate to ensure a smooth, integrated launch.",
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Memorize the audience-tone pairs',
      text: 'Upward = **strategic**, Inward = **supportive**, Outward = **simple**. The exam tests these adjective-pairs.',
    },
    { kind: 'h2', text: 'How to make the ask (3 steps)' },
    {
      kind: 'p',
      text: 'When you ask leadership for an extension, more funds, or more staff, build the request on a solid foundation:',
    },
    {
      kind: 'steps',
      items: [
        { n: 1, title: 'Explain the Reasons', text: 'Show the data. Updated estimates from your team. Articulate the **why**.' },
        { n: 2, title: 'Document the Change', text: "Formalize the request. Update the project plan, budget, timeline. Make the new reality official." },
        { n: 3, title: 'Maintain the Quality', text: 'Frame the request as a way to **guarantee a high-quality outcome**. Reassure stakeholders you are protecting the product, not cutting corners.' },
      ],
    },
    { kind: 'related', deckId: 'management' },
  ],
};
