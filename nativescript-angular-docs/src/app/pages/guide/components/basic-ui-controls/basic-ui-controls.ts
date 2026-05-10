import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);

@Component({
  selector: 'app-basic-ui-controls',
  imports: [],
  templateUrl: './basic-ui-controls.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicUiControls implements OnInit {
  htmlContent!: SafeHtml;

  private readonly markedParser = new Marked();

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorReference: ChangeDetectorRef
  ) {
    this.markedParser.use(
      markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code: string, lang: string): string {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';

          return hljs.highlight(code, { language }).value;
        }
      }) as any
    );
  }

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# Basic UI Controls

NativeScript gives you access to real native UI controls on iOS and Android.

When you use controls such as **\`Label\`**, **\`Button\`**, **\`TextField\`**, **\`Image\`**, or **\`Switch\`**, NativeScript renders native platform widgets rather than HTML elements inside a WebView.

This is one of the main reasons NativeScript apps can feel genuinely native.

---

## Common Basic Controls

| Control | Purpose |
|---|---|
| **\`Label\`** | Displays text |
| **\`Button\`** | Triggers an action |
| **\`TextField\`** | Single-line text input |
| **\`TextView\`** | Multi-line text input |
| **\`Image\`** | Displays local or remote images |
| **\`Switch\`** | Displays an on/off toggle |
| **\`Slider\`** | Allows the user to select a numeric value |
| **\`Progress\`** | Displays progress |
| **\`ActivityIndicator\`** | Shows a loading spinner |

---

## Label

Use **\`Label\`** to display text.

~~~xml
<Label text="Hello NativeScript"></Label>
~~~

You can also bind text from your Angular component.

~~~xml
<Label [text]="pageTitle"></Label>
~~~

Example component property:

~~~typescript
pageTitle = 'Basic UI Controls';
~~~

Labels are useful for titles, captions, descriptions, validation messages, and any read-only text.

---

## Button

Use **\`Button\`** when the user needs to trigger an action.

~~~xml
<Button text="Save" (tap)="save()"></Button>
~~~

Example component method:

~~~typescript
save(): void {
  console.log('Save tapped');
}
~~~

In NativeScript, the most common event for buttons is **\`tap\`**, not **\`click\`**.

---

## TextField

Use **\`TextField\`** for single-line input.

~~~xml
<TextField
  hint="Enter your name"
  [(ngModel)]="name">
</TextField>
~~~

Example component property:

~~~typescript
name = '';
~~~

A **\`TextField\`** is suitable for short values such as names, email addresses, search terms, IDs, and numbers.

You can also configure the keyboard type.

~~~xml
<TextField
  hint="Enter email"
  keyboardType="email"
  autocorrect="false"
  autocapitalizationType="none">
</TextField>
~~~

Common keyboard types include:

| Keyboard Type | Use Case |
|---|---|
| **\`text\`** | Standard text input |
| **\`number\`** | Numeric input |
| **\`phone\`** | Phone number input |
| **\`email\`** | Email input |
| **\`url\`** | Website URLs |

---

## TextView

Use **\`TextView\`** for multi-line input.

~~~xml
<TextView
  hint="Enter notes"
  [(ngModel)]="notes">
</TextView>
~~~

Example component property:

~~~typescript
notes = '';
~~~

This is useful for comments, descriptions, messages, and longer pieces of user-entered text.

---

## Image

Use **\`Image\`** to display local or remote images.

~~~xml
<Image src="~/assets/images/logo.png"></Image>
~~~

You can also bind the image source.

~~~xml
<Image [src]="imageUrl"></Image>
~~~

Example component property:

~~~typescript
imageUrl = '~/assets/images/logo.png';
~~~

Remote images are also supported.

~~~xml
<Image src="https://example.com/image.png"></Image>
~~~

For app assets, local images are usually better because they are faster, reliable, and available offline.

---

## Switch

Use **\`Switch\`** for a simple on/off value.

~~~xml
<Switch
  [checked]="notificationsEnabled"
  (checkedChange)="onNotificationsChanged($event)">
</Switch>
~~~

Example component code:

~~~typescript
notificationsEnabled = false;

onNotificationsChanged(event: any): void {
  this.notificationsEnabled = event.value;
}
~~~

A switch is ideal for settings such as enabling notifications, dark mode, syncing, or optional features.

---

## Slider

Use **\`Slider\`** when the user needs to choose a value from a range.

~~~xml
<Slider
  minValue="0"
  maxValue="100"
  [value]="volume"
  (valueChange)="onVolumeChanged($event)">
</Slider>
~~~

Example component code:

~~~typescript
volume = 50;

onVolumeChanged(event: any): void {
  this.volume = event.value;
}
~~~

Sliders work well for values like volume, brightness, progress thresholds, and percentages.

---

## Progress

Use **\`Progress\`** to show how far through a task the app is.

~~~xml
<Progress
  [value]="syncProgress"
  maxValue="100">
</Progress>
~~~

Example component property:

~~~typescript
syncProgress = 40;
~~~

This is useful for sync operations, uploads, downloads, or long-running tasks where the app knows the current progress.

---

## ActivityIndicator

Use **\`ActivityIndicator\`** when the app is busy but you do not know the exact progress.

~~~xml
<ActivityIndicator [busy]="isLoading"></ActivityIndicator>
~~~

Example component property:

~~~typescript
isLoading = true;
~~~

Use this for loading states such as fetching data, logging in, syncing, or waiting for an API response.

---

## Combining Basic Controls

Basic controls are usually combined inside layout components such as **\`StackLayout\`**, **\`GridLayout\`**, or **\`FlexboxLayout\`**.

~~~xml
<StackLayout class="form">
  <Label text="Login"></Label>

  <TextField
    hint="Email"
    keyboardType="email"
    [(ngModel)]="email">
  </TextField>

  <TextField
    hint="Password"
    secure="true"
    [(ngModel)]="password">
  </TextField>

  <Button
    text="Sign in"
    (tap)="login()">
  </Button>
</StackLayout>
~~~

Example component code:

~~~typescript
email = '';
password = '';

login(): void {
  console.log(this.email, this.password);
}
~~~

---

## Basic Styling

NativeScript supports CSS-like styling for UI controls.

~~~xml
<Button
  text="Save"
  class="primary-button">
</Button>
~~~

~~~css
.primary-button {
  background-color: #2563eb;
  color: white;
  border-radius: 8;
  padding: 12;
  font-size: 16;
}
~~~

The styling is similar to web CSS, but not every browser CSS property is available. NativeScript supports the styling properties that can be mapped to native mobile UI.

---

## Property Binding

NativeScript Angular uses normal Angular binding syntax.

~~~xml
<Label [text]="title"></Label>

<Button
  [text]="buttonText"
  [isEnabled]="canSave"
  (tap)="save()">
</Button>
~~~

Example component code:

~~~typescript
title = 'Animal Details';
buttonText = 'Save';
canSave = true;

save(): void {
  console.log('Saved');
}
~~~

---

## Two-Way Binding

Controls that accept user input can use Angular two-way binding.

~~~xml
<TextField [(ngModel)]="username"></TextField>
<Switch [(ngModel)]="isEnabled"></Switch>
<Slider [(ngModel)]="rating"></Slider>
~~~

Example component code:

~~~typescript
username = '';
isEnabled = false;
rating = 5;
~~~

To use **\`ngModel\`**, make sure the appropriate NativeScript Angular forms module is imported in your app or standalone component setup.

---

## Events

NativeScript controls expose native events.

~~~xml
<Button text="Tap me" (tap)="onTap()"></Button>

<TextField
  hint="Search"
  (textChange)="onSearchChanged($event)">
</TextField>
~~~

Example component code:

~~~typescript
onTap(): void {
  console.log('Button tapped');
}

onSearchChanged(event: any): void {
  console.log(event.value);
}
~~~

The most common event you will use is **\`tap\`**.

---

## Best Practices

- Use **\`Label\`** for read-only text.
- Use **\`Button\`** for user actions.
- Use **\`TextField\`** for short input.
- Use **\`TextView\`** for longer input.
- Use **\`ActivityIndicator\`** when the app is busy.
- Use **\`Progress\`** when you know the progress value.
- Prefer clear, native-feeling controls over overly complex custom UI.
- Avoid deeply nesting layouts around simple controls.

---

## Key Point

NativeScript basic UI controls look simple, but they are powerful because they map to native iOS and Android widgets.

You write Angular templates, but the user interacts with real native controls.
`;

    const html = await this.markedParser.parse(markdownContent);

    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorReference.markForCheck();
  }
}