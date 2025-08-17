import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-native-apis',
  imports: [],
  templateUrl: './native-apis.html',
  styleUrl: './native-apis.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NativeApis implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
  const markdownContent = `
    # Native APIs in NativeScript-Angular

    NativeScript lets you call **any iOS or Android API directly from TypeScript**—no bridges to write, no plugins required (though plugins are great when they exist).

    ---

    ## Platform Detection

    \`\`\`ts
    import { isAndroid, isIOS } from '@nativescript/core';

    if (isAndroid) { /* Android-specific code */ }
    if (isIOS)     { /* iOS-specific   code */ }
    \`\`\`

    ---

    ## Getting Platform Primitives

    \`\`\`ts
    import { Application, Utils } from '@nativescript/core';

    // Android Activity & Context
    const activity = Application.android.foregroundActivity || Application.android.startActivity;
    const ctx = Utils.android.getApplicationContext();

    // iOS Root View Controller
    const rootVC = Utils.ios.getRootViewController();
    \`\`\`

    ---

    ## Quick UI Examples

    ### Android: Toast
    \`\`\`ts
    import { Utils, isAndroid } from '@nativescript/core';

    if (isAndroid) {
      android.widget.Toast
        .makeText(Utils.android.getApplicationContext(), 'Hello from Toast', android.widget.Toast.LENGTH_SHORT)
        .show();
    }
    \`\`\`

    ### iOS: UIAlertController
    \`\`\`ts
    import { Utils, isIOS } from '@nativescript/core';

    if (isIOS) {
      const alert = UIAlertController.alertControllerWithTitleMessagePreferredStyle(
        'Native iOS',
        'Hello from UIAlertController',
        UIAlertControllerStyle.Alert
      );
      const ok = UIAlertAction.actionWithTitleStyleHandler('OK', UIAlertActionStyle.Default, null);
      alert.addAction(ok);

      const vc = Utils.ios.getRootViewController();
      vc.presentViewControllerAnimatedCompletion(alert, true, null);
    }
    \`\`\`

    ---

    ## Intents (Android) & URL Schemes (iOS)

    ### Share Text (Android)
    \`\`\`ts
    const intent = new android.content.Intent(android.content.Intent.ACTION_SEND);
    intent.setType('text/plain');
    intent.putExtra(android.content.Intent.EXTRA_TEXT, 'Shared from NativeScript');
    activity.startActivity(android.content.Intent.createChooser(intent, 'Share with'));
    \`\`\`

    ### Open URL (iOS)
    \`\`\`ts
    const url = NSURL.URLWithString('https://nativescript.org');
    UIApplication.sharedApplication.openURL(url);
    \`\`\`

    ---

    ## Runtime Permissions (Android)

    \`\`\`ts
    import { Application, isAndroid } from '@nativescript/core';

    if (isAndroid) {
      const CAM = android.Manifest.permission.CAMERA;
      const act = Application.android.foregroundActivity || Application.android.startActivity;

      const granted = androidx.core.content.ContextCompat.checkSelfPermission(act, CAM)
                    === android.content.pm.PackageManager.PERMISSION_GRANTED;

      if (!granted) {
        androidx.core.app.ActivityCompat.requestPermissions(act, [CAM], 123);
      }
    }
    \`\`\`

    > Tip: prefer a plugin when available (geolocation, camera, etc.)—it will wrap permissions and edge cases for you.

    ---

    ## Extending Native Classes (Delegates / Listeners)

    When you need callbacks from native APIs, extend native interfaces/classes.
    Use **\`@NativeClass()\`** so the runtime can generate metadata.

    ### iOS Delegate
    \`\`\`ts
    import { NativeClass } from '@nativescript/core';

    @NativeClass()
    export class MyAlertDelegate extends NSObject implements UIAdaptivePresentationControllerDelegate {
      public static ObjCProtocols = [UIAdaptivePresentationControllerDelegate];

      // example optional method
      presentationControllerDidDismiss(_controller: UIPresentationController) {
        console.log('Dismissed!');
      }
    }
    \`\`\`

    ### Android Listener
    \`\`\`ts
    import { NativeClass } from '@nativescript/core';

    @NativeClass()
    export class MyClickListener extends java.lang.Object implements android.view.View.OnClickListener {
      public onClick(v: android.view.View) {
        console.log('Clicked native view id:', v.getId());
      }
    }

    // usage
    const btn = new android.widget.Button(activity);
    btn.setOnClickListener(new MyClickListener());
    \`\`\`

    ---

    ## Typings & Types

    - Many frameworks are **already typed** (AndroidX, UIKit, Foundation, etc.).
    - If TypeScript can’t infer something, fall back to a loose type:

    \`\`\`ts
    declare const android: any;   // rarely needed, but handy for edge APIs
    declare const UIApplication: any;
    \`\`\`

    ---

    ## Threads & UI Safety

    - **UI work must be on the main thread.**
    - Heavy work → Web Workers (see Performance page).

    \`\`\`ts
    import { Utils, isAndroid, isIOS } from '@nativescript/core';

    if (isAndroid) {
      Utils.android.runOnUiThread(() => { /* update Android UI */ });
    }
    if (isIOS) {
      Utils.ios.dispatchToMainThread(() => { /* update iOS UI */ });
    }
    \`\`\`

    ---

    ## When to Use a Plugin

    - Repetitive boilerplate (permissions, lifecycle handling).
    - Complex APIs (camera, geolocation, barcode, auth).
    - Cross-platform parity matters.

    If a good plugin exists, **use it**. If not, you can always drop to native like above.

    ---

    ### Checklist

    - [ ] Guard code with \`isAndroid\` / \`isIOS\`.
    - [ ] Use Activity/Context (Android) or Root VC (iOS) when needed.
    - [ ] Request runtime permissions on Android.
    - [ ] Keep UI work on the main thread.
    - [ ] Prefer plugins for complex features; go native when you must.
  `;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
