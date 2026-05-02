import type { DocPage } from '../../types';

export const estimation: DocPage = {
  id: 'estimation',
  eyebrow: 'Software Maintenance',
  title: 'Two approaches to estimation',
  lede: `How long will this maintenance change take? You either reach for math (parametric models) or for people (expert judgment). The course's answer: combine both.`,
  slide: 'Slide 75',
  lecture: 'Lesson 19',
  body: [
    { kind: 'h2', text: 'The two approaches' },
    {
      kind: 'table',
      cols: ['Approach', 'Method', 'Inputs needed', 'Watch out for'],
      rows: [
        ['**Parametric Models**', 'Mathematical model that predicts cost', 'Historical data + cost-driver attributes (complexity, team size)', 'Garbage-in / garbage-out — bad history yields bad estimates'],
        ['**Expert Judgment**', "Senior engineers/managers estimate effort directly", "Experienced people who've done similar work", 'Subjectivity, bias, optimism'],
      ],
    },
    { kind: 'h2', text: 'Parametric Models — the math approach' },
    {
      kind: 'p',
      text: 'A parametric model uses **mathematical models to predict cost**. It requires **historical data from past maintenance projects** to use and calibrate the models. **Cost driver attributes** — like complexity and team size — affect the final estimate.',
    },
    { kind: 'h2', text: 'Expert Judgment — the people approach' },
    {
      kind: 'p',
      text: 'Expert judgment **relies on the experience of senior engineers and managers**. Experts estimate the effort (people, time), which is then used to derive cost.',
    },
    { kind: 'h2', text: 'The combined approach' },
    {
      kind: 'callout',
      tone: 'tip',
      title: `The course's answer`,
      text: `The best approach is often to **combine historical data with experience**. Neither alone is as reliable as both together. Parametric models give you a baseline; expert judgment adjusts for novel context the model doesn't know about.`,
    },
    { kind: 'h2', text: 'When you ask for an extension — the 3-step plan' },
    {
      kind: 'p',
      text: 'When you ask for a deadline extension, additional funds, or more staff, the request must be built on a solid foundation:',
    },
    {
      kind: 'steps',
      items: [
        { n: 1, title: 'Explain the Reasons', text: 'Present the data. Show the updated estimates from your team. Clearly articulate the **why** behind the need.' },
        { n: 2, title: 'Document the Change', text: 'Formalize the request. Update the project plan, the budget, and the timeline. Make the new reality official.' },
        { n: 3, title: 'Maintain the Quality', text: 'Frame the request as a way to **guarantee a high-quality outcome**. Assure stakeholders you are protecting the product, not cutting corners.' },
      ],
    },
    { kind: 'related', deckId: 'maintenance' },
  ],
};
