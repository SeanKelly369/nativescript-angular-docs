import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-prerequisites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prerequisites.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrerequisitesComponent implements OnInit {
  htmlContent = '';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const md = `
# Prerequisites

Make sure your machine has the tools below before starting.

---

## Core

- **Node.js** (LTS recommended)
  - Verify: \`node -v\` and \`npm -v\`
- **NativeScript CLI**
  - Install: \`npm i -g @nativescript/cli\`
  - Verify: \`ns --version\`
- **Git** (optional but recommended)

---

## iOS (macOS only)

- **macOS** (latest 2–3 releases preferred)
- **Xcode** (App Store) + Command Line Tools
  - Verify: \`xcode-select -p\`, open Xcode once
- **CocoaPods**
  - Install: \`sudo gem install cocoapods\` (or \`brew install cocoapods\`)
  - Verify: \`pod --version\`

> Run: \`ns doctor ios\`

---

## Android

- **Java JDK** (Temurin/OpenJDK 17 recommended)
  - Verify: \`java -version\`
- **Android Studio** with SDK + Platform Tools
  - Ensure SDK Platform for your target (e.g. 34/35) and **Android SDK Build-Tools** installed
- **Environment variables**
  - \`ANDROID_HOME\` → SDK path
  - Add \`$ANDROID_HOME/platform-tools\` to PATH

> Run: \`ns doctor android\`

---

## Global checks

- **Disk space** (builds use a lot): keep \`~5–10 GB+\` free
- **PATH sanity**: no duplicate Java/Android entries
- **Proxy/VPN** off if you see dependency timeouts

---

## Quick verify

\`\`\`bash
# NS CLI
ns --version

# iOS (macOS)
xcodebuild -version
pod --version

# Android
java -version
adb --version
\`\`\`

If \`ns doctor\` reports issues, fix them before proceeding.

---

## Next

- **[Quick Start](/getting-started/quick-start)**
- **[Environment Setup](/getting-started/environment-setup)**
`;
    this.htmlContent = await marked.parse(md);
    this.cdr.markForCheck();
  }
}
