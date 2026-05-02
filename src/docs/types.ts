// ── Doc page block model ────────────────────────────────────────────────────
//
// Every page is a list of typed `DocBlock`s. A discriminated union keeps the
// renderer exhaustive (`switch-exhaustiveness-check` in eslint will fail if a
// case is missed).

export interface ParaBlock {
  kind: 'p';
  text: string;
}

export interface H2Block {
  kind: 'h2';
  text: string;
}

export interface ListBlock {
  kind: 'list';
  items: string[];
}

export type CalloutTone = 'tip' | 'note' | 'warn';

export interface CalloutBlock {
  kind: 'callout';
  tone: CalloutTone;
  title: string;
  text: string;
}

export interface StepItem {
  n: number;
  title: string;
  text: string;
}

export interface StepsBlock {
  kind: 'steps';
  items: StepItem[];
}

export interface TableBlock {
  kind: 'table';
  cols: string[];
  rows: string[][];
}

export interface GlossaryItem {
  term: string;
  def: string;
}

export interface GlossaryBlock {
  kind: 'glossary';
  items: GlossaryItem[];
}

export interface DefinitionBlock {
  kind: 'definition';
  term: string;
  body: string;
}

export interface QuoteBlock {
  kind: 'quote';
  text: string;
  cite?: string;
}

export interface RelatedBlock {
  kind: 'related';
  deckId: string;
  hint?: string;
}

export type DocBlock =
  | ParaBlock
  | H2Block
  | ListBlock
  | CalloutBlock
  | StepsBlock
  | TableBlock
  | GlossaryBlock
  | DefinitionBlock
  | QuoteBlock
  | RelatedBlock;

// ── Page + section structure ────────────────────────────────────────────────

export interface DocPage {
  /** unique slug, used in routing/navigation */
  id: string;
  /** small label shown above the H1 (e.g. "Topic guide") */
  eyebrow: string;
  /** page H1 */
  title: string;
  /** one-line summary — appears below the title */
  lede: string;
  /** body blocks — rendered in order */
  body: DocBlock[];
  /** optional: review-deck slide reference (e.g. "Slide 17") */
  slide?: string;
  /** optional: which lecture covers this in depth */
  lecture?: string;
}

export interface DocSection {
  id: string;
  label: string;
  icon: string;
  pages: DocPage[];
}
