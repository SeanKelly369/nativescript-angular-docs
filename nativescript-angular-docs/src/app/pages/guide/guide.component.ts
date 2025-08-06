import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

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
            <li><a routerLink="/guide" routerLinkActive="active">Overview</a></li>
            <li><a routerLink="/guide/project-structure" routerLinkActive="active">Project Structure</a></li>
            <li><a routerLink="/guide/components" routerLinkActive="active">UI Components</a></li>
            <li><a routerLink="/guide/navigation" routerLinkActive="active">Navigation</a></li>
            <li><a routerLink="/guide/styling" routerLinkActive="active">Styling</a></li>
            <li><a routerLink="/guide/data-binding" routerLinkActive="active">Data Binding</a></li>
            <li><a routerLink="/guide/services" routerLinkActive="active">Services</a></li>
            <li><a routerLink="/guide/routing" routerLinkActive="active">Routing</a></li>
            <li><a routerLink="/guide/code-sharing" routerLinkActive="active">Code Sharing</a></li>
            <li><a routerLink="/guide/performance" routerLinkActive="active">Performance</a></li>
            <li><a routerLink="/guide/testing" routerLinkActive="active">Testing</a></li>
          </ul>
          
          <h4>Advanced Topics</h4>
          <ul>
            <li><a routerLink="/guide/native-apis" routerLinkActive="active">Native APIs</a></li>
            <li><a routerLink="/guide/plugins" routerLinkActive="active">Plugins</a></li>
            <li><a routerLink="/guide/deployment" routerLinkActive="active">Deployment</a></li>
            <li><a routerLink="/guide/troubleshooting" routerLinkActive="active">Troubleshooting</a></li>
          </ul>
        </nav>
      </div>
      
      <main class="guide-content">
        <div class="guide-overview" *ngIf="showOverview">
          <h1>NativeScript-Angular Guide</h1>
          <p class="lead">
            Comprehensive guide to building native mobile applications with Angular and NativeScript.
          </p>
          
          <div class="overview-grid">
            <div class="overview-card">
              <h3>🏗️ Project Structure</h3>
              <p>Learn about the NativeScript-Angular project structure and how to organize your code.</p>
              <a routerLink="/guide/project-structure" class="card-link">Learn More →</a>
            </div>
            
            <div class="overview-card">
              <h3>🧩 UI Components</h3>
              <p>Discover the native UI components available in NativeScript-Angular.</p>
              <a routerLink="/guide/components" class="card-link">Learn More →</a>
            </div>
            
            <div class="overview-card">
              <h3>🧭 Navigation</h3>
              <p>Master mobile navigation patterns and routing in NativeScript-Angular.</p>
              <a routerLink="/guide/navigation" class="card-link">Learn More →</a>
            </div>
            
            <div class="overview-card">
              <h3>🎨 Styling</h3>
              <p>Style your applications with CSS and platform-specific customizations.</p>
              <a routerLink="/guide/styling" class="card-link">Learn More →</a>
            </div>
            
            <div class="overview-card">
              <h3>🔄 Data Binding</h3>
              <p>Use Angular's powerful data binding features in your mobile apps.</p>
              <a routerLink="/guide/data-binding" class="card-link">Learn More →</a>
            </div>
            
            <div class="overview-card">
              <h3>⚙️ Services</h3>
              <p>Create and use Angular services in your NativeScript applications.</p>
              <a routerLink="/guide/services" class="card-link">Learn More →</a>
            </div>
          </div>
          
          <div class="getting-started-cta">
            <h2>New to NativeScript-Angular?</h2>
            <p>Start with our comprehensive getting started guide to set up your development environment and build your first app.</p>
            <a routerLink="/getting-started" class="btn btn-primary">Get Started</a>
          </div>
        </div>
        
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

    .sidebar-nav h4 {
      margin: 2rem 0 1rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
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

    .guide-overview {
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .guide-overview h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #333;
    }

    .lead {
      font-size: 1.25rem;
      color: #64748b;
      margin-bottom: 3rem;
      line-height: 1.6;
    }

    .overview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .overview-card {
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      padding: 1.5rem;
      transition: all 0.2s ease;
      
      &:hover {
        border-color: #0066cc;
        box-shadow: 0 4px 6px rgba(0, 102, 204, 0.1);
        transform: translateY(-2px);
      }
    }

    .overview-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #333;
    }

    .overview-card p {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .card-link {
      color: #0066cc;
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }

    .getting-started-cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
    }

    .getting-started-cta h2 {
      font-size: 1.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .getting-started-cta p {
      font-size: 1.125rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .btn {
      display: inline-block;
      padding: 0.875rem 2rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s ease;
      border: 2px solid transparent;
    }

    .btn-primary {
      background: #ffd700;
      color: #333;
      
      &:hover {
        background: #ffed4e;
        transform: translateY(-2px);
      }
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

      .overview-grid {
        grid-template-columns: 1fr;
      }

      .guide-overview {
        padding: 1.5rem;
      }

      .guide-overview h1 {
        font-size: 2rem;
      }
    }
  `]
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