// Decks are produced by scripts/parse_decks.py from the Markdown sources in
// flashcards/. Re-run `npm run parse` (or `npm run build`) to regenerate.
import decks from './decks.json';

export const DECKS = decks;

export function findDeck(id) {
  return DECKS.find((d) => d.id === id);
}
