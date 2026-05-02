import type { DocPage } from '../../types';

export const planning: DocPage = {
  id: 'planning',
  eyebrow: 'Software Maintenance',
  title: 'Planning at every level',
  lede: 'Effective maintenance is proactive, not reactive. Plan across four horizons: a single change request, a release, a transition, and the long-term business.',
  slide: 'Slide 79',
  lecture: 'Lesson 19',
  body: [
    {
      kind: 'p',
      text: "**Effective maintenance is proactive, not reactive.** Your role requires constant planning across multiple horizons, from individual tasks to long-term business alignment. The maintenance phase can last for many years — far longer than the initial development.",
    },
    { kind: 'h2', text: 'The four planning levels' },
    {
      kind: 'table',
      cols: ['Level', 'Horizon', 'What you plan'],
      rows: [
        ['**Request**', 'Per-change', "Planning the execution of a **single change request**. Where impact analysis happens."],
        ['**Release / Version**', 'Per-release', '**Bundling multiple requests** into a release: agreeing on content with users, assessing risk, creating back-out plans.'],
        ['**Transition**', 'Per-handoff', 'Planning the **handover of new code** from development to your maintenance team.'],
        ['**Business**', 'Long-term', "Aligning your team's **budget, resources, and priorities** with the broader organization's goals."],
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Memorize the four levels',
      text: 'Bottom-up: **Request → Release → Transition → Business**. The pyramid metaphor: the daily work (Request) builds up into longer-term plans (Business).',
    },
    { kind: 'h2', text: 'The Playbook, Phase 1: Intake & Analysis' },
    {
      kind: 'p',
      text: "Every change request goes through a rigorous five-step intake: **Identification of Need → Submission → Requirements Analysis → Approval → Task Scheduled**. Your first responsibility as a maintainer is to understand the *why* and the *what* before your team touches the code.",
    },
    { kind: 'h2', text: 'The retirement plan' },
    {
      kind: 'p',
      text: "Like migration, retiring software requires a documented plan covering all impacts. The plan for retiring the **New Quizzes** feature must include:",
    },
    {
      kind: 'list',
      items: [
        '**Retirement Requirements** — what conditions must be met for retirement to begin?',
        '**Replacement Strategy** — what, if anything, is replacing this functionality?',
        '**Schedule** — a clear timeline for the sunsetting process.',
        '**Effort** — what resources (people, time) are required?',
        '**Data Accessibility** — how will archived data be accessed if needed for compliance or historical research?',
      ],
    },
    { kind: 'related', deckId: 'maintenance' },
  ],
};
