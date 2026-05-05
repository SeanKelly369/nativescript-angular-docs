import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core";
import { marked } from "marked";

const PREREQUISITES_MD = `
# Prerequisites

Make sure your machine has the tools below before starting.

NativeScript uses native Android and iOS tooling, so your setup depends on which platform you want to build for.

---

## Platform support

| Development machine | Android | iOS |
|---|---:|---:|
| Windows | Yes | No |
| macOS | Yes | Yes |
| Linux | Yes | No |

> iOS local builds require macOS and Xcode. For simple testing, NativeScript Preview may be enough, but real iOS development needs a Mac.

---

## Version compatibility

Before installing anything, check the NativeScript version your project uses.

- NativeScript, Node.js, Java, Gradle, Android SDK, and Xcode versions need to work together.
- Newer is not always safer.
- If you are working on an existing project, match the project requirements first.
- If you are starting fresh, use the currently supported NativeScript setup.

Useful checks:

\`\`\`bash
node -v
npm -v
ns --version
\`\`\`

> NativeScript 9 and newer require Node.js 22 or higher.

---

## Core tools

- **Node.js**
  - Use the Node version supported by your NativeScript version.
  - Use \`nvm\`, \`fnm\`, or another version manager if you switch between projects.
  - Verify: \`node -v\` and \`npm -v\`

- **NativeScript CLI**
  - Install: \`npm install -g nativescript\`
  - Verify: \`ns --version\`

- **Git**
  - Optional, but strongly recommended.
  - Verify: \`git --version\`

---

## Package manager sanity

Most NativeScript projects use npm, but some teams use yarn or pnpm.

Before installing dependencies:

- Check whether the project has \`package-lock.json\`, \`yarn.lock\`, or \`pnpm-lock.yaml\`.
- Use the same package manager as the project.
- Avoid deleting lock files unless you know why you are doing it.
- Avoid mixing npm, yarn, and pnpm in the same project.

For a clean npm install:

\`\`\`bash
rm -rf node_modules
npm install
\`\`\`

---

## iOS macOS only

- **macOS**
  - Use a recent macOS version supported by your Xcode version.

- **Xcode**
  - Install from the App Store.
  - Open Xcode once after installation.
  - Accept any licence prompts.
  - Let Xcode install additional components if prompted.

- **Xcode Command Line Tools**
  - Verify:

\`\`\`bash
xcode-select -p
xcodebuild -version
\`\`\`

- **CocoaPods**
  - Install with Ruby gems or Homebrew:

\`\`\`bash
sudo gem install cocoapods
# or
brew install cocoapods
\`\`\`

  - Verify:

\`\`\`bash
pod --version
\`\`\`

Run:

\`\`\`bash
ns doctor ios
\`\`\`

---

## Android

- **Java JDK**
  - Use the JDK version supported by your NativeScript and Gradle version.
  - Verify:

\`\`\`bash
java -version
javac -version
\`\`\`

- **Android Studio**
  - Useful for installing and managing Android SDKs, platform tools, build tools, and emulators.

- **Android SDK**
  - Install the SDK platform required by your project.
  - Install Android SDK Build-Tools.
  - Install Android SDK Platform-Tools.

- **Environment variables**
  - \`ANDROID_HOME\` should point to your Android SDK path.
  - Add \`$ANDROID_HOME/platform-tools\` to your PATH.

Verify:

\`\`\`bash
adb --version
\`\`\`

Run:

\`\`\`bash
ns doctor android
\`\`\`

---

## Devices and emulators

NativeScript can run on real devices and emulators/simulators.

Useful checks:

\`\`\`bash
ns devices
adb devices
\`\`\`

For iOS simulators:

\`\`\`bash
xcrun simctl list devices
\`\`\`

For Android:

- Make sure an emulator is created in Android Studio.
- Make sure the emulator starts successfully.
- On a real Android device, enable Developer Options and USB debugging.

For iOS:

- Use Xcode to confirm simulators are installed.
- For real devices, make sure signing and provisioning are configured.

---

## Useful global checks

\`\`\`bash
# NativeScript CLI
ns --version
ns doctor
ns devices

# Node/npm
node -v
npm -v

# iOS macOS only
xcodebuild -version
xcode-select -p
pod --version

# Android
java -version
javac -version
adb --version
\`\`\`

---

## Common setup problems

- Not enough disk space.
- Node version is too old or too new for the project.
- Multiple Java versions fighting each other.
- \`JAVA_HOME\` points to the wrong JDK.
- \`ANDROID_HOME\` points to the wrong Android SDK path.
- Android SDK Platform-Tools missing.
- Android SDK Build-Tools missing.
- Xcode installed but never opened.
- Xcode licence not accepted.
- CocoaPods not installed or using the wrong Ruby environment.
- Proxy or VPN causing dependency download failures.
- Mixing npm, yarn, and pnpm.
- Lock file changed unexpectedly after install.

---

## Before continuing

You should be able to run:

\`\`\`bash
ns doctor
\`\`\`

If \`ns doctor\` reports issues, fix them before creating or running a project.

---

## Next

- **[Quick Start](/getting-started/quick-start)**
- **[Environment Setup](/getting-started/environment-setup)**
`;

@Component({
  selector: 'app-prerequisites',
  standalone: true,
  templateUrl: './prerequisites.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrerequisitesComponent implements OnInit {
  readonly htmlContent = signal('');

  async ngOnInit(): Promise<void> {
    this.htmlContent.set(await marked.parse(PREREQUISITES_MD));
  }
}