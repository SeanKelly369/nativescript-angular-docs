import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-deployment',
  imports: [],
  templateUrl: './deployment.html',
  styleUrl: './deployment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Deployment implements OnInit {
  htmlContent!: SafeHtml;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly changeDetectorReference: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# Deployment in NativeScript-Angular

This page walks through preparing **release builds** for Android and iOS, signing, versioning, and store submission.

---

## Build Types

- **Debug** – fast iteration, no code minification.
- **Release** – optimized, signed (store-ready).

Angular production mode is enabled for **release** builds. If you manage it manually, ensure \`enableProdMode()\` runs in production.

---

## Versioning

### Android – \`App_Resources/Android/app.gradle\`
\`\`\`gradle
android {
  defaultConfig {
    versionCode 42       // integer, must increase every release
    versionName "1.5.0"  // display version
  }
}
\`\`\`

### iOS – \`App_Resources/iOS/Info.plist\`
\`\`\`xml
<key>CFBundleShortVersionString</key>
<string>1.5.0</string>         <!-- marketing version -->
<key>CFBundleVersion</key>
<string>42</string>            <!-- build number, must increase -->
\`\`\`

---

## Android Release (AAB/APK)

### 1) Create a keystore (once)
\`\`\`bash
keytool -genkey -v -keystore my-release-key.keystore -alias myalias -keyalg RSA -keysize 2048 -validity 10000
\`\`\`

### 2) Build **AAB** (recommended for Play Store)
\`\`\`bash
ns clean
ns build android --release --aab \\
  --key-store-path ./my-release-key.keystore \\
  --key-store-password "*****" \\
  --key-store-alias "myalias" \\
  --key-store-alias-password "*****"
\`\`\`

Artifact: \`platforms/android/app/build/outputs/bundle/release/app-release.aab\`

### (Optional) Build **APK** for side-load
\`\`\`bash
ns build android --release \\
  --key-store-path ./my-release-key.keystore \\
  --key-store-password "*****" \\
  --key-store-alias "myalias" \\
  --key-store-alias-password "*****"
\`\`\`

Artifact: \`platforms/android/app/build/outputs/apk/release/app-release.apk\`

### 3) Play Console
- Create/Select your app → **Production** (or Internal testing).
- Upload **AAB** → complete content rating, privacy policy, screenshots, listing.
- Submit for review.

---

## iOS Release (IPA / App Store)

**Requirements:** Xcode + Apple Developer account.

### 1) Bump versions in Info.plist (above).

### 2) Build for device (release)
\`\`\`bash
ns clean
ns build ios --release --for-device
\`\`\`

This prepares the Xcode project in \`platforms/ios\`.

### 3) Archive & Distribute (Xcode)
- Open \`platforms/ios/*.xcworkspace\` in Xcode.
- **Product → Archive** → **Distribute App** (App Store Connect).
- Choose automatic signing or select your provisioning profile.
- Upload; the build appears in **App Store Connect → TestFlight**.

### 4) TestFlight → App Store
- Create the app record (name, bundle id, screenshots).
- Submit the build for review when ready.

---

## Permissions & Store Strings

### iOS usage descriptions (\`Info.plist\`)
\`\`\`xml
<key>NSCameraUsageDescription</key>
<string>We use the camera to scan barcodes.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Location is used to show nearby sites.</string>
\`\`\`

### Android runtime permissions
Many plugins request at runtime. If doing it manually:
\`\`\`ts
import { Application } from '@nativescript/core';
const act = Application.android.foregroundActivity || Application.android.startActivity;
androidx.core.app.ActivityCompat.requestPermissions(
  act, [android.Manifest.permission.CAMERA], 123
);
\`\`\`

---

## Store Assets Checklist

- App icon & adaptive icon (Android).
- Launch screens.
- Screenshots for all target devices.
- Privacy policy URL.
- Content rating questionnaire.
- App category, description, keywords.

---

## CI Example (GitHub Actions – Android AAB)

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
        with: { node-version: 20 }
      - run: npm ci
      - run: npm i -g nativescript
      - run: ns doctor
      - run: |
          ns build android --release --aab
            --key-store-path secrets.ANDROID_KEYSTORE_PATH
            --key-store-password secrets.ANDROID_KEYSTORE_PASSWORD
            --key-store-alias secrets.ANDROID_KEY_ALIAS
            --key-store-alias-password secrets.ANDROID_KEY_PASSWORD
      - uses: actions/upload-artifact@v4
        with:
          name: app-release-aab
          path: platforms/android/app/build/outputs/bundle/release/*.aab
\`\`\`

> Keep keystores and passwords in **secrets**; never commit them.

---

## Troubleshooting

- **Weird build caches** → \`ns clean\`, delete \`platforms\`, \`node_modules\`, reinstall.
- **Android Gradle errors** → confirm \`compileSdkVersion\` matches plugins; upgrade Android Studio/SDKs.
- **iOS CocoaPods fails** → \`sudo gem install cocoapods && pod repo update\`.
- **Version rejected** → bump \`versionCode\` (Android) or \`CFBundleVersion\` (iOS).
- **Missing usage strings** → add Info.plist keys (iOS) or declare runtime requests (Android).

---

### Final Preflight

- [ ] Incremented versions (Android/iOS)
- [ ] Release build compiles locally
- [ ] Icons/splash/screenshots present
- [ ] Permissions described (Info.plist)
- [ ] AAB/IPA uploaded to consoles
- [ ] Test on real devices (especially low spec)
`;
    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorReference.markForCheck();
  }

}
