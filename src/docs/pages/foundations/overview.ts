import type { DocPage } from '../../types';

export const foundationsOverview: DocPage = {
  id: 'foundations-overview',
  eyebrow: 'SE Foundations',
  title: 'The framing: programming integrated over time',
  lede: 'Software engineering is not just coding — it is the discipline of keeping code valuable across its entire life cycle. This single framing colors every other topic on the final.',
  body: [
    {
      kind: 'p',
      text: "The course's defining sentence — *software engineering is **programming integrated over time*** — reframes what students think the job is. **Programming** produces code. **Software engineering** keeps that code reactive to change for years.",
    },
    {
      kind: 'definition',
      term: 'Software engineering',
      body: 'The set of practices that keep code **sustainable** — able to react to necessary change throughout its life cycle, from conception, to introduction, to maintenance, to deprecation.',
    },
    { kind: 'h2', text: "Why the framing matters" },
    {
      kind: 'list',
      items: [
        '**Testing** is not optional QA bolted on at the end — it is the way you keep the code changeable.',
        '**Design by contract**, **maintainability**, **configuration management**, and **quality** all have the same goal: tame change.',
        '**Management** turns from "ship the feature" into "build the team that keeps shipping features for ten years."',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Exam framing',
      text: "Whenever a question asks 'why bother with X?' (X = testing, contracts, baselines, refactoring), the highest-quality answer ties back to **sustainability over time**. That's the through-line.",
    },
    { kind: 'related', deckId: 'foundations' },
  ],
};
