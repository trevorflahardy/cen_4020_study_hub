// Tiny localStorage-backed progress tracker. Keyed by deck id + card index, so
// rewriting/reordering a deck won't survive a re-build cleanly — that's fine for
// a study tool: a new deck means a fresh slate.

const KEY = 'stackr.progress.v1';
const STREAK_KEY = 'stackr.streak.v1';
const ACTIVITY_KEY = 'stackr.activity.v1';
const ACTIVITY_RETENTION_DAYS = 60;

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
  recordStudy();
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

// ── Activity log ────────────────────────────────────────────────────────────
// Each card review appends a timestamp (epoch ms). The log feeds the dashboard
// heatmap and weekly bar chart. We prune entries older than the retention
// window on every write to keep the array bounded.

function readActivity() {
  try {
    const raw = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]');
    return Array.isArray(raw) ? raw.filter((n) => typeof n === 'number') : [];
  } catch {
    return [];
  }
}

function writeActivity(list) {
  try {
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(list));
  } catch {
    /* ignore quota / disabled storage */
  }
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** Append a study event. */
export function recordStudy(ts = Date.now()) {
  const cutoff = ts - ACTIVITY_RETENTION_DAYS * 86400000;
  const list = readActivity().filter((t) => t >= cutoff);
  list.push(ts);
  writeActivity(list);
}

/** Reset the activity log. */
export function resetActivity() {
  writeActivity([]);
}

/**
 * Return per-day review counts for the last `days` days, oldest first.
 * Each entry is { date: Date (local midnight), key: 'YYYY-MM-DD', day: 'Mon',
 * count: number }.
 */
export function getDailyTotals(days = 7) {
  const today = startOfDay(new Date());
  const buckets = [];
  const idxByKey = new Map();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const day = d.toLocaleDateString(undefined, { weekday: 'short' });
    idxByKey.set(key, buckets.length);
    buckets.push({ date: d, key, day, count: 0 });
  }
  for (const ts of readActivity()) {
    const d = new Date(ts);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const i = idxByKey.get(key);
    if (i !== undefined) buckets[i].count++;
  }
  return buckets;
}

/**
 * Return a 7×24 heatmap (rows = days, oldest first; cols = hour-of-day 0..23)
 * with the per-cell review count and a 0..4 level normalized to the busiest
 * cell in the window.
 */
export function getHeatmap(days = 7) {
  const today = startOfDay(new Date());
  const rows = [];
  const idxByKey = new Map();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const day = d.toLocaleDateString(undefined, { weekday: 'short' });
    idxByKey.set(key, rows.length);
    rows.push({ date: d, key, day, hours: new Array(24).fill(0) });
  }
  for (const ts of readActivity()) {
    const d = new Date(ts);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const i = idxByKey.get(key);
    if (i === undefined) continue;
    rows[i].hours[d.getHours()]++;
  }
  let max = 0;
  for (const row of rows) for (const c of row.hours) if (c > max) max = c;
  for (const row of rows) {
    row.levels = row.hours.map((c) => quantize(c, max));
  }
  return { rows, max };
}

function quantize(count, max) {
  if (count <= 0) return 0;
  if (max <= 1) return 1;
  const r = count / max;
  if (r <= 0.25) return 1;
  if (r <= 0.5) return 2;
  if (r <= 0.75) return 3;
  return 4;
}
