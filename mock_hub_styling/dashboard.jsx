// Progress / stats dashboard
const { useMemo: useDashMemo } = React;

function DashboardScreen() {
  const totalCards = TOPICS.reduce((s, t) => s + t.cards, 0);
  const totalMastered = TOPICS.reduce((s, t) => s + t.mastered, 0);
  const weekTotal = ACTIVITY.reduce((s, a) => s + a.cards, 0);
  const weekXp = ACTIVITY.reduce((s, a) => s + a.xp, 0);

  // last 7 days heatmap — one cell per day, hour-of-day breakdown (24 cells per day)
  const heat = useDashMemo(() => {
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    return days.map((day, di) => {
      const hours = [];
      for (let h = 0; h < 24; h++) {
        const r = Math.sin((di * 31 + h) * 12.9898) * 43758.5453;
        const v = r - Math.floor(r);
        let lvl = 0;
        // bias studying toward 9am-11pm
        const awake = h >= 9 && h <= 23;
        if (awake) {
          if (v > 0.40) lvl = 1;
          if (v > 0.60) lvl = 2;
          if (v > 0.78) lvl = 3;
          if (v > 0.90) lvl = 4;
        } else if (v > 0.85) lvl = 1;
        hours.push(lvl);
      }
      return { day, hours };
    });
  }, []);

  const maxBar = Math.max(...ACTIVITY.map(a => a.cards));
  const barColors = ['#FF8FB8', '#FFB877', '#FFE26A', '#8DE8B0', '#8FCBFF', '#C8A8FF', '#FF7A6A'];

  return (
    <div className="page">
      <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', flexWrap:'wrap', gap: 16, marginTop: 12, marginBottom: 24}}>
        <h1 style={{fontFamily:'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing:'-0.03em', margin: 0}}>
          Your progress
        </h1>
        <p style={{color:'var(--ink-soft)', margin: 0}}>Week of Apr 27 — May 3 · Spring 2026</p>
      </div>

      <div className="stat-grid">
        <StatCard label="Day streak" value="7" delta="🔥 personal best" deltaUp bg="var(--lemon)" icon="🔥" />
        <StatCard label="Total XP" value="2,840" delta="+1,155 this week" deltaUp bg="var(--pink)" icon="⚡" />
        <StatCard label="Cards mastered" value={`${totalMastered}/${totalCards}`} delta="+18 this week" deltaUp bg="var(--mint)" icon="🎯" />
        <StatCard label="Accuracy" value="87%" delta="+4% vs. last wk" deltaUp bg="var(--sky)" icon="✅" />
      </div>

      <div className="dash-grid" style={{marginTop: 20}}>
        <div className="panel tall">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 4}}>
            <h3>This week</h3>
            <div style={{fontSize: 13, color:'var(--ink-soft)', fontWeight: 600}}>
              <strong style={{color:'var(--ink)', fontFamily:'var(--font-display)', fontSize: 18, marginRight: 8}}>{weekTotal}</strong>
              cards · {weekXp} XP
            </div>
          </div>
          <div className="bars">
            {ACTIVITY.map((a, i) => (
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
              <div className="level-badge">12</div>
              <div>
                <div className="level-name">Architect</div>
                <div className="level-sub">160 XP to level 13</div>
              </div>
            </div>
            <div className="level-bar">
              <div className="level-bar-fill" style={{width: '68%'}}/>
            </div>
            <div className="level-meta"><span>2,840 XP</span><span>3,000 XP</span></div>

            <div style={{marginTop: 8}}>
              <h3 style={{fontSize: 16, marginBottom: 10}}>Achievements</h3>
              <div className="ach-grid">
                {ACHIEVEMENTS.map(a => (
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

      <div className="panel" style={{marginTop: 20}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 12, flexWrap:'wrap', gap: 8}}>
          <h3>Study heatmap · last 7 days</h3>
          <div style={{display:'flex', alignItems:'center', gap: 8, fontSize: 12, color:'var(--ink-soft)', fontWeight: 600}}>
            Less
            <span className="heat-cell" style={{width: 14, height: 14, display:'inline-block'}}/>
            <span className="heat-cell" data-h="1" style={{width: 14, height: 14, display:'inline-block'}}/>
            <span className="heat-cell" data-h="2" style={{width: 14, height: 14, display:'inline-block'}}/>
            <span className="heat-cell" data-h="3" style={{width: 14, height: 14, display:'inline-block'}}/>
            <span className="heat-cell" data-h="4" style={{width: 14, height: 14, display:'inline-block'}}/>
            More
          </div>
        </div>
        <div className="heatmap-week">
          {heat.map(({day, hours}) => (
            <div className="heat-row" key={day}>
              <span className="heat-day-label">{day}</span>
              <div className="heat-row-cells">
                {hours.map((lvl, h) => (
                  <div key={h} className="heat-cell" data-h={lvl || undefined} title={`${day} · ${h}:00`}/>
                ))}
              </div>
            </div>
          ))}
          <div className="heat-axis">
            <span></span>
            <div className="heat-axis-row">
              <span>12a</span><span>6a</span><span>12p</span><span>6p</span><span>11p</span>
            </div>
          </div>
        </div>
      </div>

      <div className="panel" style={{marginTop: 20}}>
        <h3>Mastery by topic</h3>
        <div style={{display:'flex', flexDirection:'column', gap: 14, marginTop: 8}}>
          {TOPICS.map(t => {
            const pct = Math.round(t.mastered / t.cards * 100);
            return (
              <div key={t.id} style={{display:'flex', alignItems:'center', gap: 14}}>
                <div className="topic-emoji" style={{width: 40, height: 40, fontSize: 20, flex:'0 0 40px', boxShadow:'2px 2px 0 0 var(--ink)'}}>{t.emoji}</div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom: 4}}>
                    <strong style={{fontSize: 14}}>{t.name}</strong>
                    <span style={{fontSize: 12, color:'var(--ink-soft)', fontWeight: 600}}>{t.mastered}/{t.cards}</span>
                  </div>
                  <div className="progress-track" style={{height: 12}}>
                    <div className="progress-fill" style={{width: `${pct}%`, background: t.accent}}/>
                  </div>
                </div>
                <span style={{fontFamily:'var(--font-display)', fontWeight: 800, fontSize: 18, minWidth: 50, textAlign:'right'}}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, deltaUp, bg, icon }) {
  return (
    <div className="stat-card" style={{background: bg}}>
      <span className="stat-icon">{icon}</span>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className={`delta ${deltaUp ? 'up' : ''}`}>{delta}</div>
    </div>
  );
}

Object.assign(window, { DashboardScreen });
