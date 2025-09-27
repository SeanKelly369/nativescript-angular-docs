import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule, ViewportScroller, Location } from '@angular/common';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { GuideService } from '../../services/guide-service/guide-service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TocService } from '../../services/toc.service';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  providers: [GuideService],
  templateUrl: 'guide.component.html',
  styleUrl: './guide.component.styles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class GuideComponent {

  @ViewChild('content') contentRef?: ElementRef<HTMLElement>;

  showOverview = true;
  prev: any = null;
  next: any = null;
  readonly tocItems$ = inject(TocService).items$;
  readonly toc = inject(TocService);

  private readonly router = inject(Router);
  private readonly scroller = inject(ViewportScroller);
  private readonly location = inject(Location);
  private readonly guideService = inject(GuideService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  constructor() {

    this.router.events
      .pipe(
        filter( (event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe( (event: NavigationEnd) => {
        const { prev, next } = this.guideService.getPrevNext(event.urlAfterRedirects);
        this.prev = prev;
        this.next = next;
        this.showOverview = this.router.url === '/guide';

        // scroll behaviour
        const url = this.router.parseUrl(event.urlAfterRedirects);
        if (!url.fragment) {
          this.scrollContentToTop();
        }
        // rebuild table of contents after navigation (allow content to render)
        setTimeout(() => {
          this.updateToc();
          // if there is a fragment, scroll to it within content container after TOC IDs are ensured
          if (url.fragment) {
            setTimeout(() => this.scrollContentToAnchor(url.fragment as string), 0);
          }
          this.changeDetectorRef.markForCheck()
        }, 50);
    });
  }

  onActivate() {
    // Called when a child route is activated; rebuild TOC after content renders
    setTimeout(() => {
      this.updateToc();
      const url = this.router.parseUrl(this.router.url);
      if (url.fragment) {
        setTimeout(() => this.scrollContentToAnchor(url.fragment as string), 0);
      } else {
        this.scrollContentToTop();
      }
    }, 0);
  }

  onTocClick(event: Event, id: string) {
    event.preventDefault();
    this.scrollTo(id);
    this.changeDetectorRef.detectChanges();
  }

  scrollTo(id: string) {
    // Update URL fragment without triggering navigation
    const baseUrl = this.router.url.split('#')[0];
    this.location.replaceState(`${baseUrl}#${id}`);
    // scroll within the guide content container
    setTimeout(() => this.scrollContentToAnchor(id), 120);
  }

  private get container(): HTMLElement | null {
    return this.contentRef?.nativeElement ?? document.querySelector('.guide-content');
  }

  private scrollContentToTop() {
    const container = this.container;
    if (container) {
      container.scrollTo({ top: 0 });
    }
  }

private scrollContentToAnchor(id: string) {
  const c = this.container;
  if (!c) return;

  const safeId = (window as any).CSS?.escape
    ? (window as any).CSS.escape(id)
    : id.replace(/[^a-zA-Z0-9\-_:.]/g, '');
  const target = c.querySelector<HTMLElement>(`#${safeId}`) || document.getElementById(id);
  if (!target) return;

  const headerOffset = this.getStickyOffset();

  // Calculate absolute offset inside container
  const top =
    target.offsetTop -  // offsetTop is relative to the scroll container
    (c.offsetTop || 0) +
    c.scrollTop -
    headerOffset -
    8;

  const finalTop = Math.max(0, Math.round(top));

  // First force the exact pixel offset
  c.scrollTop = finalTop;

  // If you want smooth, you can still animate, then force a correction
  requestAnimationFrame(() => {
    c.scrollTo({ top: finalTop, behavior: 'smooth' });
    // after smooth finishes, hard-set again to avoid rounding drift
    setTimeout(() => (c.scrollTop = finalTop), 500);
  });
}


    private getStickyOffset(): number {
    // If you have a sticky header outside or inside the container, include its height.
    // Example (outside): const hdr = document.querySelector('.app-header') as HTMLElement | null;
    // Example (inside container): const hdr = this.container?.querySelector('.in-content-sticky') as HTMLElement | null;
    const hdr = document.querySelector('.app-header') as HTMLElement | null;
    return hdr?.offsetHeight ?? 0;
  }

  private updateToc() {
    const c = this.container;
    if (!c) {
      this.toc.clear();
      this.changeDetectorRef.markForCheck();
      return;
    }

    const headings = Array.from(c.querySelectorAll<HTMLElement>('h2, h3, h4'));
    const items: { id: string; text: string; level: number }[] = [];

    for (const h of headings) {
      const text = (h.textContent || '').trim();
      if (!text) continue;

      // assign/ensure unique id within the container
      if (!h.id) {
        const base = this.slugify(text);
        let candidate = base;
        let i = 1;
        while (c.querySelector(`#${candidate}`)) {
          candidate = `${base}-${i++}`;
        }
        h.id = candidate;
      }

      const level = h.tagName === 'H2' ? 2 : h.tagName === 'H3' ? 3 : 4;
      items.push({ id: h.id, text, level });
    }

    this.toc.set(items);
    this.changeDetectorRef.markForCheck();
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
