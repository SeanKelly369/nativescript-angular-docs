import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-troubleshooting',
  imports: [],
  templateUrl: './troubleshooting.html',
  styleUrl: './troubleshooting.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Troubleshooting implements OnInit {
  htmlContent!: SafeHtml;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
const markdownContent = `
# Troubleshooting NativeScript-Angular

Quick fixes for the most common pain points. Start with a **fast reset**, then dig into platform-specific sections.

---

## 0) Fast Reset (fixes 60% of woes)

\`\`\`bash
ns clean
rm -rf node_modules platforms
npm i
ns run ios   # or: ns run android
\`\`\`

Also try:

\`\`\`bash
ns doctor         # checks your environment
ns info           # versions overview
\`\`\`

---

## 1) Android Build Fails

### Gradle / AndroidX mismatch
- Ensure a recent 'compileSdkVersion' in \`App_Resources/Android/app.gradle\`.
- Align plugin androidX versions by updating packages and rebuilding from clean.

\`\`\`gradle
android {
  compileSdkVersion 34
  defaultConfig { targetSdkVersion 34 }
}
\`\`\`

### Dex/Multidex errors (e.g., *com.android.dex.DexArchiveMergerException*)
Enable multidex:

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
- Update all NS plugins that pull Google libs.
- If a transitive forces an older lib, exclude/align in \`app.gradle\`.

\`\`\`gradle
dependencies {
  implementation ("com.google.firebase:firebase-messaging:23.4.1") {
    // example of forcing a version
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
rm -rf ios/Pods ios/Podfile.lock ios/.symlinks  # if you keep ios/ folder
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
- Open \`platforms/ios/*.xcworkspace\` in Xcode → *Signing & Capabilities* → pick team and profiles.
- If archiving fails, try *Product → Clean Build Folder*, then Archive again.

---

## 3) App Crashes on Launch

- Check device logs:
  - **Android:** \`ns debug android --log trace\` or \`adb logcat\`
  - **iOS:** Xcode **Devices & Simulators** or \`ns debug ios --log trace\`
- Look for missing permissions/usage strings.
  - iOS needs **Info.plist** usage keys (camera, location, etc.).
- Verify plugin init code isn’t running before the app has a root view.

---

## 4) LiveSync / HMR Not Updating

- Kill the process and restart with \`ns run <platform>\`.
- Delete \`platforms\` and \`node_modules\` (Fast Reset).
- Make sure only **one** device/emulator is attached (or specify with \`--device\`).

---

## 5) Device / Emulator Not Detected

\`\`\`bash
ns device android --available
ns device ios --available
\`\`\`

- **Android:** accept RSA debug prompt; enable *USB debugging*; install vendor USB drivers (Windows).
- **iOS:** trust the computer; ensure you have a valid signing team in Xcode; unlock the device.

---

## 6) Plugins Misbehaving

- After adding/removing a plugin, always: \`ns clean && ns run <platform>\`.
- Verify required permissions/Info.plist strings (many plugins need them).
- Wrap plugin calls in an **Angular service** to centralize errors and make testing/mocking easy.

---

## 7) Versioning / Store Upload Errors

- **Android:** bump \`versionCode\` (integer) and \`versionName\` in \`app.gradle\`.
- **iOS:** bump \`CFBundleVersion\` (build number) and \`CFBundleShortVersionString\` in Info.plist.
- Play Console rejects APK? Prefer **AAB** for store uploads.

---

## 8) Networking / SSL Issues

- Simulators may block self-signed certs. Add ATS exceptions (iOS) only for development.
- Confirm device can reach your dev server (same LAN; firewall off).

---

## 9) Logging & Tracing

Turn on verbose logs to pinpoint native failures:

\`\`\`bash
ns debug android --log trace
ns debug ios --log trace
\`\`\`

Add lightweight timings:

\`\`\`ts
console.time('load'); /* ... */ console.timeEnd('load');
\`\`\`

---

## 10) When in Doubt — Clean Matrix

If all else fails:

\`\`\`bash
ns clean
rm -rf node_modules package-lock.json platforms
npm i
gradle --stop || true && rm -rf ~/.gradle/caches
pod repo update || true
ns run ios   # or android
\`\`\`

---

### Quick Checklist

- [ ] \`ns doctor\` passes
- [ ] Cleaned \`platforms\`, \`node_modules\`, Gradle/Pods caches
- [ ] Correct permissions / Info.plist usage strings
- [ ] Android compile/target SDK aligned
- [ ] iOS signing set in Xcode
- [ ] Reproduced on a **real device** and captured logs
`;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }

}
