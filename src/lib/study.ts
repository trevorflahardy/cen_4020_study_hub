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

// Session queue with simple SRS (spaced repetition).
// "Again"/"Hard" reinsert a copy of the current card N positions ahead so the
// user re-sees it later in the same run. "Got it" never reinserts. State
// (queue + position + counts) is mirrored to localStorage so the user can
// leave and resume.

const SESSION_KEY_PREFIX = 'stackr.session.v1::';
const AGAIN_GAP = 3;
const HARD_GAP = 7;

export type RateAction = 'again' | 'hard' | 'good';

export interface QueueItem {
  card: SessionCard;
  attempts: number;
}

export interface ActiveSession {
  deckId: string | null;
  deck: Deck | null;
  queue: QueueItem[];
  pos: number;
  knew: number;
  missed: number;
  total: number;
}

interface PersistedSession {
  deckId: string | null;
  queue: { deck: string; idx: number; attempts: number }[];
  pos: number;
  knew: number;
  missed: number;
  total: number;
}

function sessionKey(deckId: string | null): string {
  return `${SESSION_KEY_PREFIX}${deckId ?? 'mixed'}`;
}

function attach(card: Card, deckId: string, idx: number): SessionCard {
  return { ...card, _deck: deckId, _idx: idx };
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

function buildCards(deckId: string | null): { deck: Deck | null; cards: SessionCard[] } {
  if (deckId) {
    const deck = findDeck(deckId);
    if (deck) {
      return { deck, cards: deck.cards.map((c, i) => attach(c, deck.id, i)) };
    }
  }
  const cards = DECKS.flatMap((d) => d.cards.map((c, i) => attach(c, d.id, i)));
  return { deck: null, cards };
}

export function freshSession(deckId: string | null): ActiveSession {
  const { deck, cards } = buildCards(deckId);
  const shuffled = shuffle(cards);
  return {
    deckId,
    deck,
    queue: shuffled.map((card) => ({ card, attempts: 0 })),
    pos: 0,
    knew: 0,
    missed: 0,
    total: shuffled.length,
  };
}

export function loadSession(deckId: string | null): ActiveSession {
  const restored = readPersisted(deckId);
  if (restored && restored.pos < restored.queue.length) return restored;
  if (restored) clearSavedSession(deckId);
  return freshSession(deckId);
}

function readPersisted(deckId: string | null): ActiveSession | null {
  try {
    const raw = localStorage.getItem(sessionKey(deckId));
    if (!raw) return null;
    const data = JSON.parse(raw) as PersistedSession;
    if (data.deckId !== deckId) return null;
    if (!Array.isArray(data.queue)) return null;
    const queue: QueueItem[] = [];
    for (const item of data.queue) {
      const d = findDeck(item.deck);
      const c = d?.cards[item.idx];
      if (!d || !c) return null;
      queue.push({
        card: attach(c, d.id, item.idx),
        attempts: typeof item.attempts === 'number' ? item.attempts : 0,
      });
    }
    const deck = deckId ? (findDeck(deckId) ?? null) : null;
    if (data.pos < 0 || data.pos > queue.length) return null;
    return {
      deckId,
      deck,
      queue,
      pos: data.pos,
      knew: data.knew,
      missed: data.missed,
      total: data.total,
    };
  } catch {
    return null;
  }
}

export function saveSession(s: ActiveSession): void {
  try {
    const payload: PersistedSession = {
      deckId: s.deckId,
      queue: s.queue.map((q) => ({
        deck: q.card._deck,
        idx: q.card._idx,
        attempts: q.attempts,
      })),
      pos: s.pos,
      knew: s.knew,
      missed: s.missed,
      total: s.total,
    };
    localStorage.setItem(sessionKey(s.deckId), JSON.stringify(payload));
  } catch {
    /* ignore quota / disabled storage */
  }
}

export function clearSavedSession(deckId: string | null): void {
  try {
    localStorage.removeItem(sessionKey(deckId));
  } catch {
    /* ignore */
  }
}

// Apply a rating to the current card and return the next session state.
// "again"/"hard" splice a fresh copy of the card N positions ahead so it
// resurfaces later in the same run.
export function applyRating(s: ActiveSession, action: RateAction): ActiveSession {
  const current = s.queue[s.pos];
  const queue = s.queue.slice();
  if (current && action !== 'good') {
    const gap = action === 'hard' ? HARD_GAP : AGAIN_GAP;
    const insertAt = Math.min(s.pos + 1 + gap, queue.length);
    queue.splice(insertAt, 0, { card: current.card, attempts: current.attempts + 1 });
  }
  return {
    ...s,
    queue,
    pos: s.pos + 1,
    knew: s.knew + (action === 'good' ? 1 : 0),
    missed: s.missed + (action === 'good' ? 0 : 1),
  };
}
