import type { DocSection } from '../../types';
import { managementOverview } from './overview';
import { whatIsSeManagement } from './what-is-se-management';
import { threePillars } from './three-pillars';
import { emotionalIntelligence } from './emotional-intelligence';
import { communication } from './communication';
import { oneOnOnes } from './one-on-ones';

export const managementSection: DocSection = {
  id: 'management',
  label: 'SE Management',
  icon: '👥',
  pages: [
    managementOverview,
    whatIsSeManagement,
    threePillars,
    emotionalIntelligence,
    communication,
    oneOnOnes,
  ],
};
