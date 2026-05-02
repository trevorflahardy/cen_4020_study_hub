import { useMemo, useState, type CSSProperties, type JSX } from 'react';
import { DECKS } from '../data/decks';
import { getDeckProgress, totalMastered, getStreak } from '../lib/progress';
import { type Deck } from '../types';

type FilterKey = 'all' | 'inprogress' | 'new' | 'mastered';

interface EnrichedDeck extends Deck {
  count: number;
  known: number;
  missed: number;
}

interface HomeScreenProps {
  onPickTopic: (deck: Deck) => void;
}

export default function HomeScreen({ onPickTopic }: HomeScreenProps): JSX.Element {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [version] = useState(0);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version],
  );

  const filtered = useMemo<EnrichedDeck[]>(() => {
    switch (filter) {
      case 'all':
        return enriched;
      case 'inprogress':
        return enriched.filter((t) => t.known > 0 && t.known < t.count);
      case 'new':
        return enriched.filter((t) => t.known === 0);
      case 'mastered':
        return enriched.filter((t) => t.count > 0 && t.known / t.count >= 0.8);
    }
  }, [enriched, filter]);

  const totalCards = enriched.reduce((s, d) => s + d.count, 0);
  const mastered = totalMastered(DECKS);
  const masteredPct = totalCards ? Math.round((mastered / totalCards) * 100) : 0;
  const streak = getStreak();

  const filters: readonly (readonly [FilterKey, string])[] = [
    ['all', 'All'],
    ['inprogress', 'In progress'],
    ['new', 'Not started'],
    ['mastered', 'Nearly mastered'],
  ];

  return (
    <div className="page">
      <section className="hero">
        <FloatShapes />
        <h1>
          Software Engineering,
          <br />
          <span className="underline">
            <span className="wiggle">memorized</span>
            <svg viewBox="0 0 320 14" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M2 8 C 50 2, 110 14, 160 8 S 270 2, 318 8"
                stroke="#FF7A6A"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>{' '}
          for finals.
        </h1>
        <p>
          Bite-sized flashcards across every red-dot topic on the CEN&nbsp;4020 final review.
          Flip, swipe, or tap your way to a perfect score — five minutes at a time.
        </p>
        <div className="hero-stats">
          <span className="stat-chip">
            <span className="stat-chip-num">{enriched.length}</span> topics
          </span>
          <span className="stat-chip">
            <span className="stat-chip-num">{totalCards}</span> cards
          </span>
          <span className="stat-chip">
            <span style={{ fontSize: 16 }}>🔥</span>
            <span className="stat-chip-num">{streak.count || 0}</span> day streak
          </span>
          <span className="stat-chip">
            <span className="stat-chip-num">{masteredPct}%</span> mastered
          </span>
        </div>
      </section>

      <div className="section-head">
        <h2>Browse topics</h2>
        <div className="filter-row">
          {filters.map(([k, label]) => (
            <button
              key={k}
              className={`chip ${filter === k ? 'is-active' : ''}`}
              onClick={() => {
                setFilter(k);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="topic-grid">
        {filtered.map((t, i) => (
          <TopicCard
            key={t.id}
            topic={t}
            idx={i}
            onClick={() => {
              onPickTopic(t);
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface TopicCardProps {
  topic: EnrichedDeck;
  idx: number;
  onClick: () => void;
}

function TopicCard({ topic, idx, onClick }: TopicCardProps): JSX.Element {
  const pct = topic.count ? Math.round((topic.known / topic.count) * 100) : 0;
  const cardStyle = {
    '--card-bg': topic.color,
    '--card-accent': topic.accent,
    animation: 'pageIn .5s cubic-bezier(.34,1.56,.64,1) both',
    animationDelay: `${idx * 60}ms`,
  } as CSSProperties;
  return (
    <button className="topic-card" style={cardStyle} onClick={onClick}>
      <GlyphBg shape={topic.glyph} color={topic.accent} />
      <div className="topic-emoji">{topic.emoji}</div>
      <h3>{topic.name}</h3>
      <p className="topic-short">{topic.short}</p>
      <div className="topic-meta">
        <span className="count">
          {topic.known} / {topic.count}
        </span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="pct">{pct}%</span>
      </div>
    </button>
  );
}

interface GlyphBgProps {
  shape: string;
  color: string;
}

function GlyphBg({ shape, color }: GlyphBgProps): JSX.Element {
  const stroke = color;
  const sw = 4;
  const path = glyphPath(shape, stroke, sw);
  return (
    <svg className="glyph" viewBox="0 0 100 100" aria-hidden="true">
      {path}
    </svg>
  );
}

function glyphPath(shape: string, stroke: string, sw: number): JSX.Element {
  switch (shape) {
    case 'wave':
      return (
        <path
          d="M5 50 Q 25 20, 50 50 T 95 50"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
        />
      );
    case 'sprint':
      return (
        <path
          d="M20 70 L 50 30 L 80 70 M30 70 L60 30"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'list':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinecap="round" fill="none">
          <line x1="20" y1="30" x2="80" y2="30" />
          <line x1="20" y1="50" x2="70" y2="50" />
          <line x1="20" y1="70" x2="60" y2="70" />
        </g>
      );
    case 'puzzle':
      return (
        <path
          d="M25 25 H 50 V 35 A 5 5 0 0 0 60 35 V 25 H 75 V 50 H 65 A 5 5 0 0 0 65 60 H 75 V 75 H 25 Z"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
          strokeLinejoin="round"
        />
      );
    case 'star':
      return (
        <path
          d="M50 15 L 60 40 L 85 42 L 65 60 L 72 85 L 50 70 L 28 85 L 35 60 L 15 42 L 40 40 Z"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
          strokeLinejoin="round"
        />
      );
    case 'diagram':
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">
          <rect x="20" y="20" width="25" height="25" rx="4" />
          <rect x="55" y="55" width="25" height="25" rx="4" />
          <line x1="45" y1="32" x2="68" y2="55" />
        </g>
      );
    case 'flask':
      return (
        <path
          d="M40 18 V 38 L 22 75 A 6 6 0 0 0 28 84 H 72 A 6 6 0 0 0 78 75 L 60 38 V 18"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'bars':
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">
          <line x1="22" y1="78" x2="22" y2="58" />
          <line x1="40" y1="78" x2="40" y2="40" />
          <line x1="58" y1="78" x2="58" y2="50" />
          <line x1="76" y1="78" x2="76" y2="28" />
        </g>
      );
    case 'scale':
      return (
        <g
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="50" y1="20" x2="50" y2="80" />
          <line x1="25" y1="80" x2="75" y2="80" />
          <path d="M20 35 L 50 35 L 35 60 A 15 15 0 0 0 65 60 L 50 35 L 80 35" />
        </g>
      );
    default:
      return <circle cx="50" cy="50" r="30" stroke={stroke} strokeWidth={sw} fill="none" />;
  }
}

function FloatShapes(): JSX.Element {
  const s1: CSSProperties = { '--r': '12deg' } as CSSProperties;
  const s2: CSSProperties = { '--r': '-8deg' } as CSSProperties;
  const s3: CSSProperties = { '--r': '4deg' } as CSSProperties;
  return (
    <>
      <svg
        className="float-shape s1"
        style={s1}
        width="80"
        height="80"
        viewBox="0 0 80 80"
        aria-hidden="true"
      >
        <circle cx="40" cy="40" r="30" fill="#FFE26A" stroke="#1B1230" strokeWidth="3" />
        <circle cx="32" cy="34" r="3" fill="#1B1230" />
        <circle cx="48" cy="34" r="3" fill="#1B1230" />
        <path
          d="M30 50 Q 40 58, 50 50"
          stroke="#1B1230"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="float-shape s2"
        style={s2}
        width="64"
        height="64"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M32 6 L 40 24 L 60 26 L 45 40 L 50 60 L 32 50 L 14 60 L 19 40 L 4 26 L 24 24 Z"
          fill="#FF8FB8"
          stroke="#1B1230"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="float-shape s3"
        style={s3}
        width="72"
        height="72"
        viewBox="0 0 72 72"
        aria-hidden="true"
      >
        <rect
          x="10"
          y="10"
          width="52"
          height="52"
          rx="14"
          fill="#8DE8B0"
          stroke="#1B1230"
          strokeWidth="3"
          transform="rotate(8 36 36)"
        />
      </svg>
    </>
  );
}
