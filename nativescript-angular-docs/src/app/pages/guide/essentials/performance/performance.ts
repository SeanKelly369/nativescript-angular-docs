import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-performance',
  imports: [],
  templateUrl: './performance.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(
    private readonly sanitiser: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef
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
    constructor(private cdr: ChangeDetectorRef) {}
    // call when async work finishes
    refresh() { this.cdr.markForCheck(); }
  }
  \`\`\`

  For lists, always provide **trackBy**:

  \`\`\`ts
  trackById = (_: number, x: { id: number }) => x.id;
  \`\`\`

  ---

  ## 2) Use the Right List & Virtualization

  - Prefer **\`CollectionView\`** (or **\`ListView\`**) for large data.
  - Keep item templates **flat** (e.g., a \`GridLayout\` with a few cells).
  - Fix **row/item height** where possible (\`rowHeight\`) to reduce layout churn.

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

  ---

  ## 3) Minimize Layout/Measure Work

  - Keep view hierarchies shallow.
  - Pre-size images (\`width\`/\`height\`) to avoid repeated measure.
  - Avoid toggling lots of \`visibility\`; swap templates or bind to \`opacity\` when appropriate.

  ---

  ## 4) Zone Hygiene

  Heavy timers or native callbacks can thrash Angular's zone.

  \`\`\`ts
  import { NgZone, ChangeDetectorRef } from '@angular/core';

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  startPolling() {
    this.zone.runOutsideAngular(() => {
      const id = setInterval(() => {
        // do work...
        // only touch UI inside run()
        this.zone.run(() => this.cdr.markForCheck());
      }, 1000);
    });
  }
  \`\`\`

  ---

  ## 5) RxJS: Keep Subscriptions Lean

  - Use the \`async\` pipe **or** \`takeUntilDestroyed\` to auto-unsubscribe.
  - Debounce noisy streams (search, scroll).

  \`\`\`ts
  import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
  import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

  this.search$.pipe(
    debounceTime(150),
    distinctUntilChanged(),
    switchMap(q => this.api.search(q)),
    takeUntilDestroyed()
  ).subscribe(() => this.cdr.markForCheck());
  \`\`\`

  ---

  ## 6) Work Off the Main Thread

  Use **Web Workers** for CPU-heavy work (parsing, compression, big JSON).

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
  - Set \`stretch="aspectFit"\`/\`aspectFill\` and explicit \`width\`/\`height\`.
  - Avoid re-binding \`src\` unnecessarily; rely on platform caching.

  ---

  ## 8) Diagnostics & Profiling

  - Ship **production** builds.
  - Use focused logging (\`@nativescript/core/trace\`) when needed.
  - Quick timings:

  \`\`\`ts
  console.time('load-animals');
  // ... load
  console.timeEnd('load-animals');
  \`\`\`

  ---

  ## 9) Quick Checklist

  - [ ] \`OnPush\` where reasonable
  - [ ] \`trackBy\` on lists
  - [ ] Flat item templates with fixed heights
  - [ ] Debounced streams; \`async\` pipe or \`takeUntilDestroyed\`
  - [ ] Heavy work in Web Workers
  - [ ] Images pre-sized and cached
  - [ ] Production build for release
  `;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
