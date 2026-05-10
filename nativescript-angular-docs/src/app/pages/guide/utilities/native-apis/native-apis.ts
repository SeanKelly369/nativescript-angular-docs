import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);

@Component({
  selector: 'app-native-apis',
  imports: [],
  templateUrl: './native-apis.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NativeApis implements OnInit {
  htmlContent!: SafeHtml;

  private readonly marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        if (!lang || !hljs.getLanguage(lang)) {
          return hljs.highlight(code, {
            language: 'typescript',
            ignoreIllegals: true
          }).value;
        }

        return hljs.highlight(code, {
          language: lang,
          ignoreIllegals: true
        }).value;
      }
    })
  );

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# Native APIs in NativeScript-Angular

NativeScript gives you direct access to iOS and Android APIs from TypeScript.

That means you can call native APIs when you need them, without waiting for a plugin. In Angular apps, the cleanest approach is usually to wrap native code inside services so your components stay simple, testable, and cross-platform.

---

## When Should You Use Native APIs?

Use native APIs when:

- A plugin does not exist for what you need.
- You need a small platform-specific feature.
- You are integrating with an Android or iOS SDK.
- You need access to platform behaviour that NativeScript does not abstract.

Prefer a plugin when:

- Permissions are involved.
- The feature has lots of lifecycle edge cases.
- You need the same behaviour on both Android and iOS.
- The API is complex, such as camera, geolocation, maps, barcode scanning, authentication, or payments.

> Rule of thumb: use native APIs for small focused tasks; use plugins for full features.

---

## Platform Detection

Use platform guards before touching Android-only or iOS-only APIs.

\`\`\`ts
import { isAndroid, isIOS } from '@nativescript/core';

if (isAndroid) {
  // Android-only code
}

if (isIOS) {
  // iOS-only code
}
\`\`\`

This matters because Android globals such as \`android\` do not exist on iOS, and iOS globals such as \`UIKit\` classes do not exist on Android.

---

## Getting Native Platform Objects

Many native APIs need an Android \`Activity\`, Android \`Context\`, or iOS root view controller.

\`\`\`ts
import { Application, Utils } from '@nativescript/core';

// Android Activity
const activity =
  Application.android.foregroundActivity ||
  Application.android.startActivity;

// Android Context
const context = Utils.android.getApplicationContext();

// iOS Root View Controller
const rootViewController = Utils.ios.getRootViewController();
\`\`\`

Keep this kind of setup close to the native code that needs it. Avoid scattering \`Activity\`, \`Context\`, or view controller logic across many components.

---

## Keep Native Code Isolated

A good folder structure is:

\`\`\`text
src/
└── app/
    └── services/
        └── native/
            ├── native-alert.service.ts
            ├── native-share.service.ts
            └── native-permissions.service.ts
\`\`\`

This keeps your Angular components focused on UI and application flow, while native services handle platform-specific behaviour.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}