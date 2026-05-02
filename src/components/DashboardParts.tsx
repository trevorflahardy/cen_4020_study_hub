import { type CSSProperties, type JSX } from 'react';
import { type Deck, type HeatmapResult } from '../types';

export interface EnrichedDeck extends Deck {
  count: number;
  known: number;
  missed: number;
}

export interface ActivityBucket {
  day: string;
  cards: number;
  xp: number;
}

export interface Achievement {
  id: string;
  label: string;
  icon: string;
  earned: boolean;
}

export const BAR_COLORS = [
  '#FF8FB8',
  '#FFB877',
  '#FFE26A',
  '#8DE8B0',
  '#8FCBFF',
  '#C8A8FF',
  '#FF7A6A',
] as const;

export function DashboardHeader(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginTop: 12,
        marginBottom: 24,
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 52px)',
          letterSpacing: '-0.03em',
          margin: 0,
        }}
      >
        Your progress
      </h1>
      <p style={{ color: 'var(--ink-soft)', margin: 0 }}>
        CEN 4020 · Spring 2026 · Final exam prep
      </p>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  bg: string;
  icon: string;
}

export function StatCard({ label, value, delta, bg, icon }: StatCardProps): JSX.Element {
  return (
    <div className="stat-card" style={{ background: bg }}>
      <span className="stat-icon">{icon}</span>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="delta up">{delta}</div>
    </div>
  );
}

interface WeeklyBarsProps {
  activity: ActivityBucket[];
}

export function WeeklyBars({ activity }: WeeklyBarsProps): JSX.Element {
  const maxBar = Math.max(1, ...activity.map((a) => a.cards));
  const totalCards = activity.reduce((s, a) => s + a.cards, 0);
  const totalXp = activity.reduce((s, a) => s + a.xp, 0);
  return (
    <div className="panel tall">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 4,
        }}
      >
        <h3>This week</h3>
        <div style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 600 }}>
          <strong
            style={{
              color: 'var(--ink)',
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              marginRight: 8,
            }}
          >
            {totalCards}
          </strong>
          cards · {totalXp} XP
        </div>
      </div>
      <div className="bars">
        {activity.map((a, i) => {
          const barStyle = {
            height: `${(a.cards / maxBar) * 100}%`,
            '--bar-bg': BAR_COLORS[i % BAR_COLORS.length],
            '--d': `${i * 80}ms`,
          } as CSSProperties;
          return (
            <div className="bar-col" key={a.day}>
              <div className="bar" style={barStyle} title={`${a.cards} cards · ${a.xp} XP`} />
              <span className="bar-label">{a.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface LevelPanelProps {
  level: number;
  levelName: string;
  xpTotal: number;
  xpForNext: number;
  levelPct: number;
  achievements: Achievement[];
}

export function LevelPanel({
  level,
  levelName,
  xpTotal,
  xpForNext,
  levelPct,
  achievements,
}: LevelPanelProps): JSX.Element {
  return (
    <div className="panel">
      <h3>Level up</h3>
      <div className="level-meter">
        <div className="level-head">
          <div className="level-badge">{level}</div>
          <div>
            <div className="level-name">{levelName}</div>
            <div className="level-sub">
              {Math.max(0, xpForNext - xpTotal)} XP to level {level + 1}
            </div>
          </div>
        </div>
        <div className="level-bar">
          <div className="level-bar-fill" style={{ width: `${levelPct}%` }} />
        </div>
        <div className="level-meta">
          <span>{xpTotal} XP</span>
          <span>{xpForNext} XP</span>
        </div>

        <div style={{ marginTop: 8 }}>
          <h3 style={{ fontSize: 16, marginBottom: 10 }}>Achievements</h3>
          <div className="ach-grid">
            {achievements.map((a) => (
              <div key={a.id} className={`ach ${a.earned ? '' : 'locked'}`} title={a.label}>
                <div className="ach-icon">{a.icon}</div>
                <div className="ach-label">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeatLegend(): JSX.Element {
  const cellStyle: CSSProperties = { width: 14, height: 14, display: 'inline-block' };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        color: 'var(--ink-soft)',
        fontWeight: 600,
      }}
    >
      Less
      <span className="heat-cell" style={cellStyle} />
      <span className="heat-cell" data-h="1" style={cellStyle} />
      <span className="heat-cell" data-h="2" style={cellStyle} />
      <span className="heat-cell" data-h="3" style={cellStyle} />
      <span className="heat-cell" data-h="4" style={cellStyle} />
      More
    </div>
  );
}

interface HeatmapPanelProps {
  heat: HeatmapResult;
}

export function HeatmapPanel({ heat }: HeatmapPanelProps): JSX.Element {
  return (
    <div className="panel" style={{ marginTop: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 12,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <h3>Study heatmap · last 7 days</h3>
        <HeatLegend />
      </div>
      <div className="heatmap-week">
        {heat.rows.map(({ key, day, hours, levels }) => (
          <div className="heat-row" key={key}>
            <span className="heat-day-label">{day}</span>
            <div className="heat-row-cells">
              {levels.map((lvl, h) => {
                const count = hours[h] ?? 0;
                const hourLabel = `${((h + 11) % 12) + 1}${h < 12 ? 'a' : 'p'}`;
                return (
                  <div
                    key={h}
                    className="heat-cell"
                    data-h={lvl || undefined}
                    title={`${day} · ${hourLabel} · ${count} ${count === 1 ? 'review' : 'reviews'}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <div className="heat-axis">
          <span></span>
          <div className="heat-axis-row">
            <span>12a</span>
            <span>6a</span>
            <span>12p</span>
            <span>6p</span>
            <span>11p</span>
          </div>
        </div>
      </div>
      {heat.max === 0 && (
        <p style={{ marginTop: 12, fontSize: 13, color: 'var(--ink-soft)' }}>
          No reviews yet — finish a few cards and they'll light up here.
        </p>
      )}
    </div>
  );
}

interface MasteryByTopicProps {
  enriched: EnrichedDeck[];
}

export function MasteryByTopic({ enriched }: MasteryByTopicProps): JSX.Element {
  return (
    <div className="panel" style={{ marginTop: 20 }}>
      <h3>Mastery by topic</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
        {enriched.map((t) => (
          <MasteryRow key={t.id} topic={t} />
        ))}
      </div>
    </div>
  );
}

function MasteryRow({ topic }: { topic: EnrichedDeck }): JSX.Element {
  const pct = topic.count ? Math.round((topic.known / topic.count) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div
        className="topic-emoji"
        style={{
          width: 40,
          height: 40,
          fontSize: 20,
          flex: '0 0 40px',
          boxShadow: '2px 2px 0 0 var(--ink)',
        }}
      >
        {topic.emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <strong style={{ fontSize: 14 }}>{topic.name}</strong>
          <span style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600 }}>
            {topic.known}/{topic.count}
          </span>
        </div>
        <div className="progress-track" style={{ height: 12 }}>
          <div
            className="progress-fill"
            style={{ width: `${pct}%`, background: topic.accent }}
          />
        </div>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 18,
          minWidth: 50,
          textAlign: 'right',
        }}
      >
        {pct}%
      </span>
    </div>
  );
}
