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
  selector: 'app-scrollview',
  imports: [],
  templateUrl: './scrollview.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Scrollview implements OnInit {
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
# ScrollView

\`ScrollView\` is a NativeScript layout container that lets content scroll when it is larger than the visible screen.

It is useful for forms, settings pages, long text content, and screens where the content height can change depending on the device size.

---

## Basic ScrollView

A basic vertical \`ScrollView\` wraps one child layout.

\`\`\`xml
<ScrollView>
  <StackLayout>
    <Label text="Profile"></Label>
    <TextField hint="Name"></TextField>
    <TextField hint="Email"></TextField>
    <Button text="Save"></Button>
  </StackLayout>
</ScrollView>
\`\`\`

A \`ScrollView\` can only have one direct child. If you need many views inside it, wrap them in a layout such as \`StackLayout\` or \`GridLayout\`.

---

## Vertical Scrolling

Vertical scrolling is the default behaviour.

\`\`\`xml
<ScrollView orientation="vertical">
  <StackLayout>
    <Label text="Item 1"></Label>
    <Label text="Item 2"></Label>
    <Label text="Item 3"></Label>
  </StackLayout>
</ScrollView>
\`\`\`

This is the most common use case.

---

## Horizontal Scrolling

Use \`orientation="horizontal"\` when content should scroll sideways.

\`\`\`xml
<ScrollView orientation="horizontal">
  <StackLayout orientation="horizontal">
    <Label text="Dairy" class="chip"></Label>
    <Label text="Beef" class="chip"></Label>
    <Label text="Calves" class="chip"></Label>
    <Label text="Dry cows" class="chip"></Label>
  </StackLayout>
</ScrollView>
\`\`\`

This works well for tabs, chips, filters, and small horizontal content areas.

---

## ScrollView with GridLayout

A \`GridLayout\` can be used inside a \`ScrollView\` when the content has a more structured layout.

\`\`\`xml
<ScrollView>
  <GridLayout rows="auto, auto, auto" columns="*">
    <Label
      row="0"
      text="Animal Details"
      class="h2">
    </Label>

    <TextField
      row="1"
      hint="Tag number">
    </TextField>

    <Button
      row="2"
      text="Save">
    </Button>
  </GridLayout>
</ScrollView>
\`\`\`

This is useful when the content needs more control than a simple vertical stack.

---

## Scrolling Programmatically

You can access the \`ScrollView\` with \`ViewChild\` and scroll to a specific position.

\`\`\`ts
import { Component, ViewChild } from '@angular/core';
import { ScrollView } from '@nativescript/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.html'
})
export class ExampleComponent {
  @ViewChild('scrollView', { static: false })
  scrollView?: ScrollView;

  scrollToTop(): void {
    this.scrollView?.scrollToVerticalOffset(0, true);
  }
}
\`\`\`

Template:

\`\`\`xml
<ScrollView #scrollView>
  <StackLayout>
    <Label text="Long content here"></Label>
  </StackLayout>
</ScrollView>
\`\`\`

---

## Scroll Events

You can listen for the \`scroll\` event when you need to react to movement.

\`\`\`xml
<ScrollView (scroll)="onScroll($event)">
  <StackLayout>
    <Label text="Scrollable content"></Label>
  </StackLayout>
</ScrollView>
\`\`\`

Component:

\`\`\`ts
import { ScrollEventData } from '@nativescript/core';

onScroll(event: ScrollEventData): void {
  console.log('Scroll X:', event.scrollX);
  console.log('Scroll Y:', event.scrollY);
}
\`\`\`

Avoid doing heavy work inside scroll events. Scroll events can fire very often.

---

## ScrollView vs ListView / CollectionView

Use \`ScrollView\` for a small or medium amount of content.

Use \`ListView\` or \`CollectionView\` for large repeated data.

| Use Case | Better Choice |
| --- | --- |
| Long form | \`ScrollView\` |
| Settings page | \`ScrollView\` |
| Static article/content page | \`ScrollView\` |
| Hundreds of rows | \`CollectionView\` |
| Recycled list items | \`CollectionView\` or \`ListView\` |
| Infinite scrolling list | \`CollectionView\` |

Do not put a large repeated list inside a \`ScrollView\`. You lose virtualization and performance can suffer badly.

---

## Common Mistake: Nesting Scrollable Views

Avoid placing \`ListView\`, \`CollectionView\`, or another \`ScrollView\` inside a \`ScrollView\`.

\`\`\`xml
<!-- Avoid this -->
<ScrollView>
  <StackLayout>
    <CollectionView [items]="items">
      <ng-template let-item="item">
        <Label [text]="item.name"></Label>
      </ng-template>
    </CollectionView>
  </StackLayout>
</ScrollView>
\`\`\`

Instead, let the list component handle scrolling by itself.

\`\`\`xml
<CollectionView [items]="items">
  <ng-template let-item="item">
    <Label [text]="item.name"></Label>
  </ng-template>
</CollectionView>
\`\`\`

---

## Styling

You usually style the child content rather than the \`ScrollView\` itself.

\`\`\`scss
.form-content {
  padding: 16;
}

.section-title {
  font-size: 20;
  font-weight: 700;
  margin-bottom: 12;
}

.input-row {
  margin-bottom: 16;
}
\`\`\`

Example:

\`\`\`xml
<ScrollView>
  <StackLayout class="form-content">
    <Label text="Farm Details" class="section-title"></Label>
    <TextField hint="Herd number" class="input-row"></TextField>
    <Button text="Save"></Button>
  </StackLayout>
</ScrollView>
\`\`\`

---

## Best Practices

- Use \`ScrollView\` for forms and static content.
- Keep only one direct child inside the \`ScrollView\`.
- Use \`CollectionView\` or \`ListView\` for large repeated lists.
- Avoid nesting scrollable components.
- Avoid expensive work inside scroll events.
- Prefer simple child layouts such as \`StackLayout\` or \`GridLayout\`.

---

## Summary

\`ScrollView\` is ideal when a screen has content that may not fit vertically or horizontally.

For normal forms and settings pages, it is simple and effective. For large datasets, use a virtualized list component instead.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}