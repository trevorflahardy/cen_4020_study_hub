import {
  type JSX,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { renderInline } from '../lib/study';
import { type Deck, type McqCard, type McqState, type SessionCard } from '../types';

export type SwipeDir = 'left' | 'right' | null;

interface StudyTopProps {
  deck: Deck | null;
  idx: number;
  total: number;
  knew: number;
  missed: number;
  pct: number;
  swipeDir: SwipeDir;
  onExit: () => void;
}

export function StudyTop({
  deck,
  idx,
  total,
  knew,
  missed,
  pct,
  swipeDir,
  onExit,
}: StudyTopProps): JSX.Element {
  return (
    <div className="study-top">
      <button className="icon-btn" onClick={onExit} aria-label="Back" title="Back (Esc)">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
  );
}

interface CardStageProps {
  card: SessionCard;
  deck: Deck | null;
  idx: number;
  flipped: boolean;
  swipeDir: SwipeDir;
  hint: SwipeDir;
  showXp: boolean;
  mcqState: McqState;
  cardRef: MutableRefObject<HTMLDivElement | null>;
  onCardClick: () => void;
  onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPickMcq: (i: number) => void;
  onSubmitMulti: () => void;
}

export function CardStage({
  card,
  deck,
  idx,
  flipped,
  swipeDir,
  hint,
  showXp,
  mcqState,
  cardRef,
  onCardClick,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPickMcq,
  onSubmitMulti,
}: CardStageProps): JSX.Element {
  return (
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
          className={`flashcard ${flipped ? 'flipped' : ''} ${swipeDir ? `swipe-${swipeDir}` : ''}`}
          onClick={onCardClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <CardFront
            card={card}
            deck={deck}
            idx={idx}
            mcqState={mcqState}
            onPickMcq={onPickMcq}
            onSubmitMulti={onSubmitMulti}
          />
          <CardBack card={card} />
        </div>

        <div className={`swipe-hint left ${hint === 'left' ? 'show' : ''}`}>NOPE</div>
        <div className={`swipe-hint right ${hint === 'right' ? 'show' : ''}`}>GOT IT</div>
        {showXp && <div className="xp-pop show">+25 XP</div>}
      </div>
    </div>
  );
}

interface CardFrontProps {
  card: SessionCard;
  deck: Deck | null;
  idx: number;
  mcqState: McqState;
  onPickMcq: (i: number) => void;
  onSubmitMulti: () => void;
}

function CardFront({
  card,
  deck,
  idx,
  mcqState,
  onPickMcq,
  onSubmitMulti,
}: CardFrontProps): JSX.Element {
  return (
    <div className="face front-face">
      <div className="face-tag">
        <span className="face-tag-dot" />
        {card.tag || (deck ? deck.name : 'Card')}
      </div>
      <p className="question">{renderInline(card.front)}</p>

      {card.kind === 'mcq' && (
        <McqList card={card} mcqState={mcqState} onPick={onPickMcq} onSubmit={onSubmitMulti} />
      )}

      <div className="face-foot">
        <FrontFootStatus card={card} mcqState={mcqState} />
        <span>Card {idx + 1}</span>
      </div>
    </div>
  );
}

interface FrontFootStatusProps {
  card: SessionCard;
  mcqState: McqState;
}

function FrontFootStatus({ card, mcqState }: FrontFootStatusProps): JSX.Element {
  if (card.kind === 'flip') {
    return (
      <span>
        Tap or press <span className="kbd">space</span> to flip
      </span>
    );
  }
  if (mcqState?.locked) {
    return <span style={{ fontStyle: 'italic' }}>{renderInline(card.explain ?? '')}</span>;
  }
  return <span>{card.multi ? 'Pick all that apply' : 'Pick an answer'}</span>;
}

interface McqListProps {
  card: McqCard;
  mcqState: McqState;
  onPick: (i: number) => void;
  onSubmit: () => void;
}

function McqList({ card, mcqState, onPick, onSubmit }: McqListProps): JSX.Element {
  const picked = mcqState?.picked;
  const locked = mcqState?.locked ?? false;
  const correctSet = Array.isArray(card.answer)
    ? new Set(card.answer)
    : new Set([card.answer]);
  const isMultiSubmittable = Array.isArray(picked) && picked.length > 0;
  return (
    <div className="mcq-list">
      {card.options.map((opt, i) => {
        const isPicked = Array.isArray(picked) ? picked.includes(i) : picked === i;
        let state: 'correct' | 'incorrect' | 'picked' | undefined;
        if (locked) {
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
              onPick(i);
            }}
            disabled={locked}
          >
            <span className="mcq-letter">{String.fromCharCode(65 + i)}</span>
            <span>{renderInline(opt)}</span>
          </button>
        );
      })}
      {card.multi && !locked && (
        <button
          className="btn btn-primary"
          style={{ alignSelf: 'flex-start', marginTop: 4 }}
          onClick={(e) => {
            e.stopPropagation();
            onSubmit();
          }}
          disabled={!isMultiSubmittable}
        >
          Check answer
        </button>
      )}
    </div>
  );
}

function CardBack({ card }: { card: SessionCard }): JSX.Element {
  const back = card.kind === 'flip' ? card.back : (card.explain ?? '✓');
  return (
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
        {renderInline(back)}
      </p>
      <div className="face-foot">
        <span>Did you get it?</span>
        <span>
          <span className="kbd">←</span> miss · <span className="kbd">→</span> got it
        </span>
      </div>
    </div>
  );
}

interface RateRowProps {
  onMiss: () => void;
  onGotIt: () => void;
}

export function RateRow({ onMiss, onGotIt }: RateRowProps): JSX.Element {
  return (
    <div className="rate-row">
      <button className="rate-btn again" onClick={onMiss}>
        <span className="emoji">😬</span>
        <span>Again</span>
        <span className="key">←</span>
      </button>
      <button className="rate-btn hard" onClick={onMiss}>
        <span className="emoji">🤔</span>
        <span>Hard</span>
        <span className="key">↓</span>
      </button>
      <button className="rate-btn good" onClick={onGotIt}>
        <span className="emoji">🎉</span>
        <span>Got it!</span>
        <span className="key">→</span>
      </button>
    </div>
  );
}

interface FlipPromptProps {
  onFlip: () => void;
}

export function FlipPrompt({ onFlip }: FlipPromptProps): JSX.Element {
  return (
    <div className="rate-row" style={{ gridTemplateColumns: '1fr' }}>
      <button
        className="btn btn-primary"
        style={{ justifyContent: 'center' }}
        onClick={onFlip}
      >
        Flip card ·{' '}
        <span className="kbd" style={{ marginLeft: 6 }}>
          space
        </span>
      </button>
    </div>
  );
}
