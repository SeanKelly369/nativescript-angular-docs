import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { marked } from 'marked';

@Component({
  selector: 'app-project-structure',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="content-wrapper" [innerHTML]="htmlContent"></div>
  `,
  styles: [`
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
      
      :global(a) {
        color: #0066cc;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  `]
})
export class ProjectStructureComponent implements OnInit {
  htmlContent = '';

  async ngOnInit() {
    // Load the markdown content we created earlier
    const markdownContent = await this.loadMarkdownFromFile();
    this.htmlContent = await marked(markdownContent);
  }

  private async loadMarkdownFromFile(): Promise<string> {
    // In a real app, you'd load from assets or HTTP
    return `# Project Structure

Understanding the structure of a NativeScript-Angular project.

## Overview

A typical NativeScript-Angular project follows Angular conventions while adding mobile-specific configurations and directories.

\`\`\`
my-app/
├── src/
│   └── app/
│       ├── app.component.ts
│       ├── app.component.html
│       ├── app.component.css
│       ├── app.module.ts
│       ├── app-routing.module.ts
│       └── main.ts
├── App_Resources/
│   ├── Android/
│   └── iOS/
├── platforms/
├── node_modules/
├── nativescript.config.ts
├── package.json
├── tsconfig.json
└── webpack.config.js
\`\`\`

## Core Directories

### \`/src/app/\`
Contains your Angular application code:

- **\`app.component.ts\`** - Root component
- **\`app.component.html\`** - Root component template
- **\`app.component.css\`** - Root component styles
- **\`app.module.ts\`** - Root NgModule
- **\`app-routing.module.ts\`** - Routing configuration
- **\`main.ts\`** - Application bootstrap

### \`/App_Resources/\`
Platform-specific resources:

#### \`/App_Resources/Android/\`
- **\`src/main/AndroidManifest.xml\`** - Android manifest
- **\`src/main/res/\`** - Android resources (icons, splash screens)
- **\`src/main/assets/\`** - Android assets

#### \`/App_Resources/iOS/\`
- **\`Info.plist\`** - iOS app configuration
- **\`build.xcconfig\`** - Build configuration
- **\`Assets.xcassets/\`** - iOS assets (icons, launch images)

### \`/platforms/\`
Generated platform-specific code (auto-generated, don't edit)

## Configuration Files

### \`nativescript.config.ts\`
Main NativeScript configuration:

\`\`\`typescript
import { NativeScriptConfig } from '@nativescript/cli';

export default {
  id: 'org.nativescript.myapp',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  ios: {
    discardUncaughtJsExceptions: true
  }
} as NativeScriptConfig;
\`\`\`

## Next Steps

- [Components Guide](/guide/components) - Learn about NativeScript UI components
- [Navigation](/guide/navigation) - Understand mobile navigation patterns
- [Styling](/guide/styling) - Style your NativeScript-Angular app`;
  }
}