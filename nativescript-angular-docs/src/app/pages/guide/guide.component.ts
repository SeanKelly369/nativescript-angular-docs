import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: 'guide.component.html',
  styleUrl: './guide.component.styles.scss'

})
export class GuideComponent {
  showOverview = true;

  constructor(private router: Router) {
    // Hide overview when navigating to specific guide pages
    this.router.events.subscribe(() => {
      this.showOverview = this.router.url === '/guide';
    });
  }
}