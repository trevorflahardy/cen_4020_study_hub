import type { DocPage } from '../../types';

export const whatIsSoftwareEngineering: DocPage = {
  id: 'what-is-software-engineering',
  eyebrow: 'SE Foundations',
  title: 'What is software engineering?',
  lede: "Three guiding questions distill it: how do we keep code valuable, how do we make it react to change, and how do we make the discipline itself more rigorous?",
  slide: 'Slide 7',
  lecture: 'Lessons 13–14',
  body: [
    { kind: 'h2', text: 'The course definition' },
    {
      kind: 'definition',
      term: 'Software engineering',
      body: 'Software engineering encompasses **not just the act of writing code**, but **all of the tools and processes an organization uses to build and maintain that code over time**.',
    },
    {
      kind: 'p',
      text: "Programming is *static* — produce the program. Software engineering is *dynamic* — keep the program valuable while requirements, dependencies, teams, and stakeholders all churn around it. The shorthand: **programming integrated over time**.",
    },
    { kind: 'h2', text: 'The three guiding questions' },
    {
      kind: 'steps',
      items: [
        { n: 1, title: 'Long-term value', text: "What practices can a software organization introduce that will best keep its code valuable over the long term?" },
        { n: 2, title: 'Sustainability', text: 'How can engineers make a codebase **more sustainable** — and the discipline itself **more rigorous**?' },
        { n: 3, title: 'Change-readiness', text: "What practices keep code able to **react to necessary change** — over its life cycle from conception, to introduction, to maintenance, to deprecation?" },
      ],
    },
    { kind: 'h2', text: 'Programming vs. software engineering' },
    {
      kind: 'table',
      cols: ['Programming', 'Software engineering'],
      rows: [
        ['Produces code', 'Produces a long-lived asset'],
        ['Optimizes for "it works now"', 'Optimizes for "it will still work in 3 years"'],
        ['Variable names, syntax, algorithms', 'Tools, processes, contracts, baselines, organization'],
        ['One-shot activity', 'Continuous activity across a life cycle'],
      ],
    },
    { kind: 'h2', text: "What's on the final from this topic" },
    {
      kind: 'list',
      items: [
        'The exact definition of software engineering (memorize the wording).',
        'The phrase **"programming integrated over time."**',
        'The four life-cycle phases: **conception → introduction → maintenance → deprecation**.',
        'The six topic areas the final covers: **Software Construction, Testing, Maintenance, SCM, SE Management, Quality**.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Memorize the four life-cycle phases',
      text: "Conception → Introduction → Maintenance → Deprecation. Used as set-dressing in the definition, but appears verbatim in MCQs.",
    },
    { kind: 'related', deckId: 'foundations' },
  ],
};
