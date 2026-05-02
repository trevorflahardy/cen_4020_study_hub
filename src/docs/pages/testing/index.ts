import type { DocSection } from '../../types';
import { testingOverview } from './overview';
import { whatIsTesting } from './what-is-testing';
import { tdd } from './tdd';
import { pyramid } from './pyramid';
import { unitTesting } from './unit-testing';
import { blackWhiteBox } from './black-white-box';
import { designingForTestability } from './designing-for-testability';
import { systemTesting } from './system-testing';
import { balancedPyramid } from './balanced-pyramid';
import { developerJourney } from './developer-journey';

export const testingSection: DocSection = {
  id: 'testing',
  label: 'Software Testing',
  icon: '🧪',
  pages: [
    testingOverview,
    whatIsTesting,
    tdd,
    pyramid,
    unitTesting,
    blackWhiteBox,
    designingForTestability,
    systemTesting,
    balancedPyramid,
    developerJourney,
  ],
};
