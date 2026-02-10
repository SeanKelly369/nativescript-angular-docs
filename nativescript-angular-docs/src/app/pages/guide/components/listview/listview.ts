import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-listview',
  imports: [],
  templateUrl: './listview.html',
  styleUrl: './listview.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class Listview implements OnInit {
  htmlContent!: SafeHtml;

  private readonly visualsHtml = this.buildVisualsHtml();

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    // Optional: configure marked once
    marked.setOptions({
      gfm: true,
      breaks: false
    });

    const markdownContent = this.getMarkdown();

    const md = this.dedent(markdownContent);
    const htmlFromMd = marked.parse(md) as string;

    const finalHtml =
      `<div class="content-wrapper">` +
        htmlFromMd.replace('{{LISTVIEW_VIZ}}', this.visualsHtml) +
      `</div>`;

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(finalHtml);
    this.changeDetectorRef.markForCheck();
  }

  private getMarkdown(): string {
    return `
# NativeScript \`ListView\`

The **\`ListView\`** is a high-performance NativeScript component for displaying
**simple, scrollable lists of data**.

It is fast because it does **not create a view for every item**.
Instead, it renders only what is visible on screen and **reuses item views**
as you scroll.

---

## How ListView Works (Mental Model)

{{LISTVIEW_VIZ}}

### The key ideas

- A \`ListView\` is a **single scrollable container**
- Only rows inside the **visible viewport** are rendered
- As you scroll, **existing item views are recycled**
- New data is bound into those same views

This means:
- Scrolling stays smooth
- Memory usage stays low
- Performance scales well, even with large datasets

You do **not** manage recycling yourself — NativeScript handles it internally.

---

## Basic Usage

\`\`\`xml
<Page>
  <ListView
    [items]="items"
    (itemTap)="onItemTap($event)">

    <ng-template let-item="item">
      <Label [text]="item.name"></Label>
    </ng-template>

  </ListView>
</Page>
\`\`\`

### TypeScript

\`\`\`ts
export class MyComponent {

  items = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Orange' }
  ];

  onItemTap(event: any) {
    console.log('Tapped item index:', event.index);
  }
}
\`\`\`

---

## How Data Binding Works

- The \`items\` array does **not** create views
- Only visible rows are bound to templates
- When scrolling, NativeScript:
  1. Reuses an existing row view
  2. Binds new item data into it
  3. Updates the UI

Because views are reused:
- Avoid storing state directly on the view
- Treat the template as **purely data-driven**

---

## Multiple Item Templates

Use \`itemTemplateSelector\` when items need different layouts.

\`\`\`xml
<ListView
  [items]="items"
  [itemTemplateSelector]="templateSelector">

  <ng-template nsTemplateKey="fruit" let-item="item">
    <Label [text]="'🍎 ' + item.name"></Label>
  </ng-template>

  <ng-template nsTemplateKey="vegetable" let-item="item">
    <Label [text]="'🥕 ' + item.name"></Label>
  </ng-template>

</ListView>
\`\`\`

### TypeScript

\`\`\`ts
items = [
  { type: 'fruit', name: 'Apple' },
  { type: 'vegetable', name: 'Carrot' }
];

templateSelector = (item: any) => item.type;
\`\`\`

---

## Key Properties

- **\`items\`** – the array of data to render
- **\`itemTap\`** – event fired when a row is tapped
- **\`itemTemplateSelector\`** – define multiple templates based on conditions
- **\`separatorColor\`** – customize row separators (iOS only)

---

## When to Use \`CollectionView\` Instead

Use **CollectionView** if you need:
- grid layouts
- better iOS scrolling behavior
- more control over virtualization

For simple lists, **ListView is still the cleanest option**.
`;
  }

  private buildVisualsHtml(): string {
    return `
<div class="viz-grid">

  <figure class="viz-card">
    <figcaption class="viz-title">ListView = container + recycled item views</figcaption>
    <svg class="viz" viewBox="0 0 760 242" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ListView container and items">
      <rect x="20" y="20" width="360" height="222" rx="10" fill="rgba(123, 78, 163, 0.18)" stroke="rgba(123, 78, 163, 1)" stroke-width="1"/>
      <text x="40" y="55" font-size="18" font-weight="500" fill="#3b2454" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">container</text>

      <rect x="55" y="70" width="290" height="146" rx="8" fill="rgba(15, 23, 42, 0.08)" stroke="rgba(15, 23, 42, 1)" stroke-width="1"/>
      <text x="70" y="97" font-size="14" font-weight="500" fill="#1f2430" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">viewport (on screen)</text>

      <rect x="70" y="110" width="260" height="26" rx="5" fill="rgba(224, 187, 253, 0.85)" stroke="rgba(0,0,0,0.12)"/>
      <rect x="70" y="143" width="260" height="26" rx="5" fill="rgba(224, 187, 253, 0.85)" stroke="rgba(0,0,0,0.12)"/>
      <rect x="70" y="176" width="200" height="26" rx="5" fill="rgba(224, 187, 253, 0.85)" stroke="rgba(0,0,0,0.12)"/>

      <rect x="420" y="20" width="320" height="200" rx="10" fill="rgba(243, 162, 58)" stroke="rgba(255, 255, 255, 0.55)" stroke-width="1"/>
      <text x="440" y="55" font-size="18" font-weight="800" fill="#5a3b12" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">items (data)</text>

      <g opacity="0.9">
        <rect x="440" y="80" width="280" height="18" rx="4" fill="rgb(175, 111, 230, 0.85)"/>
        <rect x="440" y="105" width="260" height="18" rx="4" fill="rgb(175, 111, 230)"/>
        <rect x="440" y="130" width="280" height="18" rx="4" fill="rgba(123, 78, 163, 0.35)"/>
        <rect x="440" y="155" width="240" height="18" rx="4" fill="rgb(175, 111, 230)"/>
        <rect x="440" y="180" width="280" height="18" rx="4" fill="rgba(123, 78, 163, 0.35)"/>
      </g>

      <path d="M360 120 C 390 110, 400 110, 420 120" fill="none" stroke="rgba(31,36,48,0.55)" stroke-width="1" stroke-linecap="round"/>
      <path d="M410 112 L 422 120 L 410 128" fill="none" stroke="rgba(31,36,48,0.55)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="368" y="145" font-size="14" font-weight="500" fill="#1f2430" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">bind visible rows</text>
    </svg>
  </figure>

  <figure class="viz-card">
    <figcaption class="viz-title">Virtualization (only a few views exist)</figcaption>
    <svg class="viz" viewBox="0 0 760 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Virtualization and recycling">
      <rect x="20" y="20" width="520" height="220" rx="5" fill="rgba(241, 224, 255, 0.94)" stroke="rgba(167, 103, 223, 0.97)" stroke-width="1"/>
      <text x="40" y="55" font-size="18" font-weight="500" fill="#2d2d2d" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">scrollable list</text>

      <g opacity="0.85">
        <rect x="50" y="80" width="500" height="22" rx="5" fill="rgb(255, 255, 255)"/>
        <rect x="50" y="110" width="500" height="22" rx="5" fill="rgb(255, 255, 255)"/>
        <rect x="50" y="140" width="500" height="22" rx="5" fill="rgb(255, 255, 255)"/>
        <rect x="50" y="170" width="500" height="22" rx="5" fill="rgb(255, 255, 255)"/>
      </g>

      <rect x="40" y="70" width="520" height="140" rx="18" fill="rgba(15, 23, 42, 0.06)" stroke="rgba(15, 23, 42, 0.28)" stroke-width="1"/>
      <text x="55" y="122" font-size="16" font-weight="800" fill="#1f2430" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">only these rows are rendered</text>

      <rect x="55" y="142" width="490" height="18" rx="6" fill="rgba(243, 162, 58, 0.95)" />
      <rect x="55" y="171" width="490" height="18" rx="6" fill="rgba(243, 162, 58, 0.95)" />

      <rect x="570" y="20" width="185" height="200" rx="5" fill="rgba(15, 23, 42, 0.06)" stroke="rgba(15, 23, 42, 0.18)" stroke-width="1"/>
      <text x="618" y="55" font-size="18" font-weight="900" fill="#1f2430" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">recycle</text>

      <path d="M650 110 C 630 105, 625 140, 650 145" fill="none" stroke="rgba(123, 78, 163, 0.75)" stroke-width="2" stroke-linecap="round"/>
      <path d="M650 145 C 670 150, 675 115, 650 110" fill="none" stroke="rgba(123, 78, 163, 0.75)" stroke-width="3" stroke-linecap="round"/>

      <rect x="620" y="165" width="100" height="26" rx="5" fill="rgba(243, 162, 58, 0.9)"/>
      <rect x="620" y="80" width="100" height="26" rx="5" fill="rgba(243, 162, 58, 0.9)"/>
      <text x="610" y="210" font-size="13" font-weight="800" fill="#5b6477" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">same views, new data</text>
    </svg>
  </figure>

</div>
`.trim();
  }

  private dedent(str: string): string {
    const lines = str.replace(/\t/g, '  ').split('\n');

    while (lines.length && lines[0].trim() === '') lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

    const indents = lines
      .filter(l => l.trim().length)
      .map(l => (l.match(/^ */)?.[0].length ?? 0));

    const minIndent = indents.length ? Math.min(...indents) : 0;
    return lines.map(l => l.slice(minIndent)).join('\n');
  }
}