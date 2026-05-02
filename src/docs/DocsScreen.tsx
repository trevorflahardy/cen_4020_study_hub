import { useEffect, useMemo, useState, type JSX, type MouseEvent } from 'react';
import DocBlockView, { PRACTICE_DECK_ID, renderInline, slugify } from './DocBlock';
import { DEFAULT_PAGE_ID, SECTIONS, findPage } from './registry';
import type { DocPage, DocSection, H2Block } from './types';

interface DocsScreenProps {
  onOpenDeck?: ((deckId: string) => void) | undefined;
}

export default function DocsScreen({ onOpenDeck }: DocsScreenProps): JSX.Element {
  const [activeId, setActiveId] = useState<string>(DEFAULT_PAGE_ID);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const active = useMemo(() => findPage(activeId) ?? findPage(DEFAULT_PAGE_ID), [activeId]);
  const filteredSections = useMemo(() => filterSections(SECTIONS, query), [query]);

  // Reset scroll + clear any leftover TOC hash whenever the user picks a new
  // page, so the article always starts at the top.
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      );
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [activeId]);

  const page: DocPage | null = active?.page ?? null;
  if (!page) return <div className="page docs-page">Loading…</div>;

  const select = (id: string): void => {
    setActiveId(id);
    setNavOpen(false);
  };

  return (
    <div className="page docs-page">
      <button
        className="btn docs-mobile-nav-btn"
        onClick={() => {
          setNavOpen((o) => !o);
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        Browse docs
      </button>

      <div className="docs-shell">
        <DocsSidebar
          sections={filteredSections}
          activeId={activeId}
          navOpen={navOpen}
          query={query}
          onQuery={setQuery}
          onSelect={select}
        />

        <DocsArticle page={page} onOpenDeck={onOpenDeck} />

        <DocsToc page={page} onOpenDeck={onOpenDeck} />
      </div>
    </div>
  );
}

interface SidebarProps {
  sections: readonly DocSection[];
  activeId: string;
  navOpen: boolean;
  query: string;
  onQuery: (q: string) => void;
  onSelect: (id: string) => void;
}

function DocsSidebar({
  sections,
  activeId,
  navOpen,
  query,
  onQuery,
  onSelect,
}: SidebarProps): JSX.Element {
  return (
    <aside className={`docs-sidebar ${navOpen ? 'is-open' : ''}`}>
      <div className="docs-search">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <input
          placeholder="Search docs…"
          value={query}
          onChange={(e) => {
            onQuery(e.target.value);
          }}
        />
        <span className="kbd">/</span>
      </div>
      {sections.map((sec) => (
        <div className="docs-sec" key={sec.id}>
          <div className="docs-sec-head">
            <span className="docs-sec-icon">{sec.icon}</span>
            {sec.label}
          </div>
          <ul className="docs-sec-list">
            {sec.pages.map((p) => (
              <li key={p.id}>
                <button
                  className={`docs-link ${activeId === p.id ? 'is-active' : ''}`}
                  onClick={() => {
                    onSelect(p.id);
                  }}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

interface ArticleProps {
  page: DocPage;
  onOpenDeck?: ((deckId: string) => void) | undefined;
}

function DocsArticle({ page, onOpenDeck }: ArticleProps): JSX.Element {
  return (
    <article className="docs-article" key={page.id}>
      <div className="docs-eyebrow">{page.eyebrow}</div>
      <h1 className="docs-title">{renderInline(page.title)}</h1>
      <p className="docs-lede">{renderInline(page.lede)}</p>
      {(page.slide !== undefined || page.lecture !== undefined) && (
        <div className="docs-meta-strip">
          {page.slide !== undefined && (
            <span className="docs-meta-chip">📄 {page.slide}</span>
          )}
          {page.lecture !== undefined && (
            <span className="docs-meta-chip">📚 {page.lecture}</span>
          )}
        </div>
      )}
      <div className="docs-body">
        {page.body.map((block, i) => (
          <DocBlockView key={i} block={block} onOpenDeck={onOpenDeck} />
        ))}
      </div>

      <div className="docs-footnav">
        <span className="docs-foot-label">Was this helpful?</span>
        <button className="btn docs-react">👍 Yes</button>
        <button className="btn docs-react">👎 Not really</button>
        <span className="spacer" />
        <span className="docs-edit">Last updated · May 2, 2026</span>
      </div>
    </article>
  );
}

interface TocProps {
  page: DocPage;
  onOpenDeck?: ((deckId: string) => void) | undefined;
}

function DocsToc({ page, onOpenDeck }: TocProps): JSX.Element {
  const headings = page.body.filter((b): b is H2Block => b.kind === 'h2');
  const relatedDeck = page.body.find((b) => b.kind === 'related');

  const onAnchorClick = (e: MouseEvent<HTMLAnchorElement>, slug: string): void => {
    e.preventDefault();
    const target = document.getElementById(slug);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${slug}`);
  };

  const onOverviewClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      );
    }
  };

  return (
    <aside className="docs-toc">
      <div className="docs-toc-label">On this page</div>
      <ul>
        <li>
          <a className="is-active" href="#" onClick={onOverviewClick}>
            Overview
          </a>
        </li>
        {headings.map((h, i) => {
          const slug = slugify(h.text);
          return (
            <li key={i}>
              <a
                href={`#${slug}`}
                onClick={(e) => {
                  onAnchorClick(e, slug);
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
        {relatedDeck && (
          <li>
            <a
              href={`#${PRACTICE_DECK_ID}`}
              onClick={(e) => {
                onAnchorClick(e, PRACTICE_DECK_ID);
              }}
            >
              Practice deck
            </a>
          </li>
        )}
      </ul>
      <div className="docs-toc-card">
        <div className="docs-toc-card-eyebrow">Practice</div>
        <div className="docs-toc-card-title">Got the concept?</div>
        <p>Drill the matching deck and lock it in.</p>
        <button
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => {
            if (relatedDeck?.kind === 'related') {
              onOpenDeck?.(relatedDeck.deckId);
            }
          }}
        >
          Open deck →
        </button>
      </div>
    </aside>
  );
}

function filterSections(sections: readonly DocSection[], query: string): readonly DocSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return sections;
  return sections
    .map((s) => ({
      ...s,
      pages: s.pages.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.lede.toLowerCase().includes(q) ||
          s.label.toLowerCase().includes(q),
      ),
    }))
    .filter((s) => s.pages.length > 0);
}
