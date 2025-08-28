import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  // {
  //   path: 'getting-started',
  //   loadChildren: () => import('./pages/getting-started/getting-started.routes').then(m => m.gettingStartedRoutes)
  // },
  {
    path: 'guide',
    loadChildren: () => import('./pages/guide/guide.routes').then(m => m.guideRoutes)
  },
  {
    path: 'examples',
    loadComponent: () => import('./pages/examples/examples.component').then(m => m.ExamplesComponent)
  },
  {
    path: 'api',
    loadComponent: () => import('./pages/api/api.component').then(m => m.ApiComponent)
  },
  {
    path: 'community',
    loadComponent: () => import('./pages/community/community.component').then(m => m.CommunityComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
