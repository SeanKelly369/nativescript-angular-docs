import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-environment-setup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './environment-setup.html',
  styleUrl: './environment-setup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnvironmentSetupComponent implements OnInit {
  htmlContent = '';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const md = `
# Environment Setup

Get your machine ready to build NativeScript + Angular apps for **iOS** and **Android**.

---

## 1) Core tools (all platforms)

- **Node.js (LTS)**
  Verify: \`node -v\` and \`npm -v\`
- **NativeScript CLI**
  \`npm i -g @nativescript/cli\` → \`ns --version\`
- **Git** (recommended)

Run a quick health check anytime:
\`ns doctor\`

---

## 2) iOS setup (macOS only)

1. **Install Xcode** (from the App Store) and open it once.
2. **Command Line Tools**
   \`xcode-select --install\`
3. **Accept licenses** (if prompted)
   \`sudo xcodebuild -license accept\`
4. **CocoaPods**
   - via RubyGems: \`sudo gem install cocoapods\`
   - or via Homebrew: \`brew install cocoapods\`
   Verify: \`pod --version\`
5. (Apple Silicon) If a pod requires it:
   \`/usr/sbin/softwareupdate --install-rosetta --agree-to-license\`

**Verify iOS toolchain**
\`\`\`bash
xcodebuild -version
pod --version
ns doctor ios
\`\`\`

Launch a simulator from Xcode or just run:
\`\`\`bash
ns run ios
\`\`\`

---

## 3) Android setup (macOS / Windows / Linux)

### a) Install JDK 17
Use Temurin/OpenJDK **17** (recommended).

- **macOS (Homebrew)**
  \`brew install --cask temurin17\`
- **Windows**
  Download Temurin 17 (MSI) or use winget:
  \`winget install EclipseAdoptium.Temurin.17.JDK\`
- **Linux**
  \`sudo apt-get install temurin-17-jdk\` *(or your distro’s package)*

Verify: \`java -version\`

### b) Install Android Studio + SDK
1. Install **Android Studio**.
2. Open **SDK Manager** → install:
   - **Android SDK Platform** (e.g. 34 or 35)
   - **Android SDK Build-Tools** (matching)
   - **Android Platform Tools** (adb)
3. (Optional) Create an **AVD** in Device Manager.

### c) Environment variables

> Either \`ANDROID_HOME\` **or** \`ANDROID_SDK_ROOT\` works. Point them to your SDK.

**macOS/Linux (zsh/bash)**
\`\`\`bash
# Adjust the path if your SDK lives elsewhere
export ANDROID_HOME="$HOME/Library/Android/sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$PATH"

# Optional Gradle memory (recommended)
mkdir -p ~/.gradle && printf 'org.gradle.jvmargs=-Xmx4096m\n' >> ~/.gradle/gradle.properties
\`\`\`

**Windows (PowerShell, per-user)**
\`\`\`powershell
# SDK default path:
#   %USERPROFILE%\AppData\Local\Android\Sdk

[Environment]::SetEnvironmentVariable('ANDROID_HOME', "$env:USERPROFILE\AppData\Local\Android\Sdk", 'User')
[Environment]::SetEnvironmentVariable('ANDROID_SDK_ROOT', "$env:USERPROFILE\AppData\Local\Android\Sdk", 'User')

# Append platform-tools to PATH
$old = [Environment]::GetEnvironmentVariable('Path','User')
$new = "$old;$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools"
[Environment]::SetEnvironmentVariable('Path', $new, 'User')
\`\`\`

Restart your terminal after setting env vars.

### d) Accept SDK licenses
\`\`\`bash
yes | sdkmanager --licenses
\`\`\`
*(Run from the SDK's \`cmdline-tools\` if needed.)*

**Verify Android toolchain**
\`\`\`bash
adb --version
java -version
ns doctor android
\`\`\`

---

## 4) First run (sanity check)

From your app folder:
\`\`\`bash
# iOS (macOS)
ns run ios

# Android
ns run android
\`\`\`

If a device is connected via USB, enable **USB debugging** (Android) or trust the device (iOS).
List Android devices: \`adb devices\`.

---

## 5) Common issues & fixes

- **SDK not found / wrong PATH**
  Re-check \`ANDROID_HOME\` / \`ANDROID_SDK_ROOT\` and PATH entries.
- **Multiple Javas found**
  Ensure JDK **17** is first on PATH; remove older JDKs from PATH.
- **Pods failing (iOS)**
  \`cd platforms/ios && pod repo update && pod install\`
  If a dependency is Intel-only, install Rosetta on Apple Silicon.
- **Gradle out-of-memory**
  Add \`org.gradle.jvmargs=-Xmx4096m\` to \`~/.gradle/gradle.properties\`.
- **Permission / gatekeeper blocks**
  macOS: System Settings → Privacy & Security → allow tools as needed.

---

## Next

- **[Quick Start](/getting-started/quick-start)**
- Explore UI components, navigation, and plugins
`;
    this.htmlContent = await marked.parse(md);
    this.cdr.markForCheck();
  }
}
