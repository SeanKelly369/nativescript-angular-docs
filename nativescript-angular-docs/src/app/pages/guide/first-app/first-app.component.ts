import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-first-app',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="content-wrapper" [innerHTML]="htmlContent"></div>`,
  styles: [`
    .content-wrapper {
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      
      :global(h1) { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #333; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; }
      :global(h2) { font-size: 2rem; font-weight: 600; margin: 2rem 0 1rem 0; color: #333; }
      :global(h3) { font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: #333; }
      :global(p) { line-height: 1.7; margin-bottom: 1rem; color: #4a5568; }
      :global(ul, ol) { margin-bottom: 1rem; padding-left: 1.5rem; }
      :global(li) { margin-bottom: 0.5rem; line-height: 1.6; color: #4a5568; }
      :global(code) { background: #f1f5f9; padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 0.875em; color: #e53e3e; }
      :global(pre) { background: #1e293b; color: #e2e8f0; padding: 1.5rem; border-radius: 0.5rem; overflow-x: auto; margin: 1rem 0; }
      :global(pre code) { background: none; padding: 0; color: inherit; }
      :global(a) { color: #0066cc; text-decoration: none; }
      :global(a:hover) { text-decoration: underline; }
    }
  `]
})
export class FirstAppComponent implements OnInit {
  htmlContent = '';

  async ngOnInit() {
    const markdownContent = `# Your First NativeScript-Angular App

Build your first complete NativeScript-Angular application step by step.

## Create the Project

\`\`\`bash
ns create my-first-app --ng
cd my-first-app
\`\`\`

## Project Structure

Your new project will have this structure:

\`\`\`
my-first-app/
├── src/
│   └── app/
│       ├── app.component.ts
│       ├── app.component.html
│       ├── app.module.ts
│       └── main.ts
├── App_Resources/
└── nativescript.config.ts
\`\`\`

## Add Your First Component

Create a new component:

\`\`\`typescript
// src/app/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: \`
    <Page>
      <ActionBar title="My First App"></ActionBar>
      <StackLayout class="p-20">
        <Label text="Hello, NativeScript-Angular!" class="h1 text-center"></Label>
        <Button text="Click Me!" (tap)="onButtonTap()" class="btn btn-primary"></Button>
      </StackLayout>
    </Page>
  \`
})
export class HomeComponent {
  onButtonTap() {
    alert('Hello from NativeScript-Angular!');
  }
}
\`\`\`

## Run Your App

\`\`\`bash
ns run ios
# or
ns run android
\`\`\`

Congratulations! You've built your first NativeScript-Angular app.

## Next Steps

- Explore [Examples](/examples) for more complex applications
- Join the [Community](/community) for help and discussions`;

    this.htmlContent = await marked(markdownContent);
  }
}