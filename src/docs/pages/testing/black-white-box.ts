import type { DocPage } from '../../types';

export const blackWhiteBox: DocPage = {
  id: 'black-white-box',
  eyebrow: 'Software Testing',
  title: 'Two lenses for finding bugs: black-box vs. white-box',
  lede: "Black-box testing checks behavior against the spec; white-box testing checks paths through the code. The two are complementary — you need both.",
  slide: 'Slide 28',
  lecture: 'Lesson 18',
  body: [
    {
      kind: 'table',
      cols: ['Aspect', 'Black-box', 'White-box'],
      rows: [
        ['What you see', 'Inputs and outputs only', 'The internal code structure'],
        ['What you test against', 'The **specification**', 'The **logic and branches**'],
        ['Other names', "Behavioral, spec-based", 'Glass-box, structural'],
        ['Strength', 'Catches missed requirements', 'Catches uncovered code paths'],
        ['Weakness', "Won't find unreachable bugs", 'Misses requirements that have no code yet'],
      ],
    },
    { kind: 'h2', text: 'Black-box testing — the outside view' },
    {
      kind: 'p',
      text: 'You look only at inputs and outputs, **ignoring the internal code**. Tests come from the spec, the user manual, the requirements doc — anything that defines what the system *should* do, not how it does it.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'IQon Elite black-box example',
      text: `Does the **Apply Filter** button produce the correctly filtered image, **as described in the user manual**? You don't care which algorithm runs — only that the result matches the spec.`,
    },
    { kind: 'h2', text: 'White-box testing — the inside view' },
    {
      kind: 'p',
      text: `You use **knowledge of the code's internal structure and logic** to design tests. The classic discipline is **branch coverage**: write enough tests that every \`if\` / \`else\` path is exercised at least once.`,
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'IQon Elite white-box example',
      text: "Have we written tests to ensure **every** `if/else` branch within the filtering algorithm is executed?",
    },
    { kind: 'h2', text: 'When each fits' },
    {
      kind: 'list',
      items: [
        `**Acceptance / system testing** is almost always **black-box** — done from the user's perspective, ignoring internals.`,
        '**Unit testing** can be either, but **white-box** tactics (covering branches) are usually most natural at this level.',
        '**Integration testing** is typically **black-box at the seam** — you treat each module as a box and test the contract between them.',
      ],
    },
    {
      kind: 'quote',
      text: 'Structural testing complements specification-based testing by using the code itself as a roadmap to find and eliminate hidden risks.',
      cite: 'Lesson 18',
    },
    { kind: 'related', deckId: 'testing' },
  ],
};
