import type { DocPage } from '../../types';

export const reverseEngineering: DocPage = {
  id: 'reverse-engineering',
  eyebrow: 'Software Maintenance',
  title: 'Software archaeology: reverse engineering the system',
  lede: 'Reverse engineering is a passive process — you analyze the existing software, you do not change it. Three goals: re-document, recover the design, recover the data model.',
  slide: 'Slide 81',
  lecture: 'Lesson 19',
  body: [
    {
      kind: 'definition',
      term: 'Reverse engineering',
      body: "A **passive process** that does **not** change the software. It analyzes the software to recover information that's lost or undocumented.",
    },
    { kind: 'h2', text: 'The three common goals' },
    {
      kind: 'list',
      items: [
        '**Re-documentation** — produce alternative views (e.g. diagrams) from source code, so future maintainers can read the system instead of guessing.',
        '**Design recovery** — extract the design decisions / abstractions from a system that has lost (or never had) explicit design documents.',
        '**Data Reverse Engineering** — recover the **data model** from the **physical database schemas**, especially when the original modeling docs are gone.',
      ],
    },
    { kind: 'h2', text: 'Software archaeology — recovering original intent' },
    {
      kind: 'p',
      text: 'Software archaeology is the focused discipline of **recovering what the original designers were thinking** and how a legacy system actually works. Tools and techniques: source inspection, schema inspection, version-control history mining, design recovery.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: "Reverse engineering is *passive*",
      text: 'Memorize: reverse engineering is **passive** — it does **not** modify the software. The result is **artifacts** (docs, diagrams, models) that describe the system. To actually change the system, you reengineer or refactor *after* you reverse-engineer.',
    },
    { kind: 'h2', text: 'Why this matters for the maintainer' },
    {
      kind: 'p',
      text: "When a legacy system needs to evolve, you can't make safe changes if you don't know how it works. Reverse engineering produces the maps you need before you bulldoze any walls. It's the prerequisite to confident reengineering.",
    },
    { kind: 'related', deckId: 'maintenance' },
  ],
};
