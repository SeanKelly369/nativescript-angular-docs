import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-native-apis',
  imports: [],
  templateUrl: './native-apis.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NativeApis implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitiser: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
  const markdownContent = `# Native APIs in NativeScript-Angular

NativeScript gives you direct access to iOS and Android APIs from TypeScript.

That means you can call native APIs when you need them, without waiting for a plugin. In Angular apps, the cleanest approach is usually to wrap native code inside services so your components stay simple, testable, and cross-platform.

---

## When Should You Use Native APIs?

Use native APIs when:

- A plugin does not exist for what you need.
- You need a small platform-specific feature.
- You are integrating with an Android or iOS SDK.
- You need access to platform behaviour that NativeScript does not abstract.

Prefer a plugin when:

- Permissions are involved.
- The feature has lots of lifecycle edge cases.
- You need the same behaviour on both Android and iOS.
- The API is complex, such as camera, geolocation, maps, barcode scanning, authentication, or payments.

> Rule of thumb: use native APIs for small focused tasks; use plugins for full features.

---

## Platform Detection

Use platform guards before touching Android-only or iOS-only APIs.

\`\`\`ts
import { isAndroid, isIOS } from '@nativescript/core';

if (isAndroid) {
  // Android-only code
}

if (isIOS) {
  // iOS-only code
}
\`\`\`

This matters because Android globals such as \\\`android\\\` do not exist on iOS, and iOS globals such as \\\`UIKit\\\` classes do not exist on Android.

---

## Getting Native Platform Objects

Many native APIs need an Android \\\`Activity\\\`, Android \\\`Context\\\`, or iOS root view controller.

\`\`\`ts
import { Application, Utils } from '@nativescript/core';

// Android Activity
const activity =
  Application.android.foregroundActivity ||
  Application.android.startActivity;

// Android Context
const context = Utils.android.getApplicationContext();

// iOS Root View Controller
const rootViewController = Utils.ios.getRootViewController();
\`\`\`

Keep this kind of setup close to the native code that needs it. Avoid scattering \\\`Activity\\\`, \\\`Context\\\`, or view controller logic across many components.

---

## A Better Angular Pattern

Instead of calling native APIs directly from a component, wrap them in a service.

\`\`\`ts
import { Injectable } from '@angular/core';
import { Application, isAndroid, isIOS, Utils } from '@nativescript/core';

@Injectable({ providedIn: 'root' })
export class NativeAlertService {
  show(message: string): void {
    if (isAndroid) {
      const context = Utils.android.getApplicationContext();

      android.widget.Toast
        .makeText(context, message, android.widget.Toast.LENGTH_SHORT)
        .show();

      return;
    }

    if (isIOS) {
      const alert = UIAlertController.alertControllerWithTitleMessagePreferredStyle(
        'Native iOS',
        message,
        UIAlertControllerStyle.Alert
      );

      const okAction = UIAlertAction.actionWithTitleStyleHandler(
        'OK',
        UIAlertActionStyle.Default,
        null
      );

      alert.addAction(okAction);

      const rootViewController = Utils.ios.getRootViewController();
      rootViewController.presentViewControllerAnimatedCompletion(alert, true, null);
    }
  }
}
\`\`\`

Then your component can stay clean:

\`\`\`ts
constructor(private readonly nativeAlert: NativeAlertService) {}

showAlert(): void {
  this.nativeAlert.show('Hello from native APIs');
}
\`\`\`

This keeps platform-specific logic in one place and makes the component easier to test.

---

## Quick Android Example: Toast

\`\`\`ts
import { isAndroid, Utils } from '@nativescript/core';

if (isAndroid) {
  android.widget.Toast
    .makeText(
      Utils.android.getApplicationContext(),
      'Hello from Android Toast',
      android.widget.Toast.LENGTH_SHORT
    )
    .show();
}
\`\`\`

A Toast is a good example of a small native API call. It is simple, platform-specific, and does not need a full plugin.

---

## Quick iOS Example: UIAlertController

\`\`\`ts
import { isIOS, Utils } from '@nativescript/core';

if (isIOS) {
  const alert = UIAlertController.alertControllerWithTitleMessagePreferredStyle(
    'Native iOS',
    'Hello from UIAlertController',
    UIAlertControllerStyle.Alert
  );

  const okAction = UIAlertAction.actionWithTitleStyleHandler(
    'OK',
    UIAlertActionStyle.Default,
    null
  );

  alert.addAction(okAction);

  const rootViewController = Utils.ios.getRootViewController();
  rootViewController.presentViewControllerAnimatedCompletion(alert, true, null);
}
\`\`\`

For ordinary app dialogs, NativeScript's own dialog APIs are usually simpler. Use native dialogs when you specifically need platform-level behaviour.

---

## Opening URLs

For most cases, use NativeScript's cross-platform helper:

\`\`\`ts
import { Utils } from '@nativescript/core';

const opened = Utils.openUrl('https://nativescript.org');

if (!opened) {
  console.log('The URL could not be opened.');
}
\`\`\`

Use direct Android intents or iOS URL APIs only when you need more control.

---

## Android Intent Example

\`\`\`ts
import { Application, isAndroid } from '@nativescript/core';

if (isAndroid) {
  const activity =
    Application.android.foregroundActivity ||
    Application.android.startActivity;

  const intent = new android.content.Intent(android.content.Intent.ACTION_SEND);

  intent.setType('text/plain');
  intent.putExtra(android.content.Intent.EXTRA_TEXT, 'Shared from NativeScript');

  const chooser = android.content.Intent.createChooser(intent, 'Share with');
  activity.startActivity(chooser);
}
\`\`\`

Android intents are useful for sharing content, opening other apps, launching system screens, or calling into Android platform features.

---

## Android Runtime Permissions

Some Android APIs require runtime permissions. Always check before requesting.

\`\`\`ts
import { Application, isAndroid } from '@nativescript/core';

if (isAndroid) {
  const cameraPermission = android.Manifest.permission.CAMERA;

  const activity =
    Application.android.foregroundActivity ||
    Application.android.startActivity;

  const hasPermission =
    androidx.core.content.ContextCompat.checkSelfPermission(activity, cameraPermission) ===
    android.content.pm.PackageManager.PERMISSION_GRANTED;

  if (!hasPermission) {
    androidx.core.app.ActivityCompat.requestPermissions(
      activity,
      [cameraPermission],
      1001
    );
  }
}
\`\`\`

For real camera, location, media, contacts, Bluetooth, or notification features, prefer a maintained plugin. Permissions are easy to request but harder to handle correctly across Android versions.

---

## Extending Native Classes

Sometimes native APIs expect a delegate, listener, callback, or subclass.

When extending native classes in TypeScript, use \\\`@NativeClass()\\\`.

---

### iOS Delegate Example

\`\`\`ts
@NativeClass()
export class MyPresentationDelegate
  extends NSObject
  implements UIAdaptivePresentationControllerDelegate {

  static ObjCProtocols = [UIAdaptivePresentationControllerDelegate];

  presentationControllerDidDismiss(controller: UIPresentationController): void {
    console.log('iOS presentation dismissed');
  }
}
\`\`\`

The \\\`ObjCProtocols\\\` array tells NativeScript which Objective-C protocols this class conforms to.

---

### Android Listener Example

\`\`\`ts
@NativeClass()
export class MyClickListener
  extends java.lang.Object
  implements android.view.View.OnClickListener {

  onClick(view: android.view.View): void {
    console.log('Clicked native view id:', view.getId());
  }
}
\`\`\`

Usage:

\`\`\`ts
const button = new android.widget.Button(activity);
button.setText('Native Android Button');
button.setOnClickListener(new MyClickListener());
\`\`\`

Use this pattern when a native API expects an interface implementation, listener, delegate, or subclass.

---

## Typings

NativeScript provides TypeScript typings for many native APIs, including common Android and iOS frameworks.

When TypeScript cannot find a native API, you have a few options:

1. Check that the correct platform typings are installed.
2. Generate typings for custom native code.
3. Use a narrow \\\`declare const\\\` fallback only when needed.

Example fallback:

\`\`\`ts
declare const com: any;
\`\`\`

Avoid declaring everything as \\\`any\\\` too early. You lose autocomplete, type safety, and useful compiler errors.

---

## Running Code on the Main Thread

UI work must run on the main thread.

\`\`\`ts
import { Utils } from '@nativescript/core';

Utils.executeOnMainThread(() => {
  // Safe place for native UI updates
});
\`\`\`

For heavy work, use Web Workers or move the work away from the UI path.

---

## Keep Native Code Isolated

A good folder structure is:

\`\`\`txt
src/
└── app/
    └── services/
        └── native/
            ├── native-alert.service.ts
            ├── native-share.service.ts
            └── native-permissions.service.ts
\`\`\`

This keeps your Angular components focused on UI and application flow, while native services handle platform-specific behaviour.

---

## Common Mistakes

| Mistake | Better Approach |
| --- | --- |
| Calling Android APIs without \\\`isAndroid\\\` | Guard Android code |
| Calling iOS APIs without \\\`isIOS\\\` | Guard iOS code |
| Putting native code directly in large components | Move it into services |
| Using \\\`any\\\` everywhere | Use generated typings where possible |
| Handling complex permissions manually | Prefer a maintained plugin |
| Updating UI from background work | Use the main thread |

---

## Checklist

- [ ] Guard platform code with \\\`isAndroid\\\` or \\\`isIOS\\\`.
- [ ] Keep native API calls inside focused services.
- [ ] Use Android \\\`Activity\\\` or \\\`Context\\\` only where needed.
- [ ] Use the iOS root view controller only where needed.
- [ ] Prefer \\\`Utils.openUrl()\\\` for simple URL opening.
- [ ] Request Android runtime permissions before protected API calls.
- [ ] Use \\\`@NativeClass()\\\` when extending native classes.
- [ ] Keep UI updates on the main thread.
- [ ] Prefer plugins for complex cross-platform features.
`;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
