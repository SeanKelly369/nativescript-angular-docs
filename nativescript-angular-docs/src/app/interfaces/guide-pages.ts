export interface GuidePage {
  title: string;
  route: string;
}

export const GUIDE_PAGES: GuidePage[] = [
  { title: "Introduction", route: "/guide/introduction" },
  { title: "Project Structure", route: "/guide/project-structure" },
  { title: "UI Components", route: "/guide/components" },
  { title: "Navigation", route: "/guide/navigation" },
  { title: "Styling", route: "/guide/styling" },
  { title: "Data Binding", route: "/guide/data-binding" },
  { title: "Services", route: "/guide/services" },
  { title: "Routing", route: "/guide/routing" },
  { title: "Code Sharing", route: "/guide/code-sharing" },
  { title: "Performance", route: "/guide/performance" },
  { title: "Testing", route: "/guide/testing" },
  { title: "Native APIs", route: "/guide/native-apis" },
  { title: "Plugins", route: "/guide/plugins" },
  { title: "Deployment", route: "/guide/deployment" },
  { title: "Troubleshooting", route: "/guide/troubleshooting" },
  { title: "Overview", route: "/guide/nativescript-components" },
  { title: "Basic UI Controls", route: "/guide/basic-ui-controls" },
  { title: "Choose the Right Layout", route: "/guide/choose-the-right-layout" },
  { title: "ActionBar", route: "/guide/actionbar" },
  { title: "Tabs/Bottom Navigation", route: "/guide/tabs-bottom-navigation" },
  { title: "StackLayout", route: "/guide/stack-layout" },
  { title: "GridLayout", route: "/guide/grid-layout" },
  { title: "FlexboxLayout", route: "/guide/flexbox-layout" },
  { title: "ListView", route: "/guide/listview" },
  { title: "ScrollView", route: "/guide/scrollview" },
  { title: "CollectionView", route: "/guide/collectionview" },
];

export const GETTING_STARTED_PAGES: GuidePage[] = [
  { title: "Overview", route: "/getting-started/overview" },
  { title: "Prerequisites", route: "/getting-started/prerequisites" },
  { title: "Quick Start", route: "/getting-started/quick-start" },
  { title: "Environment Setup", route: "/getting-started/environment-setup" }
];