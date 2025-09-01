import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.styles.scss',
  // You can keep OnPush here, it's fine for a shell
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GettingStartedComponent {}
