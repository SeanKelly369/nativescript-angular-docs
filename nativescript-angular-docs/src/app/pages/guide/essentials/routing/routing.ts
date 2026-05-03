import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-routing',
  imports: [],
  templateUrl: './routing.html',
  styleUrl: './routing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutingComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitiser: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `# Routing in NativeScript-Angular

Mobile routing in NativeScript is powered by Angular Router, with native page navigation on iOS and Android.

---

## 1) Define Routes

\`\`\`ts
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent }
];
\`\`\`

---

## 2) Provide NativeScript Router

\`\`\`ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideNativeScriptRouter } from '@nativescript/angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideNativeScriptRouter(routes)]
};
\`\`\`

---

## 3) Add \`page-router-outlet\`

\`\`\`html
<!-- app.html -->
<page-router-outlet></page-router-outlet>
\`\`\`

This outlet manages a native back stack and platform transitions.

---

## 4) Navigate Programmatically

\`\`\`ts
import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-home',
  template: '<StackLayout class="page"><Button text="Open Details" (tap)="openDetails()"></Button></StackLayout>'
})
export class HomeComponent {
  constructor(private readonly routerExtensions: RouterExtensions) {}

  openDetails(): void {
    this.routerExtensions.navigate(['/details', 42], {
      transition: { name: 'slideLeft', duration: 250 }
    });
  }
}
\`\`\`

---

## 5) Back Navigation

\`\`\`ts
if (this.routerExtensions.canGoBack()) {
  this.routerExtensions.back();
}
\`\`\`

Use \`clearHistory: true\` for auth flows when users should not return to previous screens.

---

## 6) Lazy Loading

\`\`\`ts
export const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes').then(m => m.SETTINGS_ROUTES)
  }
];
\`\`\`

Lazy loading keeps startup fast by loading route bundles on demand.

---

## 7) Common Pitfalls

- Keep route paths stable and avoid duplicate empty routes.
- Use params/query params for navigation state, not global mutable objects.
- Prefer \`RouterExtensions\` for native-style transitions and back-stack control.
`;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
