import type { DocPage } from '../../types';

export const maintenanceOverview: DocPage = {
  id: 'maintenance-overview',
  eyebrow: 'Software Maintenance',
  title: 'Maintenance is most of the job',
  lede: "Over 80% of software-engineering effort is spent after a feature ships. The course's framing: maintenance isn't an afterthought, it's the ongoing stewardship of a live product.",
  body: [
    {
      kind: 'quote',
      text: 'Software is not a static artifact; it is a living system. Our users — students, instructors, and administrators — depend on it to work correctly.',
      cite: 'Lesson 19',
    },
    { kind: 'h2', text: 'The big idea' },
    {
      kind: 'p',
      text: "Your job as a software engineer **doesn't end at launch — that's when it truly begins.** You're not just fixing the past; you're actively building the future of the software. The lecture's `New Quizzes` case study is the recurring example here.",
    },
    { kind: 'h2', text: 'The eight maintenance topics' },
    {
      kind: 'list',
      items: [
        '**What is software maintenance?** — the totality of activities for cost-effective support.',
        `**The maintainer's role** — six core activities (Tracking, Impact Analysis, Modification, Testing, Release, User Support).`,
        '**Maintainability** — why some codebases are easy to change and others are not.',
        '**Estimation** — parametric models vs expert judgment.',
        '**Planning at every level** — Request / Release / Transition / Business.',
        '**Reengineering & Refactoring** — taming complexity over time.',
        '**Software archaeology** — reverse engineering the system.',
        `**The maintainer's reverse-engineering toolkit.**`,
      ],
    },
    { kind: 'related', deckId: 'maintenance' },
  ],
};
