import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { marked } from 'marked';

const QUICK_START_MD = `
# Quick Start

Create and run a NativeScript + Angular app in a few minutes.

This guide assumes your machine already has the required tools installed. If not, start with **Prerequisites** and **Environment Setup** first.

---

## 1) Check your setup

Before creating a project, run:

\`\`\`bash
ns doctor
\`\`\`

If you only want to check the CLI version:

\`\`\`bash
ns --version
\`\`\`

If \`ns doctor\` reports problems, fix those before continuing.

---

## 2) Create a NativeScript Angular app

Create a new Angular-based NativeScript project:

\`\`\`bash
ns create my-app --ng
cd my-app
\`\`\`

The CLI creates the app folder, adds the starter project files, and installs the required dependencies.

---

## 3) Run the app

Run on Android:

\`\`\`bash
ns run android
\`\`\`

Run on iOS:

\`\`\`bash
ns run ios
\`\`\`

> iOS local builds require macOS and Xcode.

NativeScript watches your files while the app is running. When you edit and save, the CLI synchronizes changes to the selected device or emulator.

---

## 4) Know the important files

A new project contains several important files and folders:

\`\`\`text
my-app/
├── src/
│   ├── app/
│   ├── assets/
│   ├── app.css
│   └── main.ts
├── App_Resources/
│   ├── Android/
│   └── iOS/
├── nativescript.config.ts
├── package.json
└── tsconfig.json
\`\`\`

Key areas:

- \`src/app\` — Angular components, routes, and app logic.
- \`src/assets\` — images and other app assets.
- \`src/app.css\` — global app styles.
- \`App_Resources\` — native Android and iOS resources.
- \`nativescript.config.ts\` — app id, app name, runtime options, and platform configuration.
- \`package.json\` — dependencies, scripts, and project metadata.

---

## 5) Edit the first screen

NativeScript Angular uses Angular components, but the template uses native mobile UI elements instead of browser HTML.

Example component:

\`\`\`ts
// src/app/home.component.ts
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

@Component({
  selector: 'ns-home',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: \`
    <ActionBar title="Quick Start"></ActionBar>

    <GridLayout rows="auto, auto, auto" class="page" padding="24">
      <Label
        row="0"
        text="Welcome 👋"
        fontSize="28"
        fontWeight="700"
        textAlignment="center">
      </Label>

      <Button
        row="1"
        text="Tap me"
        marginTop="24"
        (tap)="increment()">
      </Button>

      <Label
        row="2"
        [text]="'Taps: ' + count"
        marginTop="16"
        fontSize="20"
        textAlignment="center">
      </Label>
    </GridLayout>
  \`
})
export class HomeComponent {
  count = 0;

  increment(): void {
    this.count++;
  }
}
\`\`\`

A few things to notice:

- \`ActionBar\`, \`GridLayout\`, \`Label\`, and \`Button\` are native UI components.
- The \`tap\` event is the NativeScript equivalent of a mobile tap gesture.
- Angular binding syntax still works: \`[text]\`, \`(tap)\`, interpolation, services, routing, and dependency injection.

---

## 6) Add a route

Create or update your routes file:

\`\`\`ts
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];
\`\`\`

Your app shell should contain a NativeScript router outlet:

\`\`\`html
<!-- src/app/app.component.html -->
<page-router-outlet></page-router-outlet>
\`\`\`

NativeScript Angular uses \`page-router-outlet\` for mobile-style page navigation.

---

## 7) Run on a specific device

List connected devices:

\`\`\`bash
ns devices
\`\`\`

Run on a specific Android device or emulator:

\`\`\`bash
ns run android --device <device-id>
\`\`\`

Run on a specific iOS device or simulator:

\`\`\`bash
ns run ios --device <device-id>
\`\`\`

---

## 8) Useful commands

\`\`\`bash
# Check NativeScript environment
ns doctor

# List devices
ns devices

# Run the app
ns run android
ns run ios

# Build without launching
ns build android
ns build ios

# Clean generated native/build output
ns clean
\`\`\`

---

## 9) Common first-run issues

- Android emulator is not running.
- Android device is connected but USB debugging is not enabled.
- iOS simulator is missing or Xcode has not finished installing components.
- \`ns doctor\` reports a missing SDK, JDK, Xcode, or CocoaPods issue.
- Node version does not match the NativeScript version used by the project.
- Android SDK or Java paths are incorrect.
- The app fails after switching branches and needs a clean rebuild.

When in doubt, try:

\`\`\`bash
ns doctor
ns clean
npm install
\`\`\`

Then run the app again.

---

## 10) Next steps

Once the starter app runs successfully, move on to:

- **[Environment Setup](/getting-started/environment-setup)**
- **[Project Structure](/guide/project-structure)**
- **[Navigation](/guide/navigation)**
- **[UI Components](/guide/ui-components)**
- **[Plugins](/guide/plugins)**
`;

@Component({
  selector: 'app-quick-start',
  standalone: true,
  templateUrl: './quick-start.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickStartComponent implements OnInit {
  readonly htmlContent = signal('');

  async ngOnInit(): Promise<void> {
    this.htmlContent.set(await marked.parse(QUICK_START_MD));
  }
}