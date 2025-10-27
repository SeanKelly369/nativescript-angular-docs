import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { ThemeToggle } from './theme-toggle/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeToggle],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nativescript-angular-docs');

  constructor(private theme: ThemeService) {
    this.theme.init();
  }
}
