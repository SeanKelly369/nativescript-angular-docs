import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [AsyncPipe],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggle {
  private readonly theme = inject(ThemeService);
  isDark = computed(() => this.theme.isDark());
  current = computed(() => this.theme.current());

  toggle() {
    this.theme.toggle();
  }

  followSystem() {
    this.theme.followSystem();
  }
}
