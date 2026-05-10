import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);

@Component({
  selector: 'app-nativescript-components',
  imports: [],
  templateUrl: './nativescript-components.html',
  styleUrl: './nativescript-components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NativescriptComponents implements OnInit {
  htmlContent!: SafeHtml;

  private readonly marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        if (!lang || !hljs.getLanguage(lang)) {
          return hljs.highlight(code, {
            language: 'typescript',
            ignoreIllegals: true
          }).value;
        }

        return hljs.highlight(code, {
          language: lang,
          ignoreIllegals: true
        }).value;
      }
    })
  );

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# NativeScript Components Overview

NativeScript provides **native UI components** that map directly to native widgets on iOS and Android.

This means you write a single codebase in TypeScript and Angular, and the framework renders native UI elements.

---

## Core UI Components

- **\`<Label>\`** — displays text.
- **\`<Button>\`** — clickable button that triggers an event.
- **\`<TextField>\`** — single-line user input.
- **\`<TextView>\`** — multi-line user input.
- **\`<Image>\`** — shows an image from local files or a URL.
- **\`<Switch>\`** — toggle switch.

---

## Layout Components

Layouts are containers that arrange child views:

- **\`<StackLayout>\`** — stacks elements vertically or horizontally.
- **\`<GridLayout>\`** — arranges elements in rows and columns.
- **\`<FlexboxLayout>\`** — CSS flexbox-style layout.
- **\`<AbsoluteLayout>\`** — positions elements using exact coordinates.

---

## Example

\`\`\`xml
<Page>
  <StackLayout>
    <Label text="Hello NativeScript!" class="h1" />
    <Button text="Tap me" (tap)="onTap()" />
  </StackLayout>
</Page>
\`\`\`

---

## Notes

- Styles are applied via **CSS** or **SCSS**.
- Components are fully **native**, not WebViews.
- You can extend NativeScript components or create your own custom components.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}