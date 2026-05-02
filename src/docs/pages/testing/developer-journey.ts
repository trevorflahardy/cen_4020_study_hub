import type { DocPage } from '../../types';

export const developerJourney: DocPage = {
  id: 'developer-journey',
  eyebrow: 'Software Testing',
  title: "A developer's journey from requirement to reliable code",
  lede: 'The five-step workflow that ties every testing topic on the final together: requirement → TDD → design → systematic testing → confident release.',
  slide: 'Slide 49',
  lecture: 'Lesson 18',
  body: [
    {
      kind: 'steps',
      items: [
        { n: 1, title: 'Requirement Analysis', text: 'Understand the feature request from the customer (e.g. a new feature on the IQon Elite). Get the spec right *before* writing tests.' },
        { n: 2, title: 'Test-Driven Development', text: 'Write small tests for each unit **before** the production code. This gives rapid feedback and improves the design.' },
        { n: 3, title: 'Design for Testability', text: 'Build units that are easy to isolate and test from the start. Quality is built in, not bolted on.' },
        { n: 4, title: 'Systematic Testing', text: 'Once the feature is built, apply rigorous testing — boundary tests, structural tests, branch coverage — at the unit, integration, and system levels.' },
        { n: 5, title: 'Confident Release', text: 'After comprehensive testing across all levels, release the feature to the customer. Confidence is now justified, not hoped for.' },
      ],
    },
    { kind: 'h2', text: 'Why the order matters' },
    {
      kind: 'p',
      text: `You can't do step 4 if you skipped step 3 (untestable code). You can't do step 3 well if you skipped step 2 (no tests pulling on your design). You can't do step 2 if step 1 was wrong (you tested the wrong thing). The journey is sequential because each step **depends on the discipline of the previous one**.`,
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'How this maps to the test pyramid',
      text: 'Step 4 — Systematic Testing — is where the **pyramid** materializes. You apply unit, integration, and system tests in proportion. The other steps build the conditions where the pyramid can exist.',
    },
    { kind: 'h2', text: 'The summary slogan' },
    {
      kind: 'quote',
      text: 'This process creates individual software units and an automated test suite, ensuring quality is built in, not bolted on.',
      cite: 'Lesson 18',
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
