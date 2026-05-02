import {
  type DailyTotal,
  type Deck,
  type DeckProgress,
  type HeatmapResult,
  type HeatmapRow,
  type StreakState,
} from '../types';

const KEY = 'stackr.progress.v1';
const STREAK_KEY = 'stackr.streak.v1';
const ACTIVITY_KEY = 'stackr.activity.v1';
const ACTIVITY_RETENTION_DAYS = 60;

type ProgressMap = Record<string, DeckProgress | undefined>;

function read(): ProgressMap {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function write(obj: ProgressMap): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch {
    /* ignore quota / disabled storage */
  }
}

export function getDeckProgress(deckId: string): DeckProgress {
  const all = read();
  return all[deckId] ?? { known: [], missed: [] };
}

export function markCard(deckId: string, cardIdx: number, known: boolean): void {
  const all = read();
  const entry = all[deckId] ?? { known: [], missed: [] };
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

export function resetProgress(deckId?: string): void {
  if (!deckId) {
    write({});
    return;
  }
  const all = read();
  const next: ProgressMap = {};
  for (const [k, v] of Object.entries(all)) {
    if (k !== deckId && v) next[k] = v;
  }
  write(next);
}

export function totalMastered(decks: Deck[]): number {
  const all = read();
  return decks.reduce((s, d) => s + (all[d.id]?.known.length ?? 0), 0);
}

// ── Streak tracking ─────────────────────────────────────────────────────────

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function todayKey(): string {
  return dateKey(new Date());
}

function readStreak(): StreakState {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { last: null, count: 0 };
    return JSON.parse(raw) as StreakState;
  } catch {
    return { last: null, count: 0 };
  }
}

export function bumpStreak(): StreakState {
  const today = todayKey();
  const s = readStreak();
  if (s.last === today) return s;
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = dateKey(yesterdayDate);
  const next: StreakState = {
    last: today,
    count: s.last === yesterday ? s.count + 1 : 1,
  };
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

export function getStreak(): StreakState {
  return readStreak();
}

// ── Activity log ────────────────────────────────────────────────────────────

function readActivity(): number[] {
  try {
    const raw = JSON.parse(localStorage.getItem(ACTIVITY_KEY) ?? '[]') as unknown;
    return Array.isArray(raw) ? raw.filter((n): n is number => typeof n === 'number') : [];
  } catch {
    return [];
  }
}

function writeActivity(list: number[]): void {
  try {
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(list));
  } catch {
    /* ignore quota / disabled storage */
  }
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function recordStudy(ts: number = Date.now()): void {
  const cutoff = ts - ACTIVITY_RETENTION_DAYS * 86400000;
  const list = readActivity().filter((t) => t >= cutoff);
  list.push(ts);
  writeActivity(list);
}

export function resetActivity(): void {
  writeActivity([]);
}

export function getDailyTotals(days = 7): DailyTotal[] {
  const today = startOfDay(new Date());
  const buckets: DailyTotal[] = [];
  const idxByKey = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = dateKey(d);
    const day = d.toLocaleDateString(undefined, { weekday: 'short' });
    idxByKey.set(key, buckets.length);
    buckets.push({ date: d, key, day, count: 0 });
  }
  for (const ts of readActivity()) {
    const d = new Date(ts);
    const i = idxByKey.get(dateKey(d));
    if (i !== undefined) {
      const bucket = buckets[i];
      if (bucket) bucket.count++;
    }
  }
  return buckets;
}

export function getHeatmap(days = 7): HeatmapResult {
  const today = startOfDay(new Date());
  const rows: HeatmapRow[] = [];
  const idxByKey = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = dateKey(d);
    const day = d.toLocaleDateString(undefined, { weekday: 'short' });
    idxByKey.set(key, rows.length);
    rows.push({
      date: d,
      key,
      day,
      hours: new Array<number>(24).fill(0),
      levels: new Array<number>(24).fill(0),
    });
  }
  for (const ts of readActivity()) {
    const d = new Date(ts);
    const i = idxByKey.get(dateKey(d));
    if (i === undefined) continue;
    const row = rows[i];
    if (!row) continue;
    const hour = d.getHours();
    const current = row.hours[hour] ?? 0;
    row.hours[hour] = current + 1;
  }
  let max = 0;
  for (const row of rows) {
    for (const c of row.hours) if (c > max) max = c;
  }
  for (const row of rows) {
    row.levels = row.hours.map((c) => quantize(c, max));
  }
  return { rows, max };
}

function quantize(count: number, max: number): number {
  if (count <= 0) return 0;
  if (max <= 1) return 1;
  const r = count / max;
  if (r <= 0.25) return 1;
  if (r <= 0.5) return 2;
  if (r <= 0.75) return 3;
  return 4;
}
