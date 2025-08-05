# Project Structure

Understanding the structure of a NativeScript-Angular project.

## Overview

A typical NativeScript-Angular project follows Angular conventions while adding mobile-specific configurations and directories.

```
my-app/
├── src/
│   └── app/
│       ├── app.component.ts
│       ├── app.component.html
│       ├── app.component.css
│       ├── app.module.ts
│       ├── app-routing.module.ts
│       └── main.ts
├── App_Resources/
│   ├── Android/
│   └── iOS/
├── platforms/
├── node_modules/
├── nativescript.config.ts
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Core Directories

### `/src/app/`
Contains your Angular application code:

- **`app.component.ts`** - Root component
- **`app.component.html`** - Root component template
- **`app.component.css`** - Root component styles
- **`app.module.ts`** - Root NgModule
- **`app-routing.module.ts`** - Routing configuration
- **`main.ts`** - Application bootstrap

### `/App_Resources/`
Platform-specific resources:

#### `/App_Resources/Android/`
- **`src/main/AndroidManifest.xml`** - Android manifest
- **`src/main/res/`** - Android resources (icons, splash screens)
- **`src/main/assets/`** - Android assets

#### `/App_Resources/iOS/`
- **`Info.plist`** - iOS app configuration
- **`build.xcconfig`** - Build configuration
- **`Assets.xcassets/`** - iOS assets (icons, launch images)

### `/platforms/`
Generated platform-specific code (auto-generated, don't edit)

## Configuration Files

### `nativescript.config.ts`
Main NativeScript configuration:

```typescript
import { NativeScriptConfig } from '@nativescript/cli';

export default {
  id: 'org.nativescript.myapp',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  ios: {
    discardUncaughtJsExceptions: true
  }
} as NativeScriptConfig;
```

### `package.json`
Dependencies and scripts:

```json
{
  "nativescript": {
    "id": "org.nativescript.myapp",
    "templateVersion": "8.0.0"
  },
  "dependencies": {
    "@angular/core": "~15.0.0",
    "@nativescript/angular": "~15.0.0",
    "@nativescript/core": "~8.4.0"
  }
}
```

### `tsconfig.json`
TypeScript configuration with NativeScript-specific settings:

```json
{
  "extends": "@nativescript/typescript-config-ng",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

## Angular-Specific Structure

### Components
Organize components in feature directories:

```
src/app/
├── home/
│   ├── home.component.ts
│   ├── home.component.html
│   └── home.component.css
├── shared/
│   ├── components/
│   └── services/
└── core/
    ├── models/
    └── services/
```

### Routing
Use Angular Router with NativeScript-specific outlets:

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
];
```

### Services
Angular services work the same way:

```typescript
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Service implementation
}
```

## Mobile-Specific Considerations

### Page Components
Use `Page` for top-level navigation:

```html
<Page>
  <ActionBar title="My App"></ActionBar>
  <StackLayout>
    <!-- Content -->
  </StackLayout>
</Page>
```

### Navigation
Use `RouterExtensions` for mobile navigation:

```typescript
import { RouterExtensions } from '@nativescript/angular';

constructor(private router: RouterExtensions) {}

navigateToDetail() {
  this.router.navigate(['/detail']);
}
```

### Platform-Specific Code
Organize platform-specific code:

```
src/app/
├── services/
│   ├── data.service.ts
│   ├── data.service.android.ts
│   └── data.service.ios.ts
```

## Assets and Resources

### Images
Place images in the appropriate directories:

```
src/assets/
├── images/
│   ├── logo.png
│   └── background.jpg
```

### Fonts
Add custom fonts:

```
src/assets/
├── fonts/
│   ├── custom-font.ttf
│   └── custom-font-bold.ttf
```

Register fonts in CSS:
```css
.custom-font {
  font-family: "CustomFont", "system";
}
```

## Best Practices

### Directory Organization
- Group related components in feature modules
- Use shared modules for reusable components
- Keep services in a core module
- Separate platform-specific code

### File Naming
- Use Angular naming conventions
- Add `.android.ts` or `.ios.ts` for platform-specific files
- Use kebab-case for file names

### Module Structure
```typescript
@NgModule({
  imports: [
    NativeScriptCommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
```

## Next Steps

- [Components Guide](/guide/components) - Learn about NativeScript UI components
- [Navigation](/guide/navigation) - Understand mobile navigation patterns
- [Styling](/guide/styling) - Style your NativeScript-Angular app