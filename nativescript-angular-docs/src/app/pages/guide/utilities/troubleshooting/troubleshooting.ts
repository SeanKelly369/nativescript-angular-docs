import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import groovy from 'highlight.js/lib/languages/groovy';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('gradle', groovy);
hljs.registerLanguage('groovy', groovy);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);

@Component({
  selector: 'app-troubleshooting',
  imports: [],
  templateUrl: './troubleshooting.html',
  styleUrl: './troubleshooting.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Troubleshooting implements OnInit {
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
# Troubleshooting NativeScript-Angular

Quick fixes for the most common pain points. Start with a **fast reset**, then dig into platform-specific sections.

---

## 0) Fast Reset

This fixes a surprising number of NativeScript build issues.

\`\`\`bash
ns clean
rm -rf node_modules platforms
npm i
ns run ios

# or
ns run android
\`\`\`

Also try:

\`\`\`bash
ns doctor
ns info
\`\`\`

---

## 1) Android Build Fails

### Gradle / AndroidX mismatch

- Ensure a recent \`compileSdkVersion\` in \`App_Resources/Android/app.gradle\`.
- Align plugin AndroidX versions by updating packages and rebuilding from clean.

\`\`\`gradle
android {
  compileSdkVersion 34

  defaultConfig {
    targetSdkVersion 34
  }
}
\`\`\`

### Dex / Multidex errors

For errors such as \`com.android.dex.DexArchiveMergerException\`, enable multidex:

\`\`\`gradle
android {
  defaultConfig {
    multiDexEnabled true
  }
}

dependencies {
  implementation "androidx.multidex:multidex:2.0.1"
}
\`\`\`

### Play Services / Firebase version clashes

- Update all NativeScript plugins that pull Google libraries.
- If a transitive dependency forces an older library, exclude or align it in \`app.gradle\`.

\`\`\`gradle
dependencies {
  implementation ("com.google.firebase:firebase-messaging:23.4.1") {
    // Example of forcing a version.
  }
}
\`\`\`

### NDK / Build Tools complaints

- Install missing components in Android Studio SDK Manager.
- Clear Gradle caches when builds go weird:

\`\`\`bash
gradle --stop || true
rm -rf ~/.gradle/caches ~/.gradle/kotlin
\`\`\`

---

## 2) iOS Build Fails

### CocoaPods resolution issues

Typical fix cycle:

\`\`\`bash
cd platforms/ios || true
pod deintegrate || true
cd ../../

rm -rf platforms/ios
rm -rf ios/Pods ios/Podfile.lock ios/.symlinks

ns clean
pod repo update
ns run ios
\`\`\`

If Pods complain about versions, update CocoaPods:

\`\`\`bash
sudo gem install cocoapods
pod repo update
\`\`\`

### Signing / Provisioning

- Open \`platforms/ios/*.xcworkspace\` in Xcode.
- Go to **Signing & Capabilities**.
- Pick your team and provisioning profile.
- If archiving fails, try **Product → Clean Build Folder**, then archive again.

---

## 3) App Crashes on Launch

Check device logs:

- **Android:** \`ns debug android --log trace\` or \`adb logcat\`
- **iOS:** Xcode **Devices & Simulators** or \`ns debug ios --log trace\`

Also check:

- Missing permissions.
- Missing iOS \`Info.plist\` usage strings.
- Plugin init code running before the app has a root view.

---

## 4) LiveSync / HMR Not Updating

- Kill the process and restart with \`ns run <platform>\`.
- Delete \`platforms\` and \`node_modules\`.
- Make sure only one device or emulator is attached, or specify one with \`--device\`.

---

## 5) Device / Emulator Not Detected

\`\`\`bash
ns device android --available
ns device ios --available
\`\`\`

### Android

- Accept the RSA debug prompt.
- Enable **USB debugging**.
- Install vendor USB drivers on Windows.

### iOS

- Trust the computer.
- Make sure you have a valid signing team in Xcode.
- Unlock the device.

---

## 6) Plugins Misbehaving

- After adding or removing a plugin, run \`ns clean && ns run <platform>\`.
- Verify required permissions and Info.plist strings.
- Wrap plugin calls in an Angular service to centralize errors and make testing easier.

---

## 7) Versioning / Store Upload Errors

- **Android:** bump \`versionCode\` and \`versionName\` in \`app.gradle\`.
- **iOS:** bump \`CFBundleVersion\` and \`CFBundleShortVersionString\` in Info.plist.
- Play Console rejects APK? Prefer **AAB** for store uploads.

---

## 8) Networking / SSL Issues

- Simulators may block self-signed certificates.
- Add ATS exceptions on iOS only for development.
- Confirm the device can reach your dev server.
- Check LAN, VPN, firewall, and server bind address.

---

## 9) Logging & Tracing

Turn on verbose logs to pinpoint native failures:

\`\`\`bash
ns debug android --log trace
ns debug ios --log trace
\`\`\`

Add lightweight timings:

\`\`\`ts
console.time('load');

// Suspicious work here.

console.timeEnd('load');
\`\`\`

---

## 10) When in Doubt — Clean Matrix

If all else fails:

\`\`\`bash
ns clean
rm -rf node_modules package-lock.json platforms
npm i

gradle --stop || true
rm -rf ~/.gradle/caches

pod repo update || true

ns run ios

# or
ns run android
\`\`\`

---

## Quick Checklist

- [ ] \`ns doctor\` passes.
- [ ] Cleaned \`platforms\`, \`node_modules\`, Gradle caches, and Pods caches.
- [ ] Correct permissions and Info.plist usage strings.
- [ ] Android compile/target SDK aligned.
- [ ] iOS signing set in Xcode.
- [ ] Reproduced on a real device and captured logs.
`;

    const html = await this.marked.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}