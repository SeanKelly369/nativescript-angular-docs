import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {
  htmlContent = '';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const md = `
# NativeScript + Angular — Overview

Build **truly native** iOS/Android apps with Angular and TypeScript.

---

## What you get

- Direct access to **native APIs** (no WebViews)
- Familiar **Angular** patterns (components, DI, routing)
- Shared code across **iOS & Android**
- Hot reload and fast iteration

---

## Concepts at a glance

### UI primitives
NativeScript maps XML-like tags to native widgets:

- \`<StackLayout>\` — vertical layout
- \`<GridLayout>\` — rows/columns
- \`<Label>\`, \`<Button>\`, \`<TextField>\`, \`<Image>\`

### Navigation
Mobile-first routing via \`<page-router-outlet>\` and **RouterExtensions**.

### Styling
Use plain CSS (and platform selectors like \`.ios\` / \`.android\`).

---

## Quick demo

\`\`\`ts
@Component({
  selector: 'ns-home',
  template: \`
    <ActionBar title="Hello"></ActionBar>
    <StackLayout class="page">
      <Label text="Welcome 👋" class="h1 text-center"></Label>
      <Button text="Tap me" (tap)="count++"></Button>
      <Label [text]="'Taps: ' + count" class="h2 text-center"></Label>
    </StackLayout>
  \`
})
export class HomeComponent {
  count = 0;
}
\`\`\`

---

## When to choose NativeScript

- You need **native performance** and device features
- Your team already knows **Angular**
- You want one codebase for **iOS + Android**

---

## Next up

- **[Prerequisites](/getting-started/prerequisites)**
- **[Quick Start](/getting-started/quick-start)**
- **[Environment Setup](/getting-started/environment-setup)**
`;
    this.htmlContent = await marked.parse(md);
    this.cdr.markForCheck();
  }
}
