import type { DocPage } from '../../types';

export const testingOverview: DocPage = {
  id: 'testing-overview',
  eyebrow: 'Software Testing',
  title: 'Testing: the dynamic safety net',
  lede: 'Testing is the largest topic on the final by card count. The exam treats it less as a checklist of tools and more as a *mindset*: code that is hard to test should not exist.',
  body: [
    {
      kind: 'p',
      text: "The course's framing is that testing is **not** a separate phase that happens after coding — it is the discipline that makes code changeable. TDD makes you write tests first; the test pyramid distributes them; designing for testability makes them easy to write at all.",
    },
    { kind: 'h2', text: 'The testing topics on the final' },
    {
      kind: 'list',
      items: [
        '**Definition of testing** — dynamic verification on a finite set of inputs.',
        '**TDD** — Red → Green → Refactor; write tests *before* code.',
        '**The Pyramid of Confidence** — Unit / Integration / System / Acceptance.',
        '**Unit testing** — single function or class in isolation.',
        '**Black-box vs white-box** — testing the spec vs testing the code structure.',
        '**Designing for testability** — testability is a continuous design principle.',
        `**System testing** — black-box, end-to-end, from the user's perspective.`,
        '**The Testing Pyramid: balanced strategy** — many fast cheap tests, few slow expensive ones.',
        '**The developer journey from requirement to reliable code** — the workflow that ties it all together.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'IQon Elite is the running example',
      text: 'The lectures repeatedly use IQon Elite — a CT-scanner — for testing examples. `calculateTissueDensity()`, `savePatientRecord()`, `renderScanSlice()` are the canonical functions. If you see one of these on the exam, the question is testable in isolation.',
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
