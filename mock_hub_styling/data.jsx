// Topic + flashcard data for CEN 4020 Software Engineering
// Mix of "flip" and "mcq" question types per the user's spec

const TOPICS = [
  {
    id: 'sdlc',
    name: 'SDLC & Process Models',
    short: 'Lifecycles, Waterfall, Agile, Spiral, V-Model',
    emoji: '🌀',
    color: '#FFD6E8', // pink
    accent: '#E0388E',
    glyph: 'wave',
    cards: 24,
    mastered: 18,
  },
  {
    id: 'agile',
    name: 'Agile & Scrum',
    short: 'Sprints, ceremonies, roles, stories',
    emoji: '🏃',
    color: '#D6F0FF',
    accent: '#1F7AE0',
    glyph: 'sprint',
    cards: 32,
    mastered: 12,
  },
  {
    id: 'requirements',
    name: 'Requirements Engineering',
    short: 'Elicitation, SRS, functional vs. non-functional',
    emoji: '📋',
    color: '#FFE9C7',
    accent: '#E07A1F',
    glyph: 'list',
    cards: 18,
    mastered: 9,
  },
  {
    id: 'design',
    name: 'Software Design',
    short: 'Architecture, modularity, cohesion, coupling',
    emoji: '🧩',
    color: '#E2DCFF',
    accent: '#6448E0',
    glyph: 'puzzle',
    cards: 28,
    mastered: 22,
  },
  {
    id: 'patterns',
    name: 'Design Patterns',
    short: 'GoF, MVC, Singleton, Observer, Factory',
    emoji: '✨',
    color: '#D7F7E1',
    accent: '#1FA85A',
    glyph: 'star',
    cards: 23,
    mastered: 5,
  },
  {
    id: 'uml',
    name: 'UML & Modeling',
    short: 'Class, sequence, use-case, state diagrams',
    emoji: '📐',
    color: '#FFE0E0',
    accent: '#E0383A',
    glyph: 'diagram',
    cards: 19,
    mastered: 14,
  },
  {
    id: 'testing',
    name: 'Testing & QA',
    short: 'Unit, integration, TDD, coverage, V&V',
    emoji: '🧪',
    color: '#E0F7FF',
    accent: '#1FA8C1',
    glyph: 'flask',
    cards: 26,
    mastered: 0,
  },
  {
    id: 'metrics',
    name: 'Metrics & Estimation',
    short: 'COCOMO, function points, LOC, velocity',
    emoji: '📊',
    color: '#F5DCFF',
    accent: '#9748E0',
    glyph: 'bars',
    cards: 14,
    mastered: 3,
  },
  {
    id: 'ethics',
    name: 'Ethics & Professional Practice',
    short: 'ACM/IEEE code, accessibility, bias',
    emoji: '⚖️',
    color: '#FFF6CC',
    accent: '#C19A1F',
    glyph: 'scale',
    cards: 11,
    mastered: 8,
  },
];

// A small placeholder deck used by the study view. Each item has a `kind`:
// "flip" → classic flashcard; "mcq" → multiple choice with the same flip mechanic on review.
const STUDY_DECK = [
  {
    kind: 'flip',
    front: 'What does SDLC stand for?',
    back: 'Software Development Life Cycle — the structured sequence of phases (planning, analysis, design, implementation, testing, deployment, maintenance) used to produce software.',
    tag: 'SDLC · Definition',
  },
  {
    kind: 'mcq',
    front: 'Which Agile ceremony is held to inspect & adapt the team\'s process?',
    options: [
      'Sprint Planning',
      'Daily Stand-up',
      'Sprint Retrospective',
      'Sprint Review',
    ],
    answer: 2,
    explain: 'The Retrospective focuses on the *team\'s process*. The Review focuses on the *product*.',
    tag: 'Agile · Ceremonies',
  },
  {
    kind: 'flip',
    front: 'Define cohesion (in software design).',
    back: 'The degree to which the elements *inside* a module belong together. High cohesion = focused, single-purpose modules. Aim for high cohesion + low coupling.',
    tag: 'Design · Principles',
  },
  {
    kind: 'mcq',
    front: 'Which design pattern ensures a class has only one instance?',
    options: ['Factory', 'Observer', 'Singleton', 'Adapter'],
    answer: 2,
    explain: 'Singleton restricts instantiation to a single object and provides a global access point.',
    tag: 'Patterns · Creational',
  },
  {
    kind: 'flip',
    front: 'What is a non-functional requirement?',
    back: 'A constraint on *how* the system performs its functions — performance, security, usability, reliability, scalability — rather than *what* it does.',
    tag: 'Requirements · NFR',
  },
  {
    kind: 'mcq',
    front: 'In TDD, what comes first?',
    options: [
      'Write production code',
      'Write a failing test',
      'Refactor existing code',
      'Write documentation',
    ],
    answer: 1,
    explain: 'Red → Green → Refactor. You always start with a failing test that describes the desired behavior.',
    tag: 'Testing · TDD',
  },
  {
    kind: 'flip',
    front: 'What is technical debt?',
    back: 'The implied future cost of choosing a quick or easy solution now instead of a better approach that would take longer. It compounds — interest = slower future development.',
    tag: 'Practice · Debt',
  },
  {
    kind: 'mcq',
    front: 'Which UML diagram shows messages exchanged between objects over time?',
    options: ['Class diagram', 'Sequence diagram', 'Use-case diagram', 'State diagram'],
    answer: 1,
    explain: 'Sequence diagrams place objects across the top and show messages flowing down a time axis.',
    tag: 'UML · Behavioral',
  },
];

// Recent activity for the dashboard
const ACTIVITY = [
  { day: 'Mon', cards: 24, xp: 120 },
  { day: 'Tue', cards: 41, xp: 205 },
  { day: 'Wed', cards: 18, xp: 90 },
  { day: 'Thu', cards: 56, xp: 280 },
  { day: 'Fri', cards: 33, xp: 165 },
  { day: 'Sat', cards: 12, xp: 60 },
  { day: 'Sun', cards: 47, xp: 235 },
];

const ACHIEVEMENTS = [
  { id: 'streak7',  label: '7-day streak',  icon: '🔥', earned: true },
  { id: 'first100', label: 'First 100 cards', icon: '💯', earned: true },
  { id: 'perfect',  label: 'Perfect deck',  icon: '⭐', earned: true },
  { id: 'nightowl', label: 'Night owl',     icon: '🌙', earned: false },
  { id: 'speed',    label: 'Speed demon',   icon: '⚡', earned: false },
  { id: 'master',   label: 'Topic master',  icon: '👑', earned: false },
];

Object.assign(window, { TOPICS, STUDY_DECK, ACTIVITY, ACHIEVEMENTS });
