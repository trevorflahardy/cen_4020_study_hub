import type { DocPage } from '../../types';

export const unitTesting: DocPage = {
  id: 'unit-testing',
  eyebrow: 'Software Testing',
  title: 'Level 1: Unit testing the building blocks',
  lede: 'A unit test focuses on a single, isolated component — one function, one method, or one class — verifying it does one thing correctly.',
  slide: 'Slide 25',
  lecture: 'Lesson 16',
  body: [
    {
      kind: 'definition',
      term: 'Unit test',
      body: "A test that focuses on a **single, isolated component** — one function, method, or class — to verify it does **one thing correctly**.",
    },
    { kind: 'h2', text: 'Why unit tests sit at the base of the pyramid' },
    {
      kind: 'list',
      items: [
        '**Fast** — a single unit test runs in milliseconds, so thousands can run in seconds. This makes them practical to run on every save.',
        '**Easy to control** — you can pass specific inputs and verify exact outputs. The unit is small, so the test setup is small.',
        `**Easy to write** — a focused unit doesn't require complex environments, stubs, or fixtures. Less boilerplate per test.`,
      ],
    },
    { kind: 'h2', text: 'IQon Elite worked examples' },
    {
      kind: 'p',
      text: 'The lecture grounds unit testing in the IQon Elite CT scanner. Three canonical questions a unit test would answer:',
    },
    {
      kind: 'list',
      items: [
        '**`calculateTissueDensity(input)`** — does it return the correct value for a given input?',
        '**`savePatientRecord(record)`** — does it write data to the database without corruption?',
        '**`renderScanSlice(data)`** — does it handle a missing data point without crashing?',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Isolation is the point',
      text: "Unit tests deliberately replace dependencies (DBs, network, file system) with stubs/mocks so you're testing **just** the unit. If your test fails, you know it's the unit — not some flaky external system.",
    },
    { kind: 'h2', text: 'What unit tests do not cover' },
    {
      kind: 'p',
      text: "Unit tests by definition don't cover **interactions between components** — that's integration testing. They also don't cover **end-to-end user flows** — that's system / acceptance. A green unit suite is necessary, not sufficient.",
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
