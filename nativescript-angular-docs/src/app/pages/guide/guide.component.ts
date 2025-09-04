import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { GuideService } from '../../services/guide-service/guide-service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  showOverview = true;
  prev: any = null;
  next: any = null;
  tocItems: { id: string; text: string; level: number }[] = [];

  private readonly router = inject(Router);
  private readonly scroller = inject(ViewportScroller);
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
          this.scroller.scrollToPosition([0, 0]);
        }
        // rebuild table of contents after navigation (allow content to render)
        setTimeout(() => this.updateToc(), 50);
        this.changeDetectorRef.markForCheck()
    });
  }

  onActivate() {
    // Called when a child route is activated; rebuild TOC after content renders
    setTimeout(() => this.updateToc(), 0);
  }

  scrollTo(id: string) {
    // Prefer Angular's scroller for consistent behavior
    this.scroller.scrollToAnchor(id);
  }

  private updateToc() {
    const contentElement = document.querySelector('.guide-content');
    if (!contentElement) {
      this.tocItems = [];
      this.changeDetectorRef.markForCheck();
      return;
    }

    const headings = Array.from(contentElement.querySelectorAll('h2, h3, h4')) as HTMLElement[];
    const items: { id: string; text: string; level: number }[] = [];

    for (const heading of headings) {
      const text = (heading.textContent || '').trim();
      if (!text) { continue; }
      let id = heading.getAttribute('id') || '';
      if (!id) {
        id = this.slugify(text);
        // ensure uniqueness
        let uniqueId = id;
        let counter = 1;
        while (document.getElementById(uniqueId)) {
          uniqueId = `${id}-${counter++}`;
        }
        id = uniqueId;
        heading.setAttribute('id', id);
      }

      const level = heading.tagName === 'H2' ? 2 : heading.tagName === 'H3' ? 3 : 4;
      items.push({ id, text, level });
    }

    this.tocItems = items;
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
