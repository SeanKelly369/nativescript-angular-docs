import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);

@Component({
  selector: 'app-collectionview',
  imports: [],
  templateUrl: './collectionview.html',
  styleUrl: './collectionview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Collectionview implements OnInit {
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
**\`CollectionView\`**

**\`CollectionView\`** is the recommended list/grid control for NativeScript Angular when you need better scrolling performance than a normal layout-based list.

For NativeScript Angular apps, use the nStudio/community package:

~~~bash
ns plugin add @nativescript-community/ui-collectionview
~~~

## Why use CollectionView?

A common mistake in NativeScript apps is building long lists with repeated layouts inside a **\`ScrollView\`**. That works for small lists, but it becomes slow as the number of rows increases.

**\`CollectionView\`** is designed for large, scrollable data sets. It uses native collection/list controls under the hood and recycles item views as you scroll. This makes it much better suited for:

- animal lists
- task lists
- search results
- grids
- dashboards
- image/icon lists
- any screen with many repeated rows

The community CollectionView supports vertical and horizontal layouts, templates, item taps, scrolling events, load-more behaviour, and grid-style columns.

## Install

From the root of your NativeScript project, run:

~~~bash
ns plugin add @nativescript-community/ui-collectionview
~~~

## Import the Angular module

In a standalone NativeScript Angular component, import **\`CollectionViewModule\`**:

~~~typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CollectionViewModule } from '@nativescript-community/ui-collectionview/angular';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CollectionViewModule],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalListComponent {
  animals = [
    { tag: '372001234567890', name: 'Cow 101', breed: 'FR' },
    { tag: '372001234567891', name: 'Cow 102', breed: 'AA' },
    { tag: '372001234567892', name: 'Cow 103', breed: 'HE' }
  ];

  onItemTap(event: { index: number; item: any }): void {
    console.log('Tapped animal:', event.item);
  }
}
~~~

## Basic template

~~~xml
<CollectionView
  [items]="animals"
  rowHeight="90"
  colWidth="100%"
  (itemTap)="onItemTap($event)"
>
  <ng-template let-animal="item">
    <GridLayout rows="auto, auto" columns="*, auto" class="animal-row">
      <Label
        row="0"
        col="0"
        [text]="animal.name"
        class="animal-name"
      ></Label>

      <Label
        row="0"
        col="1"
        [text]="animal.breed"
        class="animal-breed"
      ></Label>

      <Label
        row="1"
        col="0"
        colSpan="2"
        [text]="animal.tag"
        class="animal-tag"
      ></Label>
    </GridLayout>
  </ng-template>
</CollectionView>
~~~

## Example styling

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

.animal-breed {
  font-size: 13;
  font-weight: 600;
  color: #2563eb;
}

.animal-tag {
  margin-top: 4;
  font-size: 13;
  color: #6b7280;
}
~~~

## Grid layout

Use **\`colWidth\`** to create grid-style layouts.

~~~xml
<CollectionView
  [items]="animals"
  rowHeight="140"
  colWidth="50%"
>
  <ng-template let-animal="item">
    <GridLayout rows="auto, auto, auto" class="animal-card">
      <Label [text]="animal.name" class="animal-name"></Label>
      <Label row="1" [text]="animal.breed" class="animal-breed"></Label>
      <Label row="2" [text]="animal.tag" class="animal-tag"></Label>
    </GridLayout>
  </ng-template>
</CollectionView>
~~~

## Multiple templates

You can use different templates for different row types. This is useful for headings, grouped rows, empty states, or special cards.

~~~typescript
items = [
  { type: 'heading', title: 'Recently Viewed' },
  { type: 'animal', tag: '372001234567890', name: 'Cow 101', breed: 'FR' },
  { type: 'animal', tag: '372001234567891', name: 'Cow 102', breed: 'AA' }
];

templateSelector(item: any): string {
  return item.type;
}
~~~

~~~xml
<CollectionView
  [items]="items"
  [itemTemplateSelector]="templateSelector"
  rowHeight="90"
  colWidth="100%"
>
  <ng-template cvTemplateKey="heading" let-item="item">
    <Label
      [text]="item.title"
      class="section-heading"
    ></Label>
  </ng-template>

  <ng-template cvTemplateKey="animal" let-animal="item">
    <GridLayout rows="auto, auto" class="animal-row">
      <Label [text]="animal.name" class="animal-name"></Label>
      <Label row="1" [text]="animal.tag" class="animal-tag"></Label>
    </GridLayout>
  </ng-template>
</CollectionView>
~~~

## Loading more items

**\`CollectionView\`** has a **\`loadMoreItems\`** event. This fires when the list scrolls close to the end.

~~~xml
<CollectionView
  [items]="animals"
  rowHeight="90"
  colWidth="100%"
  (loadMoreItems)="loadMoreAnimals()"
>
  <ng-template let-animal="item">
    <Label [text]="animal.name"></Label>
  </ng-template>
</CollectionView>
~~~

~~~typescript
isLoadingMore = false;

async loadMoreAnimals(): Promise<void> {
  if (this.isLoadingMore) {
    return;
  }

  this.isLoadingMore = true;

  try {
    const nextAnimals = await this.fetchNextAnimals();
    this.animals = [...this.animals, ...nextAnimals];
  } finally {
    this.isLoadingMore = false;
  }
}
~~~

## Performance tips

Keep item templates simple. The more nested layouts you put inside each row, the more work the native view has to do while scrolling.

Prefer this:

~~~xml
<GridLayout rows="auto, auto" columns="*, auto">
  <Label row="0" col="0" [text]="animal.name"></Label>
  <Label row="0" col="1" [text]="animal.breed"></Label>
  <Label row="1" col="0" colSpan="2" [text]="animal.tag"></Label>
</GridLayout>
~~~

Avoid deeply nested layouts like this:

~~~xml
<StackLayout>
  <StackLayout>
    <StackLayout>
      <Label [text]="animal.name"></Label>
    </StackLayout>
  </StackLayout>
</StackLayout>
~~~

For very large lists, consider using **\`ObservableArray\`** from **\`@nativescript/core\`**. It allows the native control to react more efficiently when items are added, removed, or updated.

~~~typescript
import { ObservableArray } from '@nativescript/core';

animals = new ObservableArray([
  { tag: '372001234567890', name: 'Cow 101', breed: 'FR' },
  { tag: '372001234567891', name: 'Cow 102', breed: 'AA' }
]);

addAnimal(): void {
  this.animals.push({
    tag: '372001234567892',
    name: 'Cow 103',
    breed: 'HE'
  });
}
~~~

## When to use CollectionView

Use **\`CollectionView\`** when the screen contains repeated rows or cards.

Good examples:

- animal list
- treatment list
- milk recording list
- task list
- selectable grid
- image gallery
- dashboard card grid

For a tiny static layout with only two or three rows, a normal **\`GridLayout\`** or **\`StackLayout\`** is fine. For anything that scrolls through real data, **\`CollectionView\`** is usually the better choice.

## Summary

Use **\`@nativescript-community/ui-collectionview\`** for NativeScript Angular lists that need to feel native and stay fast. It is especially useful when standard list approaches become sluggish, because it is designed around native scrolling, view recycling, and efficient repeated templates.
`;

    const html = await this.markedParser.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorReference.markForCheck();
  }
}