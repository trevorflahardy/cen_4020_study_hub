import type { DocSection } from '../../types';
import { qualityOverview } from './overview';
import { qualityNotAccident } from './quality-not-accident';
import { softwareQuality } from './software-quality';
import { cosq } from './cosq';
import { cosqCategories } from './cosq-categories';
import { sqmProcesses } from './sqm-processes';
import { ironTriangle } from './iron-triangle';
import { verificationValidation } from './verification-validation';

export const qualitySection: DocSection = {
  id: 'quality',
  label: 'Software Quality',
  icon: '✨',
  pages: [
    qualityOverview,
    qualityNotAccident,
    softwareQuality,
    cosq,
    cosqCategories,
    sqmProcesses,
    ironTriangle,
    verificationValidation,
  ],
};
