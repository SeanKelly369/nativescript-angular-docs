import { Routes } from "@angular/router";
import { Introduction } from "./introduction/introduction";
import { Quickstart } from "./quickstart/quickstart";
import { CreatingAnApplication } from "./creating-an-application/creating-an-application";
import { NativeScriptPlugins } from "./essentials/native-script-plugins/native-script-plugins";
import { AngularPlugins } from "./essentials/angular-plugins/angular-plugins";
import { AngularDevtools } from "./essentials/angular-devtools/angular-devtools";
import { AngularTemplateRefs } from "./essentials/angular-template-refs/angular-template-refs";
import { FullNativeApiAccess } from "./essentials/full-native-api-access/full-native-api-access";
import { Routing } from "./essentials/routing/routing";
import { UtilitiesNativeScriptView } from "./utilities/utilities-native-script-view/utilities-native-script-view";
import { ComponentsNativeScriptComponents } from "./components/components-native-script-components/components-native-script-components";
import { ComponentsListView } from "./components/components-list-view/components-list-view";
import { ComponentsRootLayout } from "./components/components-root-layout/components-root-layout";
import { ContributingNativeScriptDocs } from "./contributing/contributing-native-script-docs/contributing-native-script-docs";

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      // Getting Started Section
      {
        path: '',
        children: [
          { path: 'introduction', component: Introduction },
          { path: 'quickstart', component: Quickstart },
          { path: 'creating-an-application', component: CreatingAnApplication},
        ]
      },
      // Essentials Section
      {
        path: 'essentials',
        children: [
          { path: 'nativescript-plugins', component: NativeScriptPlugins },
          { path: 'angular-plugins', component: AngularPlugins },
          { path: 'angular-devtools', component: AngularDevtools },
          { path: 'angular-template-refs', component: AngularTemplateRefs },
          { path: 'full-native-api-access', component: FullNativeApiAccess },
          { path: 'routing', component: Routing },
        ]
      },
      // Utilities Section
      {
        path: 'utilities',
        children: [
          { path: 'nativescript-view', component: UtilitiesNativeScriptView },
        ]
      },
      // Components Section
      {
        path: 'components',
        children: [
          { path: 'nativescript-components', component: ComponentsNativeScriptComponents },
          { path: 'list-view', component: ComponentsListView },
          { path: 'root-layout', component: ComponentsRootLayout },
        ]
      },
      // Contributing Section
      {
        path: 'contributing',
        children: [
          { path: 'nativescript-docs', component: ContributingNativeScriptDocs },
        ]
      }
    ]
  }
];
