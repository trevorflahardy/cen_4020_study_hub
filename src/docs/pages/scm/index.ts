import type { DocSection } from '../../types';
import { scmOverview } from './overview';
import { whatIsScm } from './what-is-scm';
import { fourFunctions } from './four-functions';
import { scmAndSqa } from './scm-and-sqa';
import { identification } from './identification';
import { scis } from './scis';
import { baselines } from './baselines';

export const scmSection: DocSection = {
  id: 'scm',
  label: 'Configuration Mgmt',
  icon: '📦',
  pages: [scmOverview, whatIsScm, fourFunctions, scmAndSqa, identification, scis, baselines],
};
