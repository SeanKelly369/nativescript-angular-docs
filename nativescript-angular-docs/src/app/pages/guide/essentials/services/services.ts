import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  htmlContent!: SafeHtml;

  private readonly marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# Services in NativeScript-Angular

Services in Angular and NativeScript-Angular are classes that encapsulate **business logic** or **shared functionality**.

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
  log(message: string): void {
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
  constructor(private readonly loggingService: LoggingService) {}

  doLog(): void {
    this.loggingService.log('Button tapped in NativeScript!');
  }
}
\`\`\`

---

## Service Scope

- **providedIn: 'root'** — singleton across the app
- **providedIn: 'any'** — new instance per lazy-loaded module
- **providers: [] in @Component** — new instance scoped to that component

---

## Common Use Cases in NativeScript-Angular

- Managing API calls such as HTTP, SQLite, Firebase, etc.
- Sharing state across pages
- Wrapping native APIs such as geolocation, camera, or file system
- Utility logic such as logging, formatting, and validation

---

By using services, your NativeScript-Angular apps remain **clean, testable, and scalable**.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}