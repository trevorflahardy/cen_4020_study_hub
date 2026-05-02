import type { DocPage } from '../../types';

export const scmOverview: DocPage = {
  id: 'scm-overview',
  eyebrow: 'Software Configuration Mgmt',
  title: 'SCM: the rulebook for change',
  lede: "If you can't identify the pieces of your software, you can't control changes to them. SCM is the discipline that gives you a complete history of every change ever made.",
  body: [
    {
      kind: 'p',
      text: "The lecture's running case study is **Nexus** — a platform with `Nexus Standard`, `Nexus Pro`, and `Nexus Enterprise` editions, each composed of dozens of overlapping components at slightly different versions. Without SCM, there is no way to know what versions work together, who changed what, or how to rebuild last month's release.",
    },
    { kind: 'h2', text: 'The six topics on the final' },
    {
      kind: 'list',
      items: [
        '**What is SCM?** — formal definition + the rulebook framing.',
        '**The four core functions** — Identify, Control, Audit, Report.',
        '**SCM is the foundation of SQA** — Traceability, Reproducibility, Consistency.',
        `**Identification** — you can't control what you can't identify.`,
        '**SCIs** — Software Configuration Items: the trackable units.',
        '**Baselines** — formally approved snapshots, only changed via formal process.',
      ],
    },
    { kind: 'related', deckId: 'scm' },
  ],
};
