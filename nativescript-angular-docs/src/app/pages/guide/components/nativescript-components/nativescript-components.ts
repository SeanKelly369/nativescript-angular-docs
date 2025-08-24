import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-nativescript-components',
  imports: [],
  templateUrl: './nativescript-components.html',
  styleUrl: './nativescript-components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NativescriptComponents implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# NativeScript Components

NativeScript provides **native UI components** that map directly to native widgets on iOS and Android.
This means you write a single codebase in TypeScript/Angular, and the framework renders native UI elements.

---

## Core UI Components

- **\`<Label>\`** – displays text.
- **\`<Button>\`** – clickable button that triggers an event.
- **\`<TextField>\`** – single-line user input.
- **\`<TextView>\`** – multi-line user input.
- **\`<Image>\`** – shows an image from local files or URL.
- **\`<Switch>\`** – toggle switch.

---

## Layout Components

Layouts are containers that arrange children:

- **\`<StackLayout>\`** – stacks elements vertically or horizontally.
- **\`<GridLayout>\`** – rows and columns like a table.
- **\`<FlexboxLayout>\`** – CSS flexbox-style layout.
- **\`<AbsoluteLayout>\`** – positions elements by exact coordinates.

---

## Example

\`\`\`xml
<Page>
  <StackLayout>
    <Label text="Hello NativeScript!" class="h1" />
    <Button text="Tap me" (tap)="onTap()" />
  </StackLayout>
</Page>
\`\`\`

---

## Notes

- Styles are applied via **CSS/SCSS**.
- Components are fully **native** – not WebViews.
- You can also extend them or create your own custom components.
`;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }

}
