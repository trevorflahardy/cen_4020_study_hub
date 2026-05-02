import type { DocPage } from '../../types';

export const sqmProcesses: DocPage = {
  id: 'sqm-processes',
  eyebrow: 'Software Quality',
  title: 'Software Quality Management Processes (SQM)',
  lede: 'SQM is the umbrella for all quality processes. It comprises four sub-areas: Planning (SQP), Assurance (SQA), Control (SQC), and Process Improvement (SPI).',
  slide: 'Slide 90',
  lecture: 'Lesson 22',
  body: [
    {
      kind: 'definition',
      term: 'Software Quality Management (SQM)',
      body: 'The **collection of all processes that ensure that software products, services, and life cycle process implementations meet organizational software quality objectives** and achieve stakeholder satisfaction.',
    },
    { kind: 'h2', text: 'What SQM defines / controls' },
    {
      kind: 'p',
      text: 'SQM defines **processes, process owners, requirements for the processes, measurements of the processes and their outputs, and feedback channels** throughout the whole software life cycle.',
    },
    { kind: 'h2', text: 'The four sub-areas of SQM' },
    {
      kind: 'table',
      cols: ['Sub-area', 'Focus', 'What it produces'],
      rows: [
        ['**SQP** (Software Quality Planning)', 'Up-front decisions', 'Quality goals, applicable standards, effort + schedule estimates for quality activities'],
        ['**SQA** (Software Quality Assurance)', 'Process-oriented', 'Confidence that the **right processes** are being followed correctly'],
        ['**SQC** (Software Quality Control)', 'Product-oriented', 'Verification that the **product** meets requirements (testing, inspections)'],
        ['**SPI** (Software Process Improvement)', 'Continuous', 'Improvements to the processes themselves over time'],
      ],
    },
    { kind: 'h2', text: 'SQA vs SQC — the most-tested distinction' },
    {
      kind: 'list',
      items: [
        '**SQA** is **process-oriented** — "are we following the right processes?"',
        '**SQC** is **product-oriented** — "does the actual product meet requirements?"',
        '**SQA** prevents bugs by ensuring the process catches them; **SQC** finds bugs by inspecting the product.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Memorize the four-letter acronym set',
      text: `**SQM** is the umbrella; **SQP / SQA / SQC / SPI** are the four sub-areas. The exam loves "select all that apply" questions on this list. Note: **SCM** (Configuration Management) is *not* part of SQM — it's its own discipline.`,
    },
    { kind: 'h2', text: 'What SQP includes' },
    {
      kind: 'p',
      text: "SQP includes determining **which quality standards** should be applied, defining **specific quality goals**, and **estimating the effort and schedule** of software quality activities. Without SQP, you have no defined target to assure or control against.",
    },
    { kind: 'related', deckId: 'quality' },
  ],
};
