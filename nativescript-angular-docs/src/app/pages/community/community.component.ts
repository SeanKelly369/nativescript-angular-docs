import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="community-container">
      <h1>Community</h1>
      <p class="intro">Join the NativeScript-Angular community and get help from other developers.</p>
      
      <div class="community-grid">
        <div class="community-card">
          <h3>🐙 GitHub</h3>
          <p>Contribute to the project, report bugs, and request features.</p>
          <a href="https://github.com/NativeScript/nativescript-angular" target="_blank" class="btn btn-primary">Visit GitHub</a>
        </div>
        
        <div class="community-card">
          <h3>💬 Discord</h3>
          <p>Chat with other developers and get help in real-time.</p>
          <a href="https://discord.com/invite/RgmpGky9GR" target="_blank" class="btn btn-primary">Join Discord</a>
        </div>
        
        <div class="community-card">
          <h3>📚 Stack Overflow</h3>
          <p>Ask questions and find answers from the community.</p>
          <a href="https://stackoverflow.com/questions/tagged/nativescript-angular" target="_blank" class="btn btn-primary">Visit Stack Overflow</a>
        </div>
        
        <div class="community-card">
          <h3>📝 Blog</h3>
          <p>Read the latest news and tutorials about NativeScript.</p>
          <a href="https://blog.nativescript.org" target="_blank" class="btn btn-primary">Read Blog</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .community-container {
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

    .community-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .community-card {
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      text-align: center;
    }

    .community-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .community-card p {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #0066cc;
      color: white;
      text-decoration: none;
      border-radius: 0.25rem;
      font-weight: 500;
      transition: background 0.2s ease;
      
      &:hover {
        background: #0052a3;
      }
    }
  `]
})
export class CommunityComponent {}