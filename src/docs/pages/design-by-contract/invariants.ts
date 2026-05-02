import type { DocPage } from '../../types';

export const invariants: DocPage = {
  id: 'invariants',
  eyebrow: 'Design by Contract',
  title: 'Clause 3: The Universal Rules (Invariants)',
  lede: 'An invariant is a condition that must hold true for an object throughout its entire lifetime — before *and* after every public method call. The Server is responsible for maintaining its own invariants.',
  slide: 'Slide 41',
  lecture: 'Lesson 17',
  body: [
    {
      kind: 'definition',
      term: 'Invariant',
      body: "A condition that must hold true for an **object throughout its entire lifetime**. It must be true **before and after every public method is called**. The Server is responsible for maintaining its own invariants.",
    },
    { kind: 'h2', text: 'OnlineShoppingCart example' },
    {
      kind: 'p',
      text: "For an `OnlineShoppingCart`, two natural invariants are:",
    },
    {
      kind: 'list',
      items: [
        '`invariant(totalPrice >= 0);`',
        '`invariant(itemCount >= 0);`',
      ],
    },
    {
      kind: 'p',
      text: "**Invariants define what it means for the object to be in a 'sane' or 'valid' state at all times.** A negative price isn't just an error — it means the cart is no longer a valid cart.",
    },
    { kind: 'h2', text: 'When are invariants checked?' },
    {
      kind: 'list',
      items: [
        '**Before** every public method call (the object must enter the call valid).',
        '**After** every public method call (the object must exit the call valid).',
        `They may **temporarily** be violated *during* a private method, as long as they're restored before the public call returns.`,
      ],
    },
    { kind: 'h2', text: 'Who is at fault when an invariant is violated?' },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Always the Server',
      text: 'The Server is responsible for maintaining its own invariants. If you observe an object in a state that violates the invariant, **the bug is in the class itself** — some method exposed an internal inconsistency.',
    },
    { kind: 'h2', text: 'Putting the three clauses together' },
    {
      kind: 'table',
      cols: ['Failure mode', 'Pre-condition', 'Post-condition', 'Invariant', 'At fault'],
      rows: [
        ['Bad input passed in', '✗ Violated', '—', '—', '**Client**'],
        ['Wrong result returned', '✓', '✗ Violated', '—', '**Server**'],
        ['Object left invalid', '✓', '✓', '✗ Violated', '**Server**'],
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Exam scenario format',
      text: 'A common exam pattern: "method X has pre-condition Y, post-condition Z. Caller does A. Result is B. Who is at fault?" — walk through the table above to answer.',
    },
    { kind: 'related', deckId: 'dbc' },
  ],
};
