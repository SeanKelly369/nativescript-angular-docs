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
  selector: 'app-tabs-bottom-navigation',
  imports: [],
  templateUrl: './tabs-bottom-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsBottomNav implements OnInit {
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
# Tabs and Bottom Navigation

Tabs and bottom navigation are used when an app has a small number of main sections that users switch between often.

In NativeScript, these components render as native tab/navigation controls on iOS and Android.

---

## When to Use Tabs

Use tabs when the sections are all equally important.

Good examples:

- Home
- Animals
- Tasks
- Reports
- Settings

Avoid tabs for one-off actions, long workflows, or deeply nested navigation. Tabs should represent top-level areas of the app.

---

## BottomNavigation

\`BottomNavigation\` is commonly used for mobile apps with main sections at the bottom of the screen.

\`\`\`xml
<BottomNavigation>
  <TabStrip>
    <TabStripItem>
      <Label text="Home"></Label>
    </TabStripItem>

    <TabStripItem>
      <Label text="Animals"></Label>
    </TabStripItem>

    <TabStripItem>
      <Label text="Tasks"></Label>
    </TabStripItem>
  </TabStrip>

  <TabContentItem>
    <GridLayout>
      <Label text="Home page"></Label>
    </GridLayout>
  </TabContentItem>

  <TabContentItem>
    <GridLayout>
      <Label text="Animals page"></Label>
    </GridLayout>
  </TabContentItem>

  <TabContentItem>
    <GridLayout>
      <Label text="Tasks page"></Label>
    </GridLayout>
  </TabContentItem>
</BottomNavigation>
\`\`\`

Each \`TabStripItem\` matches one \`TabContentItem\`.

---

## BottomNavigation with Icons

A tab item can contain both an icon and a label.

\`\`\`xml
<BottomNavigation>
  <TabStrip>
    <TabStripItem>
      <Image src="res://ic_home"></Image>
      <Label text="Home"></Label>
    </TabStripItem>

    <TabStripItem>
      <Image src="res://ic_animals"></Image>
      <Label text="Animals"></Label>
    </TabStripItem>

    <TabStripItem>
      <Image src="res://ic_tasks"></Image>
      <Label text="Tasks"></Label>
    </TabStripItem>
  </TabStrip>

  <TabContentItem>
    <GridLayout>
      <Label text="Home"></Label>
    </GridLayout>
  </TabContentItem>

  <TabContentItem>
    <GridLayout>
      <Label text="Animals"></Label>
    </GridLayout>
  </TabContentItem>

  <TabContentItem>
    <GridLayout>
      <Label text="Tasks"></Label>
    </GridLayout>
  </TabContentItem>
</BottomNavigation>
\`\`\`

Use simple, clear icons. Bottom navigation should be understood quickly.

---

## Selected Index

Use \`selectedIndex\` to control which tab is active.

\`\`\`xml
<BottomNavigation
  [selectedIndex]="selectedIndex"
  (selectedIndexChanged)="onSelectedIndexChanged($event)">
  <!-- TabStrip and TabContentItem views here -->
</BottomNavigation>
\`\`\`

Component:

\`\`\`ts
import { SelectedIndexChangedEventData } from '@nativescript/core';

selectedIndex = 0;

onSelectedIndexChanged(event: SelectedIndexChangedEventData): void {
  this.selectedIndex = event.newIndex;
}
\`\`\`

This is useful when you want to react to tab changes or store the current tab state.

---

## Tabs

\`Tabs\` is another tab-based navigation component.

\`\`\`xml
<Tabs>
  <TabStrip>
    <TabStripItem>
      <Label text="Overview"></Label>
    </TabStripItem>

    <TabStripItem>
      <Label text="History"></Label>
    </TabStripItem>
  </TabStrip>

  <TabContentItem>
    <GridLayout>
      <Label text="Overview content"></Label>
    </GridLayout>
  </TabContentItem>

  <TabContentItem>
    <GridLayout>
      <Label text="History content"></Label>
    </GridLayout>
  </TabContentItem>
</Tabs>
\`\`\`

Use \`Tabs\` when the design calls for a tabbed page layout rather than a bottom app navigation bar.

---

## Styling Tabs

You can style \`TabStrip\`, \`TabStripItem\`, labels, and icons.

\`\`\`scss
TabStrip {
  selected-item-color: #2563eb;
  un-selected-item-color: #6b7280;
  highlight-color: #2563eb;
}

TabStripItem Label {
  font-size: 12;
}

TabContentItem {
  background-color: #ffffff;
}
\`\`\`

Keep tab labels short. Long labels can wrap, truncate, or look cramped on smaller devices.

---

## Using Tabs with Routing

For simple screens, direct tab content is fine.

For larger apps, each tab often becomes its own navigation area. In that case, you can place routed content inside the tab content.

\`\`\`xml
<BottomNavigation>
  <TabStrip>
    <TabStripItem>
      <Label text="Home"></Label>
    </TabStripItem>

    <TabStripItem>
      <Label text="Animals"></Label>
    </TabStripItem>
  </TabStrip>

  <TabContentItem>
    <page-router-outlet name="homeTab"></page-router-outlet>
  </TabContentItem>

  <TabContentItem>
    <page-router-outlet name="animalsTab"></page-router-outlet>
  </TabContentItem>
</BottomNavigation>
\`\`\`

This gives each tab its own navigation stack.

Use this pattern carefully. It is powerful, but more complex than simple tab content.

---

## BottomNavigation vs ActionBar

| Need | Better Choice |
| --- | --- |
| Switch between main app sections | \`BottomNavigation\` |
| Page title and page-level actions | \`ActionBar\` |
| Back navigation | \`ActionBar\` / \`RouterExtensions\` |
| Save, edit, search, filter | \`ActionBar\` |
| Home, animals, tasks, reports | \`BottomNavigation\` |

These components usually work together. The \`ActionBar\` describes the current page, while \`BottomNavigation\` switches between main sections.

---

## Common Mistakes

### Too many tabs

Bottom navigation works best with a small number of main sections. Three to five tabs is usually enough.

### Long tab labels

Keep labels short and clear.

Good:

- Home
- Animals
- Tasks
- Reports

Poor:

- Animal Management
- Synchronisation Tasks
- Detailed Reports

### Putting actions in tabs

Tabs are for destinations, not actions. Do not use a tab for something like “Save” or “Add”.

Use a button, floating action button, page action, or ActionBar item instead.

### Forgetting tab/content order

The order of \`TabStripItem\` components should match the order of \`TabContentItem\` components.

---

## Best Practices

- Use tabs for top-level destinations.
- Keep labels short.
- Use icons that are easy to understand.
- Keep the number of tabs small.
- Avoid hiding important navigation behind too many nested tabs.
- Match each \`TabStripItem\` with a \`TabContentItem\`.
- Use routing inside tabs only when the app structure really needs it.

---

## Summary

Tabs and bottom navigation are ideal when users need to switch between a few major areas of the app.

Use \`BottomNavigation\` for main app navigation, and use \`Tabs\` for tabbed page sections. Keep the structure simple, clear, and predictable.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}