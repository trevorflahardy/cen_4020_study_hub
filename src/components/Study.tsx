import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type JSX,
} from 'react';
import { markCard } from '../lib/progress';
import {
  applyRating,
  clearSavedSession,
  freshSession,
  loadSession,
  saveSession,
  type ActiveSession,
  type RateAction,
} from '../lib/study';
import { useCardSwipe, useStudyKeyboard } from '../lib/studyHooks';
import { type McqState, type SessionCard } from '../types';
import SessionComplete from './SessionComplete';
import {
  type SwipeDir,
  CardStage,
  FlipPrompt,
  RateRow,
  StudyTop,
} from './StudyParts';

interface StudyScreenProps {
  deckId: string | null;
  onExit: () => void;
}

const ADVANCE_MS = 380;
const MCQ_AUTO_ADVANCE_MS = 750;

export default function StudyScreen({ deckId, onExit }: StudyScreenProps): JSX.Element {
  const [session, setSession] = useState<ActiveSession>(() => loadSession(deckId));
  const { deck, queue, pos, knew, missed, total } = session;

  const [flipped, setFlipped] = useState(false);
  const [swipeDir, setSwipeDir] = useState<SwipeDir>(null);
  const [hint, setHint] = useState<SwipeDir>(null);
  const [mcqState, setMcqState] = useState<McqState>(null);
  const [showXp, setShowXp] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const advancingRef = useRef(false);

  const card: SessionCard | undefined = queue[pos]?.card;
  const pct = total ? Math.min(100, Math.round((pos / total) * 100)) : 0;

  const advance = useCallback(
    (dir: SwipeDir, action: RateAction) => {
      if (advancingRef.current || !card) return;
      advancingRef.current = true;
      setSwipeDir(dir);
      markCard(card._deck, card._idx, action === 'good');
      if (action === 'good') {
        setShowXp(true);
        setTimeout(() => {
          setShowXp(false);
        }, 900);
      }
      setTimeout(() => {
        setSession((prev) => {
          const next = applyRating(prev, action);
          if (next.pos >= next.queue.length) clearSavedSession(next.deckId);
          else saveSession(next);
          return next;
        });
        setFlipped(false);
        setMcqState(null);
        setSwipeDir(null);
        advancingRef.current = false;
      }, ADVANCE_MS);
    },
    [card],
  );

  const submitMcq = useCallback((): void => {
    if (card?.kind !== 'mcq') return;
    const prev = mcqState?.picked;
    if (card.multi) {
      const picked = Array.isArray(prev) ? [...prev].sort((a, b) => a - b) : [];
      if (picked.length === 0) return;
      const ans = (Array.isArray(card.answer) ? card.answer : []).slice().sort((a, b) => a - b);
      const correct = picked.length === ans.length && picked.every((v, i) => v === ans[i]);
      setMcqState({ picked, correct, locked: true });
    } else if (typeof prev === 'number') {
      setMcqState({ picked: prev, correct: prev === card.answer, locked: true });
    }
  }, [card, mcqState]);

  // Auto-advance: a fully-correct MCQ counts as "got it" — celebrate, then move on.
  useEffect(() => {
    if (card?.kind !== 'mcq') return;
    if (!mcqState?.locked || mcqState.correct !== true) return;
    const t = setTimeout(() => {
      advance('right', 'good');
    }, MCQ_AUTO_ADVANCE_MS);
    return () => {
      clearTimeout(t);
    };
  }, [mcqState, card, advance]);

  useStudyKeyboard({ card, flipped, mcqState, onExit, setFlipped, submitMcq, advance });

  const swipe = useCardSwipe({ card, flipped, mcqState, cardRef, setHint, advance });

  function pickMcq(i: number): void {
    if (mcqState?.locked || card?.kind !== 'mcq') return;
    if (card.multi) {
      const prev = mcqState?.picked;
      const cur = Array.isArray(prev) ? prev : [];
      const set = new Set(cur);
      if (set.has(i)) set.delete(i);
      else set.add(i);
      setMcqState({ picked: [...set], correct: null, locked: false });
    } else {
      setMcqState({ picked: i, correct: null, locked: false });
    }
  }

  function restart(): void {
    clearSavedSession(deckId);
    setSession(freshSession(deckId));
    setFlipped(false);
    setMcqState(null);
    setSwipeDir(null);
    setHint(null);
    setShowXp(false);
  }

  if (pos >= queue.length) {
    return (
      <SessionComplete
        knew={knew}
        missed={missed}
        deck={deck}
        onExit={onExit}
        onRestart={restart}
      />
    );
  }
  if (!card) return <></>;

  const mcqAutoAdvancing = card.kind === 'mcq' && mcqState?.correct === true;
  const ready = card.kind === 'flip' ? flipped : (mcqState?.locked ?? false);
  const showRateRow = ready && !swipeDir && !mcqAutoAdvancing;
  const onCardClick = (): void => {
    if (card.kind === 'flip' && !swipeDir) setFlipped((f) => !f);
  };

  return (
    <div className="page">
      <div className="study">
        <StudyTop
          deck={deck}
          idx={pos}
          total={total}
          knew={knew}
          missed={missed}
          pct={pct}
          swipeDir={swipeDir}
          onExit={onExit}
        />

        <CardStage
          card={card}
          deck={deck}
          idx={pos}
          flipped={flipped}
          swipeDir={swipeDir}
          hint={hint}
          showXp={showXp}
          mcqState={mcqState}
          cardRef={cardRef}
          onCardClick={onCardClick}
          onPointerDown={swipe.onPointerDown}
          onPointerMove={swipe.onPointerMove}
          onPointerUp={swipe.onPointerUp}
          onPickMcq={pickMcq}
          onSubmitMcq={submitMcq}
        />

        {showRateRow && (
          <RateRow
            onAgain={() => {
              advance('left', 'again');
            }}
            onHard={() => {
              advance('left', 'hard');
            }}
            onGood={() => {
              advance('right', 'good');
            }}
          />
        )}

        {!flipped && card.kind === 'flip' && (
          <FlipPrompt
            onFlip={() => {
              setFlipped(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
