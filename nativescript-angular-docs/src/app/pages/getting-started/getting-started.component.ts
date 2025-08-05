import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { marked } from 'marked';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="docs-container">
      <div class="docs-sidebar">
        <nav class="sidebar-nav">
          <h3>Getting Started</h3>
          <ul>
            <li><a href="#overview" (click)="scrollTo('overview')">Overview</a></li>
            <li><a href="#prerequisites" (click)="scrollTo('prerequisites')">Prerequisites</a></li>
            <li><a href="#quick-start" (click)="scrollTo('quick-start')">Quick Start</a></li>
            <li><a routerLink="/getting-started/environment-setup">Environment Setup</a></li>
          </ul>
        </nav>
      </div>
      
      <main class="docs-content">
        <div class="content-wrapper" [innerHTML]="htmlContent"></div>
        
        <div class="docs-navigation">
          <div class="nav-previous">
            <a routerLink="/" class="nav-link">
              <span class="nav-direction">← Previous</span>
              <span class="nav-title">Home</span>
            </a>
          </div>
          <div class="nav-next">
            <a routerLink="/guide" class="nav-link">
              <span class="nav-direction">Next →</span>
              <span class="nav-title">Guide</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .docs-container {
      display: flex;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .docs-sidebar {
      width: 250px;
      flex-shrink: 0;
    }

    .sidebar-nav {
      position: sticky;
      top: 80px;
      background: #f8fafc;
      border-radius: 0.5rem;
      padding: 1.5rem;
    }

    .sidebar-nav h3 {
      margin: 0 0 1rem 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #333;
    }

    .sidebar-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .sidebar-nav li {
      margin-bottom: 0.5rem;
    }

    .sidebar-nav a {
      display: block;
      padding: 0.5rem 0.75rem;
      color: #64748b;
      text-decoration: none;
      border-radius: 0.25rem;
      transition: all 0.2s ease;
      
      &:hover {
        background: #e2e8f0;
        color: #0066cc;
      }
    }

    .docs-content {
      flex: 1;
      min-width: 0;
    }

    .content-wrapper {
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      
      :global(h1) {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #333;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 0.5rem;
      }
      
      :global(h2) {
        font-size: 2rem;
        font-weight: 600;
        margin: 2rem 0 1rem 0;
        color: #333;
      }
      
      :global(h3) {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 1.5rem 0 0.75rem 0;
        color: #333;
      }
      
      :global(p) {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: #4a5568;
      }
      
      :global(ul, ol) {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
      }
      
      :global(li) {
        margin-bottom: 0.5rem;
        line-height: 1.6;
        color: #4a5568;
      }
      
      :global(code) {
        background: #f1f5f9;
        padding: 0.125rem 0.25rem;
        border-radius: 0.25rem;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.875em;
        color: #e53e3e;
      }
      
      :global(pre) {
        background: #1e293b;
        color: #e2e8f0;
        padding: 1.5rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin: 1rem 0;
        
        code {
          background: none;
          padding: 0;
          color: inherit;
        }
      }
      
      :global(blockquote) {
        border-left: 4px solid #0066cc;
        padding-left: 1rem;
        margin: 1rem 0;
        font-style: italic;
        color: #64748b;
      }
      
      :global(a) {
        color: #0066cc;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .docs-navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #e2e8f0;
    }

    .nav-link {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      border-radius: 0.5rem;
      text-decoration: none;
      transition: all 0.2s ease;
      border: 1px solid #e2e8f0;
      
      &:hover {
        border-color: #0066cc;
        box-shadow: 0 2px 4px rgba(0, 102, 204, 0.1);
      }
    }

    .nav-direction {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 0.25rem;
    }

    .nav-title {
      font-weight: 600;
      color: #333;
    }

    .nav-previous {
      margin-right: auto;
    }

    .nav-next {
      margin-left: auto;
    }

    @media (max-width: 768px) {
      .docs-container {
        flex-direction: column;
        padding: 1rem;
      }
      
      .docs-sidebar {
        width: 100%;
      }
      
      .sidebar-nav {
        position: static;
      }
      
      .content-wrapper {
        padding: 1.5rem;
      }
      
      .docs-navigation {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class GettingStartedComponent implements OnInit {
  private http = inject(HttpClient);
  htmlContent = '';

  ngOnInit() {
    this.loadMarkdownContent();
  }

  private async loadMarkdownContent() {
    try {
      // In a real app, you'd load from assets or API
      const markdownContent = `# Getting Started with NativeScript-Angular

NativeScript-Angular combines the power of Angular with native mobile development to create truly native iOS and Android applications with shared code.

## What is NativeScript-Angular?

NativeScript-Angular is a framework that allows you to build native mobile applications using Angular and TypeScript. Unlike hybrid frameworks that use WebViews, NativeScript-Angular provides direct access to native APIs and UI components, resulting in truly native performance and user experience.

### How NativeScript-Angular Works

NativeScript-Angular extends the Angular framework with mobile-specific features:

- **page-router-outlet**: Enhanced routing system for mobile navigation
- **Native UI Components**: Access to platform-specific UI elements
- **ActionBar**: Native navigation bars with platform-specific styling
- **Mobile Gestures**: Touch events and gesture recognition
- **Device APIs**: Direct access to camera, GPS, contacts, and more

## Key Features

- **Native Performance**: Direct access to native APIs without WebViews
- **Angular Integration**: Use familiar Angular concepts like components, services, and routing  
- **Cross-Platform**: Write once, run on both iOS and Android
- **TypeScript Support**: Full TypeScript support with strong typing
- **Hot Module Replacement**: Fast development with instant updates
- **Native UI**: Access to platform-specific UI components and styling
- **Code Sharing**: Share code between web and mobile applications

## Prerequisites

Before getting started with NativeScript-Angular, make sure you have:

- **Node.js** (v16 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Basic knowledge of Angular and TypeScript**
- **Development environment** set up for iOS and/or Android
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)

## Quick Start

### 1. Install NativeScript CLI

\`\`\`bash
npm install -g @nativescript/cli
\`\`\`

Verify the installation:
\`\`\`bash
ns --version
\`\`\`

### 2. Create a New Project

\`\`\`bash
# Create a new NativeScript-Angular project
ns create my-app --ng

# Navigate to the project directory
cd my-app
\`\`\`

### 3. Run Your App

For iOS (requires macOS and Xcode):
\`\`\`bash
ns run ios
\`\`\`

For Android:
\`\`\`bash
ns run android
\`\`\`

## Project Structure

A typical NativeScript-Angular project has the following structure:

\`\`\`
my-app/
├── src/
│   └── app/
│       ├── app.component.ts
│       ├── app.component.html
│       ├── app.module.ts
│       └── main.ts
├── App_Resources/
│   ├── Android/
│   └── iOS/
├── package.json
└── nativescript.config.ts
\`\`\`

### Key Files and Directories

- **src/app/**: Contains your Angular application code
- **App_Resources/**: Platform-specific resources (icons, splash screens, etc.)
- **nativescript.config.ts**: NativeScript project configuration
- **package.json**: Project dependencies and scripts

## Your First Component

Let's create a simple component to understand the basics:

\`\`\`typescript
// src/app/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'ns-home',
  template: \`
    <ActionBar title="My App"></ActionBar>
    <StackLayout class="page">
      <Label text="Welcome to NativeScript-Angular!" class="h1 text-center"></Label>
      <Button text="Tap me!" (tap)="onTap()" class="btn btn-primary"></Button>
      <Label [text]="message" class="h2 text-center" *ngIf="message"></Label>
    </StackLayout>
  \`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  message = '';

  onTap() {
    this.message = 'Hello from NativeScript-Angular!';
  }
}
\`\`\`

### Template Syntax Differences

| Web Angular | NativeScript-Angular |
|-------------|---------------------|
| \`<div>\` | \`<StackLayout>\` |
| \`<button (click)="...">\` | \`<Button (tap)="...">\` |
| \`<input>\` | \`<TextField>\` |
| \`<img>\` | \`<Image>\` |

## Building a Master-Detail App

Let's build a simple master-detail app that displays a list of items and allows navigation to a detail view.

### 1. Create the Data Model

\`\`\`typescript
// src/app/models/item.model.ts
export interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
}
\`\`\`

### 2. Create the Item Service

\`\`\`typescript
// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [
    {
      id: 1,
      name: 'First Item',
      description: 'This is the first item in our list',
      image: '~/assets/item1.png'
    },
    {
      id: 2,
      name: 'Second Item', 
      description: 'This is the second item in our list',
      image: '~/assets/item2.png'
    }
  ];

  getItems(): Item[] {
    return this.items;
  }

  getItem(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }
}
\`\`\`

### 3. Create the List Component

\`\`\`typescript
// src/app/item-list/item-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'ns-item-list',
  template: \`
    <ActionBar title="Items"></ActionBar>
    <ListView [items]="items" (itemTap)="onItemTap($event)">
      <ng-template let-item="item">
        <GridLayout rows="auto, auto" columns="80, *" class="list-item">
          <Image [src]="item.image" row="0" col="0" class="item-image"></Image>
          <Label [text]="item.name" row="0" col="1" class="item-name"></Label>
          <Label [text]="item.description" row="1" col="1" class="item-description"></Label>
        </GridLayout>
      </ng-template>
    </ListView>
  \`,
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private itemService: ItemService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit() {
    this.items = this.itemService.getItems();
  }

  onItemTap(event: any) {
    const item = this.items[event.index];
    this.routerExtensions.navigate(['/item', item.id]);
  }
}
\`\`\`

### 4. Create the Detail Component

\`\`\`typescript
// src/app/item-detail/item-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'ns-item-detail',
  template: \`
    <ActionBar [title]="item?.name">
      <NavigationButton (tap)="goBack()"></NavigationButton>
    </ActionBar>
    <ScrollView *ngIf="item">
      <StackLayout class="page">
        <Image [src]="item.image" class="detail-image"></Image>
        <Label [text]="item.name" class="h1"></Label>
        <Label [text]="item.description" class="body" textWrap="true"></Label>
      </StackLayout>
    </ScrollView>
  \`,
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item | undefined;

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.item = this.itemService.getItem(id);
  }

  goBack() {
    this.routerExtensions.back();
  }
}
\`\`\`

### 5. Set Up Routing

\`\`\`typescript
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: ItemListComponent },
  { path: 'item/:id', component: ItemDetailComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
\`\`\`

## Navigation Patterns

NativeScript-Angular provides several navigation patterns:

### Page Router Outlet
Use \`<page-router-outlet>\` for native mobile navigation:

\`\`\`html
<!-- app.component.html -->
<page-router-outlet></page-router-outlet>
\`\`\`

### Router Extensions
Use RouterExtensions for programmatic navigation:

\`\`\`typescript
import { RouterExtensions } from '@nativescript/angular';

constructor(private routerExtensions: RouterExtensions) {}

navigateToDetail(id: number) {
  this.routerExtensions.navigate(['/detail', id]);
}

goBack() {
  this.routerExtensions.back();
}
\`\`\`

## Styling Your App

NativeScript-Angular uses CSS for styling with some platform-specific extensions:

\`\`\`css
/* Global styles */
.btn {
  font-size: 16;
  color: white;
  background-color: #3498db;
  border-radius: 5;
  padding: 10;
  margin: 10;
}

/* Platform-specific styles */
.btn.ios {
  border-radius: 10;
}

.btn.android {
  text-transform: uppercase;
}
\`\`\`

## Next Steps

Now that you have the basics, explore these topics:

- **[Environment Setup](/getting-started/environment-setup)** - Set up your development environment
- **[Project Structure](/guide/project-structure)** - Understand the project layout  
- **[UI Components](/guide/components)** - Learn about NativeScript UI components
- **[Navigation](/guide/navigation)** - Master mobile navigation patterns
- **[Styling](/guide/styling)** - Style your applications
- **[Code Sharing](/guide/code-sharing)** - Share code between web and mobile

## Troubleshooting

### Common Issues

**App not running on device:**
- Ensure your device is connected and developer mode is enabled
- Check that the platform is properly installed: \`ns platform list\`

**Build errors:**
- Clean and rebuild: \`ns clean\` then \`ns build ios/android\`
- Update dependencies: \`npm update\`

**Hot reload not working:**
- Restart the app with \`ns run ios/android\`
- Check that your device and development machine are on the same network

## Need Help?

- **[Examples](/examples)** - Browse practical examples
- **[Community](/community)** - Join discussions and get help
- **[API Reference](/api)** - Detailed API documentation
- **[GitHub Issues](https://github.com/NativeScript/nativescript-angular/issues)** - Report bugs and issues
- **[Discord](https://discord.com/invite/RgmpGky9GR)** - Real-time community support`;

      this.htmlContent = await marked(markdownContent);
    } catch (error) {
      console.error('Error loading content:', error);
      this.htmlContent = '<p>Error loading content. Please try again later.</p>';
    }
  }

  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}