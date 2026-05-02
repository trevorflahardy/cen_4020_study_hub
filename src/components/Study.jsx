import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DECKS, findDeck } from '../data/decks.js';
import { markCard } from '../lib/progress.js';

// Render simple **bold** and *italic* markdown spans + line breaks. Keeps the
// runtime tiny — we don't need a full markdown engine for these short answers.
function renderInline(text) {
  if (!text) return null;
  const parts = [];
  let rest = String(text);
  let key = 0;
  // crude but effective: alternate between bold, italic, code, plain
  while (rest.length) {
    const m = rest.match(/(\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/);
    if (!m) {
      parts.push(rest);
      break;
    }
    if (m.index > 0) parts.push(rest.slice(0, m.index));
    if (m[2] != null) parts.push(<strong key={key++}>{m[2]}</strong>);
    else if (m[3] != null)
      parts.push(
        <code key={key++} style={{ fontFamily: 'var(--font-mono)', background: 'rgba(27,18,48,.06)', padding: '0 4px', borderRadius: 4 }}>
          {m[3]}
        </code>,
      );
    else if (m[4] != null) parts.push(<em key={key++}>{m[4]}</em>);
    rest = rest.slice(m.index + m[0].length);
  }
  // split each piece by \n and intersperse <br/>
  const out = [];
  parts.forEach((p, i) => {
    if (typeof p === 'string') {
      const lines = p.split(/\n/);
      lines.forEach((line, j) => {
        if (j > 0) out.push(<br key={`br-${i}-${j}`} />);
        if (line) out.push(line);
      });
    } else {
      out.push(p);
    }
  });
  return out;
}

function buildSession(deckId) {
  if (deckId) {
    const deck = findDeck(deckId);
    if (deck) return { deck, cards: deck.cards.map((c, i) => ({ ...c, _deck: deck.id, _idx: i })) };
  }
  // Mixed deck: shuffle a sample from every deck
  const all = DECKS.flatMap((d) => d.cards.map((c, i) => ({ ...c, _deck: d.id, _idx: i })));
  shuffle(all);
  return { deck: null, cards: all };
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export default function StudyScreen({ deckId, onExit }) {
  const session = useMemo(() => buildSession(deckId), [deckId]);
  const { deck, cards } = session;
  const total = cards.length;

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [swipeDir, setSwipeDir] = useState(null);
  const [hint, setHint] = useState(null);
  const [mcqState, setMcqState] = useState(null); // {picked: number|number[], correct: bool}
  const [showXp, setShowXp] = useState(false);
  const [knew, setKnew] = useState(0);
  const [missed, setMissed] = useState(0);
  const dragRef = useRef({ x: 0, y: 0, active: false });
  const cardRef = useRef(null);

  const card = cards[idx];
  const pct = total ? Math.round((idx / total) * 100) : 0;

  const advance = useCallback(
    (dir, knewIt) => {
      setSwipeDir(dir);
      if (card) markCard(card._deck, card._idx, !!knewIt);
      if (knewIt) {
        setKnew((k) => k + 1);
        setShowXp(true);
        setTimeout(() => setShowXp(false), 900);
      } else {
        setMissed((m) => m + 1);
      }
      setTimeout(() => {
        setIdx((i) => i + 1);
        setFlipped(false);
        setMcqState(null);
        setSwipeDir(null);
      }, 380);
    },
    [card],
  );

  // keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (!card) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (card.kind === 'flip') setFlipped((f) => !f);
      }
      const ready = flipped || mcqState;
      if (e.code === 'ArrowRight' && ready) advance('right', true);
      if (e.code === 'ArrowLeft' && ready) advance('left', false);
      if (e.code === 'ArrowDown' && ready) advance('left', false);
      if (e.code === 'Escape') onExit();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flipped, mcqState, advance, card, onExit]);

  function onPointerDown(e) {
    if (!card) return;
    if (!flipped && card.kind === 'flip') return;
    if (card.kind === 'mcq' && !mcqState) return;
    dragRef.current = { x: e.clientX, y: e.clientY, active: true };
    cardRef.current?.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
      cardRef.current.style.transform = `${flipped ? 'rotateY(180deg) ' : ''}translateX(${dx}px) rotate(${dx * 0.05}deg)`;
    }
    if (dx > 60) setHint('right');
    else if (dx < -60) setHint('left');
    else setHint(null);
  }
  function onPointerUp(e) {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current.active = false;
    if (cardRef.current) {
      cardRef.current.style.transition = '';
      cardRef.current.style.transform = '';
    }
    setHint(null);
    if (dx > 110) advance('right', true);
    else if (dx < -110) advance('left', false);
  }

  function pickMcq(i) {
    if (mcqState || !card) return;
    if (card.multi) {
      // multi-select: toggle, don't lock until "Done"
      const cur = Array.isArray(mcqState?.picked) ? mcqState.picked : [];
      const set = new Set(cur);
      if (set.has(i)) set.delete(i);
      else set.add(i);
      setMcqState({ picked: [...set], correct: null, locked: false });
    } else {
      const correct = i === card.answer;
      setMcqState({ picked: i, correct, locked: true });
    }
  }

  function submitMulti() {
    if (!card || !card.multi) return;
    const picked = Array.isArray(mcqState?.picked) ? mcqState.picked.slice().sort() : [];
    const ans = (Array.isArray(card.answer) ? card.answer : []).slice().sort();
    const correct = picked.length === ans.length && picked.every((v, i) => v === ans[i]);
    setMcqState({ picked, correct, locked: true });
  }

  if (idx >= total) {
    return (
      <SessionComplete
        knew={knew}
        missed={missed}
        deck={deck}
        onExit={onExit}
        onRestart={() => {
          setIdx(0);
          setKnew(0);
          setMissed(0);
        }}
      />
    );
  }

  const ready = card.kind === 'flip' ? flipped : mcqState?.locked;

  return (
    <div className="page">
      <div className="study">
        <div className="study-top">
          <button className="icon-btn" onClick={onExit} aria-label="Back" title="Back (Esc)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <div className="study-progress">
            <div className={`study-progress-bar ${swipeDir ? 'animating' : ''}`}>
              <div className="study-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="study-progress-meta">
              <span>{deck ? deck.name : 'Mixed deck'}</span>
              <span>
                {idx + 1} / {total} · ✅ {knew} · 🔁 {missed}
              </span>
            </div>
          </div>
        </div>

        <div className="card-stage">
          <div className="card-stack-layer behind-2">
            <div className="face" style={{ background: 'var(--bg-2)' }} />
          </div>
          <div className="card-stack-layer behind-1">
            <div className="face" style={{ background: 'var(--bg-2)' }} />
          </div>

          <div className="card-stack-layer front">
            <div
              ref={cardRef}
              className={`flashcard ${flipped ? 'flipped' : ''} ${swipeDir ? 'swipe-' + swipeDir : ''}`}
              onClick={() => {
                if (card.kind === 'flip' && !swipeDir) setFlipped((f) => !f);
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div className="face front-face">
                <div className="face-tag">
                  <span className="face-tag-dot" />
                  {card.tag || (deck ? deck.name : 'Card')}
                </div>
                <p className="question">{renderInline(card.front)}</p>

                {card.kind === 'mcq' && (
                  <div className="mcq-list">
                    {card.options.map((opt, i) => {
                      let state;
                      const picked = mcqState?.picked;
                      const isPicked = Array.isArray(picked) ? picked.includes(i) : picked === i;
                      if (mcqState?.locked) {
                        const correctSet = Array.isArray(card.answer) ? new Set(card.answer) : new Set([card.answer]);
                        if (correctSet.has(i)) state = 'correct';
                        else if (isPicked) state = 'incorrect';
                      } else if (isPicked) {
                        state = 'picked';
                      }
                      return (
                        <button
                          key={i}
                          className="mcq-opt"
                          data-state={state}
                          onClick={(e) => {
                            e.stopPropagation();
                            pickMcq(i);
                          }}
                          disabled={mcqState?.locked}
                        >
                          <span className="mcq-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{renderInline(opt)}</span>
                        </button>
                      );
                    })}
                    {card.multi && !mcqState?.locked && (
                      <button
                        className="btn btn-primary"
                        style={{ alignSelf: 'flex-start', marginTop: 4 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          submitMulti();
                        }}
                        disabled={!Array.isArray(mcqState?.picked) || mcqState.picked.length === 0}
                      >
                        Check answer
                      </button>
                    )}
                  </div>
                )}

                <div className="face-foot">
                  {card.kind === 'flip' ? (
                    <span>
                      Tap or press <span className="kbd">space</span> to flip
                    </span>
                  ) : mcqState?.locked ? (
                    <span style={{ fontStyle: 'italic' }}>{renderInline(card.explain)}</span>
                  ) : (
                    <span>{card.multi ? 'Pick all that apply' : 'Pick an answer'}</span>
                  )}
                  <span>
                    Card {idx + 1}
                  </span>
                </div>
              </div>

              <div className="face back">
                <div className="face-tag">
                  <span className="face-tag-dot" />
                  Answer
                </div>
                <p
                  className="answer"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2.4vw, 28px)',
                    fontWeight: 700,
                    marginTop: 0,
                  }}
                >
                  {renderInline(card.kind === 'flip' ? card.back : card.explain || '✓')}
                </p>
                <div className="face-foot">
                  <span>Did you get it?</span>
                  <span>
                    <span className="kbd">←</span> miss · <span className="kbd">→</span> got it
                  </span>
                </div>
              </div>
            </div>

            <div className={`swipe-hint left ${hint === 'left' ? 'show' : ''}`}>NOPE</div>
            <div className={`swipe-hint right ${hint === 'right' ? 'show' : ''}`}>GOT IT</div>
            {showXp && <div className="xp-pop show">+25 XP</div>}
          </div>
        </div>

        {ready && !swipeDir && (
          <div className="rate-row">
            <button className="rate-btn again" onClick={() => advance('left', false)}>
              <span className="emoji">😬</span>
              <span>Again</span>
              <span className="key">←</span>
            </button>
            <button className="rate-btn hard" onClick={() => advance('left', false)}>
              <span className="emoji">🤔</span>
              <span>Hard</span>
              <span className="key">↓</span>
            </button>
            <button className="rate-btn good" onClick={() => advance('right', true)}>
              <span className="emoji">🎉</span>
              <span>Got it!</span>
              <span className="key">→</span>
            </button>
          </div>
        )}

        {!flipped && card.kind === 'flip' && (
          <div className="rate-row" style={{ gridTemplateColumns: '1fr' }}>
            <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setFlipped(true)}>
              Flip card · <span className="kbd" style={{ marginLeft: 6 }}>space</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SessionComplete({ knew, missed, deck, onExit, onRestart }) {
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
          You finished {deck?.name || 'this deck'} with a {score}% score. Earned{' '}
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
