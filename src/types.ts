export interface FlipCard {
  kind: 'flip';
  front: string;
  back: string;
  tag: string;
}

export interface McqCard {
  kind: 'mcq';
  front: string;
  options: string[];
  answer: number | number[];
  multi?: boolean;
  explain?: string;
  tag: string;
}

export type Card = FlipCard | McqCard;

export interface Deck {
  id: string;
  name: string;
  short: string;
  emoji: string;
  color: string;
  accent: string;
  glyph: string;
  cards: Card[];
}

export interface DeckProgress {
  known: number[];
  missed: number[];
}

export interface StreakState {
  last: string | null;
  count: number;
}

export interface DailyTotal {
  date: Date;
  key: string;
  day: string;
  count: number;
}

export interface HeatmapRow {
  date: Date;
  key: string;
  day: string;
  hours: number[];
  levels: number[];
}

export interface HeatmapResult {
  rows: HeatmapRow[];
  max: number;
}

export type Route =
  | { name: 'home' }
  | { name: 'study'; deckId: string | null }
  | { name: 'dash' }
  | { name: 'docs' };

export type SessionCard = Card & { _deck: string; _idx: number };

export type McqState =
  | { picked: number | number[]; correct: boolean | null; locked: boolean }
  | null;
