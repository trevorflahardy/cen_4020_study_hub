import { useEffect, useState, type JSX } from 'react';
import HomeScreen from './components/Home';
import StudyScreen from './components/Study';
import DashboardScreen from './components/Dashboard';
import DocsScreen from './docs/DocsScreen';
import { getStreak } from './lib/progress';
import { type Deck, type Route, type StreakState } from './types';

export default function App(): JSX.Element {
  const [route, setRoute] = useState<Route>({ name: 'home' });
  const [streak, setStreak] = useState<StreakState>(() => getStreak());

  useEffect(() => {
    if (route.name !== 'study') setStreak(getStreak());
  }, [route.name]);

  const goHome = (): void => {
    setRoute({ name: 'home' });
  };
  const goStudy = (deck: Deck | null): void => {
    setRoute({ name: 'study', deckId: deck?.id ?? null });
  };
  const goDash = (): void => {
    setRoute({ name: 'dash' });
  };
  const goDocs = (): void => {
    setRoute({ name: 'docs' });
  };
  const goStudyById = (deckId: string): void => {
    setRoute({ name: 'study', deckId });
  };

  return (
    <div className="app">
      <div className="bg-squiggle" />
      <div className="bg-dots" />

      <nav className="nav">
        <button
          className="brand"
          onClick={goHome}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <div className="brand-mark">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1B1230"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <line x1="3" y1="11" x2="21" y2="11" />
            </svg>
          </div>
          <span>
            Stackr<span style={{ color: 'var(--primary)' }}>.</span>
          </span>
        </button>
        <div className="nav-links">
          <button
            className={`nav-link ${route.name === 'home' ? 'is-active' : ''}`}
            onClick={goHome}
          >
            Topics
          </button>
          <button
            className={`nav-link ${route.name === 'study' ? 'is-active' : ''}`}
            onClick={() => {
              goStudy(null);
            }}
          >
            Study
          </button>
          <button
            className={`nav-link ${route.name === 'docs' ? 'is-active' : ''}`}
            onClick={goDocs}
          >
            Docs
          </button>
          <button
            className={`nav-link ${route.name === 'dash' ? 'is-active' : ''}`}
            onClick={goDash}
          >
            Progress
          </button>
        </div>
        <div className="streak-pill" title={`${streak.count}-day streak`}>
          <span className="streak-flame">🔥</span>
          <span>{streak.count || 0}</span>
        </div>
        <div className="avatar" title="Trev">
          T
        </div>
      </nav>

      {route.name === 'home' && <HomeScreen onPickTopic={goStudy} />}
      {route.name === 'study' && <StudyScreen deckId={route.deckId} onExit={goHome} />}
      {route.name === 'docs' && <DocsScreen onOpenDeck={goStudyById} />}
      {route.name === 'dash' && <DashboardScreen />}
    </div>
  );
}
