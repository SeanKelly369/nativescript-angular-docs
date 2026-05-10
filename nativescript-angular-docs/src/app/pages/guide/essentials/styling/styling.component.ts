import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';

hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);

@Component({
  selector: 'app-styling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './styling.component.html',
})
export class StylingComponent implements OnInit {
  htmlContent!: SafeHtml;

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly sanitiser = inject(DomSanitizer);

  private readonly marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'css';

        return hljs.highlight(code, { language }).value;
      }
    })
  );

  async ngOnInit(): Promise<void> {
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

    const html = await this.marked.parse(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}