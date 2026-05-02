// Main app — nav, routing, tweaks
const { useState: useAppState, useEffect: useAppEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "coral",
  "density": "cozy"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useAppState({ name: 'home' }); // {name, topic?}

  useAppEffect(() => {
    document.body.dataset.theme = t.theme;
    document.body.dataset.density = t.density;
  }, [t.theme, t.density]);

  const goHome = () => setRoute({ name: 'home' });
  const goStudy = (topic) => setRoute({ name: 'study', topic });
  const goDash = () => setRoute({ name: 'dash' });

  return (
    <div className="app">
      <div className="bg-squiggle"/>
      <div className="bg-dots"/>

      <nav className="nav">
        <button className="brand" onClick={goHome} style={{background:'none', border:'none', padding: 0, cursor:'pointer'}}>
          <div className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="#1B1230" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="3"/>
              <line x1="3" y1="11" x2="21" y2="11"/>
            </svg>
          </div>
          <span>Stackr<span style={{color:'var(--primary)'}}>.</span></span>
        </button>
        <div className="nav-links">
          <button className={`nav-link ${route.name === 'home' ? 'is-active' : ''}`} onClick={goHome}>Topics</button>
          <button className={`nav-link ${route.name === 'study' ? 'is-active' : ''}`} onClick={() => goStudy(null)}>Study</button>
          <button className={`nav-link ${route.name === 'dash' ? 'is-active' : ''}`} onClick={goDash}>Progress</button>
        </div>
        <div className="streak-pill" title="7-day streak">
          <span className="streak-flame">🔥</span>
          <span>7</span>
        </div>
        <div className="avatar" title="JS">JS</div>
      </nav>

      {route.name === 'home' && <HomeScreen onPickTopic={goStudy} density={t.density}/>}
      {route.name === 'study' && <StudyScreen topic={route.topic} onExit={goHome}/>}
      {route.name === 'dash' && <DashboardScreen/>}

      <TweaksPanel>
        <TweakSection label="Theme"/>
        <TweakRadio
          label="Accent"
          value={t.theme}
          options={['coral','grape','mint','sky','sunny']}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakSection label="Layout"/>
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact','cozy','roomy']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
