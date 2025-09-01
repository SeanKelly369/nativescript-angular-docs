import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-data-binding',
  imports: [],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataBindingComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitiser: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

 async ngOnInit(): Promise<void> {
    const markdownContent = `
# Data Binding in NativeScript-Angular

Learn how to connect your UI to data and events in NativeScript-Angular.

## Binding Basics

Angular binding works the same in NativeScript templates as on the web:

- **Interpolation** – \`{{ value }}\` for text nodes
- **Property binding** – \`[prop]="expr"\`
- **Event binding** – \`(event)="handler($event)"\`
- **Two-way binding** – \`\[(ngModel)\]="model"\`

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
  increment() { this.count++; }
}
\`\`\`

## Two-Way Binding with \`ngModel\`

Use \`\[(ngModel)\]\` for form-like controls. Import \`NativeScriptFormsModule\`.

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

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }

}
