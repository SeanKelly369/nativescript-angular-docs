import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-navigation',
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
export class NavigationComponent implements OnInit {
  htmlContent = '';

  async ngOnInit() {
    const markdownContent = `# Navigation in NativeScript-Angular

Learn about navigation patterns and routing in NativeScript-Angular applications.

## Router Extensions

NativeScript-Angular provides \`RouterExtensions\` for mobile-specific navigation.

\`\`\`typescript
import { RouterExtensions } from '@nativescript/angular';

@Component({...})
export class MyComponent {
  constructor(private router: RouterExtensions) {}
  
  navigateToDetail() {
    this.router.navigate(['/detail', { id: 123 }]);
  }
  
  goBack() {
    this.router.back();
  }
}
\`\`\`

## Page Navigation

Use \`page-router-outlet\` for native page navigation:

\`\`\`html
<page-router-outlet></page-router-outlet>
\`\`\`

## Modal Navigation

Show modals programmatically:

\`\`\`typescript
import { ModalDialogService } from '@nativescript/angular';

showModal() {
  this.modal.showModal(DetailComponent, {
    context: { data: 'some data' },
    fullscreen: false
  });
}
\`\`\`

## Tab Navigation

Use \`BottomNavigation\` or \`Tabs\` for tab-based navigation:

\`\`\`html
<BottomNavigation>
  <TabStrip>
    <TabStripItem title="Home" iconSource="~/assets/home.png"></TabStripItem>
    <TabStripItem title="Profile" iconSource="~/assets/profile.png"></TabStripItem>
  </TabStrip>
  
  <TabContentItem>
    <page-router-outlet name="home"></page-router-outlet>
  </TabContentItem>
  <TabContentItem>
    <page-router-outlet name="profile"></page-router-outlet>
  </TabContentItem>
</BottomNavigation>
\`\`\`

## Next Steps

- [Styling](/guide/styling) - Learn about styling your app
- [First App](/guide/first-app) - Build your first complete app`;

    this.htmlContent = await marked(markdownContent);
  }
}