import type { DocSection } from '../../types';
import { foundationsOverview } from './overview';
import { whatIsSoftwareEngineering } from './what-is-software-engineering';

export const foundationsSection: DocSection = {
  id: 'foundations',
  label: 'SE Foundations',
  icon: '🧱',
  pages: [foundationsOverview, whatIsSoftwareEngineering],
};
