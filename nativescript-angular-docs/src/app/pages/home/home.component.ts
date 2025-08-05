import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Build Native Mobile Apps with 
          <span class="highlight">Angular</span>
        </h1>
        <p class="hero-description">
          NativeScript-Angular combines the power of Angular with native mobile development 
          to create truly native iOS and Android applications with shared code.
        </p>
        <div class="hero-actions">
          <a routerLink="/getting-started" class="btn btn-primary">Get Started</a>
          <a href="https://github.com/NativeScript/nativescript-angular" target="_blank" class="btn btn-secondary">
            View on GitHub
          </a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="phone-mockup">
          <div class="phone-screen">
            <div class="app-preview">
              <div class="app-header">NativeScript App</div>
              <div class="app-content">
                <div class="feature-item">📱 Native Performance</div>
                <div class="feature-item">🅰️ Angular Integration</div>
                <div class="feature-item">🔄 Cross-Platform</div>
                <div class="feature-item">💪 TypeScript Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="features">
      <div class="container">
        <h2 class="section-title">Why Choose NativeScript-Angular?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Native Performance</h3>
            <p>Direct access to native APIs without WebViews for truly native performance and user experience.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🅰️</div>
            <h3>Angular Integration</h3>
            <p>Use familiar Angular concepts like components, services, routing, and dependency injection.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>Cross-Platform</h3>
            <p>Write once, run on both iOS and Android with platform-specific customizations when needed.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💪</div>
            <h3>TypeScript Support</h3>
            <p>Full TypeScript support with strong typing and excellent IDE integration.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔥</div>
            <h3>Hot Module Replacement</h3>
            <p>Fast development workflow with instant updates and state preservation.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Native UI</h3>
            <p>Access to platform-specific UI components and native styling capabilities.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="getting-started-preview">
      <div class="container">
        <h2 class="section-title">Quick Start</h2>
        <div class="code-example">
          <div class="code-header">
            <span class="code-title">Create your first NativeScript-Angular app</span>
          </div>
          <pre class="code-block"><code># Install NativeScript CLI
npm install -g @nativescript/cli

# Create a new Angular project
ns create my-app --ng

# Run on device/emulator
cd my-app
ns run ios     # or ns run android</code></pre>
        </div>
        <div class="cta-section">
          <p>Ready to get started?</p>
          <a routerLink="/getting-started" class="btn btn-primary">View Full Setup Guide</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 1rem;
      display: flex;
      align-items: center;
      min-height: 500px;
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      width: 100%;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .highlight {
      color: #ffd700;
    }

    .hero-description {
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
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

    .btn-secondary {
      background: transparent;
      color: white;
      border-color: white;
      
      &:hover {
        background: white;
        color: #333;
      }
    }

    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .phone-mockup {
      width: 200px;
      height: 400px;
      background: #333;
      border-radius: 25px;
      padding: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .phone-screen {
      width: 100%;
      height: 100%;
      background: #f8fafc;
      border-radius: 15px;
      overflow: hidden;
    }

    .app-preview {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: #0066cc;
      color: white;
      padding: 1rem;
      text-align: center;
      font-weight: 600;
    }

    .app-content {
      flex: 1;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .feature-item {
      background: white;
      padding: 0.75rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-size: 0.875rem;
    }

    .features {
      padding: 4rem 1rem;
      background: #f8fafc;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 3rem;
      color: #333;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateY(-4px);
      }
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .feature-card p {
      color: #64748b;
      line-height: 1.6;
    }

    .getting-started-preview {
      padding: 4rem 1rem;
    }

    .code-example {
      background: #1e293b;
      border-radius: 1rem;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .code-header {
      background: #334155;
      padding: 1rem;
      border-bottom: 1px solid #475569;
    }

    .code-title {
      color: #e2e8f0;
      font-weight: 500;
    }

    .code-block {
      padding: 2rem;
      margin: 0;
      color: #e2e8f0;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      overflow-x: auto;
    }

    .cta-section {
      text-align: center;
    }

    .cta-section p {
      font-size: 1.125rem;
      margin-bottom: 1rem;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }
      
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-description {
        font-size: 1.125rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .phone-mockup {
        width: 150px;
        height: 300px;
      }
    }
  `]
})
export class HomeComponent {}