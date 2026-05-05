import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type RefObject } from 'react';
import { type McqState, type SessionCard } from '../types';
import { type SwipeDir } from '../components/StudyParts';
import { type RateAction } from './study';

interface SwipeCtx {
  card: SessionCard | undefined;
  flipped: boolean;
  mcqState: McqState;
  cardRef: RefObject<HTMLDivElement | null>;
  setHint: (h: SwipeDir) => void;
  advance: (dir: SwipeDir, action: RateAction) => void;
}

interface SwipeHandlers {
  onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: ReactPointerEvent<HTMLDivElement>) => void;
}

export function useCardSwipe(ctx: SwipeCtx): SwipeHandlers {
  const dragRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  function canDrag(): boolean {
    const { card, flipped, mcqState } = ctx;
    if (!card) return false;
    if (card.kind === 'flip') return flipped;
    if (!mcqState?.locked) return false;
    return mcqState.correct !== true;
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>): void {
    if (e.target instanceof Element && e.target.closest('button')) return;
    if (!canDrag()) return;
    dragRef.current = { x: e.clientX, y: e.clientY, active: true };
    ctx.cardRef.current?.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>): void {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    const el = ctx.cardRef.current;
    if (el) {
      el.style.transition = 'none';
      el.style.transform = `${ctx.flipped ? 'rotateY(180deg) ' : ''}translateX(${dx}px) rotate(${dx * 0.05}deg)`;
    }
    if (dx > 60) ctx.setHint('right');
    else if (dx < -60) ctx.setHint('left');
    else ctx.setHint(null);
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>): void {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current.active = false;
    const el = ctx.cardRef.current;
    if (el) {
      el.style.transition = '';
      el.style.transform = '';
    }
    ctx.setHint(null);
    if (dx > 110) ctx.advance('right', 'good');
    else if (dx < -110) ctx.advance('left', 'again');
  }

  return { onPointerDown, onPointerMove, onPointerUp };
}

interface KeyCtx {
  card: SessionCard | undefined;
  flipped: boolean;
  mcqState: McqState;
  onExit: () => void;
  setFlipped: (fn: (f: boolean) => boolean) => void;
  submitMcq: () => void;
  advance: (dir: SwipeDir, action: RateAction) => void;
}

function isTextInput(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
}

function handlePreActionKey(e: KeyboardEvent, ctx: KeyCtx): boolean {
  if (e.code === 'Escape') {
    ctx.onExit();
    return true;
  }
  if (e.code === 'Space' && ctx.card?.kind === 'flip') {
    e.preventDefault();
    ctx.setFlipped((f) => !f);
    return true;
  }
  if (e.code === 'Enter' && ctx.card?.kind === 'mcq' && !ctx.mcqState?.locked) {
    e.preventDefault();
    ctx.submitMcq();
    return true;
  }
  return false;
}

function handleRateKey(e: KeyboardEvent, advance: KeyCtx['advance']): void {
  if (e.code === 'ArrowRight') advance('right', 'good');
  else if (e.code === 'ArrowDown') advance('left', 'hard');
  else if (e.code === 'ArrowLeft') advance('left', 'again');
}

export function useStudyKeyboard(ctx: KeyCtx): void {
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (isTextInput(e.target)) return;
      if (!ctx.card) return;
      if (handlePreActionKey(e, ctx)) return;
      const ready = ctx.flipped || (ctx.mcqState?.locked ?? false);
      if (!ready) return;
      // Correct MCQs self-advance — block manual rating to avoid double counts.
      if (ctx.card.kind === 'mcq' && ctx.mcqState?.correct === true) return;
      handleRateKey(e, ctx.advance);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [ctx]);
}
