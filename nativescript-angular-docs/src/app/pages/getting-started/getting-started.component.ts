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

NativeScript-Angular combines the power of Angular with native mobile development to create truly native iOS and Android applications.

## What is NativeScript-Angular?

NativeScript-Angular is a framework that allows you to build native mobile applications using Angular and TypeScript. Unlike hybrid frameworks that use WebViews, NativeScript-Angular provides direct access to native APIs and UI components, resulting in truly native performance and user experience.

## Key Features

- **Native Performance**: Direct access to native APIs without WebViews
- **Angular Integration**: Use familiar Angular concepts like components, services, and routing  
- **Cross-Platform**: Write once, run on both iOS and Android
- **TypeScript Support**: Full TypeScript support with strong typing
- **Hot Module Replacement**: Fast development with instant updates
- **Native UI**: Access to platform-specific UI components and styling

## Prerequisites

Before getting started with NativeScript-Angular, make sure you have:

- Node.js (v16 or later)
- npm or yarn package manager
- Basic knowledge of Angular and TypeScript
- Development environment set up for iOS and/or Android

## Quick Start

### 1. Install NativeScript CLI

\`\`\`bash
npm install -g @nativescript/cli
\`\`\`

### 2. Create a New Project

\`\`\`bash
ns create my-app --ng
cd my-app
\`\`\`

### 3. Run Your App

For iOS:
\`\`\`bash
ns run ios
\`\`\`

For Android:
\`\`\`bash
ns run android
\`\`\`

## Next Steps

- [Environment Setup](/getting-started/environment-setup) - Set up your development environment
- [Project Structure](/guide/project-structure) - Understand the project layout
- [Your First App](/guide/first-app) - Build your first NativeScript-Angular app
- [Components](/guide/components) - Learn about NativeScript UI components

## Need Help?

- Check out our [Examples](/examples) section
- Join our [Community](/community) discussions
- Browse the [API Reference](/api)`;

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