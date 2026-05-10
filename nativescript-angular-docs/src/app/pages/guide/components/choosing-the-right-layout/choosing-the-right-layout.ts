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
  selector: 'app-choosing-the-right-layout',
  imports: [],
  templateUrl: './choosing-the-right-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChoosingTheRightLayout implements OnInit {
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
# Choosing the Right Layout

NativeScript layouts control how native views are measured, positioned, and rendered on screen.

Choosing the right layout matters because mobile screens are smaller, layout recalculation can become expensive, and deeply nested layouts can hurt performance.

---

## Quick Rule

Use the simplest layout that expresses the structure clearly.

| Layout | Best For |
| --- | --- |
| \`StackLayout\` | Simple vertical or horizontal stacks |
| \`GridLayout\` | Structured rows and columns |
| \`FlexboxLayout\` | Flexible wrapping and responsive alignment |
| \`AbsoluteLayout\` | Exact positioning |
| \`DockLayout\` | Docking views to edges |
| \`WrapLayout\` | Flowing items onto new lines |

---

## StackLayout

Use \`StackLayout\` when you want to place views one after another.

\`\`\`xml
<StackLayout>
  <Label text="Animal name"></Label>
  <TextField hint="Enter name"></TextField>
  <Button text="Save"></Button>
</StackLayout>
\`\`\`

This is good for simple forms, small panels, and vertical content blocks.

Avoid using many nested \`StackLayout\` components when a \`GridLayout\` would describe the layout more directly.

---

## GridLayout

Use \`GridLayout\` when the screen has rows and columns.

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

\`GridLayout\` is usually the best choice for list rows because it keeps the view hierarchy shallow.

---

## FlexboxLayout

Use \`FlexboxLayout\` when you need flexible alignment, wrapping, or spacing.

\`\`\`xml
<FlexboxLayout
  flexDirection="row"
  justifyContent="space-between"
  alignItems="center">
  <Label text="Status"></Label>
  <Button text="Update"></Button>
</FlexboxLayout>
\`\`\`

It is useful for responsive rows, tag/chip layouts, and controls that need web-like flexbox behaviour.

---

## AbsoluteLayout

Use \`AbsoluteLayout\` only when exact positioning is required.

\`\`\`xml
<AbsoluteLayout>
  <Image
    src="~/assets/map.png"
    left="0"
    top="0">
  </Image>

  <Label
    text="Pin"
    left="120"
    top="80">
  </Label>
</AbsoluteLayout>
\`\`\`

This can be useful for overlays, maps, custom diagrams, and highly controlled UI.

Do not use it for ordinary forms or responsive screens.

---

## DockLayout

Use \`DockLayout\` when you want to pin views to the edges of a container.

\`\`\`xml
<DockLayout stretchLastChild="true">
  <Label dock="top" text="Header"></Label>
  <Button dock="bottom" text="Save"></Button>
  <GridLayout>
    <Label text="Main content"></Label>
  </GridLayout>
</DockLayout>
\`\`\`

This is useful for screens with a fixed header, footer, or action area.

---

## WrapLayout

Use \`WrapLayout\` when items should flow onto the next line.

\`\`\`xml
<WrapLayout>
  <Label text="Dairy" class="chip"></Label>
  <Label text="Beef" class="chip"></Label>
  <Label text="Calves" class="chip"></Label>
  <Label text="Dry cows" class="chip"></Label>
</WrapLayout>
\`\`\`

This is useful for tags, chips, badges, and small repeated UI elements.

---

## Layout Performance

Layout performance matters most inside lists such as \`CollectionView\` or \`ListView\`.

Prefer this:

\`\`\`xml
<GridLayout columns="*, auto">
  <Label col="0" [text]="item.name"></Label>
  <Label col="1" [text]="item.status"></Label>
</GridLayout>
\`\`\`

Avoid this:

\`\`\`xml
<StackLayout>
  <StackLayout orientation="horizontal">
    <StackLayout>
      <Label [text]="item.name"></Label>
      <Label [text]="item.status"></Label>
    </StackLayout>
  </StackLayout>
</StackLayout>
\`\`\`

The second version creates more layout work than necessary.

---

## Practical Guidance

- Use \`StackLayout\` for simple vertical sections.
- Use \`GridLayout\` for structured screens and list rows.
- Use \`FlexboxLayout\` for flexible alignment and wrapping.
- Use \`AbsoluteLayout\` only for exact positioning.
- Use \`DockLayout\` for fixed top/bottom/side regions.
- Use \`WrapLayout\` for chips, tags, and flowing content.
- Keep list item templates as flat as possible.

---

## Summary

Most NativeScript screens can be built well using a mix of \`StackLayout\` and \`GridLayout\`.

For performance-sensitive areas, especially scrolling lists, favour flatter layouts and avoid unnecessary nesting.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}