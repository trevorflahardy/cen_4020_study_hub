import { type JSX } from 'react';
import { findDeck } from '../data/decks';
import type {
  CalloutBlock,
  DefinitionBlock,
  DocBlock,
  GlossaryBlock,
  ListBlock,
  QuoteBlock,
  RelatedBlock,
  StepsBlock,
  TableBlock,
} from './types';

/** Stable slug for an H2 heading or related-block anchor. */
// eslint-disable-next-line react-refresh/only-export-components
export function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'section';
}

export const PRACTICE_DECK_ID = 'practice-deck';

// Render bold/italic/code spans inline. Tiny enough to inline rather than
// pulling in a markdown lib.
function renderInline(text: string): (string | JSX.Element)[] {
  const out: (string | JSX.Element)[] = [];
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[2] !== undefined) out.push(<strong key={key++}>{m[2]}</strong>);
    else if (m[3] !== undefined) out.push(<code key={key++}>{m[3]}</code>);
    else if (m[4] !== undefined) out.push(<em key={key++}>{m[4]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function CalloutBlockView({ block }: { block: CalloutBlock }): JSX.Element {
  const icon = block.tone === 'tip' ? '💡' : block.tone === 'warn' ? '⚠️' : 'ℹ️';
  return (
    <div className={`doc-callout tone-${block.tone}`}>
      <span className="doc-callout-icon">{icon}</span>
      <div>
        <strong>{block.title}</strong>
        <p>{renderInline(block.text)}</p>
      </div>
    </div>
  );
}

function StepsBlockView({ block }: { block: StepsBlock }): JSX.Element {
  return (
    <ol className="doc-steps">
      {block.items.map((s) => (
        <li key={s.n}>
          <span className="doc-step-n">{s.n}</span>
          <div>
            <strong>{s.title}</strong>
            <p>{renderInline(s.text)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function TableBlockView({ block }: { block: TableBlock }): JSX.Element {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        <thead>
          <tr>
            {block.cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((cell, ci) => (
                <td key={ci}>{renderInline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GlossaryBlockView({ block }: { block: GlossaryBlock }): JSX.Element {
  return (
    <dl className="doc-glossary">
      {block.items.map((g) => (
        <div className="doc-glossary-row" key={g.term}>
          <dt>{g.term}</dt>
          <dd>{renderInline(g.def)}</dd>
        </div>
      ))}
    </dl>
  );
}

function DefinitionBlockView({ block }: { block: DefinitionBlock }): JSX.Element {
  return (
    <div className="doc-definition">
      <div className="doc-definition-eyebrow">Definition</div>
      <div className="doc-definition-term">{block.term}</div>
      <p>{renderInline(block.body)}</p>
    </div>
  );
}

function QuoteBlockView({ block }: { block: QuoteBlock }): JSX.Element {
  return (
    <blockquote className="doc-quote">
      <p>{renderInline(block.text)}</p>
      {block.cite !== undefined && <cite>— {block.cite}</cite>}
    </blockquote>
  );
}

function RelatedBlockView({
  block,
  onOpenDeck,
}: {
  block: RelatedBlock;
  onOpenDeck?: ((deckId: string) => void) | undefined;
}): JSX.Element | null {
  const deck = findDeck(block.deckId);
  if (!deck) return null;
  return (
    <div id={PRACTICE_DECK_ID} className="doc-related" style={{ scrollMarginTop: 100 }}>
      <div className="doc-related-eyebrow">Practice</div>
      <div className="doc-related-row">
        <span className="doc-related-emoji">{deck.emoji}</span>
        <div className="doc-related-body">
          <strong>{deck.name}</strong>
          <p>{block.hint ?? `${deck.cards.length} cards · ${deck.short}`}</p>
        </div>
        {onOpenDeck && (
          <button
            className="btn btn-primary"
            onClick={() => {
              onOpenDeck(deck.id);
            }}
          >
            Open deck →
          </button>
        )}
      </div>
    </div>
  );
}

function ListBlockView({ block }: { block: ListBlock }): JSX.Element {
  return (
    <ul className="doc-list">
      {block.items.map((item, i) => (
        <li key={i}>{renderInline(item)}</li>
      ))}
    </ul>
  );
}

interface DocBlockProps {
  block: DocBlock;
  onOpenDeck?: ((deckId: string) => void) | undefined;
}

export default function DocBlockView({ block, onOpenDeck }: DocBlockProps): JSX.Element | null {
  switch (block.kind) {
    case 'p':
      return <p className="doc-p">{renderInline(block.text)}</p>;
    case 'h2':
      return (
        <h2 id={slugify(block.text)} className="doc-h2">
          {block.text}
        </h2>
      );
    case 'list':
      return <ListBlockView block={block} />;
    case 'callout':
      return <CalloutBlockView block={block} />;
    case 'steps':
      return <StepsBlockView block={block} />;
    case 'table':
      return <TableBlockView block={block} />;
    case 'glossary':
      return <GlossaryBlockView block={block} />;
    case 'definition':
      return <DefinitionBlockView block={block} />;
    case 'quote':
      return <QuoteBlockView block={block} />;
    case 'related':
      return <RelatedBlockView block={block} onOpenDeck={onOpenDeck} />;
  }
}

// Re-export so the screen can render H1 / lede with the same inline parser.
// eslint-disable-next-line react-refresh/only-export-components
export { renderInline };
