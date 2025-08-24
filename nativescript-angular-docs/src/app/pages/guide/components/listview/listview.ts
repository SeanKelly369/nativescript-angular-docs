import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-listview',
  imports: [],
  templateUrl: './listview.html',
  styleUrl: './listview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Listview implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
  const markdownContent = `
# NativeScript \`ListView\`

The **\`ListView\`** is a powerful component for displaying a scrollable list of items.
It is highly optimized for performance and only renders what is visible on screen.

---

## Basic Usage

\`\`\`xml
<Page>
  <ListView [items]="items" (itemTap)="onItemTap($event)">
    <ng-template let-item="item">
      <Label [text]="item.name"></Label>
    </ng-template>
  </ListView>
</Page>
\`\`\`

**TypeScript:**

\`\`\`ts
export class MyComponent {
  items = [
    { name: "Apple" },
    { name: "Banana" },
    { name: "Orange" }
  ];

  onItemTap(event: any) {
    console.log("Tapped item index: " + event.index);
  }
}
\`\`\`

---

## Key Properties

- **\`items\`** – the array of data to render.
- **\`itemTap\`** – event fired when a row is tapped.
- **\`itemTemplateSelector\`** – lets you define multiple templates based on conditions.
- **\`separatorColor\`** – customize row separator lines (iOS only).

---

## Multiple Templates Example

\`\`\`xml
<ListView [items]="items" [itemTemplateSelector]="templateSelector">
  <ng-template nsTemplateKey="fruit" let-item="item">
    <Label [text]="'🍎 ' + item.name"></Label>
  </ng-template>

  <ng-template nsTemplateKey="vegetable" let-item="item">
    <Label [text]="'🥕 ' + item.name"></Label>
  </ng-template>
</ListView>
\`\`\`

**TypeScript:**

\`\`\`ts
items = [
  { type: "fruit", name: "Apple" },
  { type: "vegetable", name: "Carrot" }
];

templateSelector = (item, index, items) => item.type;
\`\`\`

---

## Notes

- Use **\`CollectionView\`** for advanced virtualization and grids.
- ListView is **best for simple, flat lists**.
- For infinite scrolling, listen to **\`loadMoreItems\`**.
`;

  const html = await marked(markdownContent);
  this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
  this.changeDetectorRef.markForCheck();
}

}
