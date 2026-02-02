import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'home.component.html',
  styleUrl: './home.component.styles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  today: Date = new Date();


  constructor(private readonly router: Router) {

  }
}