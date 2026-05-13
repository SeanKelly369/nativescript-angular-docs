import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input() appCountUp = 0;
  @Input() countUpDuration = 4200;
  @Input() countUpSuffix = '+';
  @Input() countUpCompact = false;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  private observer?: IntersectionObserver;
  private animationFrameId?: number;
  private hasAnimated = false;

  ngOnInit(): void {
    this.setText(0);

    if (!isPlatformBrowser(this.platformId)) {
      this.setText(this.appCountUp);
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];

        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animate();
          this.observer?.disconnect();
        }
      },
      {
        threshold: 0.35
      }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private animate(): void {
    const startTime = performance.now();

    const step = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.countUpDuration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = this.appCountUp * easedProgress;

      this.setText(currentValue);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      } else {
        this.setText(this.appCountUp);
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  }

  private setText(value: number): void {
    if (this.countUpCompact && value >= 1000) {
      const compactValue = value / 1000;
      const formattedValue = Number.isInteger(compactValue)
        ? compactValue.toFixed(0)
        : compactValue.toFixed(1);

      this.elementRef.nativeElement.textContent = `${formattedValue}k${this.countUpSuffix}`;
      return;
    }

    this.elementRef.nativeElement.textContent = `${Math.round(value)}${this.countUpSuffix}`;
  }
}