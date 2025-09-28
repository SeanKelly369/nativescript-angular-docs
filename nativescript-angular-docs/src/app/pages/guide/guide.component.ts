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

  private scrollContentToTop() {
    const container = this.container;
    if (container) {
      container.scrollTo({ top: 0 });
    }
  }

private scrollContentToAnchor(id: string) {
  const c = this.container;
  if (!c) return;

  const esc = (s: string) => (window as any).CSS?.escape ? (window as any).CSS.escape(s) : s;
  const target = c.querySelector<HTMLElement>(`#${esc(id)}`);
  if (!target) return;

  // 1) Scroll the pane so the heading is at the top of the pane
  target.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });

  // 2) If you have a fixed app header overlapping the pane, nudge by the overlap only
  requestAnimationFrame(() => {
    const cRect = c.getBoundingClientRect();
    const hdr = document.querySelector('.app-header') as HTMLElement | null;
    const hRect = hdr?.getBoundingClientRect();
    const overlap = hRect && hRect.bottom > cRect.top ? (hRect.bottom - cRect.top) : 0;
    if (overlap) c.scrollTop = Math.max(0, c.scrollTop - overlap);
  });
}


private get container(): HTMLElement | null {
  return this.contentRef?.nativeElement
      ?? document.querySelector<HTMLElement>('.content-wrapper')
      ?? document.querySelector<HTMLElement>('.guide-content');
}

private updateToc() {
  const c = this.container;
  if (!c) {
    this.toc.clear();
    this.changeDetectorRef.markForCheck();
    return;
  }

  // pick headings that are actually in the article
  const headings = Array.from(c.querySelectorAll<HTMLElement>('h2, h3, h4'));

  const items: { id: string; text: string; level: number }[] = [];
  const used = new Set<string>();

  for (const h of headings) {
    // Get clean text (ignore anchor icons inserted by some MD renderers)
    const text = (h.innerText || h.textContent || '').trim();
    if (!text) continue;

    // Always (re)assign our own deterministic id so TOC == DOM
    const base = this.slugify(text);
    let id = base;
    let i = 1;

    // use CSS.escape if available to query safely
    const q = (s: string) => (window as any).CSS?.escape ? (window as any).CSS.escape(s) : s;

    while (used.has(id) || c.querySelector(`#${q(id)}`)) {
      id = `${base}-${i++}`;
    }
    h.id = id;
    used.add(id);

    const level = h.tagName === 'H2' ? 2 : h.tagName === 'H3' ? 3 : 4;
    items.push({ id, text, level });
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
