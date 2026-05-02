import type { DocPage } from '../../types';

export const dbcOverview: DocPage = {
  id: 'dbc-overview',
  eyebrow: 'Design by Contract',
  title: 'Replacing assumptions with formal contracts',
  lede: 'Most production bugs are unspoken assumptions. Design by Contract makes those assumptions explicit — Client owes pre-conditions, Server promises post-conditions, invariants always hold.',
  body: [
    {
      kind: 'p',
      text: `Imagine the IQon Elite's scan-acquisition module calls the image-pipeline module. The pipeline assumes the scan data is non-empty and well-formed. Acquisition assumes the pipeline can handle every input. Both assumptions are unwritten — and the moment one party gets it wrong, it crashes the other.`,
    },
    {
      kind: 'p',
      text: 'Design by Contract (DbC) replaces those assumptions with a **formal, enforceable agreement**. The Client (caller) owes pre-conditions; the Server (callee) promises post-conditions; invariants always hold. When something fails, you can localize the bug instantly because the contract tells you who was at fault.',
    },
    { kind: 'h2', text: 'The three clauses on the final' },
    {
      kind: 'list',
      items: [
        '**Pre-conditions** — what the **Client** must guarantee *before* calling.',
        '**Post-conditions** — what the **Server** promises *after* a successful call.',
        `**Invariants** — universal rules the **Server** maintains across the object's entire life.`,
      ],
    },
    { kind: 'related', deckId: 'dbc' },
  ],
};
