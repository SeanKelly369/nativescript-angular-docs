import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-plugins',
  imports: [],
  templateUrl: './plugins.html',
  styleUrl: './plugins.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Plugins implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitiser: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {

    const markdownContent = `# Plugins in NativeScript-Angular

Plugins add packaged access to native features (camera, geolocation, notifications, biometrics, etc.).
They wrap permissions, platform quirks, and native SDKs so you can call them from TypeScript.

---

## Install

Use the NativeScript CLI (or plain npm). The CLI handles platform hooks.

\`\`\`bash
ns plugin add @nativescript/geolocation
# or
npm i @nativescript/geolocation
\`\`\`

> After adding/removing plugins: \`ns clean && ns run <platform>\` can save you from cache weirdness.

---

## Using a Plugin (Examples)

### Geolocation
\`\`\`ts
import {
  isEnabled,
  enableLocationRequest,
  getCurrentLocation,
  Accuracy
} from '@nativescript/geolocation';

export async function getPosition() {
  if (!(await isEnabled())) {
    await enableLocationRequest(true); // true = always, false = when-in-use
  }
  const loc = await getCurrentLocation({ desiredAccuracy: Accuracy.high, timeout: 8000 });
  return { lat: loc?.latitude, lon: loc?.longitude };
}
\`\`\`

### Local Notifications
\`\`\`ts
import { LocalNotifications } from '@nativescript/local-notifications';

await LocalNotifications.requestPermission();
await LocalNotifications.schedule([{
  id: 1,
  title: 'NativeScript',
  body: 'Hello from a scheduled notification!',
  at: new Date(Date.now() + 3000)
}]);
\`\`\`

### Barcode Scanner (community)
\`\`\`ts
import { BarcodeScanner } from '@nativescript-community/barcode-scanner';

const scanner = new BarcodeScanner();
const result = await scanner.scan({ formats: 'QR_CODE,EAN_13', beepOnScan: true });
console.log(result.text);
\`\`\`

---

## Permissions

Many plugins require runtime and/or manifest permissions.

### iOS (Info.plist)
Add usage descriptions in \`App_Resources/iOS/Info.plist\`:

\`\`\`xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We use your location to show nearby farms.</string>
<key>NSCameraUsageDescription</key>
<string>We use the camera to scan barcodes.</string>
\`\`\`

### Android (runtime)
Most plugins request at runtime; if you need manual control:

\`\`\`ts
import { Application } from '@nativescript/core';

const act = Application.android.foregroundActivity || Application.android.startActivity;
androidx.core.app.ActivityCompat.requestPermissions(
  act,
  [android.Manifest.permission.CAMERA],
  123
);
\`\`\`

---

## Wrapping Plugins in Services (recommended)

Keep UI components clean and mockable by wrapping plugin calls in an Angular service.

\`\`\`ts
import { Injectable } from '@angular/core';
import { getCurrentLocation, Accuracy } from '@nativescript/geolocation';

@Injectable({ providedIn: 'root' })
export class LocationService {
  async current() {
    const loc = await getCurrentLocation({ desiredAccuracy: Accuracy.low, timeout: 6000 });
    if (!loc) { throw new Error('No location'); }
    return { lat: loc.latitude, lon: loc.longitude };
  }
}
\`\`\`

Now components depend on your **service** instead of the plugin directly—easier to test and swap.

---

## Troubleshooting

- **Stuck Pods / Gradle** → \`ns clean\`, delete \`platforms\`, \`node_modules\`, \`package-lock.json\`, then reinstall.
- **iOS build fails** → ensure CocoaPods is up to date: \`sudo gem install cocoapods && pod repo update\`.
- **AndroidX mismatch** → align \`compileSdkVersion\` in \`App_Resources/Android\` with plugin requirements.
- **Permissions work on one platform only** → check Info.plist strings / Android runtime requests.
- **TypeScript types missing** → import from the package root; if truly absent, declare a minimal \`any\` type locally.

\`\`\`bash
ns clean
npm i
ns run ios   # or android
\`\`\`

---

## When to Prefer a Plugin vs Native APIs

- **Use a plugin** when it wraps complex SDKs (camera, auth, maps) or must handle lots of edge cases.
- **Go native** for small, one-off calls (e.g., iOS alert, Android toast) or if no plugin exists yet.

---

## Creating a Plugin (flyover)

1. Create a plugin workspace.
2. Add Android/iOS sources as needed.
3. Export a clean TypeScript API; write a demo app.
4. Publish to npm.

\`\`\`bash
# common approaches
npx @nativescript/plugin-seed my-awesome-plugin
# or community templates; outcome = workspace with /src, /demo, Android/iOS folders
\`\`\`

Basic TypeScript-only plugin shape:

\`\`\`ts
// src/index.ts
export function greet(name: string) {
  return \`Hello, \${name} 👋\`;
}
\`\`\`

---

### Checklist

- [ ] Install with \`ns plugin add <pkg>\`.
- [ ] Confirm Info.plist strings / Android permissions.
- [ ] Wrap plugin calls in an Angular service.
- [ ] \`ns clean\` when build caches act up.
- [ ] Prefer plugins for complex features; use native APIs for tiny tasks.
`;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
