import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-styling',
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
export class StylingComponent implements OnInit {
  htmlContent = '';

  async ngOnInit() {
    const markdownContent = `# Styling in NativeScript-Angular

Learn how to style your NativeScript-Angular applications.

## CSS Support

NativeScript supports a subset of CSS properties optimized for mobile:

\`\`\`css
.title {
  font-size: 24;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 20;
}

.button {
  background-color: #0066cc;
  color: white;
  border-radius: 5;
  padding: 10 20;
}
\`\`\`

## Platform-Specific Styles

Use platform-specific CSS files:

- \`app.android.css\` - Android-specific styles
- \`app.ios.css\` - iOS-specific styles

## SCSS Support

NativeScript supports SCSS out of the box:

\`\`\`scss
$primary-color: #0066cc;
$border-radius: 5;

.card {
  background-color: white;
  border-radius: $border-radius;
  elevation: 3; // Android shadow
  
  .title {
    color: $primary-color;
    font-weight: bold;
  }
}
\`\`\`

## Next Steps

- [First App](/guide/first-app) - Build your first complete app`;

    this.htmlContent = await marked(markdownContent);
  }
}