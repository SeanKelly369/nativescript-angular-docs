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
  selector: 'app-stacklayout',
  imports: [],
  templateUrl: './stacklayout.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Stacklayout implements OnInit {
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
# StackLayout

\`StackLayout\` is one of the simplest and most commonly used NativeScript layout containers.

It places child views one after another, either vertically or horizontally.

---

## Basic StackLayout

By default, \`StackLayout\` stacks children vertically.

\`\`\`xml
<StackLayout>
  <Label text="Animal Details"></Label>
  <Label text="Cow 142"></Label>
  <Button text="View"></Button>
</StackLayout>
\`\`\`

This creates a simple top-to-bottom layout.

---

## Vertical StackLayout

Vertical layout is the default, but you can also set it explicitly.

\`\`\`xml
<StackLayout orientation="vertical">
  <Label text="Name"></Label>
  <TextField hint="Enter name"></TextField>
  <Button text="Save"></Button>
</StackLayout>
\`\`\`

This is useful for simple forms, settings screens, and content blocks.

---

## Horizontal StackLayout

Use \`orientation="horizontal"\` to arrange children side by side.

\`\`\`xml
<StackLayout orientation="horizontal">
  <Label text="Status:"></Label>
  <Label text="Active"></Label>
</StackLayout>
\`\`\`

This is useful for small rows, labels with values, buttons beside text, and simple inline UI.

---

## Spacing with CSS

You can style the child views with classes.

\`\`\`xml
<StackLayout class="form-section">
  <Label text="Farm Name" class="label"></Label>
  <TextField hint="Enter farm name" class="input"></TextField>
  <Button text="Save" class="primary-button"></Button>
</StackLayout>
\`\`\`

\`\`\`scss
.form-section {
  padding: 16;
}

.label {
  font-size: 16;
  font-weight: 700;
  margin-bottom: 8;
}

.input {
  margin-bottom: 16;
}

.primary-button {
  margin-top: 12;
}
\`\`\`

---

## StackLayout in a ScrollView

\`StackLayout\` is commonly used as the direct child of a \`ScrollView\`.

\`\`\`xml
<ScrollView>
  <StackLayout class="page-content">
    <Label text="Profile"></Label>
    <TextField hint="Name"></TextField>
    <TextField hint="Email"></TextField>
    <Button text="Save"></Button>
  </StackLayout>
</ScrollView>
\`\`\`

This works well for forms or static pages where the content may be taller than the screen.

---

## When to Use StackLayout

Use \`StackLayout\` when the layout is naturally one-dimensional.

Good examples:

- Simple forms
- Vertical content sections
- Small horizontal rows
- Buttons stacked together
- Settings screens
- Static content pages

---

## When Not to Use StackLayout

Avoid using too many nested \`StackLayout\` components.

This can become expensive:

\`\`\`xml
<StackLayout>
  <StackLayout orientation="horizontal">
    <StackLayout>
      <Label text="Cow 142"></Label>
      <Label text="Active"></Label>
    </StackLayout>
  </StackLayout>
</StackLayout>
\`\`\`

A flatter \`GridLayout\` is usually better:

\`\`\`xml
<GridLayout columns="*, auto">
  <Label col="0" text="Cow 142"></Label>
  <Label col="1" text="Active"></Label>
</GridLayout>
\`\`\`

This matters most inside \`CollectionView\` or \`ListView\` rows.

---

## StackLayout vs GridLayout

| Need | Better Choice |
| --- | --- |
| Simple vertical content | \`StackLayout\` |
| Simple horizontal row | \`StackLayout\` |
| Rows and columns | \`GridLayout\` |
| List item template | Usually \`GridLayout\` |
| Complex alignment | \`GridLayout\` or \`FlexboxLayout\` |

---

## Best Practices

- Use \`StackLayout\` for simple one-direction layouts.
- Avoid deeply nesting \`StackLayout\` components.
- Use \`GridLayout\` when you need rows and columns.
- Keep list item templates flat.
- Use CSS classes for spacing instead of adding unnecessary wrapper layouts.

---

## Summary

\`StackLayout\` is ideal for simple vertical or horizontal layouts.

It is easy to read, quick to write, and perfect for forms or static content. For complex rows, columns, and performance-sensitive list items, use \`GridLayout\` instead.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}