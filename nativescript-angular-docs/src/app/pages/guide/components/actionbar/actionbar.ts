import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-actionbar',
  imports: [],
  templateUrl: './actionbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Actionbar implements OnInit {
  htmlContent!: SafeHtml;

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorReference: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# ActionBar

The ActionBar is the native top bar used by a NativeScript page. It maps to native navigation UI on both Android and iOS, so it should be used for page titles, back navigation, menu buttons, and important page-level actions.

It is one of the most common NativeScript components because almost every real mobile app needs some form of native header/navigation area.

## Basic ActionBar

The simplest ActionBar only needs a title.

~~~xml
<ActionBar title="Animals"></ActionBar>
~~~

This creates a native title bar at the top of the page.

## ActionBar with a Back Button

Use a NavigationButton when the page needs to return to the previous screen.

~~~xml
<ActionBar title="Animal Details">
  <NavigationButton
    text="Back"
    android.systemIcon="ic_menu_back"
    (tap)="goBack()">
  </NavigationButton>
</ActionBar>
~~~

In the component:

~~~ts
import { RouterExtensions } from '@nativescript/angular';

constructor(private readonly routerExtensions: RouterExtensions) {}

goBack(): void {
  this.routerExtensions.back();
}
~~~

## ActionBar with Action Items

ActionItems are buttons placed inside the ActionBar. They are useful for actions such as saving, editing, opening filters, or showing settings.

~~~xml
<ActionBar title="Herd">
  <ActionItem
    text="Edit"
    ios.position="right"
    android.position="actionBar"
    (tap)="editHerd()">
  </ActionItem>

  <ActionItem
    text="Filter"
    ios.position="right"
    android.position="popup"
    (tap)="openFilters()">
  </ActionItem>
</ActionBar>
~~~

## Platform-Specific Positioning

NativeScript lets you control where ActionItems appear on each platform.

~~~xml
<ActionItem
  text="Save"
  ios.position="right"
  android.position="actionBar"
  (tap)="save()">
</ActionItem>
~~~

Common Android positions:

| Position | Meaning |
|---|---|
| actionBar | Always show in the ActionBar |
| popup | Show in the overflow menu |
| actionBarIfRoom | Show in the ActionBar if space is available |

Common iOS positions:

| Position | Meaning |
|---|---|
| left | Show on the left side |
| right | Show on the right side |

## Using Icons

ActionItems can use text, image resources, or font icons.

~~~xml
<ActionBar title="Settings">
  <ActionItem
    icon="res://ic_settings"
    ios.position="right"
    android.position="actionBar"
    (tap)="openSettings()">
  </ActionItem>
</ActionBar>
~~~

For Android system icons:

~~~xml
<ActionItem
  android.systemIcon="ic_menu_search"
  android.position="actionBar"
  ios.position="right"
  (tap)="search()">
</ActionItem>
~~~

## Custom Title View

The ActionBar can also contain a custom title layout instead of plain text.

~~~xml
<ActionBar>
  <GridLayout columns="auto, *" class="actionbar-title">
    <Image
      col="0"
      src="~/assets/logo.png"
      width="28"
      height="28">
    </Image>

    <Label
      col="1"
      text="FarmOps"
      class="actionbar-title-text">
    </Label>
  </GridLayout>
</ActionBar>
~~~

This is useful when you need a logo, icon, subtitle, or custom title styling.

## Hiding the ActionBar

Sometimes a page needs a fully custom header or no header at all. In that case, hide the ActionBar on the Page.

~~~xml
<Page actionBarHidden="true">
  <GridLayout>
    <!-- Custom page content -->
  </GridLayout>
</Page>
~~~

Use this carefully. In most apps, keeping the native ActionBar gives a more familiar mobile experience.

## Styling the ActionBar

You can style the ActionBar with CSS.

~~~scss
ActionBar {
  background-color: #1f2937;
  color: white;
}

.actionbar-title {
  padding-left: 8;
}

.actionbar-title-text {
  font-size: 20;
  font-weight: 700;
  color: white;
}
~~~

You can also remove the bottom border/shadow by using flat.

~~~xml
<ActionBar title="Animals" flat="true"></ActionBar>
~~~

## Best Practices

Use the ActionBar for page-level actions, not every possible button.

Good uses:

- Back navigation
- Save
- Edit
- Search
- Filter
- Settings
- Menu/drawer toggle

Avoid putting too much into the ActionBar. If a screen has many actions, move secondary actions into the Android popup menu or into the page content.

## Common Mistakes

### Adding too many ActionItems

The ActionBar has limited space, especially on smaller phones. Keep the most important actions visible and move the rest into the overflow menu.

### Expecting iOS and Android to behave exactly the same

The ActionBar maps to native controls, so some behavior is platform-specific. Always test on both Android and iOS.

### Using a NavigationButton for custom left-side actions on iOS

On iOS, the NavigationButton behaves like a native back button. If you need a custom left-side button, use an ActionItem with ios.position="left" instead.

## Summary

The ActionBar is the standard NativeScript component for native page headers. It gives you a title, navigation button, and page-level action buttons while still rendering as native UI on Android and iOS.

For most pages, start with a simple title and only add ActionItems when the action is important enough to belong at the top of the screen.
`;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorReference.markForCheck();
  }
}
