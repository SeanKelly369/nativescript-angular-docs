import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CommonModule],
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
export class ComponentsComponent implements OnInit {
  htmlContent = '';

  async ngOnInit() {
    const markdownContent = `# NativeScript UI Components

Learn about the UI components available in NativeScript-Angular.

## Layout Components

### StackLayout
Arranges child elements in a single line (horizontally or vertically).

\`\`\`html
<StackLayout orientation="vertical">
  <Label text="First"></Label>
  <Label text="Second"></Label>
  <Label text="Third"></Label>
</StackLayout>
\`\`\`

### GridLayout
Arranges child elements in a table structure of rows and columns.

\`\`\`html
<GridLayout rows="auto, *" columns="*, auto">
  <Label text="Top Left" row="0" col="0"></Label>
  <Label text="Top Right" row="0" col="1"></Label>
  <Label text="Bottom Span" row="1" colSpan="2"></Label>
</GridLayout>
\`\`\`

## UI Components

### Button
A button component for user interactions.

\`\`\`html
<Button text="Click Me" (tap)="onButtonTap()"></Button>
\`\`\`

### Label
Displays read-only text.

\`\`\`html
<Label text="Hello World" class="title"></Label>
\`\`\`

### TextField
Single-line text input.

\`\`\`html
<TextField [(ngModel)]="username" hint="Enter username"></TextField>
\`\`\`

### ListView
Displays a scrollable list of items.

\`\`\`html
<ListView [items]="items">
  <ng-template let-item="item">
    <Label [text]="item.name"></Label>
  </ng-template>
</ListView>
\`\`\`

## Next Steps

- [Navigation](/guide/navigation) - Learn about navigation patterns
- [Styling](/guide/styling) - Style your components`;

    this.htmlContent = await marked(markdownContent);
  }
}