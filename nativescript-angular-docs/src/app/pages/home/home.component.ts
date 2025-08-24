import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'home.component.html',
  styleUrl: './home.component.styles.scss'
})
export class HomeComponent {
  constructor(private readonly router: Router) {

  }
}