import type { DocPage } from '../../types';

export const threePillars: DocPage = {
  id: 'three-pillars',
  eyebrow: 'SE Management',
  title: 'Your mandate: the three pillars of management',
  lede: 'People, Product, Process. To succeed in your mission, you must master all three. Drop any one and the team eventually breaks.',
  slide: 'Slide 107',
  lecture: 'Lesson 24',
  body: [
    { kind: 'h2', text: 'The three pillars' },
    {
      kind: 'table',
      cols: ['Pillar', 'Mandate', 'What it means in practice'],
      rows: [
        ['**People**', 'Lead and grow a team of talented engineers.', 'Hiring, mentoring, performance management, career development, conflict resolution.'],
        ['**Product**', 'Own the technical vision and successful delivery of the feature.', 'Owning the design, defending technical decisions to leadership, ensuring delivery quality.'],
        ['**Process**', 'Create a smooth and efficient system for getting work done.', 'Sprints, planning meetings, retros, on-call rotations, code-review processes.'],
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Memorize the three pillars',
      text: '**People · Product · Process** — three Ps. The exam will probe each individually and as "select all that apply."',
    },
    { kind: 'h2', text: 'Glanceable Directions worked example' },
    {
      kind: 'list',
      items: [
        '**People:** mentor the junior engineer who built the location data API; pair them with a senior on the route-preview component.',
        '**Product:** decide whether to ship Glanceable Directions on iOS first or in lockstep with Android; defend the choice to leadership.',
        '**Process:** establish a release cadence and a rollback plan; run weekly progress reviews with the team.',
      ],
    },
    {
      kind: 'h2', text: `The Manager's role in a crisis`,
    },
    {
      kind: 'p',
      text: "Your problem-solving extends beyond the code. A manager must navigate **organizational challenges**: if Glanceable Directions exceeds the budget, the manager explains to upper management how the design benefits the organization and justifies the investment. **You are the primary advocate and defender of your team's work.**",
    },
    { kind: 'related', deckId: 'management' },
  ],
};
