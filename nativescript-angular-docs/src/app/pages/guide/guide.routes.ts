import { Routes } from '@angular/router';

export const guideRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./guide.component').then(m => m.GuideComponent),
    children: [
      {
        path: '',
        redirectTo: 'project-structure',
        pathMatch: 'full'
      },
      {
        path: 'project-structure',
        loadComponent: () => import('./project-structure/project-structure.component').then(m => m.ProjectStructureComponent)
      },
      {
        path: 'components',
        loadComponent: () => import('./components/components.component').then(m => m.ComponentsComponent)
      },
      {
        path: 'navigation',
        loadComponent: () => import('./navigation/navigation.component').then(m => m.NavigationComponent)
      },
      {
        path: 'styling',
        loadComponent: () => import('./styling/styling.component').then(m => m.StylingComponent)
      },
      {
        path: 'data-binding',
        loadComponent: () => import('./../guide/data-binding/data-binding').then(m => m.DataBindingComponent)
      },
      {
        path: 'services',
        loadComponent: () => import('./../guide/services/services').then(m => m.ServicesComponent)
      },
      {
        path: 'first-app',
        loadComponent: () => import('./first-app/first-app.component').then(m => m.FirstAppComponent)
      }
    ]
  }
];