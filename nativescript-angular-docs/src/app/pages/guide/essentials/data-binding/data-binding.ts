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
  selector: 'app-data-binding',
  imports: [],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataBindingComponent implements OnInit {
  htmlContent!: SafeHtml;

  private readonly marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# Data Binding in NativeScript-Angular

Learn how to connect your UI to data and events in NativeScript-Angular.

## Binding Basics

Angular binding works the same in NativeScript templates as on the web:

- **Interpolation** – \`{{ value }}\` for text nodes
- **Property binding** – \`[prop]="expr"\`
- **Event binding** – \`(event)="handler($event)"\`
- **Two-way binding** – \`[(ngModel)]="model"\`

> In NativeScript, bindings target **native view properties** like \`text\`, \`visibility\`, \`isEnabled\`, \`row\`, \`colSpan\`, etc.

\`\`\`html
<StackLayout>
  <Label class="h2" [text]="'Hello, ' + name"></Label>
  <Button text="Tap me" (tap)="increment()"></Button>
  <Label [text]="'Taps: ' + count"></Label>
</StackLayout>
\`\`\`

\`\`\`ts
export class DemoComponent {
  name = 'Aodh';
  count = 0;

  increment(): void {
    this.count++;
  }
}
\`\`\`

## Two-Way Binding with \`ngModel\`

Use \`[(ngModel)]\` for form-like controls. Import \`NativeScriptFormsModule\`.

\`\`\`html
<TextField hint="Enter name" [(ngModel)]="name"></TextField>
<Label [text]="'Welcome, ' + name"></Label>
\`\`\`

## Observables & the \`async\` Pipe

\`\`\`html
<ActivityIndicator [busy]="loading$ | async"></ActivityIndicator>

<ListView [items]="animals$ | async">
  <ng-template let-animal="item">
    <Label [text]="animal.name"></Label>
  </ng-template>
</ListView>
\`\`\`

## Pipes & Safe Navigation

\`\`\`html
<Label [text]="createdAt | date:'medium'"></Label>
<Label [text]="owner?.address?.county || 'Unknown county'"></Label>
\`\`\`

## Next Steps

- [UI Components](/guide/ui-components)
- [Routing](/guide/routing)
- [Performance](/guide/performance)
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}