import { Fragment, type ReactNode, createElement } from 'react';
import { type Card, type Deck, type SessionCard } from '../types';
import { DECKS, findDeck } from '../data/decks';

// Render simple **bold**, *italic*, and `code` markdown spans + line breaks.
// Keeps the runtime tiny — we don't need a full markdown engine for these
// short answers.
const INLINE_PATTERN = /(\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/;

export function renderInline(text: string | undefined | null): ReactNode {
  if (!text) return null;
  const parts: ReactNode[] = [];
  let rest = text;
  let key = 0;
  while (rest.length > 0) {
    const m = INLINE_PATTERN.exec(rest);
    if (m?.index === undefined) {
      parts.push(rest);
      break;
    }
    if (m.index > 0) parts.push(rest.slice(0, m.index));
    if (m[2] != null) {
      parts.push(createElement('strong', { key: key++ }, m[2]));
    } else if (m[3] != null) {
      parts.push(
        createElement(
          'code',
          {
            key: key++,
            style: {
              fontFamily: 'var(--font-mono)',
              background: 'rgba(27,18,48,.06)',
              padding: '0 4px',
              borderRadius: 4,
            },
          },
          m[3],
        ),
      );
    } else if (m[4] != null) {
      parts.push(createElement('em', { key: key++ }, m[4]));
    }
    rest = rest.slice(m.index + m[0].length);
  }
  const out: ReactNode[] = [];
  parts.forEach((p, i) => {
    if (typeof p === 'string') {
      const lines = p.split(/\n/);
      lines.forEach((line, j) => {
        if (j > 0) out.push(createElement('br', { key: `br-${i}-${j}` }));
        if (line) out.push(line);
      });
    } else {
      out.push(p);
    }
  });
  return createElement(Fragment, null, ...out);
}

export interface Session {
  deck: Deck | null;
  cards: SessionCard[];
}

export function buildSession(deckId: string | null): Session {
  if (deckId) {
    const deck = findDeck(deckId);
    if (deck) {
      return {
        deck,
        cards: deck.cards.map((c, i) => attach(c, deck.id, i)),
      };
    }
  }
  const all: SessionCard[] = DECKS.flatMap((d) =>
    d.cards.map((c, i) => attach(c, d.id, i)),
  );
  shuffle(all);
  return { deck: null, cards: all };
}

function attach(card: Card, deckId: string, idx: number): SessionCard {
  return { ...card, _deck: deckId, _idx: idx };
}

function shuffle(arr: SessionCard[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = arr[i];
    const b = arr[j];
    if (a !== undefined && b !== undefined) {
      arr[i] = b;
      arr[j] = a;
    }
  }
}
