import { useMemo, type JSX } from 'react';
import { DECKS } from '../data/decks';
import {
  getDailyTotals,
  getDeckProgress,
  getHeatmap,
  getStreak,
  totalMastered,
} from '../lib/progress';
import { type HeatmapResult } from '../types';
import {
  type ActivityBucket,
  type Achievement,
  type EnrichedDeck,
  DashboardHeader,
  HeatmapPanel,
  LevelPanel,
  MasteryByTopic,
  StatCard,
  WeeklyBars,
} from './DashboardParts';

const LEVEL_NAMES = [
  'Apprentice',
  'Junior Dev',
  'Engineer',
  'Senior Engineer',
  'Tech Lead',
  'Principal',
  'Architect',
  'Distinguished',
  'Fellow',
  'Legend',
] as const;

export default function DashboardScreen(): JSX.Element {
  const enriched = useMemo<EnrichedDeck[]>(
    () =>
      DECKS.map((d) => {
        const prog = getDeckProgress(d.id);
        return {
          ...d,
          count: d.cards.length,
          known: prog.known.length,
          missed: prog.missed.length,
        };
      }),
    [],
  );

  const totalCards = enriched.reduce((s, d) => s + d.count, 0);
  const mastered = totalMastered(DECKS);
  const accuracy = computeAccuracy(enriched);
  const streak = getStreak();

  const activity = useMemo<ActivityBucket[]>(
    () =>
      getDailyTotals(7).map((b) => ({
        day: b.day,
        cards: b.count,
        xp: b.count * 25,
      })),
    [],
  );

  const heat: HeatmapResult = useMemo(() => getHeatmap(7), []);

  const xpTotal = mastered * 25;
  const xpForNext = 250 * Math.ceil((xpTotal + 1) / 250);
  const xpFloor = xpForNext - 250;
  const level = Math.floor(xpTotal / 250) + 1;
  const levelPct = ((xpTotal - xpFloor) / 250) * 100;
  const levelName =
    LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)] ?? 'Apprentice';

  const achievements: Achievement[] = [
    { id: 'first', label: 'First card', icon: '🌱', earned: mastered >= 1 },
    { id: 'ten', label: '10 cards', icon: '🌟', earned: mastered >= 10 },
    { id: 'fifty', label: '50 cards', icon: '🚀', earned: mastered >= 50 },
    { id: 'streak3', label: '3-day streak', icon: '🔥', earned: streak.count >= 3 },
    { id: 'streak7', label: '7-day streak', icon: '👑', earned: streak.count >= 7 },
    {
      id: 'master',
      label: 'Topic master',
      icon: '🏆',
      earned: enriched.some((d) => d.count > 0 && d.known === d.count),
    },
  ];

  return (
    <div className="page">
      <DashboardHeader />

      <div className="stat-grid">
        <StatCard
          label="Day streak"
          value={String(streak.count || 0)}
          delta={streak.count >= 3 ? '🔥 keep it going' : 'Study daily'}
          bg="var(--lemon)"
          icon="🔥"
        />
        <StatCard
          label="Total XP"
          value={String(xpTotal)}
          delta={`Level ${level} · ${levelName}`}
          bg="var(--pink)"
          icon="⚡"
        />
        <StatCard
          label="Cards mastered"
          value={`${mastered}/${totalCards}`}
          delta={`${totalCards - mastered} to go`}
          bg="var(--mint)"
          icon="🎯"
        />
        <StatCard
          label="Accuracy"
          value={`${accuracy}%`}
          delta={accuracy >= 80 ? 'Looking sharp' : 'Keep practicing'}
          bg="var(--sky)"
          icon="✅"
        />
      </div>

      <div className="dash-grid" style={{ marginTop: 20 }}>
        <WeeklyBars activity={activity} />
        <LevelPanel
          level={level}
          levelName={levelName}
          xpTotal={xpTotal}
          xpForNext={xpForNext}
          levelPct={levelPct}
          achievements={achievements}
        />
      </div>

      <HeatmapPanel heat={heat} />

      <MasteryByTopic enriched={enriched} />
    </div>
  );
}

function computeAccuracy(enriched: EnrichedDeck[]): number {
  const knownSum = enriched.reduce((s, d) => s + d.known, 0);
  const seen = enriched.reduce((s, d) => s + d.known + d.missed, 0);
  return seen ? Math.round((knownSum / seen) * 100) : 0;
}
