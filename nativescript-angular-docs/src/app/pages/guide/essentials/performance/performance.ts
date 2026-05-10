import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);

@Component({
  selector: 'app-performance',
  imports: [],
  templateUrl: './performance.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceComponent implements OnInit {
  htmlContent!: SafeHtml;

  private readonly marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# Performance in NativeScript-Angular

Practical tips to keep your apps **fast and smooth**, especially on lower-spec devices.

---

## 1) Keep Change Detection Cheap

Use **OnPush** and push data immutably.

\`\`\`ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCmp {
  constructor(private readonly cdr: ChangeDetectorRef) {}

  refresh(): void {
    this.cdr.markForCheck();
  }
}
\`\`\`

For lists, always provide **trackBy**.

For Angular template loops, always provide **trackBy** / **track**.

\`\`\`ts
trackById = (_: number, x: { id: number }) => x.id;
\`\`\`

---

## 2) Use the Right List & Virtualization

- Prefer **\`CollectionView\`** or **\`ListView\`** for large data.
- Keep item templates **flat**, such as a \`GridLayout\` with a few cells.
- Fix **row/item height** where possible using \`rowHeight\` to reduce layout churn.

\`\`\`html
<CollectionView
  [items]="items"
  [rowHeight]="56">
  <ng-template let-item let-i="index">
    <GridLayout columns="*, auto">
      <Label col="0" [text]="item.name"></Label>
      <Label col="1" [text]="i"></Label>
    </GridLayout>
  </ng-template>
</CollectionView>
\`\`\`

Avoid putting lots of nested layouts inside each row. This gets expensive quickly when rows are recycled during scrolling.

Prefer this:

\`\`\`html
<GridLayout columns="*, auto">
  <Label col="0" [text]="item.name"></Label>
  <Label col="1" [text]="item.status"></Label>
</GridLayout>
\`\`\`

Instead of deeply nested \`StackLayout\`s inside every row.

---

## 3) Minimize Layout/Measure Work

- Keep view hierarchies shallow, especially inside list rows.
- Prefer **\`GridLayout\`** for structured rows instead of many nested **\`StackLayout\`s**.
- Pre-size images with **\`width\`** and **\`height\`** to avoid repeated measure work.
- Avoid heavy functions, getters, or pipes in templates.
- Avoid toggling lots of **\`visibility\`**; swap templates or bind to **\`opacity\`** when appropriate.

---

## 4) Zone Hygiene

Heavy timers or native callbacks can thrash Angular's zone.

\`\`\`ts
import { ChangeDetectorRef, NgZone } from '@angular/core';

constructor(
  private readonly zone: NgZone,
  private readonly cdr: ChangeDetectorRef
) {}

private pollingId?: ReturnType<typeof setInterval>;

startPolling(): void {
  this.zone.runOutsideAngular(() => {
    this.pollingId = setInterval(() => {
      // Do work outside Angular.

      this.zone.run(() => {
        this.cdr.markForCheck();
      });
    }, 1000);
  });
}

stopPolling(): void {
  if (this.pollingId) {
    clearInterval(this.pollingId);
  }
}
\`\`\`

---

## 5) RxJS: Keep Subscriptions Lean

- Use the \`async\` pipe **or** \`takeUntilDestroyed\` to auto-unsubscribe.
- Debounce noisy streams such as search or scroll.

\`\`\`ts
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

private readonly destroyRef = inject(DestroyRef);

this.search$.pipe(
  debounceTime(150),
  distinctUntilChanged(),
  switchMap(q => this.api.search(q)),
  takeUntilDestroyed(this.destroyRef)
).subscribe(() => this.cdr.markForCheck());
\`\`\`

---

## 6) Work Off the UI Thread

Use NativeScript workers for CPU-heavy work such as parsing, compression, image processing, large JSON transforms, or sync preparation.

\`\`\`ts
// main.ts
const worker = new Worker('./workers/heavy.worker');

worker.onmessage = ({ data }) => {
  this.result = data;
  this.cdr.markForCheck();
};

worker.postMessage({ payload });
\`\`\`

\`\`\`ts
// heavy.worker.ts
onmessage = ({ data }) => {
  const result = doExpensiveThing(data.payload);
  postMessage(result);
};
\`\`\`

---

## 7) Images & Assets

- Use appropriately sized images; avoid multi-MB PNGs.
- Set \`stretch="aspectFit"\` / \`stretch="aspectFill"\` and explicit \`width\` / \`height\`.
- Avoid re-binding \`src\` unnecessarily; rely on platform caching.

---

## 8) Diagnostics & Profiling

- Test on real lower-spec Android/iOS devices, not only emulators.
- Ship **production** builds.
- Use focused logging with **\`@nativescript/core/trace\`** when needed.
- Use quick timings around suspicious code paths:

\`\`\`ts
console.time('load-animals');

// Load data here.

console.timeEnd('load-animals');
\`\`\`

---

## 9) Quick Checklist

- [ ] **\`OnPush\`** where reasonable
- [ ] **\`trackBy\`** / **\`track\`** for Angular template loops
- [ ] Flat **\`CollectionView\`** / **\`ListView\`** item templates
- [ ] Fixed row/item heights where possible
- [ ] Avoid heavy functions, getters, or pipes in templates
- [ ] Debounced streams; **\`async\`** pipe or **\`takeUntilDestroyed\`**
- [ ] Heavy work moved off the UI thread with NativeScript workers
- [ ] Images pre-sized and cached
- [ ] Tested on real lower-spec devices
- [ ] Production build for release
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}