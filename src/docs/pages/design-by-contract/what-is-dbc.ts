import type { DocPage } from '../../types';

export const whatIsDbc: DocPage = {
  id: 'what-is-dbc',
  eyebrow: 'Design by Contract',
  title: 'What is Design by Contract?',
  lede: 'A methodology that formally defines the rights and obligations of software components — replacing assumptions with explicit, enforceable agreements between Client and Server.',
  slide: 'Slide 38',
  lecture: 'Lesson 17',
  body: [
    {
      kind: 'definition',
      term: 'Design by Contract (DbC)',
      body: 'A methodology that **formally defines the rights and obligations of software components**. It creates a clear, enforceable agreement between caller (Client) and called code (Server) that prevents the kind of unspoken-assumption errors that DbC was created to fix.',
    },
    { kind: 'h2', text: 'The two parties' },
    {
      kind: 'table',
      cols: ['Party', 'Role', 'Owes'],
      rows: [
        ['**Client**', 'The caller — code that invokes a method', '**Pre-conditions** — must hold before the call'],
        ['**Server**', 'The callee — the method/class being called', '**Post-conditions** + **Invariants** — must hold after the call and throughout life'],
      ],
    },
    { kind: 'h2', text: `Clause 1 — Pre-conditions (Client's obligation)` },
    {
      kind: 'p',
      text: "A **pre-condition** is a condition the **Client** must guarantee to be true *before* calling a method. It's the Client's responsibility to meet these requirements.",
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'OnlineShoppingCart example',
      text: 'For `addItem(Item item, int quantity)`, a pre-condition might be: `require(quantity > 0);` — the Client must pass a positive number. **If the pre-condition is violated, the fault lies squarely with the Client.** The Server is not obligated to proceed.',
    },
    { kind: 'h2', text: `Clause 2 — Post-conditions (Server's promise)` },
    {
      kind: 'p',
      text: 'A **post-condition** is a condition the **Server** guarantees will be true *after* a successful call. This is the promise the method makes.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'OnlineShoppingCart example',
      text: 'For `addItem`: `ensure(itemCount == old.itemCount + quantity);` and `ensure(totalPrice > old.totalPrice);` — when the call returns, the cart must reflect the addition. **If the pre-conditions were met but the post-conditions fail, the bug is inside the Server method.**',
    },
    { kind: 'h2', text: 'Why this is testable' },
    {
      kind: 'p',
      text: 'Pre-conditions, post-conditions, and invariants are **executable assertions**. They catch contract violations the moment they occur, making bugs easier to localize and giving you a precise definition of "correct."',
    },
    { kind: 'related', deckId: 'dbc' },
  ],
};
