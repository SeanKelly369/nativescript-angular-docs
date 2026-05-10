export interface GuidePage {
  title: string;
  route: string;
}

export interface GuideSection {
  title: string;
  pages: GuidePage[];
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    title: 'Core Guide',
    pages: [
      { title: 'Project Structure', route: '/guide/project-structure' },
      { title: 'Code Sharing', route: '/guide/code-sharing' },
      { title: 'Data Binding', route: '/guide/data-binding' },
      { title: 'Services', route: '/guide/services' },
      { title: 'Styling', route: '/guide/styling' },
      { title: 'Navigation', route: '/guide/navigation' },
      { title: 'Routing', route: '/guide/routing' },
    ],
  },
  {
    title: 'Quality & Performance',
    pages: [
      { title: 'Performance', route: '/guide/performance' },
      { title: 'Testing', route: '/guide/testing' },
    ],
  },
  {
    title: 'Platform & Delivery',
    pages: [
      { title: 'Native APIs', route: '/guide/native-apis' },
      { title: 'Plugins', route: '/guide/plugins' },
      { title: 'Deployment', route: '/guide/deployment' },
      { title: 'Troubleshooting', route: '/guide/troubleshooting' },
    ],
  },
  {
    title: 'Components',
    pages: [
      { title: 'Overview', route: '/guide/nativescript-components' },
      { title: 'Basic UI Controls', route: '/guide/basic-ui-controls' },
    ],
  },
  {
    title: 'Layouts',
    pages: [
      { title: 'Choose the Right Layout', route: '/guide/choosing-the-right-layout' },
      { title: 'StackLayout', route: '/guide/stack-layout' },
      { title: 'GridLayout', route: '/guide/grid-layout' },
      { title: 'FlexboxLayout', route: '/guide/flexbox-layout' },
      { title: 'ScrollView', route: '/guide/scrollview' },
    ],
  },
  {
    title: 'Navigation Components',
    pages: [
      { title: 'ActionBar', route: '/guide/actionbar' },
      { title: 'Tabs / Bottom Navigation', route: '/guide/tabs-bottom-navigation' },
    ],
  },
  {
    title: 'Lists',
    pages: [
      { title: 'ListView', route: '/guide/listview' },
      { title: 'CollectionView', route: '/guide/collectionview' },
    ],
  },
];

export const GUIDE_PAGES: GuidePage[] = GUIDE_SECTIONS.flatMap(section => section.pages);

export const GETTING_STARTED_PAGES: GuidePage[] = [
  { title: 'Overview', route: '/getting-started/overview' },
  { title: 'Prerequisites', route: '/getting-started/prerequisites' },
  { title: 'Quick Start', route: '/getting-started/quick-start' },
  { title: 'Environment Setup', route: '/getting-started/environment-setup' },
];