import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { markCard } from '../lib/progress';
import { buildSession } from '../lib/study';
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

export default function StudyScreen({ deckId, onExit }: StudyScreenProps): JSX.Element {
  const session = useMemo(() => buildSession(deckId), [deckId]);
  const { deck, cards } = session;
  const total = cards.length;

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [swipeDir, setSwipeDir] = useState<SwipeDir>(null);
  const [hint, setHint] = useState<SwipeDir>(null);
  const [mcqState, setMcqState] = useState<McqState>(null);
  const [showXp, setShowXp] = useState(false);
  const [knew, setKnew] = useState(0);
  const [missed, setMissed] = useState(0);
  const dragRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const card: SessionCard | undefined = cards[idx];
  const pct = total ? Math.round((idx / total) * 100) : 0;

  const advance = useCallback(
    (dir: SwipeDir, knewIt: boolean) => {
      setSwipeDir(dir);
      if (card) markCard(card._deck, card._idx, knewIt);
      if (knewIt) {
        setKnew((k) => k + 1);
        setShowXp(true);
        setTimeout(() => {
          setShowXp(false);
        }, 900);
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

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      const target = e.target;
      if (target instanceof HTMLElement && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (!card) return;
      if (e.code === 'Escape') {
        onExit();
        return;
      }
      if (e.code === 'Space' && card.kind === 'flip') {
        e.preventDefault();
        setFlipped((f) => !f);
        return;
      }
      if (e.code === 'Enter' && card.kind === 'mcq' && !mcqState?.locked) {
        e.preventDefault();
        submitMcq();
        return;
      }
      const ready = flipped || (mcqState?.locked ?? false);
      if (!ready) return;
      if (e.code === 'ArrowRight') advance('right', true);
      else if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') advance('left', false);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [flipped, mcqState, advance, card, onExit, submitMcq]);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>): void {
    if (!card) return;
    if (e.target instanceof Element && e.target.closest('button')) return;
    if (!flipped && card.kind === 'flip') return;
    if (card.kind === 'mcq' && !mcqState?.locked) return;
    dragRef.current = { x: e.clientX, y: e.clientY, active: true };
    cardRef.current?.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>): void {
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
  function onPointerUp(_e: ReactPointerEvent<HTMLDivElement>): void {
    if (!dragRef.current.active) return;
    const dx = _e.clientX - dragRef.current.x;
    dragRef.current.active = false;
    if (cardRef.current) {
      cardRef.current.style.transition = '';
      cardRef.current.style.transform = '';
    }
    setHint(null);
    if (dx > 110) advance('right', true);
    else if (dx < -110) advance('left', false);
  }

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
  if (!card) return <></>;

  const ready = card.kind === 'flip' ? flipped : (mcqState?.locked ?? false);
  const onCardClick = (): void => {
    if (card.kind === 'flip' && !swipeDir) setFlipped((f) => !f);
  };

  return (
    <div className="page">
      <div className="study">
        <StudyTop
          deck={deck}
          idx={idx}
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
          idx={idx}
          flipped={flipped}
          swipeDir={swipeDir}
          hint={hint}
          showXp={showXp}
          mcqState={mcqState}
          cardRef={cardRef}
          onCardClick={onCardClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPickMcq={pickMcq}
          onSubmitMcq={submitMcq}
        />

        {ready && !swipeDir && (
          <RateRow
            onMiss={() => {
              advance('left', false);
            }}
            onGotIt={() => {
              advance('right', true);
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
