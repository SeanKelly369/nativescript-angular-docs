import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'navigation.component.html',
  styleUrl: './navigation.component.styles.scss'
})
export class NavigationComponent implements OnInit {
  htmlContent = '';

  async ngOnInit() {
    const markdownContent = `# Navigation in NativeScript-Angular

Master mobile navigation patterns and routing in NativeScript-Angular applications. This guide covers the unique navigation capabilities that make mobile apps feel native and intuitive.

## Understanding Mobile Navigation

Mobile navigation differs significantly from web navigation. NativeScript-Angular provides several navigation patterns that align with platform-specific user expectations:

- **Forward Navigation**: Moving deeper into the app hierarchy
- **Backward Navigation**: Returning to previous screens with state preservation
- **Lateral Navigation**: Moving between peer screens (tabs, drawers)
- **Modal Navigation**: Temporary overlays for focused tasks

## NativeScript Router Module

NativeScript extends Angular's router with mobile-specific features:

\`\`\`typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      { path: 'feed', component: FeedComponent, outlet: 'feed' },
      { path: 'profile', component: ProfileComponent, outlet: 'profile' }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
\`\`\`

## Page Router Outlet

The \`page-router-outlet\` is the cornerstone of NativeScript navigation:

\`\`\`html
<!-- app.component.html -->
<page-router-outlet></page-router-outlet>
\`\`\`

### Key Features:

- **Native Navigation**: Each route creates a native page with platform-specific transitions
- **ActionBar Support**: Automatic back button and navigation bar integration
- **State Preservation**: Components are cached during forward navigation
- **Memory Management**: Components are destroyed only on backward navigation

## RouterExtensions

NativeScript provides \`RouterExtensions\` for programmatic navigation with mobile-specific options:

\`\`\`typescript
import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-home',
  template: \`
    <ActionBar title="Home">
      <ActionItem (tap)="navigateToSettings()" ios.systemIcon="1" android.systemIcon="ic_menu_preferences"></ActionItem>
    </ActionBar>
    <StackLayout class="page">
      <Button text="View Details" (tap)="navigateToDetail()" class="btn btn-primary"></Button>
      <Button text="Show Modal" (tap)="showModal()" class="btn btn-secondary"></Button>
    </StackLayout>
  \`
})
export class HomeComponent {
  constructor(private routerExtensions: RouterExtensions) {}

  navigateToDetail() {
    this.routerExtensions.navigate(['/detail', 123], {
      transition: {
        name: 'slide',
        duration: 300,
        curve: 'ease'
      }
    });
  }

  navigateToSettings() {
    this.routerExtensions.navigate(['/settings'], {
      clearHistory: true // Clear navigation history
    });
  }

  goBack() {
    this.routerExtensions.back();
  }

  canGoBack(): boolean {
    return this.routerExtensions.canGoBack();
  }
}
\`\`\`

### Navigation Options:

- **transition**: Custom page transitions
- **clearHistory**: Clear navigation history
- **animated**: Enable/disable animations
- **backstackVisible**: Control back button visibility

## Forward Navigation

Forward navigation moves users deeper into the app hierarchy:

\`\`\`typescript
// Master-Detail Navigation Example
@Component({
  selector: 'ns-item-list',
  template: \`
    <ActionBar title="Items"></ActionBar>
    <ListView [items]="items" (itemTap)="onItemTap($event)">
      <ng-template let-item="item" let-i="index">
        <GridLayout rows="auto, auto" columns="60, *" class="list-item">
          <Image [src]="item.image" row="0" col="0" class="item-image"></Image>
          <Label [text]="item.name" row="0" col="1" class="item-name"></Label>
          <Label [text]="item.description" row="1" col="1" class="item-description"></Label>
        </GridLayout>
      </ng-template>
    </ListView>
  \`
})
export class ItemListComponent {
  items = [
    { id: 1, name: 'Item 1', description: 'Description 1', image: '~/assets/item1.png' },
    { id: 2, name: 'Item 2', description: 'Description 2', image: '~/assets/item2.png' }
  ];

  constructor(private routerExtensions: RouterExtensions) {}

  onItemTap(args: any) {
    const item = this.items[args.index];
    this.routerExtensions.navigate(['/detail', item.id], {
      transition: { name: 'slideLeft' }
    });
  }
}
\`\`\`

## Backward Navigation

Backward navigation preserves the user's context and state:

\`\`\`typescript
@Component({
  selector: 'ns-detail',
  template: \`
    <ActionBar [title]="item?.name">
      <NavigationButton (tap)="goBack()" android.systemIcon="ic_menu_back"></NavigationButton>
      <ActionItem (tap)="share()" ios.systemIcon="9" android.systemIcon="ic_menu_share"></ActionItem>
    </ActionBar>
    <ScrollView>
      <StackLayout class="page" *ngIf="item">
        <Image [src]="item.image" class="detail-image"></Image>
        <Label [text]="item.name" class="h1"></Label>
        <Label [text]="item.description" class="body" textWrap="true"></Label>
        <Button text="Edit" (tap)="edit()" class="btn btn-primary"></Button>
      </StackLayout>
    </ScrollView>
  \`
})
export class DetailComponent implements OnInit {
  item: any;

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    // Load item data
  }

  goBack() {
    this.routerExtensions.back();
  }

  edit() {
    this.routerExtensions.navigate(['/edit', this.item.id]);
  }
}
\`\`\`

## Tab Navigation

Tab navigation provides lateral movement between peer screens:

### Using TabView

\`\`\`html
<TabView selectedIndex="0" (selectedIndexChange)="onTabChange($event)">
  <StackLayout *tabItem="{title: 'Home', iconSource: 'res://home'}">
    <page-router-outlet name="home"></page-router-outlet>
  </StackLayout>

  <StackLayout *tabItem="{title: 'Search', iconSource: 'res://search'}">
    <page-router-outlet name="search"></page-router-outlet>
  </StackLayout>

  <StackLayout *tabItem="{title: 'Profile', iconSource: 'res://profile'}">
    <page-router-outlet name="profile"></page-router-outlet>
  </StackLayout>
</TabView>
\`\`\`

### Using BottomNavigation (Recommended)

\`\`\`html
<BottomNavigation>
  <TabStrip>
    <TabStripItem title="Home" iconSource="font://&#xf015;" class="fas"></TabStripItem>
    <TabStripItem title="Search" iconSource="font://&#xf002;" class="fas"></TabStripItem>
    <TabStripItem title="Profile" iconSource="font://&#xf007;" class="fas"></TabStripItem>
  </TabStrip>

  <TabContentItem>
    <page-router-outlet name="home"></page-router-outlet>
  </TabContentItem>

  <TabContentItem>
    <page-router-outlet name="search"></page-router-outlet>
  </TabContentItem>

  <TabContentItem>
    <page-router-outlet name="profile"></page-router-outlet>
  </TabContentItem>
</BottomNavigation>
\`\`\`

### Tab Navigation Component

\`\`\`typescript
@Component({
  selector: 'ns-tabs',
  template: \`
    <BottomNavigation (tabSelected)="onTabSelected($event)">
      <TabStrip>
        <TabStripItem title="Home" iconSource="~/assets/home.png"></TabStripItem>
        <TabStripItem title="Search" iconSource="~/assets/search.png"></TabStripItem>
        <TabStripItem title="Profile" iconSource="~/assets/profile.png"></TabStripItem>
      </TabStrip>

      <TabContentItem>
        <page-router-outlet name="homeTab"></page-router-outlet>
      </TabContentItem>
      <TabContentItem>
        <page-router-outlet name="searchTab"></page-router-outlet>
      </TabContentItem>
      <TabContentItem>
        <page-router-outlet name="profileTab"></page-router-outlet>
      </TabContentItem>
    </BottomNavigation>
  \`
})
export class TabsComponent {
  onTabSelected(event: any) {
    const selectedIndex = event.newIndex;
    console.log('Selected tab:', selectedIndex);
  }
}
\`\`\`

## Modal Navigation

Modals provide focused workflows without losing the user's place:

### Basic Modal

\`\`\`typescript
import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService, ModalDialogOptions } from '@nativescript/angular';

@Component({
  selector: 'ns-modal-example',
  template: \`
    <StackLayout class="page">
      <Button text="Show Modal" (tap)="showModal()" class="btn btn-primary"></Button>
    </StackLayout>
  \`
})
export class ModalExampleComponent {
  constructor(
    private modal: ModalDialogService,
    private vcRef: ViewContainerRef
  ) {}

  showModal() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {
        title: 'Modal Title',
        message: 'This is a modal dialog'
      },
      fullscreen: false,
      animated: true
    };

    this.modal.showModal(ModalContentComponent, options)
      .then((result) => {
        console.log('Modal result:', result);
      });
  }
}
\`\`\`

### Modal Content Component

\`\`\`typescript
@Component({
  selector: 'ns-modal-content',
  template: \`
    <StackLayout class="modal-content">
      <Label [text]="title" class="h2 text-center"></Label>
      <Label [text]="message" class="body text-center" textWrap="true"></Label>
      <StackLayout orientation="horizontal" horizontalAlignment="center">
        <Button text="Cancel" (tap)="cancel()" class="btn btn-secondary"></Button>
        <Button text="OK" (tap)="confirm()" class="btn btn-primary"></Button>
      </StackLayout>
    </StackLayout>
  \`
})
export class ModalContentComponent {
  title: string;
  message: string;

  constructor(private params: ModalDialogParams) {
    this.title = params.context.title;
    this.message = params.context.message;
  }

  cancel() {
    this.params.closeCallback(false);
  }

  confirm() {
    this.params.closeCallback(true);
  }
}
\`\`\`

## Drawer Navigation

Side drawer navigation provides access to main navigation options:

\`\`\`html
<RadSideDrawer>
  <StackLayout tkDrawerContent class="drawer-content">
    <Label text="Navigation Menu" class="drawer-header"></Label>
    <Button text="Home" (tap)="navigateToHome()" class="drawer-item"></Button>
    <Button text="Profile" (tap)="navigateToProfile()" class="drawer-item"></Button>
    <Button text="Settings" (tap)="navigateToSettings()" class="drawer-item"></Button>
  </StackLayout>

  <StackLayout tkMainContent>
    <ActionBar title="App">
      <NavigationButton (tap)="toggleDrawer()" android.systemIcon="ic_menu_sort_by_size"></NavigationButton>
    </ActionBar>
    <page-router-outlet></page-router-outlet>
  </StackLayout>
</RadSideDrawer>
\`\`\`

### Drawer Component

\`\`\`typescript
import { Component, ViewChild } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';

@Component({
  selector: 'ns-drawer',
  templateUrl: './drawer.component.html'
})
export class DrawerComponent {
  @ViewChild(RadSideDrawerComponent, { static: false })
  drawerComponent: RadSideDrawerComponent;

  constructor(private routerExtensions: RouterExtensions) {}

  toggleDrawer() {
    this.drawerComponent.sideDrawer.toggleDrawerState();
  }

  navigateToHome() {
    this.routerExtensions.navigate(['/home']);
    this.drawerComponent.sideDrawer.closeDrawer();
  }

  navigateToProfile() {
    this.routerExtensions.navigate(['/profile']);
    this.drawerComponent.sideDrawer.closeDrawer();
  }
}
\`\`\`

## Route Guards

Protect routes with Angular guards that work with mobile navigation:

\`\`\`typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

// In routing module
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
}
\`\`\`

## Navigation Transitions

Customize page transitions for better user experience:

\`\`\`typescript
// Custom transition
this.routerExtensions.navigate(['/detail'], {
  transition: {
    name: 'slideTop',
    duration: 400,
    curve: 'easeInOut'
  }
});

// Platform-specific transitions
this.routerExtensions.navigate(['/detail'], {
  transition: {
    name: isIOS ? 'curl' : 'explode',
    duration: 300
  }
});
\`\`\`

### Available Transitions:

- **slide**: Slide from right (default)
- **slideLeft**: Slide from left
- **slideTop**: Slide from top
- **slideBottom**: Slide from bottom
- **fade**: Fade in/out
- **flip**: 3D flip
- **curl**: Page curl (iOS only)
- **explode**: Explode effect (Android only)

## Deep Linking

Handle deep links and URL schemes:

\`\`\`typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-app',
  template: '<page-router-outlet></page-router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    // Handle app launch from URL
    const url = this.getAppLaunchUrl();
    if (url) {
      this.handleDeepLink(url);
    }
  }

  private handleDeepLink(url: string) {
    // Parse URL and navigate accordingly
    const route = this.parseUrl(url);
    this.routerExtensions.navigate([route.path], {
      queryParams: route.params
    });
  }
}
\`\`\`

## Best Practices

### 1. Use Appropriate Navigation Patterns

- **Hierarchical**: Use page navigation for master-detail flows
- **Flat**: Use tabs for peer-level content
- **Modal**: Use modals for temporary, focused tasks

### 2. Preserve Navigation State

\`\`\`typescript
// Don't clear history unnecessarily
this.routerExtensions.navigate(['/detail'], {
  clearHistory: false // Default, preserves back navigation
});

// Clear history only for major transitions
this.routerExtensions.navigate(['/login'], {
  clearHistory: true // User logged out, clear history
});
\`\`\`

### 3. Handle Hardware Back Button

\`\`\`typescript
import { Application } from '@nativescript/core';

export class MyComponent {
  constructor(private routerExtensions: RouterExtensions) {
    Application.android.on('activityBackPressed', this.onBackPressed, this);
  }

  onBackPressed(args: any) {
    if (this.canNavigateBack()) {
      this.routerExtensions.back();
      args.cancel = true; // Prevent default behavior
    }
  }

  canNavigateBack(): boolean {
    return this.routerExtensions.canGoBack();
  }
}
\`\`\`

### 4. Optimize for Performance

\`\`\`typescript
// Lazy load routes for better performance
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];
\`\`\`

## Troubleshooting

### Common Issues:

1. **ActionBar not showing**: Ensure you're using \`page-router-outlet\`
2. **Back button not working**: Check if \`clearHistory\` was used inappropriately
3. **State not preserved**: Verify component lifecycle in \`page-router-outlet\`
4. **Transitions not smooth**: Optimize component rendering and avoid heavy operations during navigation

## Next Steps

- **[Styling](/guide/styling)** - Learn about styling and theming your navigation
- **[Performance](/guide/performance)** - Optimize navigation performance
- **[Testing](/guide/testing)** - Test navigation flows
- **[Examples](/examples)** - Explore navigation examples`;

    this.htmlContent = await marked(markdownContent);
  }
}