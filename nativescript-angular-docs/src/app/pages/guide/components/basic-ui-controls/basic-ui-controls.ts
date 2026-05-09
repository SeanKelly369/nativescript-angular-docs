import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-basic-ui-controls',
  imports: [],
  templateUrl: './basic-ui-controls.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicUiControls implements OnInit {
htmlContent!: SafeHtml;

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorReference: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
const markdownContent = `
# Basic UI Controls

NativeScript gives you access to real native UI controls on iOS and Android.

When you use controls such as <code>Label</code>, <code>Button</code>, <code>TextField</code>, <code>Image</code>, or <code>Switch</code>, NativeScript renders native platform widgets rather than HTML elements inside a WebView.

This is one of the main reasons NativeScript apps can feel genuinely native.

---

## Common Basic Controls

| Control | Purpose |
|---|---|
| <code>Label</code> | Displays text |
| <code>Button</code> | Triggers an action |
| <code>TextField</code> | Single-line text input |
| <code>TextView</code> | Multi-line text input |
| <code>Image</code> | Displays local or remote images |
| <code>Switch</code> | Displays an on/off toggle |
| <code>Slider</code> | Allows the user to select a numeric value |
| <code>Progress</code> | Displays progress |
| <code>ActivityIndicator</code> | Shows a loading spinner |

---

## Label

Use <code>Label</code> to display text.

~~~xml
<Label text="Hello NativeScript"></Label>
~~~

You can also bind text from your Angular component.

~~~xml
<Label [text]="pageTitle"></Label>
~~~

Example component property:

~~~ts
pageTitle = 'Basic UI Controls';
~~~

Labels are useful for titles, captions, descriptions, validation messages, and any read-only text.

---

## Button

Use <code>Button</code> when the user needs to trigger an action.

~~~xml
<Button text="Save" (tap)="save()"></Button>
~~~

Example component method:

~~~ts
save(): void {
  console.log('Save tapped');
}
~~~

In NativeScript, the most common event for buttons is <code>tap</code>, not <code>click</code>.

---

## TextField

Use <code>TextField</code> for single-line input.

~~~xml
<TextField
  hint="Enter your name"
  [(ngModel)]="name">
</TextField>
~~~

Example component property:

~~~ts
name = '';
~~~

A <code>TextField</code> is suitable for short values such as names, email addresses, search terms, IDs, and numbers.

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
| <code>text</code> | Standard text input |
| <code>number</code> | Numeric input |
| <code>phone</code> | Phone number input |
| <code>email</code> | Email input |
| <code>url</code> | Website URLs |

---

## TextView

Use <code>TextView</code> for multi-line input.

~~~xml
<TextView
  hint="Enter notes"
  [(ngModel)]="notes">
</TextView>
~~~

Example component property:

~~~ts
notes = '';
~~~

This is useful for comments, descriptions, messages, and longer pieces of user-entered text.

---

## Image

Use <code>Image</code> to display local or remote images.

~~~xml
<Image src="~/assets/images/logo.png"></Image>
~~~

You can also bind the image source.

~~~xml
<Image [src]="imageUrl"></Image>
~~~

Example component property:

~~~ts
imageUrl = '~/assets/images/logo.png';
~~~

Remote images are also supported.

~~~xml
<Image src="https://example.com/image.png"></Image>
~~~

For app assets, local images are usually better because they are faster, reliable, and available offline.

---

## Switch

Use <code>Switch</code> for a simple on/off value.

~~~xml
<Switch
  [checked]="notificationsEnabled"
  (checkedChange)="onNotificationsChanged($event)">
</Switch>
~~~

Example component code:

~~~ts
notificationsEnabled = false;

onNotificationsChanged(event: any): void {
  this.notificationsEnabled = event.value;
}
~~~

A switch is ideal for settings such as enabling notifications, dark mode, syncing, or optional features.

---

## Slider

Use <code>Slider</code> when the user needs to choose a value from a range.

~~~xml
<Slider
  minValue="0"
  maxValue="100"
  [value]="volume"
  (valueChange)="onVolumeChanged($event)">
</Slider>
~~~

Example component code:

~~~ts
volume = 50;

onVolumeChanged(event: any): void {
  this.volume = event.value;
}
~~~

Sliders work well for values like volume, brightness, progress thresholds, and percentages.

---

## Progress

Use <code>Progress</code> to show how far through a task the app is.

~~~xml
<Progress
  [value]="syncProgress"
  maxValue="100">
</Progress>
~~~

Example component property:

~~~ts
syncProgress = 40;
~~~

This is useful for sync operations, uploads, downloads, or long-running tasks where the app knows the current progress.

---

## ActivityIndicator

Use <code>ActivityIndicator</code> when the app is busy but you do not know the exact progress.

~~~xml
<ActivityIndicator [busy]="isLoading"></ActivityIndicator>
~~~

Example component property:

~~~ts
isLoading = true;
~~~

Use this for loading states such as fetching data, logging in, syncing, or waiting for an API response.

---

## Combining Basic Controls

Basic controls are usually combined inside layout components such as <code>StackLayout</code>, <code>GridLayout</code>, or <code>FlexboxLayout</code>.

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

~~~ts
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

~~~ts
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

~~~ts
username = '';
isEnabled = false;
rating = 5;
~~~

To use <code>ngModel</code>, make sure the appropriate NativeScript Angular forms module is imported in your app or standalone component setup.

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

~~~ts
onTap(): void {
  console.log('Button tapped');
}

onSearchChanged(event: any): void {
  console.log(event.value);
}
~~~

The most common event you will use is <code>tap</code>.

---

## Best Practices

- Use <code>Label</code> for read-only text.
- Use <code>Button</code> for user actions.
- Use <code>TextField</code> for short input.
- Use <code>TextView</code> for longer input.
- Use <code>ActivityIndicator</code> when the app is busy.
- Use <code>Progress</code> when you know the progress value.
- Prefer clear, native-feeling controls over overly complex custom UI.
- Avoid deeply nesting layouts around simple controls.

---

## Key Point

NativeScript basic UI controls look simple, but they are powerful because they map to native iOS and Android widgets.

You write Angular templates, but the user interacts with real native controls.
    `;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorReference.markForCheck();
  }
}
