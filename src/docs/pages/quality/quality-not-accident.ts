import type { DocPage } from '../../types';

export const qualityNotAccident: DocPage = {
  id: 'quality-not-accident',
  eyebrow: 'Software Quality',
  title: 'Your first principle: quality is not an accident',
  lede: `Software quality isn't a vague goal. It's a set of measurable attributes defined by your stakeholders, agreed up front, and measured against.`,
  slide: 'Slide 85',
  lecture: 'Lesson 22',
  body: [
    {
      kind: 'p',
      text: "To succeed with **SellAgain**, you must understand that software quality **isn't a vague goal — it's a set of measurable attributes defined by your stakeholders**. The Artist, the Fan, the Venue Owner each have different views of what constitutes quality.",
    },
    {
      kind: 'definition',
      term: 'The Core Concept',
      body: '**Software requirements define the required quality attributes** of the software. Quality means **conformance to requirements**, not subjective "goodness."',
    },
    { kind: 'h2', text: 'How to succeed at quality' },
    {
      kind: 'p',
      text: "This means reaching a **formal agreement** on what constitutes 'quality' for **all** of SellAgain's stakeholders (artists, fans, venue owners) and **communicating that agreement clearly** to the engineering team. **Your success will be measured against these defined quality levels.**",
    },
    { kind: 'h2', text: 'Conformance to requirements' },
    {
      kind: 'p',
      text: "The exam-relevant phrasing: SellAgain software quality will be achieved by **conformance to all requirements regardless of what characteristic are specified or how requirements are grouped or named**. If something isn't in the requirements, it isn't a quality attribute. If it is, it must be conformed to.",
    },
    { kind: 'h2', text: 'Different stakeholders, different "quality"' },
    {
      kind: 'list',
      items: [
        'For the **Artist**, quality may mean **control** — strict rules on resale price and audience.',
        'For the **Fan**, quality may mean **affordability and availability** — fast resale, low markup.',
        'For the **Venue**, quality may mean **predictability** — stable revenue, no fraud.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: `Don't pick a stakeholder's view as "the" quality`,
      text: `The exam-correct framing is that quality is **the conformance to all stated requirements**. Stakeholders disagree about which attributes matter most; the engineer's job is to communicate, capture, and conform to the agreed set.`,
    },
    { kind: 'related', deckId: 'quality' },
  ],
};
