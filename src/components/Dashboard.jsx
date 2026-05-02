import { useMemo } from 'react';
import { DECKS } from '../data/decks.js';
import {
  getDailyTotals,
  getDeckProgress,
  getHeatmap,
  getStreak,
  totalMastered,
} from '../lib/progress.js';

export default function DashboardScreen() {
  const enriched = useMemo(
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
  const accuracy = (() => {
    const knownSum = enriched.reduce((s, d) => s + d.known, 0);
    const seen = enriched.reduce((s, d) => s + d.known + d.missed, 0);
    return seen ? Math.round((knownSum / seen) * 100) : 0;
  })();
  const streak = getStreak();

  // Real per-day review counts for the last 7 days, oldest first.
  const activity = useMemo(
    () => getDailyTotals(7).map((b) => ({ day: b.day, cards: b.count, xp: b.count * 25 })),
    [],
  );

  const maxBar = Math.max(1, ...activity.map((a) => a.cards));
  const barColors = ['#FF8FB8', '#FFB877', '#FFE26A', '#8DE8B0', '#8FCBFF', '#C8A8FF', '#FF7A6A'];

  // Real 7×24 heatmap from the activity log; levels are normalized to the
  // busiest cell in the window so the gradient adapts to each user's volume.
  const { rows: heat, max: heatMax } = useMemo(() => getHeatmap(7), []);

  const xpTotal = mastered * 25;
  const xpForNext = 250 * Math.ceil((xpTotal + 1) / 250);
  const xpFloor = xpForNext - 250;
  const level = Math.floor(xpTotal / 250) + 1;
  const levelPct = ((xpTotal - xpFloor) / 250) * 100;
  const levelName = LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];

  const achievements = [
    { id: 'first', label: 'First card', icon: '🌱', earned: mastered >= 1 },
    { id: 'ten', label: '10 cards', icon: '🌟', earned: mastered >= 10 },
    { id: 'fifty', label: '50 cards', icon: '🚀', earned: mastered >= 50 },
    { id: 'streak3', label: '3-day streak', icon: '🔥', earned: streak.count >= 3 },
    { id: 'streak7', label: '7-day streak', icon: '👑', earned: streak.count >= 7 },
    { id: 'master', label: 'Topic master', icon: '🏆', earned: enriched.some((d) => d.count > 0 && d.known === d.count) },
  ];

  return (
    <div className="page">
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
        <p style={{ color: 'var(--ink-soft)', margin: 0 }}>CEN 4020 · Spring 2026 · Final exam prep</p>
      </div>

      <div className="stat-grid">
        <StatCard label="Day streak" value={String(streak.count || 0)} delta={streak.count >= 3 ? '🔥 keep it going' : 'Study daily'} deltaUp bg="var(--lemon)" icon="🔥" />
        <StatCard label="Total XP" value={String(xpTotal)} delta={`Level ${level} · ${levelName}`} deltaUp bg="var(--pink)" icon="⚡" />
        <StatCard label="Cards mastered" value={`${mastered}/${totalCards}`} delta={`${totalCards - mastered} to go`} deltaUp bg="var(--mint)" icon="🎯" />
        <StatCard label="Accuracy" value={`${accuracy}%`} delta={accuracy >= 80 ? 'Looking sharp' : 'Keep practicing'} deltaUp bg="var(--sky)" icon="✅" />
      </div>

      <div className="dash-grid" style={{ marginTop: 20 }}>
        <div className="panel tall">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <h3>This week</h3>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 600 }}>
              <strong style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: 18, marginRight: 8 }}>
                {activity.reduce((s, a) => s + a.cards, 0)}
              </strong>
              cards · {activity.reduce((s, a) => s + a.xp, 0)} XP
            </div>
          </div>
          <div className="bars">
            {activity.map((a, i) => (
              <div className="bar-col" key={a.day}>
                <div
                  className="bar"
                  style={{
                    height: `${(a.cards / maxBar) * 100}%`,
                    '--bar-bg': barColors[i],
                    '--d': `${i * 80}ms`,
                  }}
                  title={`${a.cards} cards · ${a.xp} XP`}
                />
                <span className="bar-label">{a.day}</span>
              </div>
            ))}
          </div>
        </div>

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
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <h3>Study heatmap · last 7 days</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600 }}>
            Less
            <span className="heat-cell" style={{ width: 14, height: 14, display: 'inline-block' }} />
            <span className="heat-cell" data-h="1" style={{ width: 14, height: 14, display: 'inline-block' }} />
            <span className="heat-cell" data-h="2" style={{ width: 14, height: 14, display: 'inline-block' }} />
            <span className="heat-cell" data-h="3" style={{ width: 14, height: 14, display: 'inline-block' }} />
            <span className="heat-cell" data-h="4" style={{ width: 14, height: 14, display: 'inline-block' }} />
            More
          </div>
        </div>
        <div className="heatmap-week">
          {heat.map(({ key, day, hours, levels }) => (
            <div className="heat-row" key={key}>
              <span className="heat-day-label">{day}</span>
              <div className="heat-row-cells">
                {levels.map((lvl, h) => {
                  const count = hours[h];
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
        {heatMax === 0 && (
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--ink-soft)' }}>
            No reviews yet — finish a few cards and they'll light up here.
          </p>
        )}
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h3>Mastery by topic</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
          {enriched.map((t) => {
            const pct = t.count ? Math.round((t.known / t.count) * 100) : 0;
            return (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="topic-emoji" style={{ width: 40, height: 40, fontSize: 20, flex: '0 0 40px', boxShadow: '2px 2px 0 0 var(--ink)' }}>
                  {t.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <strong style={{ fontSize: 14 }}>{t.name}</strong>
                    <span style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600 }}>
                      {t.known}/{t.count}
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: 12 }}>
                    <div className="progress-fill" style={{ width: `${pct}%`, background: t.accent }} />
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
          })}
        </div>
      </div>
    </div>
  );
}

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
];

function StatCard({ label, value, delta, deltaUp, bg, icon }) {
  return (
    <div className="stat-card" style={{ background: bg }}>
      <span className="stat-icon">{icon}</span>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className={`delta ${deltaUp ? 'up' : ''}`}>{delta}</div>
    </div>
  );
}
