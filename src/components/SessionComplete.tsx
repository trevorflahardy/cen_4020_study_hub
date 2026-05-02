import { type JSX } from 'react';
import { type Deck } from '../types';

interface SessionCompleteProps {
  knew: number;
  missed: number;
  deck: Deck | null;
  onExit: () => void;
  onRestart: () => void;
}

export default function SessionComplete({
  knew,
  missed,
  deck,
  onExit,
  onRestart,
}: SessionCompleteProps): JSX.Element {
  const total = knew + missed;
  const score = total === 0 ? 0 : Math.round((knew / total) * 100);
  return (
    <div className="page">
      <div className="study" style={{ textAlign: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: 80, animation: 'wiggle 1.4s ease-in-out infinite' }}>🎉</div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            margin: 0,
            letterSpacing: '-0.03em',
          }}
        >
          Deck cleared!
        </h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: 460 }}>
          You finished {deck?.name ?? 'this deck'} with a {score}% score. Earned{' '}
          <strong>+{knew * 25} XP</strong> and kept your streak alive.
        </p>
        <div className="hero-stats" style={{ justifyContent: 'center' }}>
          <span className="stat-chip">
            <span className="stat-chip-num">{knew}</span> got it
          </span>
          <span className="stat-chip">
            <span className="stat-chip-num">{missed}</span> to review
          </span>
          <span className="stat-chip">
            <span className="stat-chip-num">{score}%</span> accuracy
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button className="btn" onClick={onExit}>
            Back to topics
          </button>
          <button className="btn btn-primary" onClick={onRestart}>
            Study again
          </button>
        </div>
      </div>
    </div>
  );
}
