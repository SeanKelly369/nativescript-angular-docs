import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="community-container">
      <div class="hero-section">
        <h1>Join the NativeScript-Angular Community</h1>
        <p class="hero-intro">Connect with thousands of developers building amazing mobile apps with Angular and NativeScript.</p>
      </div>
      
      <div class="community-section">
        <h2>💬 Get Help & Support</h2>
        <div class="community-grid">
          <div class="community-card">
            <div class="card-icon">💬</div>
            <h3>Discord Community</h3>
            <p>Join our active Discord server for real-time help, discussions, and community events. Connect with other developers and get answers to your questions.</p>
            <div class="card-stats">
              <span class="stat">5,000+ Members</span>
              <span class="stat">24/7 Support</span>
            </div>
            <a href="https://discord.com/invite/RgmpGky9GR" target="_blank" class="btn btn-primary">Join Discord</a>
          </div>
          
          <div class="community-card">
            <div class="card-icon">📚</div>
            <h3>Stack Overflow</h3>
            <p>Ask technical questions and find detailed answers from the community. Search existing solutions or post new questions with the nativescript-angular tag.</p>
            <div class="card-stats">
              <span class="stat">10,000+ Questions</span>
              <span class="stat">Expert Answers</span>
            </div>
            <a href="https://stackoverflow.com/questions/tagged/nativescript-angular" target="_blank" class="btn btn-primary">Visit Stack Overflow</a>
          </div>
          
          <div class="community-card">
            <div class="card-icon">🐙</div>
            <h3>GitHub Discussions</h3>
            <p>Participate in feature discussions, share ideas, and collaborate on the future of NativeScript-Angular development.</p>
            <div class="card-stats">
              <span class="stat">Open Source</span>
              <span class="stat">Active Development</span>
            </div>
            <a href="https://github.com/NativeScript/nativescript-angular/discussions" target="_blank" class="btn btn-primary">Join Discussions</a>
          </div>
        </div>
      </div>

      <div class="community-section">
        <h2>🚀 Contribute to the Project</h2>
        <div class="contribute-content">
          <div class="contribute-text">
            <h3>Help Shape the Future</h3>
            <p>NativeScript-Angular is open source and thrives on community contributions. Whether you're fixing bugs, adding features, improving documentation, or helping other developers, every contribution matters.</p>
            
            <div class="contribution-types">
              <div class="contribution-item">
                <h4>🐛 Report Issues</h4>
                <p>Found a bug? Report it on GitHub with detailed reproduction steps.</p>
              </div>
              <div class="contribution-item">
                <h4>💡 Feature Requests</h4>
                <p>Have an idea for improvement? Share it with the community.</p>
              </div>
              <div class="contribution-item">
                <h4>📖 Documentation</h4>
                <p>Help improve documentation, tutorials, and examples.</p>
              </div>
              <div class="contribution-item">
                <h4>💻 Code Contributions</h4>
                <p>Submit pull requests for bug fixes and new features.</p>
              </div>
            </div>
            
            <div class="contribute-actions">
              <a href="https://github.com/NativeScript/nativescript-angular" target="_blank" class="btn btn-primary">View Repository</a>
              <a href="https://github.com/NativeScript/nativescript-angular/blob/main/CONTRIBUTING.md" target="_blank" class="btn btn-secondary">Contributing Guide</a>
            </div>
          </div>
          
          <div class="contribute-stats">
            <h4>Project Stats</h4>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">2,000+</div>
                <div class="stat-label">GitHub Stars</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">Contributors</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">100+</div>
                <div class="stat-label">Releases</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">5,000+</div>
                <div class="stat-label">Issues Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="community-section">
        <h2>📚 Learning Resources</h2>
        <div class="resources-grid">
          <div class="resource-card">
            <div class="resource-icon">📝</div>
            <h3>Official Blog</h3>
            <p>Stay updated with the latest news, tutorials, and best practices from the NativeScript team.</p>
            <a href="https://blog.nativescript.org" target="_blank" class="resource-link">Read Blog →</a>
          </div>
          
          <div class="resource-card">
            <div class="resource-icon">🎥</div>
            <h3>Video Tutorials</h3>
            <p>Watch comprehensive video tutorials and courses on YouTube and other platforms.</p>
            <a href="https://www.youtube.com/c/NativeScript" target="_blank" class="resource-link">Watch Videos →</a>
          </div>
          
          <div class="resource-card">
            <div class="resource-icon">📖</div>
            <h3>Books & Guides</h3>
            <p>Comprehensive books and guides written by community experts and core team members.</p>
            <a href="https://www.nativescript.org/books" target="_blank" class="resource-link">Browse Books →</a>
          </div>
          
          <div class="resource-card">
            <div class="resource-icon">🎯</div>
            <h3>Workshop Materials</h3>
            <p>Hands-on workshop materials and exercises for learning NativeScript-Angular.</p>
            <a href="https://github.com/NativeScript/workshop-angular" target="_blank" class="resource-link">Access Workshops →</a>
          </div>
        </div>
      </div>

      <div class="community-section">
        <h2>🌟 Community Showcase</h2>
        <div class="showcase-content">
          <p>Discover amazing apps built by the community and get inspired for your next project.</p>
          
          <div class="showcase-grid">
            <div class="showcase-item">
              <h4>🏆 Featured Apps</h4>
              <p>Apps that showcase the best of NativeScript-Angular development</p>
            </div>
            <div class="showcase-item">
              <h4>🔧 Open Source Projects</h4>
              <p>Community-driven projects and libraries you can contribute to</p>
            </div>
            <div class="showcase-item">
              <h4>💡 Success Stories</h4>
              <p>How companies and developers are using NativeScript-Angular</p>
            </div>
          </div>
          
          <div class="showcase-cta">
            <h3>Share Your App</h3>
            <p>Built something awesome with NativeScript-Angular? We'd love to feature it!</p>
            <a href="https://github.com/NativeScript/nativescript-angular/discussions/categories/show-and-tell" target="_blank" class="btn btn-primary">Submit Your App</a>
          </div>
        </div>
      </div>

      <div class="community-section">
        <h2>📅 Events & Meetups</h2>
        <div class="events-content">
          <div class="events-text">
            <h3>Connect in Person & Online</h3>
            <p>Join NativeScript events, meetups, and conferences around the world. Meet other developers, learn from experts, and stay up-to-date with the latest developments.</p>
            
            <div class="event-types">
              <div class="event-type">
                <h4>🌍 Global Conferences</h4>
                <p>Annual conferences with talks, workshops, and networking opportunities</p>
              </div>
              <div class="event-type">
                <h4>🏙️ Local Meetups</h4>
                <p>Regular meetups in cities around the world</p>
              </div>
              <div class="event-type">
                <h4>💻 Virtual Events</h4>
                <p>Online workshops, webinars, and community calls</p>
              </div>
            </div>
          </div>
          
          <div class="events-calendar">
            <h4>Upcoming Events</h4>
            <div class="calendar-placeholder">
              <p>Check our community calendar for upcoming events and meetups in your area.</p>
              <a href="https://www.meetup.com/topics/nativescript/" target="_blank" class="btn btn-secondary">Find Events</a>
            </div>
          </div>
        </div>
      </div>

      <div class="community-section">
        <h2>🤝 Community Guidelines</h2>
        <div class="guidelines-content">
          <p>Our community is built on respect, inclusivity, and collaboration. Please follow these guidelines to help maintain a positive environment for everyone.</p>
          
          <div class="guidelines-grid">
            <div class="guideline-item">
              <h4>🤝 Be Respectful</h4>
              <p>Treat all community members with respect and kindness</p>
            </div>
            <div class="guideline-item">
              <h4>🎯 Stay On Topic</h4>
              <p>Keep discussions relevant to NativeScript-Angular development</p>
            </div>
            <div class="guideline-item">
              <h4>🆘 Help Others</h4>
              <p>Share your knowledge and help fellow developers</p>
            </div>
            <div class="guideline-item">
              <h4>🔍 Search First</h4>
              <p>Search existing discussions before asking new questions</p>
            </div>
          </div>
          
          <div class="guidelines-footer">
            <p>For detailed community guidelines and code of conduct, please visit our GitHub repository.</p>
            <a href="https://github.com/NativeScript/nativescript-angular/blob/main/CODE_OF_CONDUCT.md" target="_blank" class="btn btn-secondary">Read Code of Conduct</a>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <h2>Ready to Join?</h2>
        <p>Start your journey with NativeScript-Angular today. Join our community, build amazing apps, and help shape the future of mobile development.</p>
        <div class="cta-actions">
          <a routerLink="/getting-started" class="btn btn-primary btn-large">Get Started</a>
          <a href="https://discord.com/invite/RgmpGky9GR" target="_blank" class="btn btn-secondary btn-large">Join Discord</a>
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

    .hero-section {
      text-align: center;
      margin-bottom: 4rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #333;
    }

    .hero-intro {
      font-size: 1.25rem;
      color: #64748b;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .community-section {
      margin-bottom: 4rem;
    }

    .community-section h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: #333;
    }

    .community-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .community-card {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      text-align: center;
      transition: all 0.2s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
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

    .card-stats {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .stat {
      background: #f1f5f9;
      color: #475569;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .contribute-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .contribute-text h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .contribute-text p {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .contribution-types {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .contribution-item h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .contribution-item p {
      color: #64748b;
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
    }

    .contribute-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .contribute-stats {
      background: #f8fafc;
      padding: 2rem;
      border-radius: 1rem;
    }

    .contribute-stats h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #333;
      text-align: center;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: white;
      border-radius: 0.5rem;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0066cc;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
    }

    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .resource-card {
      background: white;
      border-radius: 0.75rem;
      padding: 2rem;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
      
      &:hover {
        border-color: #0066cc;
        box-shadow: 0 4px 6px rgba(0, 102, 204, 0.1);
      }
    }

    .resource-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .resource-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .resource-card p {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .resource-link {
      color: #0066cc;
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }

    .showcase-content p {
      color: #64748b;
      font-size: 1.125rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .showcase-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .showcase-item {
      text-align: center;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 0.75rem;
    }

    .showcase-item h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #333;
    }

    .showcase-item p {
      color: #64748b;
      font-size: 0.875rem;
      margin: 0;
    }

    .showcase-cta {
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem;
      border-radius: 1rem;
    }

    .showcase-cta h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .showcase-cta p {
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .events-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .events-text h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .events-text p {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .event-types {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .event-type h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .event-type p {
      color: #64748b;
      font-size: 0.875rem;
      margin: 0;
    }

    .events-calendar {
      background: #f8fafc;
      padding: 2rem;
      border-radius: 1rem;
    }

    .events-calendar h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #333;
      text-align: center;
    }

    .calendar-placeholder {
      text-align: center;
    }

    .calendar-placeholder p {
      color: #64748b;
      margin-bottom: 1.5rem;
    }

    .guidelines-content p {
      color: #64748b;
      font-size: 1.125rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .guidelines-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .guideline-item {
      text-align: center;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 0.75rem;
    }

    .guideline-item h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #333;
    }

    .guideline-item p {
      color: #64748b;
      font-size: 0.875rem;
      margin: 0;
    }

    .guidelines-footer {
      text-align: center;
    }

    .guidelines-footer p {
      margin-bottom: 1.5rem;
    }

    .cta-section {
      text-align: center;
      background: #f8fafc;
      padding: 4rem 2rem;
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
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
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
      color: #0066cc;
      border: 2px solid #0066cc;
      
      &:hover {
        background: #0066cc;
        color: white;
      }
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .community-container {
        padding: 1rem;
      }

      h1 {
        font-size: 2rem;
      }

      .community-grid {
        grid-template-columns: 1fr;
      }

      .contribute-content,
      .events-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .contribution-types {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .cta-actions {
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class CommunityComponent {}