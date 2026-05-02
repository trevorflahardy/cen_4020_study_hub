// Tiny localStorage-backed progress tracker. Keyed by deck id + card index, so
// rewriting/reordering a deck won't survive a re-build cleanly — that's fine for
// a study tool: a new deck means a fresh slate.

const KEY = 'stackr.progress.v1';
const STREAK_KEY = 'stackr.streak.v1';

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function write(obj) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch {
    /* ignore quota / disabled storage */
  }
}

/** Get the {known: [idx,...], missed: [idx,...]} state for a deck id. */
export function getDeckProgress(deckId) {
  const all = read();
  return all[deckId] || { known: [], missed: [] };
}

/** Mark a card as known/missed (idempotent — moves between sets). */
export function markCard(deckId, cardIdx, known) {
  const all = read();
  const entry = all[deckId] || { known: [], missed: [] };
  const knownSet = new Set(entry.known);
  const missedSet = new Set(entry.missed);
  if (known) {
    knownSet.add(cardIdx);
    missedSet.delete(cardIdx);
  } else {
    missedSet.add(cardIdx);
    knownSet.delete(cardIdx);
  }
  all[deckId] = { known: [...knownSet], missed: [...missedSet] };
  write(all);
  bumpStreak();
}

/** Reset progress for one deck (or all if no id). */
export function resetProgress(deckId) {
  if (!deckId) {
    write({});
    return;
  }
  const all = read();
  delete all[deckId];
  write(all);
}

/** Number of cards marked known across all decks. */
export function totalMastered(decks) {
  const all = read();
  return decks.reduce((s, d) => s + (all[d.id]?.known?.length || 0), 0);
}

// ── Streak tracking ─────────────────────────────────────────────────────────

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function readStreak() {
  try {
    return JSON.parse(localStorage.getItem(STREAK_KEY) || 'null') || { last: null, count: 0 };
  } catch {
    return { last: null, count: 0 };
  }
}

export function bumpStreak() {
  const today = todayKey();
  const s = readStreak();
  if (s.last === today) return s; // already counted today
  // determine if 'last' was yesterday — if so, +1; otherwise reset to 1
  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();
  const next = { last: today, count: s.last === yesterday ? s.count + 1 : 1 };
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  } catch {}
  return next;
}

export function getStreak() {
  return readStreak();
}
