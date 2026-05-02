import type { DocPage } from '../../types';

export const ironTriangle: DocPage = {
  id: 'iron-triangle',
  eyebrow: 'Software Quality',
  title: `The Iron Triangle: you can't have it all`,
  lede: 'Cost, Quality, Schedule — pick two. Optimize all three at once and you sacrifice the unspoken one. The unavoidable trade-off of project management.',
  slide: 'Slide 91',
  lecture: 'Lesson 22',
  body: [
    {
      kind: 'p',
      text: 'For all engineered products, the goal is **delivering maximum stakeholder value while balancing the constraints of development cost and schedule**. This is sometimes characterized as **"fitness for use"**.',
    },
    { kind: 'h2', text: 'The unavoidable trade-off' },
    {
      kind: 'table',
      cols: ['Combination', 'Result'],
      rows: [
        ['Fast & Cheap', '**= Low Quality**'],
        ['Fast & High-Quality', '**= Expensive**'],
        ['Cheap & High-Quality', '**= Slow**'],
      ],
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'You can pick two — but never all three',
      text: 'The Iron Triangle is **iron** — non-negotiable. Try to maximize all three and one *quietly* gives. The hidden third is usually quality, because cost and schedule are visible to executives while quality only shows up in production.',
    },
    { kind: 'h2', text: 'A SellAgain micro-discussion prompt' },
    {
      kind: 'p',
      text: "*You are the CEO of Live Nation. You need the SellAgain feature launched **before the next major tour** (a Schedule constraint). Which constraint do you sacrifice first: Cost or Quality? Be prepared to defend your choice.*",
    },
    { kind: 'h2', text: 'Project management implications' },
    {
      kind: 'list',
      items: [
        `When you ask for a deadline extension, you're trying to *protect quality* by relaxing the Schedule corner.`,
        `When you ask for more headcount or budget, you're trying to *protect quality* by relaxing the Cost corner.`,
        "When stakeholders insist on all three at once, your job is to **make the trade-off visible and force a choice**.",
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Exam framing',
      text: `The Iron Triangle isn't just trivia — it's the framework you reach for **whenever a question asks "what gives?"** when a project is constrained. Always answer in terms of which corner you protect at the cost of which other.`,
    },
    { kind: 'related', deckId: 'quality' },
  ],
};
