import { gettingStartedSection } from './pages/getting-started';
import { foundationsSection } from './pages/foundations';
import { testingSection } from './pages/testing';
import { dbcSection } from './pages/design-by-contract';
import { maintenanceSection } from './pages/maintenance';
import { qualitySection } from './pages/quality';
import { scmSection } from './pages/scm';
import { managementSection } from './pages/management';
import type { DocPage, DocSection } from './types';

export const SECTIONS: readonly DocSection[] = [
  gettingStartedSection,
  foundationsSection,
  testingSection,
  dbcSection,
  maintenanceSection,
  qualitySection,
  scmSection,
  managementSection,
];

export interface PageLookup {
  section: DocSection;
  page: DocPage;
}

export function findPage(id: string): PageLookup | null {
  for (const section of SECTIONS) {
    for (const page of section.pages) {
      if (page.id === id) return { section, page };
    }
  }
  return null;
}

export const DEFAULT_PAGE_ID: string = SECTIONS[0]?.pages[0]?.id ?? 'intro';
