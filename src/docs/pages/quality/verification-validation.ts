import type { DocPage } from '../../types';

export const verificationValidation: DocPage = {
  id: 'verification-validation',
  eyebrow: 'Software Quality',
  title: 'Verification vs Validation: building it right vs the right thing',
  lede: `Verification: are we building the product right (does it meet the spec)? Validation: are we building the right product (does it solve the user's problem)? Both matter; neither replaces the other.`,
  slide: 'Slide 94',
  lecture: 'Lesson 22',
  body: [
    {
      kind: 'definition',
      term: 'Verification',
      body: '**"Are we building the product right?"** An attempt to ensure that the **output products of an activity meet the specifications imposed on them in previous activities**. Does our code meet the design spec?',
    },
    {
      kind: 'definition',
      term: 'Validation',
      body: `**"Are we building the right product?"** An attempt to ensure that **the right product is built** — that is, the product fulfills its specific intended purpose. Does the feature actually solve the user's problem?`,
    },
    { kind: 'h2', text: 'Side by side' },
    {
      kind: 'table',
      cols: ['Aspect', 'Verification', 'Validation'],
      rows: [
        ['Question', '"Are we building it **right**?"', '"Are we building the **right** thing?"'],
        ['Tests against', 'The specification', `The user's real need`],
        ['Catches', 'Bugs in implementation vs spec', 'Bugs in *the spec itself*'],
        ['Typical activities', 'Code review, unit tests, type checks, structural tests', 'Acceptance tests, user studies, demos with stakeholders'],
      ],
    },
    { kind: 'h2', text: 'IQon Elite worked example' },
    {
      kind: 'list',
      items: [
        '**Verification:** "Does our code meet the design spec for the filter algorithm?"',
        `**Validation:** "Does this filter actually solve the radiologist's problem the way they need?"`,
      ],
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Verification alone is dangerous',
      text: 'You can have 100% verification (every line meets spec) and still ship a product nobody wants. Validation is what catches the case where the **spec itself is wrong**.',
    },
    { kind: 'h2', text: 'Why both matter' },
    {
      kind: 'p',
      text: 'V&V processes determine whether development products **conform to requirements** (verification) and **satisfy user needs** (validation). One protects against implementation mistakes; the other against requirements mistakes.',
    },
    { kind: 'related', deckId: 'quality' },
  ],
};
