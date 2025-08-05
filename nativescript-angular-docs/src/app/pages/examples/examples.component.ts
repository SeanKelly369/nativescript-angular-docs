import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="examples-container">
      <h1>Examples</h1>
      <p class="intro">Explore practical examples of NativeScript-Angular applications.</p>
      
      <div class="examples-grid">
        <div class="example-card">
          <h3>Hello World</h3>
          <p>A simple "Hello World" app to get you started with NativeScript-Angular.</p>
          <div class="example-actions">
            <a href="https://github.com/NativeScript/nativescript-angular" target="_blank" class="btn btn-primary">View Code</a>
            <a href="#" class="btn btn-secondary">Live Demo</a>
          </div>
        </div>
        
        <div class="example-card">
          <h3>Todo App</h3>
          <p>A complete todo application demonstrating CRUD operations and local storage.</p>
          <div class="example-actions">
            <a href="https://github.com/NativeScript/nativescript-angular" target="_blank" class="btn btn-primary">View Code</a>
            <a href="#" class="btn btn-secondary">Live Demo</a>
          </div>
        </div>
        
        <div class="example-card">
          <h3>Navigation Example</h3>
          <p>Demonstrates various navigation patterns including tabs, modals, and page navigation.</p>
          <div class="example-actions">
            <a href="https://github.com/NativeScript/nativescript-angular" target="_blank" class="btn btn-primary">View Code</a>
            <a href="#" class="btn btn-secondary">Live Demo</a>
          </div>
        </div>
        
        <div class="example-card">
          <h3>HTTP & Services</h3>
          <p>Shows how to make HTTP requests and organize your code with Angular services.</p>
          <div class="example-actions">
            <a href="https://github.com/NativeScript/nativescript-angular" target="_blank" class="btn btn-primary">View Code</a>
            <a href="#" class="btn btn-secondary">Live Demo</a>
          </div>
        </div>
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
    }

    .intro {
      font-size: 1.125rem;
      color: #64748b;
      margin-bottom: 3rem;
    }

    .examples-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .example-card {
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
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

    .example-actions {
      display: flex;
      gap: 1rem;
    }

    .btn {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: #0066cc;
      color: white;
      
      &:hover {
        background: #0052a3;
      }
    }

    .btn-secondary {
      background: transparent;
      color: #0066cc;
      border: 1px solid #0066cc;
      
      &:hover {
        background: #0066cc;
        color: white;
      }
    }
  `]
})
export class ExamplesComponent {}