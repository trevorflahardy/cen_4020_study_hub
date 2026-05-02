import type { DocPage } from '../../types';

export const cosq: DocPage = {
  id: 'cosq',
  eyebrow: 'Software Quality',
  title: 'The Cost of Software Quality (CoSQ)',
  lede: 'You can infer how high quality your product is by looking at where you spend money. Investment in Prevention and Appraisal is cheap; Internal and External Failure are massive ongoing costs.',
  slide: 'Slide 89',
  lecture: 'Lesson 22',
  body: [
    {
      kind: 'definition',
      term: 'Cost of Software Quality (CoSQ)',
      body: "A framework that **infers product quality from the *economic cost* of activities related to preventing, finding, and fixing failures**. Tells you where money is being spent on quality (or the lack of it).",
    },
    { kind: 'h2', text: 'The premise' },
    {
      kind: 'p',
      text: 'The level of quality in a product can be **inferred from the economic cost of activities related to preventing, finding, and fixing failures**. SellAgain spends money in four buckets — and the *ratio* between them tells you the quality story.',
    },
    { kind: 'h2', text: 'Two columns: investment vs cost' },
    {
      kind: 'table',
      cols: ['Investment in Quality (smart upfront cost)', 'Cost of Poor Quality (massive ongoing cost)'],
      rows: [
        ['**Prevention** — prevent defects *before* they happen', '**Internal Failure** — fix defects found *before* delivery'],
        ['**Appraisal** — find defects *during* development', '**External Failure** — fix problems found *after* delivery'],
      ],
    },
    { kind: 'h2', text: 'The takeaway' },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Where to spend',
      text: '**Invest** in Prevention and Appraisal. Each dollar there saves many dollars in Internal and External Failure. The cost goes **up by an order of magnitude** at each step downstream — a bug fixed in design costs $1, in testing $10, in production $100.',
    },
    { kind: 'h2', text: "The four CoSQ categories — full details" },
    {
      kind: 'p',
      text: 'See *The Four Levers of Quality Investment* for the full breakdown of each category and what activities count where.',
    },
    { kind: 'related', deckId: 'quality' },
  ],
};
