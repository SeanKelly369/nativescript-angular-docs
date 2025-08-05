import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="guide-container">
      <div class="guide-sidebar">
        <nav class="sidebar-nav">
          <h3>Guide</h3>
          <ul>
            <li><a routerLink="/guide/project-structure" routerLinkActive="active">Project Structure</a></li>
            <li><a routerLink="/guide/components" routerLinkActive="active">Components</a></li>
            <li><a routerLink="/guide/navigation" routerLinkActive="active">Navigation</a></li>
            <li><a routerLink="/guide/styling" routerLinkActive="active">Styling</a></li>
            <li><a routerLink="/guide/first-app" routerLinkActive="active">Your First App</a></li>
          </ul>
        </nav>
      </div>
      
      <main class="guide-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .guide-container {
      display: flex;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .guide-sidebar {
      width: 250px;
      flex-shrink: 0;
    }

    .sidebar-nav {
      position: sticky;
      top: 80px;
      background: #f8fafc;
      border-radius: 0.5rem;
      padding: 1.5rem;
    }

    .sidebar-nav h3 {
      margin: 0 0 1rem 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #333;
    }

    .sidebar-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .sidebar-nav li {
      margin-bottom: 0.5rem;
    }

    .sidebar-nav a {
      display: block;
      padding: 0.5rem 0.75rem;
      color: #64748b;
      text-decoration: none;
      border-radius: 0.25rem;
      transition: all 0.2s ease;
      
      &:hover, &.active {
        background: #e2e8f0;
        color: #0066cc;
      }
    }

    .guide-content {
      flex: 1;
      min-width: 0;
    }

    @media (max-width: 768px) {
      .guide-container {
        flex-direction: column;
        padding: 1rem;
      }
      
      .guide-sidebar {
        width: 100%;
      }
      
      .sidebar-nav {
        position: static;
      }
    }
  `]
})
export class GuideComponent {}