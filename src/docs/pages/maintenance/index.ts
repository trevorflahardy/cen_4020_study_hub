import type { DocSection } from '../../types';
import { maintenanceOverview } from './overview';
import { whatIsMaintenance } from './what-is-maintenance';
import { maintainerRole } from './maintainer-role';
import { maintainability } from './maintainability';
import { estimation } from './estimation';
import { planning } from './planning';
import { reengineering } from './reengineering';
import { reverseEngineering } from './reverse-engineering';
import { maintainerToolkit } from './maintainer-toolkit';

export const maintenanceSection: DocSection = {
  id: 'maintenance',
  label: 'Software Maintenance',
  icon: '🔧',
  pages: [
    maintenanceOverview,
    whatIsMaintenance,
    maintainerRole,
    maintainability,
    estimation,
    planning,
    reengineering,
    reverseEngineering,
    maintainerToolkit,
  ],
};
