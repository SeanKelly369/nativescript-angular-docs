import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('yml', yaml);
hljs.registerLanguage('yaml', yaml);

@Component({
  selector: 'app-deployment',
  imports: [],
  templateUrl: './deployment.html',
  styleUrl: './deployment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Deployment implements OnInit {
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
    private readonly changeDetectorReference: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# Deployment in NativeScript-Angular

This page walks through preparing **release builds** for Android and iOS, signing, versioning, and store submission.

---

## Build Types

- **Debug** — fast iteration, no code minification.
- **Release** — optimized, signed, and store-ready.

Angular production mode is enabled for **release** builds. If you manage it manually, ensure \`enableProdMode()\` runs in production.

---

## Versioning

### Android — \`App_Resources/Android/app.gradle\`

\`\`\`gradle
android {
  defaultConfig {
    versionCode 42
    versionName "1.5.0"
  }
}
\`\`\`

### iOS — \`App_Resources/iOS/Info.plist\`

\`\`\`xml
<key>CFBundleShortVersionString</key>
<string>1.5.0</string>

<key>CFBundleVersion</key>
<string>42</string>
\`\`\`

---

## Android Release

### 1) Create a keystore

Create this once and keep it safe.

\`\`\`bash
keytool -genkey -v -keystore my-release-key.keystore -alias myalias -keyalg RSA -keysize 2048 -validity 10000
\`\`\`

### 2) Build AAB

AAB is recommended for the Play Store.

\`\`\`bash
ns clean

ns build android --release --aab \\
  --key-store-path ./my-release-key.keystore \\
  --key-store-password "*****" \\
  --key-store-alias "myalias" \\
  --key-store-alias-password "*****"
\`\`\`

Artifact:

\`\`\`text
platforms/android/app/build/outputs/bundle/release/app-release.aab
\`\`\`

### Optional: Build APK

Use this for side-loading or direct device testing.

\`\`\`bash
ns build android --release \\
  --key-store-path ./my-release-key.keystore \\
  --key-store-password "*****" \\
  --key-store-alias "myalias" \\
  --key-store-alias-password "*****"
\`\`\`

Artifact:

\`\`\`text
platforms/android/app/build/outputs/apk/release/app-release.apk
\`\`\`

### 3) Play Console

- Create or select your app.
- Upload the AAB to **Production** or **Internal testing**.
- Complete content rating, privacy policy, screenshots, and listing details.
- Submit for review.

---

## iOS Release

**Requirements:** Xcode and an Apple Developer account.

### 1) Bump versions in Info.plist

Update:

- \`CFBundleShortVersionString\`
- \`CFBundleVersion\`

### 2) Build for device

\`\`\`bash
ns clean
ns build ios --release --for-device
\`\`\`

This prepares the Xcode project in \`platforms/ios\`.

### 3) Archive and Distribute

- Open \`platforms/ios/*.xcworkspace\` in Xcode.
- Choose **Product → Archive**.
- Choose **Distribute App**.
- Upload to **App Store Connect**.
- The build appears in **TestFlight** once processed.

### 4) TestFlight to App Store

- Create the app record.
- Add name, bundle ID, screenshots, privacy details, and review notes.
- Select the processed build.
- Submit for review.

---

## Permissions and Store Strings

### iOS usage descriptions

Add required strings in \`App_Resources/iOS/Info.plist\`.

\`\`\`xml
<key>NSCameraUsageDescription</key>
<string>We use the camera to scan barcodes.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Location is used to show nearby sites.</string>
\`\`\`

### Android runtime permissions

Many plugins request permissions at runtime. If doing it manually:

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

## Store Assets Checklist

- App icon and adaptive icon for Android.
- Launch screens.
- Screenshots for all target devices.
- Privacy policy URL.
- Content rating questionnaire.
- App category.
- App description.
- App keywords.

---

## CI Example

GitHub Actions example for building an Android AAB:

\`\`\`yml
name: android-release

on:
  workflow_dispatch:

jobs:
  build:
    runs-on: macos-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci

      - run: npm i -g nativescript

      - run: ns doctor

      - run: |
          ns build android --release --aab \\
            --key-store-path "\${{ secrets.ANDROID_KEYSTORE_PATH }}" \\
            --key-store-password "\${{ secrets.ANDROID_KEYSTORE_PASSWORD }}" \\
            --key-store-alias "\${{ secrets.ANDROID_KEY_ALIAS }}" \\
            --key-store-alias-password "\${{ secrets.ANDROID_KEY_PASSWORD }}"

      - uses: actions/upload-artifact@v4
        with:
          name: app-release-aab
          path: platforms/android/app/build/outputs/bundle/release/*.aab
\`\`\`

> Keep keystores and passwords in **secrets**. Never commit them.

---

## Troubleshooting

- **Weird build caches** — run \`ns clean\`, delete \`platforms\`, delete \`node_modules\`, then reinstall.
- **Android Gradle errors** — confirm \`compileSdkVersion\` matches plugin requirements.
- **iOS CocoaPods fails** — run \`sudo gem install cocoapods && pod repo update\`.
- **Version rejected** — bump \`versionCode\` on Android or \`CFBundleVersion\` on iOS.
- **Missing usage strings** — add required Info.plist keys on iOS or declare runtime permissions on Android.

---

## Final Preflight

- [ ] Incremented Android and iOS versions.
- [ ] Release build compiles locally.
- [ ] Icons, splash screens, and screenshots are ready.
- [ ] Permissions are described in Info.plist.
- [ ] AAB or IPA uploaded to the store console.
- [ ] Tested on real devices, especially lower-spec devices.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorReference.markForCheck();
  }
}