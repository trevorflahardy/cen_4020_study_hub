import type { DocPage } from '../../types';

export const qualityOverview: DocPage = {
  id: 'quality-overview',
  eyebrow: 'Software Quality',
  title: 'Quality is conformance to requirements',
  lede: "The course's framing flips the intuitive view: quality isn't a vague feel-good — it's a measurable set of attributes defined by stakeholders, achieved by deliberate process and investment.",
  body: [
    {
      kind: 'p',
      text: `Working on the **SellAgain** ticket-resale platform, you'll see the quality stack in microcosm: the Artist sets rules (max resale price, fan-club only); the Seller proposes a transfer; the Buyer accepts or rejects; and the system either ensures a valid sale or rejects it. Every decision in that flow is a quality decision.`,
    },
    { kind: 'h2', text: 'The seven topics on the final' },
    {
      kind: 'list',
      items: [
        '**Quality is not an accident** — quality is a measurable set of attributes defined by stakeholders.',
        '**Software quality** — the formal definition.',
        '**The Cost of Software Quality (CoSQ)** — quality level inferred from spending.',
        '**Software Quality Management Processes** — SQM, SQP, SQA, SQC, SPI.',
        '**The Iron Triangle** — Cost / Quality / Schedule trade-offs.',
        '**The Four Levers of Quality Investment** — Prevention, Appraisal, Internal Failure, External Failure.',
        '**Verification vs Validation** — building it right vs building the right thing.',
      ],
    },
    { kind: 'related', deckId: 'quality' },
  ],
};
