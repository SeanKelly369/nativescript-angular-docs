import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { GuideService } from '../../services/guide-service/guide-service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  providers: [GuideService],
  templateUrl: 'guide.component.html',
  styleUrl: './guide.component.styles.scss'

})
export class GuideComponent {
  showOverview = true;
  prev: any = null;
  next: any = null;

  constructor(private readonly router: Router, private readonly guideService: GuideService) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe( (event: NavigationEnd) => {
        const { prev, next } = this.guideService.getPrevNext(event.urlAfterRedirects);
        this.prev = prev;
        this.next = next;
        this.showOverview = this.router.url === '/guide';
    });
  }

}