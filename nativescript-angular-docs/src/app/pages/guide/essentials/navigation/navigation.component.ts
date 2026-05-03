import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  htmlContent = '';

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  async ngOnInit(): Promise<void> {
    const markdownContent = `# Navigation in NativeScript-Angular

Navigation is one of the biggest differences between a web app and a mobile app.

In a normal Angular web app, navigation usually means changing the browser route. In NativeScript-Angular, navigation also controls native mobile pages, transitions, back stacks, ActionBars, tabs, drawers, and modal flows.

This guide covers the main patterns you will use in real apps:

- page navigation
- backward navigation
- tab navigation
- modal navigation
- drawer navigation
- route guards
- deep linking
- Android back button handling

---

## The Core Idea

NativeScript-Angular uses Angular routing, but it renders routes through native mobile navigation components.

The most important difference is this:

- Angular decides which component belongs to a route.
- NativeScript decides how that route appears as a native mobile screen.

That is why NativeScript-Angular uses page-router-outlet instead of the normal Angular router-outlet for page navigation.

---

## Basic Route Setup

A modern NativeScript-Angular app can use standalone Angular routes.

~~~typescript
// src/routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./features/detail/detail').then(m => m.DetailComponent)
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings').then(m => m.SettingsComponent)
  }
];
~~~

When a NativeScript-Angular component uses routing features, import NativeScriptRouterModule into that standalone component.

~~~typescript
// src/features/home/home.ts
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule
} from '@nativescript/angular';

@Component({
  selector: 'ns-home',
  standalone: true,
  templateUrl: 'home.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeComponent {}
~~~

The NativeScriptCommonModule gives you access to common NativeScript-Angular directives and bindings. NativeScriptRouterModule gives you routerLink, router outlets, and NativeScript routing integration.

---

## Page Router Outlet

The page-router-outlet is the main outlet for page-based NativeScript-Angular navigation.

~~~html
<!-- app.component.html -->
<page-router-outlet></page-router-outlet>
~~~

Use page-router-outlet when you want proper mobile page navigation.

### What It Gives You

- Native page transitions
- ActionBar integration
- Back stack support
- Mobile-style lifecycle behaviour
- Route-based navigation that feels native on iOS and Android

A simple root component might look like this:

~~~typescript
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule
} from '@nativescript/angular';

@Component({
  selector: 'ns-app',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: '<page-router-outlet></page-router-outlet>'
})
export class AppComponent {}
~~~

---

## RouterExtensions

RouterExtensions is the NativeScript-Angular service used for programmatic navigation.

It gives you mobile-specific options that the standard Angular Router does not focus on, such as native transitions, clearing history, and going back through the native page stack.

~~~typescript
import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
  RouterExtensions
} from '@nativescript/angular';

@Component({
  selector: 'ns-home',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: 'home.html'
})
export class HomeComponent {
  private readonly routerExtensions = inject(RouterExtensions);

  navigateToDetail(): void {
    this.routerExtensions.navigate(['/detail', 123], {
      transition: {
        name: 'slide',
        duration: 300,
        curve: 'ease'
      }
    });
  }

  navigateToSettings(): void {
    this.routerExtensions.navigate(['/settings']);
  }

  goBack(): void {
    if (this.routerExtensions.canGoBack()) {
      this.routerExtensions.back();
    }
  }
}
~~~

~~~html
<!-- home.html -->
<ActionBar title="Home">
  <ActionItem
    text="Settings"
    (tap)="navigateToSettings()"
    ios.position="right"
    android.position="actionBar">
  </ActionItem>
</ActionBar>

<GridLayout rows="auto, auto" class="page">
  <Button
    row="0"
    text="View Details"
    class="btn btn-primary"
    (tap)="navigateToDetail()">
  </Button>

  <Button
    row="1"
    text="Go Back"
    class="btn btn-secondary"
    (tap)="goBack()">
  </Button>
</GridLayout>
~~~

### Common RouterExtensions Options

| Option | Use |
|---|---|
| **\`transition\`** | Adds a native page transition. |
| **\`clearHistory\`** | Clears the navigation stack. |
| **\`animated\`** | Enables or disables animation. |
| **\`backstackVisible\`** | Controls whether the page appears in the back stack. |

Use clearHistory carefully. It is useful after login, logout, or onboarding, but it can break normal back navigation if used too often.

---

## Forward Navigation

Forward navigation moves the user deeper into the app.

A common example is a master-detail flow: the user taps an item in a list and navigates to the detail page.

~~~typescript
import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ItemEventData } from '@nativescript/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'ns-item-list',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: 'item-list.html'
})
export class ItemListComponent {
  private readonly routerExtensions = inject(RouterExtensions);

  readonly items: Item[] = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Description 1',
      image: '~/assets/item1.png'
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description 2',
      image: '~/assets/item2.png'
    }
  ];

  onItemTap(args: ItemEventData): void {
    const item = this.items[args.index];

    this.routerExtensions.navigate(['/detail', item.id], {
      transition: {
        name: 'slideLeft'
      }
    });
  }
}
~~~

~~~html
<!-- item-list.html -->
<ActionBar title="Items"></ActionBar>

<ListView [items]="items" (itemTap)="onItemTap($event)">
  <ng-template let-item="item">
    <GridLayout rows="auto, auto" columns="60, *" class="list-item">
      <Image
        row="0"
        col="0"
        [src]="item.image"
        class="item-image">
      </Image>

      <Label
        row="0"
        col="1"
        [text]="item.name"
        class="item-name">
      </Label>

      <Label
        row="1"
        col="1"
        [text]="item.description"
        class="item-description">
      </Label>
    </GridLayout>
  </ng-template>
</ListView>
~~~

For structured list rows, prefer GridLayout over deeply nested StackLayouts. It gives you better control and usually keeps the view hierarchy cleaner.

---

## Backward Navigation

Backward navigation returns the user to the previous page in the native navigation stack.

~~~typescript
import { Component, NO_ERRORS_SCHEMA, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'ns-detail',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: 'detail.html'
})
export class DetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly routerExtensions = inject(RouterExtensions);

  item: Item | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    this.item = {
      id,
      name: 'Item ' + id,
      description: 'Loaded item details',
      image: '~/assets/item1.png'
    };
  }

  goBack(): void {
    if (this.routerExtensions.canGoBack()) {
      this.routerExtensions.back();
    }
  }

  edit(): void {
    if (!this.item) {
      return;
    }

    this.routerExtensions.navigate(['/edit', this.item.id]);
  }
}
~~~

~~~html
<!-- detail.html -->
<ActionBar [title]="item?.name || 'Details'">
  <NavigationButton
    text="Back"
    android.systemIcon="ic_menu_back"
    (tap)="goBack()">
  </NavigationButton>
</ActionBar>

<ScrollView>
  @if (item) {
    <StackLayout class="page">
      <Image [src]="item.image" class="detail-image"></Image>
      <Label [text]="item.name" class="h1"></Label>
      <Label [text]="item.description" class="body" textWrap="true"></Label>

      <Button
        text="Edit"
        class="btn btn-primary"
        (tap)="edit()">
      </Button>
    </StackLayout>
  }
</ScrollView>
~~~

Always check canGoBack before calling back. It prevents awkward behaviour when the current page is already at the root of the stack.

---

## Route Parameters

Use ActivatedRoute the same way you would in Angular web apps.

~~~typescript
const id = Number(this.route.snapshot.params['id']);
~~~

For reactive route parameters:

~~~typescript
import { map } from 'rxjs/operators';

this.route.paramMap
  .pipe(map(params => Number(params.get('id'))))
  .subscribe(id => {
    // Load data for this id.
  });
~~~

For most mobile detail pages, snapshot params are often fine because the page is usually created for one specific item.

---

## Navigation with Router Links

You can also use routerLink in NativeScript templates.

~~~html
<Button
  text="Open Settings"
  [nsRouterLink]="['/settings']">
</Button>
~~~

For more complex navigation with transitions, RouterExtensions is usually clearer.

---

## Tab Navigation

Tabs are for lateral navigation between peer sections of the app.

Use tabs when the screens are on the same level, such as:

- Home
- Search
- Favourites
- Profile
- Settings

Do not use tabs for a step-by-step flow. Use forward navigation for that.

---

## BottomNavigation

BottomNavigation is usually the best fit for top-level mobile app navigation.

~~~html
<BottomNavigation selectedIndex="0">
  <TabStrip>
    <TabStripItem title="Home" iconSource="res://home"></TabStripItem>
    <TabStripItem title="Search" iconSource="res://search"></TabStripItem>
    <TabStripItem title="Profile" iconSource="res://profile"></TabStripItem>
  </TabStrip>

  <TabContentItem>
    <GridLayout>
      <page-router-outlet name="homeTab"></page-router-outlet>
    </GridLayout>
  </TabContentItem>

  <TabContentItem>
    <GridLayout>
      <page-router-outlet name="searchTab"></page-router-outlet>
    </GridLayout>
  </TabContentItem>

  <TabContentItem>
    <GridLayout>
      <page-router-outlet name="profileTab"></page-router-outlet>
    </GridLayout>
  </TabContentItem>
</BottomNavigation>
~~~

Each TabStripItem should match one TabContentItem.

A good rule of thumb is to use BottomNavigation for 3 to 5 top-level sections.

---

## TabView

TabView is still useful when you want grouped tab content inside one area of the UI.

~~~html
<TabView selectedIndex="0">
  <StackLayout *tabItem="{ title: 'Overview' }">
    <Label text="Overview content"></Label>
  </StackLayout>

  <StackLayout *tabItem="{ title: 'History' }">
    <Label text="History content"></Label>
  </StackLayout>

  <StackLayout *tabItem="{ title: 'Settings' }">
    <Label text="Settings content"></Label>
  </StackLayout>
</TabView>
~~~

For main app sections, prefer BottomNavigation. For smaller grouped content inside a screen, TabView can still be a reasonable choice.

---

## Modal Navigation

Modals are for focused tasks that temporarily sit on top of the current flow.

Good modal use cases include:

- confirmation screens
- small forms
- selecting an option
- editing a small piece of data
- showing a temporary workflow without losing the current page

Avoid using modals for full app sections. If the user is moving to a major new area of the app, use normal navigation instead.

---

## Opening a Modal with NativeDialog

~~~typescript
import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import {
  NativeDialog,
  NativeScriptCommonModule
} from '@nativescript/angular';
import { ModalContentComponent } from './modal-content.component';

@Component({
  selector: 'ns-modal-example',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: 'modal-example.html'
})
export class ModalExampleComponent {
  private readonly dialog = inject(NativeDialog);

  showModal(): void {
    const ref = this.dialog.open(ModalContentComponent, {
      data: {
        title: 'Confirm Action',
        message: 'Do you want to continue?'
      }
    });

    ref.afterClosed().subscribe(result => {
      console.log('Modal result:', result);
    });
  }
}
~~~

~~~html
<!-- modal-example.html -->
<GridLayout class="page">
  <Button
    text="Show Modal"
    class="btn btn-primary"
    (tap)="showModal()">
  </Button>
</GridLayout>
~~~

---

## Modal Content Component

~~~typescript
import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import {
  DialogRef,
  NATIVE_DIALOG_DATA,
  NativeScriptCommonModule
} from '@nativescript/angular';

interface ModalData {
  title: string;
  message: string;
}

@Component({
  selector: 'ns-modal-content',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: 'modal-content.html'
})
export class ModalContentComponent {
  private readonly dialogRef = inject(DialogRef);

  readonly data = inject(NATIVE_DIALOG_DATA) as ModalData;

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
~~~

~~~html
<!-- modal-content.html -->
<StackLayout class="modal-content">
  <Label
    [text]="data.title"
    class="h2 text-center">
  </Label>

  <Label
    [text]="data.message"
    class="body text-center"
    textWrap="true">
  </Label>

  <StackLayout orientation="horizontal" horizontalAlignment="center">
    <Button
      text="Cancel"
      class="btn btn-secondary"
      (tap)="cancel()">
    </Button>

    <Button
      text="OK"
      class="btn btn-primary"
      (tap)="confirm()">
    </Button>
  </StackLayout>
</StackLayout>
~~~

The important pieces are:

| API | Purpose |
|---|---|
| NativeDialog | Opens the modal |
| data | Passes data into the modal |
| NATIVE_DIALOG_DATA | Reads incoming modal data |
| DialogRef | Closes the modal |
| afterClosed | Receives the result in the parent component |

---

## Drawer Navigation

Drawer navigation gives access to main app areas or secondary actions.

It is useful when you have more destinations than can comfortably fit in bottom tabs.

Common drawer items include:

- Home
- Profile
- Settings
- Help
- Logout

Drawer navigation usually depends on a drawer plugin or NativeScript UI package, so check the package setup before copying this example directly.

~~~html
<RadSideDrawer>
  <StackLayout tkDrawerContent class="drawer-content">
    <Label text="Navigation Menu" class="drawer-header"></Label>

    <Button
      text="Home"
      class="drawer-item"
      (tap)="navigateToHome()">
    </Button>

    <Button
      text="Profile"
      class="drawer-item"
      (tap)="navigateToProfile()">
    </Button>

    <Button
      text="Settings"
      class="drawer-item"
      (tap)="navigateToSettings()">
    </Button>
  </StackLayout>

  <GridLayout tkMainContent rows="auto, *">
    <ActionBar row="0" title="App">
      <NavigationButton
        text="Menu"
        android.systemIcon="ic_menu_sort_by_size"
        (tap)="toggleDrawer()">
      </NavigationButton>
    </ActionBar>

    <page-router-outlet row="1"></page-router-outlet>
  </GridLayout>
</RadSideDrawer>
~~~

Keep drawer menus short. If the drawer becomes a dumping ground for every possible screen, the navigation will feel messy.

---

## Route Guards

NativeScript-Angular supports Angular route guards.

Use guards for authentication, permissions, onboarding checks, or account setup checks.

~~~typescript
import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}
~~~

~~~typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  }
];
~~~

Prefer returning a UrlTree instead of manually calling router.navigate inside the guard. It keeps the guard more predictable and easier to test.

---

## Navigation Transitions

Transitions can make navigation feel smoother and more native.

~~~typescript
this.routerExtensions.navigate(['/detail'], {
  transition: {
    name: 'slide',
    duration: 300,
    curve: 'ease'
  }
});
~~~

Common transition names include:

| Transition | Use |
|---|---|
| slide | Standard forward page movement |
| slideLeft | Slide from the left |
| slideTop | Slide from the top |
| slideBottom | Slide from the bottom |
| fade | Fade between pages |
| flip | Flip-style transition |

Some transitions are platform-specific or version-sensitive. Keep transitions simple unless you have a strong design reason.

---

## Android Hardware Back Button

Android users expect the hardware or system back button to work properly.

If you listen for the Android back event manually, clean it up when the component is destroyed.

~~~typescript
import { OnDestroy, inject } from '@angular/core';
import {
  AndroidActivityBackPressedEventData,
  Application
} from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';

export class MyComponent implements OnDestroy {
  private readonly routerExtensions = inject(RouterExtensions);

  constructor() {
    if (Application.android) {
      Application.android.on(
        'activityBackPressed',
        this.onBackPressed,
        this
      );
    }
  }

  ngOnDestroy(): void {
    if (Application.android) {
      Application.android.off(
        'activityBackPressed',
        this.onBackPressed,
        this
      );
    }
  }

  private onBackPressed(args: AndroidActivityBackPressedEventData): void {
    if (this.routerExtensions.canGoBack()) {
      this.routerExtensions.back();
      args.cancel = true;
    }
  }
}
~~~

Do not leave global event handlers attached after a component is destroyed. That can cause odd bugs later.

---

## Deep Linking

Deep links let your app open directly to a specific screen.

Examples:

- opening a product page from a shared link
- opening a password reset screen
- opening a notification target
- opening a specific item detail page

A simple deep link handler usually has three steps:

1. Read the incoming URL.
2. Parse the route and parameters.
3. Navigate to the matching NativeScript route.

~~~typescript
import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-app',
  template: '<page-router-outlet></page-router-outlet>'
})
export class AppComponent implements OnInit {
  private readonly routerExtensions = inject(RouterExtensions);

  ngOnInit(): void {
    const url = this.getLaunchUrl();

    if (url) {
      this.handleDeepLink(url);
    }
  }

  private handleDeepLink(url: string): void {
    const parsed = this.parseDeepLink(url);

    this.routerExtensions.navigate([parsed.path], {
      queryParams: parsed.queryParams
    });
  }

  private getLaunchUrl(): string | undefined {
    // Platform-specific launch URL logic goes here.
    return undefined;
  }

  private parseDeepLink(url: string): {
    path: string;
    queryParams: Record<string, string>;
  } {
    // Replace this with real parsing logic.
    return {
      path: '/home',
      queryParams: {}
    };
  }
}
~~~

Deep linking is powerful, but make sure protected screens still go through route guards.

---

## Navigation Best Practices

### 1. Use the Right Pattern

| Pattern | Best For |
|---|---|
| Page navigation | Moving deeper into a hierarchy |
| Back navigation | Returning to the previous screen |
| BottomNavigation | Top-level app sections |
| TabView | Grouped content inside a screen |
| Modal | Focused temporary tasks |
| Drawer | Secondary app navigation |

---

### 2. Do Not Clear History Too Often

This is good after logout:

~~~typescript
this.routerExtensions.navigate(['/login'], {
  clearHistory: true
});
~~~

This is usually bad for normal detail navigation:

~~~typescript
this.routerExtensions.navigate(['/detail', id], {
  clearHistory: true
});
~~~

If you clear history on ordinary navigation, users lose the expected back behaviour.

---

### 3. Keep Heavy Work Out of Navigation

Avoid doing expensive work during page transitions.

Bad:

~~~typescript
navigateToDetail(): void {
  this.loadHugeDataSetSynchronously();
  this.routerExtensions.navigate(['/detail']);
}
~~~

Better:

~~~typescript
navigateToDetail(): void {
  this.routerExtensions.navigate(['/detail']);
}
~~~

Then let the detail page load its own data.

---

### 4. Keep Lists Lightweight

List rows should be simple.

Prefer this:

~~~html
<GridLayout rows="auto, auto" columns="60, *">
  <Image row="0" col="0" [src]="item.image"></Image>
  <Label row="0" col="1" [text]="item.name"></Label>
  <Label row="1" col="1" [text]="item.description"></Label>
</GridLayout>
~~~

Avoid deeply nested layouts for every row in a large list.

---

### 5. Make Back Behaviour Predictable

Users should always understand where the back button will take them.

Avoid surprising jumps such as:

- detail page back button going to home instead of the previous list
- modal close button navigating to a different page
- tab changes clearing navigation history
- logout leaving protected screens in the back stack

---

## Troubleshooting

### ActionBar Is Not Showing

Check that the screen is rendered through page-router-outlet.

~~~html
<page-router-outlet></page-router-outlet>
~~~

A normal Angular router-outlet will not give you the same NativeScript page behaviour.

---

### Back Button Does Not Work

Check whether clearHistory was used.

~~~typescript
this.routerExtensions.navigate(['/somewhere'], {
  clearHistory: true
});
~~~

If history was cleared, there may be nowhere to go back to.

---

### Modal Does Not Receive Data

Check that the parent passes data:

~~~typescript
this.dialog.open(ModalContentComponent, {
  data: {
    title: 'Hello'
  }
});
~~~

And that the modal reads it with NATIVE_DIALOG_DATA:

~~~typescript
readonly data = inject(NATIVE_DIALOG_DATA) as { title: string };
~~~

---

### Tab Content Does Not Match the Selected Tab

Make sure the number of TabStripItem elements matches the number of TabContentItem elements.

~~~html
<TabStrip>
  <TabStripItem title="Home"></TabStripItem>
  <TabStripItem title="Search"></TabStripItem>
</TabStrip>

<TabContentItem>
  <!-- Home content -->
</TabContentItem>

<TabContentItem>
  <!-- Search content -->
</TabContentItem>
~~~

---

## Final Checklist

Before shipping navigation code, check these points:

- page-router-outlet is used for page navigation
- RouterExtensions is used for mobile-specific navigation
- clearHistory is only used intentionally
- Android back button behaviour is predictable
- modal data is passed through data and read with NATIVE_DIALOG_DATA
- modal results are returned through DialogRef.close
- BottomNavigation has matching TabStripItem and TabContentItem entries
- guards protect restricted routes
- heavy work is not blocking page transitions

---

## Next Steps

- [Styling](/guide/styling) - Style ActionBars, tabs, drawers, and navigation buttons
- [Performance](/guide/performance) - Keep navigation smooth on lower-spec devices
- [Testing](/guide/testing) - Test guards, route params, and modal results
- [Examples](/examples) - Explore complete navigation examples`;

    this.htmlContent = await marked(markdownContent);
    this.changeDetectorRef.markForCheck();
  }
}