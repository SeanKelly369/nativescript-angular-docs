import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);

@Component({
  selector: 'app-plugins',
  imports: [],
  templateUrl: './plugins.html',
  styleUrl: './plugins.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Plugins implements OnInit {
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
# Plugins in NativeScript-Angular

Plugins add packaged access to native features such as camera, geolocation, notifications, biometrics, and more.

They wrap permissions, platform quirks, and native SDKs so you can call them from TypeScript.

---

## Install

Use the NativeScript CLI or plain npm. The CLI handles platform hooks.

\`\`\`bash
ns plugin add @nativescript/geolocation

# or
npm i @nativescript/geolocation
\`\`\`

> After adding or removing plugins: \`ns clean && ns run <platform>\` can save you from cache weirdness.

---

## Using a Plugin

### Geolocation

\`\`\`ts
import {
  isEnabled,
  enableLocationRequest,
  getCurrentLocation,
  Accuracy
} from '@nativescript/geolocation';

export async function getPosition(): Promise<{ lat: number | undefined; lon: number | undefined }> {
  if (!(await isEnabled())) {
    await enableLocationRequest(true);
  }

  const loc = await getCurrentLocation({
    desiredAccuracy: Accuracy.high,
    timeout: 8000
  });

  return {
    lat: loc?.latitude,
    lon: loc?.longitude
  };
}
\`\`\`

### Local Notifications

\`\`\`ts
import { LocalNotifications } from '@nativescript/local-notifications';

await LocalNotifications.requestPermission();

await LocalNotifications.schedule([
  {
    id: 1,
    title: 'NativeScript',
    body: 'Hello from a scheduled notification!',
    at: new Date(Date.now() + 3000)
  }
]);
\`\`\`

### Barcode Scanner

\`\`\`ts
import { BarcodeScanner } from '@nativescript-community/barcode-scanner';

const scanner = new BarcodeScanner();

const result = await scanner.scan({
  formats: 'QR_CODE,EAN_13',
  beepOnScan: true
});

console.log(result.text);
\`\`\`

---

## Permissions

Many plugins require runtime and/or manifest permissions.

### iOS Info.plist

Add usage descriptions in \`App_Resources/iOS/Info.plist\`:

\`\`\`xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We use your location to show nearby farms.</string>

<key>NSCameraUsageDescription</key>
<string>We use the camera to scan barcodes.</string>
\`\`\`

### Android Runtime Permissions

Most plugins request permissions at runtime. If you need manual control:

\`\`\`ts
import { Application } from '@nativescript/core';

const activity =
  Application.android.foregroundActivity ||
  Application.android.startActivity;

androidx.core.app.ActivityCompat.requestPermissions(
  activity,
  [android.Manifest.permission.CAMERA],
  123
);
\`\`\`

---

## Wrapping Plugins in Services

Keep UI components clean and mockable by wrapping plugin calls in an Angular service.

\`\`\`ts
import { Injectable } from '@angular/core';
import { getCurrentLocation, Accuracy } from '@nativescript/geolocation';

@Injectable({ providedIn: 'root' })
export class LocationService {
  async current(): Promise<{ lat: number; lon: number }> {
    const loc = await getCurrentLocation({
      desiredAccuracy: Accuracy.low,
      timeout: 6000
    });

    if (!loc) {
      throw new Error('No location');
    }

    return {
      lat: loc.latitude,
      lon: loc.longitude
    };
  }
}
\`\`\`

Now components depend on your **service** instead of the plugin directly. This is easier to test and easier to swap later.

---

## Troubleshooting

- **Stuck Pods / Gradle** — run \`ns clean\`, delete \`platforms\`, \`node_modules\`, \`package-lock.json\`, then reinstall.
- **iOS build fails** — ensure CocoaPods is up to date: \`sudo gem install cocoapods && pod repo update\`.
- **AndroidX mismatch** — align \`compileSdkVersion\` in \`App_Resources/Android\` with plugin requirements.
- **Permissions work on one platform only** — check Info.plist strings and Android runtime requests.
- **TypeScript types missing** — import from the package root. If truly absent, declare a minimal \`any\` type locally.

\`\`\`bash
ns clean
npm i
ns run ios

# or
ns run android
\`\`\`

---

## When to Prefer a Plugin vs Native APIs

- **Use a plugin** when it wraps complex SDKs such as camera, authentication, maps, or notifications.
- **Use native APIs** for small, one-off calls such as an iOS alert or Android toast.

---

## Creating a Plugin

1. Create a plugin workspace.
2. Add Android/iOS sources as needed.
3. Export a clean TypeScript API.
4. Write a demo app.
5. Publish to npm.

\`\`\`bash
npx @nativescript/plugin-seed my-awesome-plugin
\`\`\`

Basic TypeScript-only plugin shape:

\`\`\`ts
// src/index.ts
export function greet(name: string): string {
  return \`Hello, \${name} 👋\`;
}
\`\`\`

---

## Checklist

- [ ] Install with \`ns plugin add <pkg>\`.
- [ ] Confirm Info.plist strings and Android permissions.
- [ ] Wrap plugin calls in an Angular service.
- [ ] Run \`ns clean\` when build caches act up.
- [ ] Prefer plugins for complex features.
- [ ] Use native APIs for tiny platform-specific tasks.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}