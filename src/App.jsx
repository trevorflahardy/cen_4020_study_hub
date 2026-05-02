import { useEffect, useState } from 'react';
import HomeScreen from './components/Home.jsx';
import StudyScreen from './components/Study.jsx';
import DashboardScreen from './components/Dashboard.jsx';
import { getStreak } from './lib/progress.js';

export default function App() {
  // route: { name: 'home' | 'study' | 'dash', deckId?: string }
  const [route, setRoute] = useState({ name: 'home' });
  const [streak, setStreak] = useState(() => getStreak());

  // Re-read streak whenever we leave the study screen so the nav reflects
  // session-end bumps without a full reload.
  useEffect(() => {
    if (route.name !== 'study') setStreak(getStreak());
  }, [route.name]);

  const goHome = () => setRoute({ name: 'home' });
  const goStudy = (deck) => setRoute({ name: 'study', deckId: deck?.id ?? null });
  const goDash = () => setRoute({ name: 'dash' });

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
            <svg viewBox="0 0 24 24" fill="none" stroke="#1B1230" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <line x1="3" y1="11" x2="21" y2="11" />
            </svg>
          </div>
          <span>
            Stackr<span style={{ color: 'var(--primary)' }}>.</span>
          </span>
        </button>
        <div className="nav-links">
          <button className={`nav-link ${route.name === 'home' ? 'is-active' : ''}`} onClick={goHome}>
            Topics
          </button>
          <button className={`nav-link ${route.name === 'study' ? 'is-active' : ''}`} onClick={() => goStudy(null)}>
            Study
          </button>
          <button className={`nav-link ${route.name === 'dash' ? 'is-active' : ''}`} onClick={goDash}>
            Progress
          </button>
        </div>
        <div className="streak-pill" title={`${streak.count}-day streak`}>
          <span className="streak-flame">🔥</span>
          <span>{streak.count || 0}</span>
        </div>
        <div className="avatar" title="Trev">T</div>
      </nav>

      {route.name === 'home' && <HomeScreen onPickTopic={goStudy} />}
      {route.name === 'study' && <StudyScreen deckId={route.deckId} onExit={goHome} />}
      {route.name === 'dash' && <DashboardScreen />}
    </div>
  );
}
