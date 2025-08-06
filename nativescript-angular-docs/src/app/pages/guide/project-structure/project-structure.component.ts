import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-project-structure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'project-structure.component.html',
  styleUrl: './project-structure.component.styles.scss'
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