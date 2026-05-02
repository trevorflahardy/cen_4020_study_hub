// Home / Topic grid screen
const { useState, useMemo } = React;

function HomeScreen({ onPickTopic, density }) {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return TOPICS;
    if (filter === 'inprogress') return TOPICS.filter(t => t.mastered > 0 && t.mastered < t.cards);
    if (filter === 'new') return TOPICS.filter(t => t.mastered === 0);
    if (filter === 'mastered') return TOPICS.filter(t => t.mastered / t.cards >= 0.8);
    return TOPICS;
  }, [filter]);

  const totalCards = TOPICS.reduce((s, t) => s + t.cards, 0);
  const totalMastered = TOPICS.reduce((s, t) => s + t.mastered, 0);

  return (
    <div className="page">
      <section className="hero">
        <FloatShapes />
        <h1>
          Software Engineering,<br />
          <span className="underline">
            <span className="wiggle">memorized</span>
            <svg viewBox="0 0 320 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 8 C 50 2, 110 14, 160 8 S 270 2, 318 8" stroke="#FF7A6A" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </span>{' '}
          for finals.
        </h1>
        <p>
          Bite-sized flashcards across every CEN&nbsp;4020 topic. Flip, swipe, or tap your way to a perfect score — five minutes at a time.
        </p>
        <div className="hero-stats">
          <span className="stat-chip"><span className="stat-chip-num">{TOPICS.length}</span> topics</span>
          <span className="stat-chip"><span className="stat-chip-num">{totalCards}</span> cards</span>
          <span className="stat-chip"><span style={{fontSize: 16}}>🔥</span><span className="stat-chip-num">7</span> day streak</span>
          <span className="stat-chip"><span className="stat-chip-num">{Math.round(totalMastered / totalCards * 100)}%</span> mastered</span>
        </div>
      </section>

      <div className="section-head">
        <h2>Browse topics</h2>
        <div className="filter-row">
          {[
            ['all', 'All'],
            ['inprogress', 'In progress'],
            ['new', 'Not started'],
            ['mastered', 'Nearly mastered'],
          ].map(([k, label]) => (
            <button
              key={k}
              className={`chip ${filter === k ? 'is-active' : ''}`}
              onClick={() => setFilter(k)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="topic-grid">
        {filtered.map((t, i) => (
          <TopicCard key={t.id} topic={t} idx={i} onClick={() => onPickTopic(t)} />
        ))}
      </div>
    </div>
  );
}

function TopicCard({ topic, idx, onClick }) {
  const pct = Math.round(topic.mastered / topic.cards * 100);
  return (
    <button
      className="topic-card"
      style={{
        '--card-bg': topic.color,
        '--card-accent': topic.accent,
        animation: `pageIn .5s cubic-bezier(.34,1.56,.64,1) both`,
        animationDelay: `${idx * 60}ms`,
      }}
      onClick={onClick}
    >
      <GlyphBg shape={topic.glyph} color={topic.accent} />
      <div className="topic-emoji">{topic.emoji}</div>
      <h3>{topic.name}</h3>
      <p className="topic-short">{topic.short}</p>
      <div className="topic-meta">
        <span className="count">{topic.mastered} / {topic.cards}</span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="pct">{pct}%</span>
      </div>
    </button>
  );
}

function GlyphBg({ shape, color }) {
  // decorative svg glyph behind topic cards
  const stroke = color;
  const sw = 4;
  let path;
  switch (shape) {
    case 'wave':    path = <path d="M5 50 Q 25 20, 50 50 T 95 50" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round"/>; break;
    case 'sprint':  path = <path d="M20 70 L 50 30 L 80 70 M30 70 L60 30" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>; break;
    case 'list':    path = <g stroke={stroke} strokeWidth={sw} strokeLinecap="round" fill="none"><line x1="20" y1="30" x2="80" y2="30"/><line x1="20" y1="50" x2="70" y2="50"/><line x1="20" y1="70" x2="60" y2="70"/></g>; break;
    case 'puzzle':  path = <path d="M25 25 H 50 V 35 A 5 5 0 0 0 60 35 V 25 H 75 V 50 H 65 A 5 5 0 0 0 65 60 H 75 V 75 H 25 Z" stroke={stroke} strokeWidth={sw} fill="none" strokeLinejoin="round"/>; break;
    case 'star':    path = <path d="M50 15 L 60 40 L 85 42 L 65 60 L 72 85 L 50 70 L 28 85 L 35 60 L 15 42 L 40 40 Z" stroke={stroke} strokeWidth={sw} fill="none" strokeLinejoin="round"/>; break;
    case 'diagram': path = <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round"><rect x="20" y="20" width="25" height="25" rx="4"/><rect x="55" y="55" width="25" height="25" rx="4"/><line x1="45" y1="32" x2="68" y2="55"/></g>; break;
    case 'flask':   path = <path d="M40 18 V 38 L 22 75 A 6 6 0 0 0 28 84 H 72 A 6 6 0 0 0 78 75 L 60 38 V 18" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>; break;
    case 'bars':    path = <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round"><line x1="22" y1="78" x2="22" y2="58"/><line x1="40" y1="78" x2="40" y2="40"/><line x1="58" y1="78" x2="58" y2="50"/><line x1="76" y1="78" x2="76" y2="28"/></g>; break;
    case 'scale':   path = <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="50" y1="20" x2="50" y2="80"/><line x1="25" y1="80" x2="75" y2="80"/><path d="M20 35 L 50 35 L 35 60 A 15 15 0 0 0 65 60 L 50 35 L 80 35"/></g>; break;
    default:        path = <circle cx="50" cy="50" r="30" stroke={stroke} strokeWidth={sw} fill="none"/>;
  }
  return (
    <svg className="glyph" viewBox="0 0 100 100" aria-hidden="true">{path}</svg>
  );
}

function FloatShapes() {
  return (
    <React.Fragment>
      <svg className="float-shape s1" style={{'--r': '12deg'}} width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r="30" fill="#FFE26A" stroke="#1B1230" strokeWidth="3"/>
        <circle cx="32" cy="34" r="3" fill="#1B1230"/>
        <circle cx="48" cy="34" r="3" fill="#1B1230"/>
        <path d="M30 50 Q 40 58, 50 50" stroke="#1B1230" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
      <svg className="float-shape s2" style={{'--r': '-8deg'}} width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 6 L 40 24 L 60 26 L 45 40 L 50 60 L 32 50 L 14 60 L 19 40 L 4 26 L 24 24 Z" fill="#FF8FB8" stroke="#1B1230" strokeWidth="3" strokeLinejoin="round"/>
      </svg>
      <svg className="float-shape s3" style={{'--r': '4deg'}} width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
        <rect x="10" y="10" width="52" height="52" rx="14" fill="#8DE8B0" stroke="#1B1230" strokeWidth="3" transform="rotate(8 36 36)"/>
      </svg>
    </React.Fragment>
  );
}

Object.assign(window, { HomeScreen });
