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
        loadComponent: () =>
          import('./essentials/project-structure/project-structure.component')
            .then(m => m.ProjectStructureComponent)
      },
      {
        path: 'components',
        loadComponent: () =>
          import('./essentials/components/components.component')
            .then(m => m.ComponentsComponent)
      },
      {
        path: 'navigation',
        loadComponent: () =>
          import('./essentials/navigation/navigation.component')
            .then(m => m.NavigationComponent)
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./essentials/styling/styling.component')
            .then(m => m.StylingComponent)
      },
      {
        path: 'data-binding',
        loadComponent: () =>
          import('./essentials/data-binding/data-binding')
            .then(m => m.DataBindingComponent)
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./essentials/services/services')
            .then(m => m.ServicesComponent)
      },
      {
        path: 'routing',
        loadComponent: () =>
          import('./essentials/routing/routing')
            .then(m => m.RoutingComponent)
      },
      {
        path: 'code-sharing',
        loadComponent: () =>
          import('./essentials/code-sharing/code-sharing')
            .then(m => m.CodeSharingComponent)
      },
      {
        path: 'performance',
        loadComponent: () =>
          import('./essentials/performance/performance')
            .then(m => m.PerformanceComponent)
      },
      {
        path: 'testing',
        loadComponent: () =>
          import('./essentials/testing/testing')
            .then(m => m.TestingComponent)
      },
      {
        path: 'first-app',
        loadComponent: () =>
          import('./essentials/first-app/first-app.component')
            .then(m => m.FirstAppComponent)
      },
      {
        path: 'native-apis',
        loadComponent: () =>
          import('./utilities/native-apis/native-apis')
            .then(m => m.NativeApis)
      },
      {
        path: 'plugins',
        loadComponent: () =>
          import('./utilities/plugins/plugins')
            .then(m => m.Plugins)
      },
      {
        path: 'deployment',
        loadComponent: () =>
          import('./utilities/deployment/deployment')
            .then(m => m.Deployment)
      },
      {
        path: 'troubleshooting',
        loadComponent: () =>
          import('./utilities/troubleshooting/troubleshooting')
            .then(m => m.Troubleshooting)
      },
      {
        path: 'nativescript-components',
        loadComponent: () =>
          import('./components/nativescript-components/nativescript-components')
            .then(m => m.NativescriptComponents)
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./components/basic-ui-controls/basic-ui-controls')
            .then(m => m.BasicUiControls)
      },
      {
        path: 'basic-ui-controls',
        loadComponent: () =>
          import('./components/basic-ui-controls/basic-ui-controls')
            .then(m => m.BasicUiControls)
      },
      {
        path: 'choosing-the-right-layout',
        loadComponent: () =>
          import('./components/choosing-the-right-layout/choosing-the-right-layout')
            .then(m => m.ChoosingTheRightLayout)
      },
      {
        path: 'actionbar',
        loadComponent: () =>
          import('./components/actionbar/actionbar')
            .then(m => m.Actionbar)
      },
      {
        path: 'tabs-bottom-navigation',
        loadComponent: () =>
          import('./components/tabs-bottom-navigation/tabs-bottom-navigation')
            .then(m => m.TabsBottomNav)
      },
      {
        path: 'stack-layout',
        loadComponent: () =>
          import('./components/stacklayout/stacklayout')
            .then(m => m.Stacklayout)
      },
      {
        path: 'grid-layout',
        loadComponent: () =>
          import('./components/gridlayout/gridlayout')
            .then(m => m.Gridlayout)
      },
      {
        path: 'flexbox-layout',
        loadComponent: () =>
          import('./components/flexboxlayout/flexboxlayout')
            .then(m => m.Flexboxlayout)
      },
      {
        path: 'listview',
        loadComponent: () =>
          import('./components/listview/listview')
            .then(m => m.Listview)
      },
      {
        path: 'scrollview',
        loadComponent: () =>
          import('./components/scrollview/scrollview')
            .then(m => m.Scrollview)
      },
      {
        path: 'collectionview',
        loadComponent: () =>
          import('./components/collectionview/collectionview')
            .then(m => m.Collectionview)
      },
      {
        path: '**',
        redirectTo: 'project-structure'
      }
    ]
  }
];