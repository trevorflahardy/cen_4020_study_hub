import { type Deck } from '../types';
import decksJson from './decks.json';

export const DECKS: Deck[] = decksJson as Deck[];

export function findDeck(id: string): Deck | undefined {
  return DECKS.find((d) => d.id === id);
}
