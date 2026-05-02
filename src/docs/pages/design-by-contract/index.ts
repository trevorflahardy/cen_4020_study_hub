import type { DocSection } from '../../types';
import { dbcOverview } from './overview';
import { whatIsDbc } from './what-is-dbc';
import { invariants } from './invariants';

export const dbcSection: DocSection = {
  id: 'design-by-contract',
  label: 'Design by Contract',
  icon: '📜',
  pages: [dbcOverview, whatIsDbc, invariants],
};
