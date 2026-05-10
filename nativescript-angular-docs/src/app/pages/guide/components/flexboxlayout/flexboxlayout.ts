import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);

@Component({
  selector: 'app-flexboxlayout',
  imports: [],
  templateUrl: './flexboxlayout.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Flexboxlayout implements OnInit {
  htmlContent!: SafeHtml;

  private readonly markedParser = new Marked();

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorReference: ChangeDetectorRef
  ) {
    this.markedParser.use(
      markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code: string, lang: string): string {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';

          return hljs.highlight(code, { language }).value;
        }
      }) as any
    );
  }

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# FlexboxLayout

**\`FlexboxLayout\`** is a NativeScript layout container based on the CSS Flexbox model.

It is useful when you want flexible positioning, wrapping, spacing, and alignment without manually defining rows and columns.

If you already understand web Flexbox, **\`FlexboxLayout\`** will feel familiar.

---

## When to use FlexboxLayout

Use **\`FlexboxLayout\`** when you want child elements to flow naturally in one direction.

Good examples:

- horizontal button rows
- icon and text rows
- wrapping tag/chip layouts
- card action areas
- simple responsive sections
- layouts where items need flexible spacing

For strict table-like layouts, **\`GridLayout\`** is usually better. For simple vertical stacking, **\`StackLayout\`** may be enough.

---

## Basic example

~~~xml
<FlexboxLayout>
  <Label text="One"></Label>
  <Label text="Two"></Label>
  <Label text="Three"></Label>
</FlexboxLayout>
~~~

By default, children are arranged in a row.

---

## Direction

Use **\`flexDirection\`** to control the main direction of the layout.

~~~xml
<FlexboxLayout flexDirection="row">
  <Label text="One"></Label>
  <Label text="Two"></Label>
  <Label text="Three"></Label>
</FlexboxLayout>
~~~

~~~xml
<FlexboxLayout flexDirection="column">
  <Label text="One"></Label>
  <Label text="Two"></Label>
  <Label text="Three"></Label>
</FlexboxLayout>
~~~

Common values:

| Value | Description |
|---|---|
| **\`row\`** | Places children horizontally |
| **\`row-reverse\`** | Places children horizontally in reverse order |
| **\`column\`** | Places children vertically |
| **\`column-reverse\`** | Places children vertically in reverse order |

---

## Horizontal alignment

Use **\`justifyContent\`** to control alignment along the main axis.

For a row layout, this controls horizontal alignment.

~~~xml
<FlexboxLayout
  flexDirection="row"
  justifyContent="space-between">
  <Label text="Left"></Label>
  <Label text="Right"></Label>
</FlexboxLayout>
~~~

Common values:

| Value | Description |
|---|---|
| **\`flex-start\`** | Places items at the start |
| **\`center\`** | Centers items |
| **\`flex-end\`** | Places items at the end |
| **\`space-between\`** | Spreads items with space between them |
| **\`space-around\`** | Adds space around each item |

---

## Vertical alignment

Use **\`alignItems\`** to control alignment across the cross axis.

For a row layout, this controls vertical alignment.

~~~xml
<FlexboxLayout
  flexDirection="row"
  alignItems="center">
  <Label text="Name"></Label>
  <Button text="Edit"></Button>
</FlexboxLayout>
~~~

Common values:

| Value | Description |
|---|---|
| **\`flex-start\`** | Aligns items at the start |
| **\`center\`** | Centers items |
| **\`flex-end\`** | Aligns items at the end |
| **\`stretch\`** | Stretches items where possible |
| **\`baseline\`** | Aligns items by text baseline |

---

## Simple row layout

This is useful for a row with text on the left and an action button on the right.

~~~xml
<FlexboxLayout
  class="animal-row"
  flexDirection="row"
  alignItems="center"
  justifyContent="space-between">

  <StackLayout>
    <Label
      text="Cow 101"
      class="animal-name">
    </Label>

    <Label
      text="372001234567890"
      class="animal-tag">
    </Label>
  </StackLayout>

  <Button
    text="View"
    class="row-button">
  </Button>
</FlexboxLayout>
~~~

Example styling:

~~~scss
.animal-row {
  padding: 12;
  border-bottom-width: 1;
  border-bottom-color: #e5e7eb;
  background-color: #ffffff;
}

.animal-name {
  font-size: 16;
  font-weight: 700;
  color: #111827;
}

.animal-tag {
  margin-top: 4;
  font-size: 13;
  color: #6b7280;
}

.row-button {
  padding: 8 14;
  border-radius: 6;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 14;
}
~~~

---

## Wrapping items

Use **\`flexWrap\`** when child items should wrap onto new lines.

~~~xml
<FlexboxLayout
  flexDirection="row"
  flexWrap="wrap"
  class="tag-list">

  <Label text="Fresh Cow" class="tag"></Label>
  <Label text="In Milk" class="tag"></Label>
  <Label text="High SCC" class="tag"></Label>
  <Label text="Watch List" class="tag"></Label>
</FlexboxLayout>
~~~

~~~scss
.tag-list {
  gap: 8;
}

.tag {
  padding: 6 10;
  border-radius: 999;
  background-color: #e0f2fe;
  color: #075985;
  font-size: 13;
  font-weight: 600;
}
~~~

This is useful for chips, tags, filters, badges, and small selectable items.

---

## Growing and shrinking

Children can use **\`flexGrow\`** to take up available space.

~~~xml
<FlexboxLayout
  flexDirection="row"
  alignItems="center">

  <Label
    text="Search"
    class="label">
  </Label>

  <TextField
    flexGrow="1"
    hint="Enter animal tag">
  </TextField>

  <Button text="Go"></Button>
</FlexboxLayout>
~~~

In this example, the **\`TextField\`** expands to fill the available horizontal space.

---

## Common properties

| Property | Purpose |
|---|---|
| **\`flexDirection\`** | Controls row or column direction |
| **\`justifyContent\`** | Aligns children along the main axis |
| **\`alignItems\`** | Aligns children along the cross axis |
| **\`alignContent\`** | Aligns wrapped rows or columns |
| **\`flexWrap\`** | Allows items to wrap |
| **\`flexGrow\`** | Allows an item to grow |
| **\`flexShrink\`** | Allows an item to shrink |
| **\`order\`** | Changes the visual order of an item |

---

## FlexboxLayout vs StackLayout

Use **\`StackLayout\`** when you only need a simple vertical or horizontal stack.

~~~xml
<StackLayout>
  <Label text="Name"></Label>
  <Label text="Tag"></Label>
  <Label text="Breed"></Label>
</StackLayout>
~~~

Use **\`FlexboxLayout\`** when alignment, spacing, wrapping, or flexible sizing matters.

~~~xml
<FlexboxLayout
  flexDirection="row"
  justifyContent="space-between"
  alignItems="center">
  <Label text="Cow 101"></Label>
  <Button text="View"></Button>
</FlexboxLayout>
~~~

---

## FlexboxLayout vs GridLayout

Use **\`GridLayout\`** when you need exact rows and columns.

~~~xml
<GridLayout rows="auto, auto" columns="*, auto">
  <Label
    row="0"
    col="0"
    text="Cow 101">
  </Label>

  <Label
    row="0"
    col="1"
    text="FR">
  </Label>

  <Label
    row="1"
    col="0"
    colSpan="2"
    text="372001234567890">
  </Label>
</GridLayout>
~~~

Use **\`FlexboxLayout\`** when the layout should flow more naturally.

~~~xml
<FlexboxLayout
  flexDirection="row"
  flexWrap="wrap"
  alignItems="center">
  <Label text="Fresh Cow"></Label>
  <Label text="In Milk"></Label>
  <Label text="Watch List"></Label>
</FlexboxLayout>
~~~

A good rule of thumb:

- **\`StackLayout\`** for simple stacking
- **\`GridLayout\`** for precise structure
- **\`FlexboxLayout\`** for flexible flow and alignment

---

## Angular binding example

You can use normal Angular binding syntax inside **\`FlexboxLayout\`**.

~~~xml
<FlexboxLayout
  flexDirection="row"
  alignItems="center"
  justifyContent="space-between">

  <Label [text]="animalName"></Label>

  <Button
    [text]="buttonText"
    [isEnabled]="canOpenAnimal"
    (tap)="openAnimal()">
  </Button>
</FlexboxLayout>
~~~

~~~typescript
animalName = 'Cow 101';
buttonText = 'Open';
canOpenAnimal = true;

openAnimal(): void {
  console.log('Opening animal');
}
~~~

---

## Best Practices

- Use **\`FlexboxLayout\`** for flexible rows, wrapping chips, and responsive sections.
- Use **\`GridLayout\`** when you need exact row and column control.
- Avoid deeply nesting multiple **\`FlexboxLayout\`** containers.
- Keep item layouts simple when used inside scrollable lists.
- Use **\`justifyContent\`** for main-axis alignment.
- Use **\`alignItems\`** for cross-axis alignment.
- Use **\`flexWrap\`** for tag, chip, or badge-style layouts.

---

## Key Point

**\`FlexboxLayout\`** is best when your UI needs flexible alignment rather than strict rows and columns.

It gives NativeScript Angular apps a familiar Flexbox-style layout system while still rendering real native UI controls.
`;

    const html = await this.markedParser.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorReference.markForCheck();
  }
}