import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-code-sharing',
  imports: [],
  templateUrl: './code-sharing.html',
  styleUrl: './code-sharing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSharingComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
    # Code Sharing in NativeScript-Angular

    Code sharing lets you build **one Angular project** that runs on both **Web (Angular)** and **Mobile (NativeScript)**.
    Instead of duplicating code, you reuse business logic, services, and even Angular modules across platforms.

    ---

    ## Project Structure

    A typical code-sharing project looks like this:

    \`\`\`
    apps/
      web/              # Angular web app
      mobile/           # NativeScript mobile app
    src/
      app/
        core/           # Shared services, models, utilities
        features/       # Shared business modules
        +web/           # Web-specific components
        +mobile/        # NativeScript-specific components
    \`\`\`

    ---

    ## Shared Code

    - **Services** → API calls, state management, utilities
    - **Models/Interfaces** → TypeScript classes/interfaces
    - **Business Logic** → Validation, calculations, helpers

    Example of a shared model:

    \`\`\`ts
    export interface Animal {
      id: number;
      name: string;
      breed: string;
    }
    \`\`\`

    Both Web and NativeScript apps can import this from the same place.

    ---

    ## Platform-Specific Code

    Sometimes you need different implementations depending on the platform.
    You can do this by **file suffixing**:

    \`\`\`ts
    // logger.service.ts (shared interface)
    export abstract class LoggerService {
      abstract log(message: string): void;
    }
    \`\`\`

    \`\`\`ts
    // logger.service.web.ts
    import { Injectable } from '@angular/core';
    @Injectable({ providedIn: 'root' })
    export class WebLoggerService {
      log(msg: string) { console.log('[Web]', msg); }
    }
    \`\`\`

    \`\`\`ts
    // logger.service.tns.ts
    import { Injectable } from '@angular/core';
    import { isIOS } from '@nativescript/core/platform';
    @Injectable({ providedIn: 'root' })
    export class MobileLoggerService {
      log(msg: string) {
        console.log(isIOS ? '[iOS]' : '[Android]', msg);
      }
    }
    \`\`\`

    When building for mobile, Angular picks up \`*.tns.ts\`.
    When building for web, it picks up \`*.web.ts\`.

    ---

    ## Conditional Logic

    You can also detect platform at runtime:

    \`\`\`ts
    import { isAndroid, isIOS } from '@nativescript/core';

    if (isAndroid) {
      console.log('Running on Android');
    } else if (isIOS) {
      console.log('Running on iOS');
    }
    \`\`\`

    ---

    ## Benefits of Code Sharing

    - ✅ Single codebase for **Web + Mobile**
    - ✅ Consistent business logic across platforms
    - ✅ Faster development + easier maintenance
    - ✅ Still flexible for platform-specific UI

    ---

    🔑 **Tip:** Keep UI separate, but **share as much logic as possible**.
    That way your NativeScript-Angular app feels native, while your web Angular app feels web-first.
    `;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
