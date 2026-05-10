import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('scss', scss);
hljs.registerLanguage('css', scss);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);

@Component({
  selector: 'app-gridlayout',
  imports: [],
  templateUrl: './gridlayout.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Gridlayout implements OnInit {
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
# GridLayout

\`GridLayout\` is one of the most useful NativeScript layout containers.

It arranges child views in rows and columns, making it ideal for structured screens, card layouts, forms, and high-performance list rows.

---

## Basic GridLayout

A \`GridLayout\` defines rows and columns, then places child views using \`row\` and \`col\`.

\`\`\`xml
<GridLayout rows="auto, auto" columns="*, auto">
  <Label
    row="0"
    col="0"
    text="Cow 142">
  </Label>

  <Label
    row="0"
    col="1"
    text="Active">
  </Label>

  <Label
    row="1"
    col="0"
    colSpan="2"
    text="Last synced today">
  </Label>
</GridLayout>
\`\`\`

This creates a two-column layout with a second row spanning both columns.

---

## Rows and Columns

Rows and columns can use different sizing values.

| Value | Meaning |
| --- | --- |
| \`auto\` | Size to fit content |
| \`*\` | Take remaining available space |
| \`2*\` | Take twice as much remaining space as \`*\` |
| \`100\` | Fixed size in device-independent pixels |

Example:

\`\`\`xml
<GridLayout rows="auto, *, auto" columns="*, auto">
  <Label row="0" col="0" colSpan="2" text="Header"></Label>
  <Label row="1" col="0" text="Main content"></Label>
  <Button row="2" col="1" text="Save"></Button>
</GridLayout>
\`\`\`

This is useful for screens with a header, flexible content area, and footer/action area.

---

## Column Spanning

Use \`colSpan\` when a view should stretch across multiple columns.

\`\`\`xml
<GridLayout rows="auto, auto" columns="*, *">
  <Label
    row="0"
    col="0"
    colSpan="2"
    text="Animal Details">
  </Label>

  <Label
    row="1"
    col="0"
    text="Tag">
  </Label>

  <Label
    row="1"
    col="1"
    text="IE123456789">
  </Label>
</GridLayout>
\`\`\`

Use \`rowSpan\` when a view should stretch across multiple rows.

\`\`\`xml
<GridLayout rows="auto, auto" columns="auto, *">
  <Image
    row="0"
    col="0"
    rowSpan="2"
    src="~/assets/cow.png"
    width="48"
    height="48">
  </Image>

  <Label row="0" col="1" text="Cow 142"></Label>
  <Label row="1" col="1" text="Active"></Label>
</GridLayout>
\`\`\`

---

## GridLayout for Forms

\`GridLayout\` is useful when labels and inputs need to line up neatly.

\`\`\`xml
<GridLayout rows="auto, auto, auto" columns="auto, *" class="form-grid">
  <Label row="0" col="0" text="Name"></Label>
  <TextField row="0" col="1" hint="Enter name"></TextField>

  <Label row="1" col="0" text="Email"></Label>
  <TextField row="1" col="1" hint="Enter email"></TextField>

  <Button row="2" col="1" text="Save"></Button>
</GridLayout>
\`\`\`

This keeps the form aligned without needing extra wrapper layouts.

---

## GridLayout for List Rows

\`GridLayout\` is usually better than deeply nested \`StackLayout\` components inside \`CollectionView\` or \`ListView\`.

\`\`\`xml
<CollectionView [items]="animals">
  <ng-template let-animal="item">
    <GridLayout columns="*, auto" rows="auto, auto" class="animal-row">
      <Label
        row="0"
        col="0"
        [text]="animal.name"
        class="animal-name">
      </Label>

      <Label
        row="0"
        col="1"
        [text]="animal.status"
        class="animal-status">
      </Label>

      <Label
        row="1"
        col="0"
        colSpan="2"
        [text]="animal.tag">
      </Label>
    </GridLayout>
  </ng-template>
</CollectionView>
\`\`\`

This keeps the row template flat and helps scrolling stay smooth.

---

## Styling GridLayout

You can style the \`GridLayout\` itself and its children with CSS or SCSS.

\`\`\`scss
.animal-row {
  padding: 12;
}

.animal-name {
  font-size: 18;
  font-weight: 700;
}

.animal-status {
  font-size: 14;
  text-align: right;
}
\`\`\`

Use spacing on child views rather than adding extra wrapper layouts where possible.

---

## GridLayout vs StackLayout

| Need | Better Choice |
| --- | --- |
| Simple vertical stack | \`StackLayout\` |
| Simple horizontal row | \`StackLayout\` |
| Aligned rows and columns | \`GridLayout\` |
| Complex list item | \`GridLayout\` |
| Performance-sensitive row | \`GridLayout\` |

---

## Common Mistakes

### Using too many nested StackLayouts

Avoid this inside lists:

\`\`\`xml
<StackLayout>
  <StackLayout orientation="horizontal">
    <StackLayout>
      <Label [text]="animal.name"></Label>
      <Label [text]="animal.tag"></Label>
    </StackLayout>

    <Label [text]="animal.status"></Label>
  </StackLayout>
</StackLayout>
\`\`\`

Prefer a flatter \`GridLayout\`:

\`\`\`xml
<GridLayout rows="auto, auto" columns="*, auto">
  <Label row="0" col="0" [text]="animal.name"></Label>
  <Label row="0" col="1" [text]="animal.status"></Label>
  <Label row="1" col="0" colSpan="2" [text]="animal.tag"></Label>
</GridLayout>
\`\`\`

### Forgetting row or col

If a child does not specify \`row\` or \`col\`, it defaults to row \`0\` and column \`0\`.

This can cause views to overlap unexpectedly.

---

## Best Practices

- Use \`GridLayout\` for rows and columns.
- Use \`auto\` for content-sized rows or columns.
- Use \`*\` for flexible space.
- Use \`colSpan\` and \`rowSpan\` instead of extra wrappers.
- Prefer \`GridLayout\` for complex list item templates.
- Keep list rows flat for better scrolling performance.

---

## Summary

\`GridLayout\` is the best general-purpose NativeScript layout for structured UI.

It is especially useful when you need alignment, row/column control, or flatter list item templates. For simple one-direction layouts, \`StackLayout\` is fine. For anything more structured, reach for \`GridLayout\`.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}