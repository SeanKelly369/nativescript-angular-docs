import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="api-container">
      <h1>API Reference</h1>
      <p class="intro">Complete API documentation for NativeScript-Angular.</p>
      
      <div class="api-sections">
        <div class="api-section">
          <h2>Core Modules</h2>
          <ul>
            <li><a href="https://docs.nativescript.org/api/" target="_blank">@nativescript/core</a></li>
            <li><a href="https://docs.nativescript.org/api/" target="_blank">@nativescript/angular</a></li>
          </ul>
        </div>
        
        <div class="api-section">
          <h2>UI Components</h2>
          <ul>
            <li><a href="#" target="_blank">ActionBar</a></li>
            <li><a href="#" target="_blank">Button</a></li>
            <li><a href="#" target="_blank">Label</a></li>
            <li><a href="#" target="_blank">ListView</a></li>
            <li><a href="#" target="_blank">Page</a></li>
            <li><a href="#" target="_blank">StackLayout</a></li>
            <li><a href="#" target="_blank">GridLayout</a></li>
          </ul>
        </div>
        
        <div class="api-section">
          <h2>Services</h2>
          <ul>
            <li><a href="#" target="_blank">RouterExtensions</a></li>
            <li><a href="#" target="_blank">Page</a></li>
            <li><a href="#" target="_blank">Application</a></li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .api-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #333;
    }

    .intro {
      font-size: 1.125rem;
      color: #64748b;
      margin-bottom: 3rem;
    }

    .api-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .api-section {
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .api-section h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .api-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .api-section li {
      margin-bottom: 0.5rem;
    }

    .api-section a {
      color: #0066cc;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  `]
})
export class ApiComponent {}