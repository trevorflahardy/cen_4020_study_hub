import type { DocPage } from '../../types';

export const softwareQuality: DocPage = {
  id: 'software-quality',
  eyebrow: 'Software Quality',
  title: 'Software quality (the formal definition)',
  lede: '"The capability of a software product to satisfy stated and implied needs under specified conditions." Memorize the wording — it shows up verbatim.',
  slide: 'Slide 86',
  lecture: 'Lesson 22',
  body: [
    {
      kind: 'definition',
      term: 'Software quality',
      body: 'The **capability of a software product to satisfy stated and implied needs under specified conditions**.',
    },
    { kind: 'h2', text: 'Each phrase, decoded' },
    {
      kind: 'glossary',
      items: [
        { term: 'Capability', def: `Software quality is a *property* the product is **capable of providing** — it isn't just a one-time pass.` },
        { term: 'Stated and implied needs', def: `Both **explicit requirements** and **reasonable expectations** count. A user who never asked the system "don't corrupt my data" still has that as an implied need.` },
        { term: 'Specified conditions', def: "Quality is conditional on the deployment context: stated platforms, stated load, stated user base. A system that's high-quality on small inputs may not be on huge ones." },
      ],
    },
    { kind: 'h2', text: 'The "fitness for use" framing' },
    {
      kind: 'p',
      text: "For all engineered products, the primary goal is **delivering maximum stakeholder value while balancing the constraints of development cost and schedule**. This is sometimes characterized as **'fitness for use'**.",
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The four sub-areas of "What goes into Software Quality"',
      text: 'The lecture splits it into four buckets: **Fundamentals**, **Management Process**, **Practical Considerations**, and **Tools**. The other six topics in this section all live inside one of those buckets.',
    },
    { kind: 'h2', text: "What's on the exam from this slide" },
    {
      kind: 'list',
      items: [
        'The exact definition (capability + stated/implied needs + specified conditions).',
        'The phrase "fitness for use" and that it means balancing **value** against **cost & schedule**.',
        'The four sub-areas of software quality.',
      ],
    },
    { kind: 'related', deckId: 'quality' },
  ],
};
