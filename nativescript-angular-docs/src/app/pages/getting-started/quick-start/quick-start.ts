import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-quick-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-start.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickStartComponent implements OnInit {
  htmlContent = '';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const md = `
# Quick Start

Spin up a NativeScript + Angular app in minutes.

---

## 1) Install CLI

\`\`\`bash
npm i -g @nativescript/cli
ns --version
\`\`\`

> If anything looks off later, run \`ns doctor\`.

---

## 2) Create a project

\`\`\`bash
ns create my-app --ng
cd my-app
\`\`\`

Project essentials:
- \`src/app\` — your Angular code
- \`App_Resources\` — iOS/Android assets
- \`nativescript.config.ts\` — app id, Android/iOS settings

---

## 3) Run on device or emulator

**iOS (macOS):**
\`\`\`bash
ns run ios
\`\`\`

**Android:**
\`\`\`bash
ns run android
\`\`\`

Hot reload is on by default—edit and save to see changes.

---

## 4) Make a simple screen

Create a component (inline example):

\`\`\`ts
// src/app/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'ns-home',
  standalone: true,
  template: \`
    <ActionBar title="Quick Start"></ActionBar>
    <StackLayout class="page">
      <Label text="Welcome 👋" class="h1 text-center"></Label>
      <Button text="Tap me" (tap)="count++"></Button>
      <Label [text]="'Taps: ' + count" class="h2 text-center"></Label>
    </StackLayout>
  \`
})
export class HomeComponent {
  count = 0;
}
\`\`\`

Wire up routing:

\`\`\`ts
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { provideNativeScriptRouter } from '@nativescript/angular';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }
];

// main.ts (or app.config.ts) should call provideNativeScriptRouter(routes)
\`\`\`

Root template:

\`\`\`html
<!-- src/app/app.component.html -->
<page-router-outlet></page-router-outlet>
\`\`\`

---

## 5) Use a NativeScript plugin (example: Geolocation)

\`\`\`bash
ns plugin add @nativescript/geolocation
\`\`\`

\`\`\`ts
// src/app/geo.service.ts
import { Injectable } from '@angular/core';
import { isEnabled, enableLocationRequest, getCurrentLocation } from '@nativescript/geolocation';

@Injectable({ providedIn: 'root' })
export class GeoService {
  async current() {
    if (!(await isEnabled())) {
      await enableLocationRequest(true);
    }
    return getCurrentLocation({ desiredAccuracy: 3, timeout: 8000 });
  }
}
\`\`\`

Use it in \`HomeComponent\`:

\`\`\`ts
// ...
constructor(private geo: GeoService) {}
async ngOnInit() {
  const pos = await this.geo.current();
  console.log('Lat/Lng:', pos?.latitude, pos?.longitude);
}
\`\`\`

---

## 6) Debugging & common commands

\`\`\`bash
# Health check
ns doctor

# Clean platforms / builds
ns clean

# Specific device
ns run android --device <id>
ns run ios --device <id>

# Build only
ns build android
ns build ios
\`\`\`

---

## 7) Next steps

- **[Environment Setup](/getting-started/environment-setup)**
- Explore **UI components**, **navigation**, and **plugins**
- Add CI/CD and release builds when you're ready
`;
    this.htmlContent = await marked.parse(md);
    this.cdr.markForCheck();
  }
}
