import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="examples-container">
      <h1>NativeScript-Angular Examples</h1>
      <p class="intro">Explore practical examples and learn how to build real-world NativeScript-Angular applications.</p>
      
      <div class="featured-example">
        <div class="featured-content">
          <h2>🎬 Master-Detail Movie App</h2>
          <p>A complete movie browsing application demonstrating navigation, data binding, HTTP requests, and native UI components.</p>
          <div class="featured-preview">
            <div class="code-preview">
              <h4>Component Example</h4>
              <pre><code>@Component({
  selector: 'ns-movie-list',
  template: \`
    &lt;ActionBar title="Movies"&gt;&lt;/ActionBar&gt;
    &lt;ListView [items]="movies" (itemTap)="onMovieTap($event)"&gt;
      &lt;ng-template let-movie="item"&gt;
        &lt;GridLayout rows="auto, auto" columns="80, *"&gt;
          &lt;Image [src]="movie.poster" row="0" col="0"&gt;&lt;/Image&gt;
          &lt;Label [text]="movie.title" row="0" col="1"&gt;&lt;/Label&gt;
          &lt;Label [text]="movie.year" row="1" col="1"&gt;&lt;/Label&gt;
        &lt;/GridLayout&gt;
      &lt;/ng-template&gt;
    &lt;/ListView&gt;
  \`
})</code></pre>
            </div>
          </div>
          <div class="featured-actions">
            <a href="#master-detail" class="btn btn-primary">View Tutorial</a>
            <a href="https://github.com/NativeScript/nativescript-angular-examples" target="_blank" class="btn btn-secondary">GitHub Repo</a>
          </div>
        </div>
      </div>

      <div class="examples-section">
        <h2>📱 Basic Examples</h2>
        <div class="examples-grid">
          <div class="example-card">
            <div class="example-icon">👋</div>
            <h3>Hello World</h3>
            <p>Your first NativeScript-Angular app with basic component structure and event handling.</p>
            <div class="tech-tags">
              <span class="tag">Components</span>
              <span class="tag">Events</span>
            </div>
            <div class="example-actions">
              <a href="#hello-world" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">📋</div>
            <h3>Todo App</h3>
            <p>Complete todo application with CRUD operations, local storage, and form validation.</p>
            <div class="tech-tags">
              <span class="tag">Forms</span>
              <span class="tag">Storage</span>
              <span class="tag">CRUD</span>
            </div>
            <div class="example-actions">
              <a href="#todo-app" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">🧮</div>
            <h3>Calculator</h3>
            <p>Scientific calculator showcasing layout techniques and mathematical operations.</p>
            <div class="tech-tags">
              <span class="tag">GridLayout</span>
              <span class="tag">Logic</span>
            </div>
            <div class="example-actions">
              <a href="#calculator" class="btn btn-primary">View Code</a>
            </div>
          </div>
        </div>
      </div>

      <div class="examples-section">
        <h2>🧭 Navigation Examples</h2>
        <div class="examples-grid">
          <div class="example-card">
            <div class="example-icon">📄</div>
            <h3>Page Navigation</h3>
            <p>Forward and backward navigation using page-router-outlet and RouterExtensions.</p>
            <div class="tech-tags">
              <span class="tag">Routing</span>
              <span class="tag">ActionBar</span>
            </div>
            <div class="example-actions">
              <a href="#page-navigation" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">📑</div>
            <h3>Tab Navigation</h3>
            <p>Multi-tab application with TabView component and nested navigation.</p>
            <div class="tech-tags">
              <span class="tag">TabView</span>
              <span class="tag">Nested Routes</span>
            </div>
            <div class="example-actions">
              <a href="#tab-navigation" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">🗂️</div>
            <h3>Drawer Navigation</h3>
            <p>Side drawer navigation pattern with menu items and content switching.</p>
            <div class="tech-tags">
              <span class="tag">SideDrawer</span>
              <span class="tag">Menu</span>
            </div>
            <div class="example-actions">
              <a href="#drawer-navigation" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">🪟</div>
            <h3>Modal Navigation</h3>
            <p>Modal dialogs and full-screen modals for secondary workflows.</p>
            <div class="tech-tags">
              <span class="tag">Modals</span>
              <span class="tag">Dialogs</span>
            </div>
            <div class="example-actions">
              <a href="#modal-navigation" class="btn btn-primary">View Code</a>
            </div>
          </div>
        </div>
      </div>

      <div class="examples-section">
        <h2>🔧 Advanced Examples</h2>
        <div class="examples-grid">
          <div class="example-card">
            <div class="example-icon">🌐</div>
            <h3>HTTP & REST API</h3>
            <p>Consuming REST APIs with HttpClient, error handling, and loading states.</p>
            <div class="tech-tags">
              <span class="tag">HttpClient</span>
              <span class="tag">Services</span>
              <span class="tag">RxJS</span>
            </div>
            <div class="example-actions">
              <a href="#http-api" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">📊</div>
            <h3>Data Visualization</h3>
            <p>Charts and graphs using NativeScript plugins and custom components.</p>
            <div class="tech-tags">
              <span class="tag">Charts</span>
              <span class="tag">Plugins</span>
            </div>
            <div class="example-actions">
              <a href="#data-viz" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">📷</div>
            <h3>Camera & Media</h3>
            <p>Taking photos, accessing gallery, and handling media files.</p>
            <div class="tech-tags">
              <span class="tag">Camera</span>
              <span class="tag">Permissions</span>
            </div>
            <div class="example-actions">
              <a href="#camera-media" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">🗺️</div>
            <h3>Maps & Location</h3>
            <p>Integrating maps, GPS location, and geolocation services.</p>
            <div class="tech-tags">
              <span class="tag">Maps</span>
              <span class="tag">GPS</span>
              <span class="tag">Location</span>
            </div>
            <div class="example-actions">
              <a href="#maps-location" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">🔐</div>
            <h3>Authentication</h3>
            <p>User authentication with JWT tokens, guards, and secure storage.</p>
            <div class="tech-tags">
              <span class="tag">Auth</span>
              <span class="tag">Guards</span>
              <span class="tag">JWT</span>
            </div>
            <div class="example-actions">
              <a href="#authentication" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">🎨</div>
            <h3>Animations</h3>
            <p>Custom animations, transitions, and micro-interactions.</p>
            <div class="tech-tags">
              <span class="tag">Animations</span>
              <span class="tag">Transitions</span>
            </div>
            <div class="example-actions">
              <a href="#animations" class="btn btn-primary">View Code</a>
            </div>
          </div>
        </div>
      </div>

      <div class="examples-section">
        <h2>📱 Platform Features</h2>
        <div class="examples-grid">
          <div class="example-card">
            <div class="example-icon">📱</div>
            <h3>Device APIs</h3>
            <p>Accessing device information, battery, network status, and system settings.</p>
            <div class="tech-tags">
              <span class="tag">Device</span>
              <span class="tag">System</span>
            </div>
            <div class="example-actions">
              <a href="#device-apis" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">📁</div>
            <h3>File System</h3>
            <p>Reading, writing, and managing files on the device storage.</p>
            <div class="tech-tags">
              <span class="tag">FileSystem</span>
              <span class="tag">Storage</span>
            </div>
            <div class="example-actions">
              <a href="#file-system" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">🔔</div>
            <h3>Push Notifications</h3>
            <p>Implementing push notifications with Firebase Cloud Messaging.</p>
            <div class="tech-tags">
              <span class="tag">Push</span>
              <span class="tag">FCM</span>
            </div>
            <div class="example-actions">
              <a href="#push-notifications" class="btn btn-primary">View Code</a>
            </div>
          </div>
        </div>
      </div>

      <div class="examples-section">
        <h2>🔄 Code Sharing</h2>
        <div class="examples-grid">
          <div class="example-card">
            <div class="example-icon">🌐</div>
            <h3>Web + Mobile Shared</h3>
            <p>Sharing code between Angular web and NativeScript-Angular mobile apps.</p>
            <div class="tech-tags">
              <span class="tag">Code Sharing</span>
              <span class="tag">Angular</span>
            </div>
            <div class="example-actions">
              <a href="#code-sharing" class="btn btn-primary">View Code</a>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-icon">⚙️</div>
            <h3>Shared Services</h3>
            <p>Creating reusable services that work across web and mobile platforms.</p>
            <div class="tech-tags">
              <span class="tag">Services</span>
              <span class="tag">DI</span>
            </div>
            <div class="example-actions">
              <a href="#shared-services" class="btn btn-primary">View Code</a>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <h2>Ready to Start Building?</h2>
        <p>Check out our comprehensive getting started guide to set up your development environment and create your first app.</p>
        <a routerLink="/getting-started" class="btn btn-primary btn-large">Get Started</a>
      </div>
    </div>
  `,
  styles: [`
    .examples-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #333;
      text-align: center;
    }

    .intro {
      font-size: 1.125rem;
      color: #64748b;
      margin-bottom: 3rem;
      text-align: center;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .featured-example {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 1rem;
      padding: 3rem;
      margin-bottom: 4rem;
    }

    .featured-content h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .featured-content p {
      font-size: 1.125rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .featured-preview {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .code-preview h4 {
      font-size: 1rem;
      margin-bottom: 1rem;
      opacity: 0.8;
    }

    .code-preview pre {
      background: rgba(0, 0, 0, 0.3);
      padding: 1rem;
      border-radius: 0.25rem;
      overflow-x: auto;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.875rem;
      line-height: 1.4;
      margin: 0;
    }

    .featured-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .examples-section {
      margin-bottom: 4rem;
    }

    .examples-section h2 {
      font-size: 1.875rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: #333;
    }

    .examples-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .example-card {
      background: white;
      border-radius: 0.75rem;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border-color: #0066cc;
      }
    }

    .example-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .example-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .example-card p {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tag {
      background: #f1f5f9;
      color: #475569;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .example-actions {
      display: flex;
      gap: 1rem;
    }

    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      text-align: center;
    }

    .btn-primary {
      background: #0066cc;
      color: white;
      
      &:hover {
        background: #0052a3;
        transform: translateY(-1px);
      }
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
      }
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1rem;
    }

    .cta-section {
      text-align: center;
      background: #f8fafc;
      padding: 3rem;
      border-radius: 1rem;
      margin-top: 4rem;
    }

    .cta-section h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .cta-section p {
      font-size: 1.125rem;
      color: #64748b;
      margin-bottom: 2rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    @media (max-width: 768px) {
      .examples-container {
        padding: 1rem;
      }

      h1 {
        font-size: 2rem;
      }

      .featured-example {
        padding: 2rem;
      }

      .featured-content h2 {
        font-size: 1.5rem;
      }

      .examples-grid {
        grid-template-columns: 1fr;
      }

      .featured-actions,
      .example-actions {
        flex-direction: column;
      }

      .btn {
        text-align: center;
      }
    }
  `]
})
export class ExamplesComponent {}