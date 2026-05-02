import type { DocPage } from '../../types';

export const tdd: DocPage = {
  id: 'tdd',
  eyebrow: 'Software Testing',
  title: 'Test-Driven Development (TDD): thinking before building',
  lede: "TDD inverts the usual workflow. You write the test first — and it must fail. Then you write just enough code to make it pass. Then you refactor.",
  slide: 'Slide 17',
  lecture: 'Lesson 15',
  body: [
    { kind: 'h2', text: 'The rhythm: Red → Green → Refactor' },
    {
      kind: 'steps',
      items: [
        { n: 1, title: 'RED — write a failing test', text: 'For each new feature, write a test that captures the desired behavior. **The test must fail at first.** A passing test on day one is meaningless: it proves nothing about your new code.' },
        { n: 2, title: 'GREEN — make it pass', text: "Write the **absolute minimum** production code required to make the failing test pass. The goal isn't elegance yet — it's just to get into a green state." },
        { n: 3, title: 'REFACTOR — clean it up', text: 'With the safety of a passing test, now improve the design — remove duplication, improve clarity, enhance performance. The test stays green throughout, proving you did not change behavior.' },
      ],
    },
    { kind: 'h2', text: 'Why a failing test first?' },
    {
      kind: 'p',
      text: "Starting with a failing test proves the test is actually exercising the new behavior. If the test passed *before* you wrote any code, it would be measuring nothing. The Red step is a self-check on your test, not just on your code.",
    },
    { kind: 'h2', text: 'Three advantages of TDD' },
    {
      kind: 'list',
      items: [
        '**Detects defects sooner.** TDD usually catches defects earlier and corrects them more easily than traditional programming. When the test fails immediately, the suspect surface is tiny.',
        '**Forces critical thinking upfront.** Writing test cases first forces you to think through requirements and design problems at the cheapest possible time to fix them.',
        '**Creates a safety net.** The comprehensive test suite acts as a regression net, allowing developers to confidently add features or refactor without breaking the system.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: "Other names you'll see for TDD",
      text: 'TDD is also called **Test-First Programming**. The two phrases are interchangeable on the exam.',
    },
    { kind: 'h2', text: 'Where TDD slots into the workflow' },
    {
      kind: 'p',
      text: "TDD is step 2 of the **developer's journey** (Requirement Analysis → TDD → Design for Testability → Systematic Testing → Confident Release). TDD only works if your design is also testable — see *Designing for Testability*.",
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
