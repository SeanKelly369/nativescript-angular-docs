import { Routes } from '@angular/router';

export const gettingStartedRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./getting-started.component').then(m => m.GettingStartedComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () =>
          import('./overview/overview').then(m => m.OverviewComponent),
      },
      {
        path: 'prerequisites',
        loadComponent: () =>
          import('./prerequisites/prerequisites').then(m => m.PrerequisitesComponent),
      },
      {
        path: 'quick-start',
        loadComponent: () =>
          import('./quick-start/quick-start').then(m => m.QuickStartComponent),
      },
            {
        path: 'environment-setup',
        loadComponent: () =>
          import('./environment-setup/environment-setup').then(m => m.EnvironmentSetupComponent),
      },
    ],
  },
];
