import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
  const markdownContent = `
  # Services in NativeScript-Angular

  Services in Angular (and NativeScript-Angular) are classes that encapsulate **business logic** or **shared functionality**.
  They help keep your components lean by moving non-UI logic into reusable, injectable classes.

  ---

  ## Creating a Service

  You can generate a service using Angular CLI:

  \`\`\`bash
  ng generate service services/logging
  \`\`\`

  This creates a simple service class:

  \`\`\`ts
  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class LoggingService {
    log(message: string) {
      console.log('[App Log]', message);
    }
  }
  \`\`\`

  ---

  ## Using a Service in a Component

  Inject the service into your component via the constructor:

  \`\`\`ts
  import { Component } from '@angular/core';
  import { LoggingService } from './services/logging.service';

  @Component({
    selector: 'app-home',
    template: \`
      <Button text="Log Message" (tap)="doLog()"></Button>
    \`
  })
  export class HomeComponent {
    constructor(private loggingService: LoggingService) {}

    doLog() {
      this.loggingService.log('Button tapped in NativeScript!');
    }
  }
  \`\`\`

  ---

  ## Service Scope

  - **providedIn: 'root'** → singleton across the app.
  - **providedIn: 'any'** → new instance per lazy-loaded module.
  - **providers: [] in @Component** → new instance scoped to that component.

  ---

  ## Common Use Cases in NativeScript-Angular

  - Managing API calls (HTTP, SQLite, Firebase, etc.)
  - State management across pages
  - Wrapping native APIs (geolocation, camera, file system)
  - Utility logic (logging, formatting, validation)

  ---

  ✅ By using services, your NativeScript-Angular apps remain **clean, testable, and scalable**.
  `;


    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
