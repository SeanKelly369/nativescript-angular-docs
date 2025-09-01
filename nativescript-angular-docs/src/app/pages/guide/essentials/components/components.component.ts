import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'components.component.html',
  styleUrl: './components.component.styles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitiser: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit() {
    const markdownContent = `# NativeScript-Angular UI Components

NativeScript-Angular provides a rich set of native UI components that map directly to native iOS and Android controls, ensuring authentic platform look and feel.

## Layout Containers

Layout containers are fundamental building blocks that arrange child elements in your application.

### StackLayout

Arranges child elements in a single line (horizontally or vertically).

\`\`\`html
<StackLayout orientation="vertical" class="page">
  <Label text="First Item" class="h2"></Label>
  <Label text="Second Item" class="h2"></Label>
  <Label text="Third Item" class="h2"></Label>
</StackLayout>
\`\`\`

**Properties:**
- \`orientation\`: "vertical" (default) or "horizontal"

### GridLayout

Arranges child elements in a table structure of rows and columns.

\`\`\`html
<GridLayout rows="auto, auto, *" columns="*, auto, *" class="page">
  <Label text="Top Left" row="0" col="0" class="label"></Label>
  <Label text="Top Center" row="0" col="1" class="label"></Label>
  <Label text="Top Right" row="0" col="2" class="label"></Label>
  <Label text="Middle Span" row="1" colSpan="3" class="label"></Label>
  <Label text="Bottom Full" row="2" colSpan="3" class="label"></Label>
</GridLayout>
\`\`\`

**Properties:**
- \`rows\`: Comma-separated list of row definitions
- \`columns\`: Comma-separated list of column definitions
- \`row\`: Row index for child elements
- \`col\`: Column index for child elements
- \`rowSpan\`: Number of rows to span
- \`colSpan\`: Number of columns to span

### FlexboxLayout

Uses CSS Flexbox layout algorithm for flexible arrangements.

\`\`\`html
<FlexboxLayout flexDirection="column" justifyContent="space-around" class="page">
  <Label text="Flexible Item 1" class="label"></Label>
  <Label text="Flexible Item 2" class="label"></Label>
  <Label text="Flexible Item 3" class="label"></Label>
</FlexboxLayout>
\`\`\`

### WrapLayout

Positions child elements in rows or columns based on orientation.

\`\`\`html
<WrapLayout orientation="horizontal" class="page">
  <Label text="Item 1" class="label"></Label>
  <Label text="Item 2" class="label"></Label>
  <Label text="Item 3" class="label"></Label>
  <Label text="Item 4" class="label"></Label>
</WrapLayout>
\`\`\`

### DockLayout

Docks child elements to the sides or fills the remaining space.

\`\`\`html
<DockLayout class="page">
  <Label dock="top" text="Top" class="dock-label"></Label>
  <Label dock="bottom" text="Bottom" class="dock-label"></Label>
  <Label dock="left" text="Left" class="dock-label"></Label>
  <Label dock="right" text="Right" class="dock-label"></Label>
  <Label text="Fill" class="dock-label"></Label>
</DockLayout>
\`\`\`

### AbsoluteLayout

Positions child elements by explicit coordinates.

\`\`\`html
<AbsoluteLayout class="page">
  <Label text="Top Left" left="10" top="10" class="label"></Label>
  <Label text="Center" left="100" top="100" class="label"></Label>
  <Label text="Bottom Right" right="10" bottom="10" class="label"></Label>
</AbsoluteLayout>
\`\`\`

## Navigation Components

### ActionBar

Provides navigation and actions for the current page.

\`\`\`html
<ActionBar title="My App" class="action-bar">
  <NavigationButton (tap)="goBack()" android.systemIcon="ic_menu_back"></NavigationButton>
  <ActionItem (tap)="onShare()" ios.systemIcon="9" android.systemIcon="ic_menu_share" ios.position="right"></ActionItem>
</ActionBar>
\`\`\`

**Component Usage:**
\`\`\`typescript
import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-page',
  template: \`
    <ActionBar title="Page Title">
      <NavigationButton (tap)="goBack()"></NavigationButton>
    </ActionBar>
    <StackLayout class="page">
      <!-- Page content -->
    </StackLayout>
  \`
})
export class PageComponent {
  constructor(private routerExtensions: RouterExtensions) {}

  goBack() {
    this.routerExtensions.back();
  }
}
\`\`\`

### TabView

Provides tab-based navigation between multiple views.

\`\`\`html
<TabView selectedIndex="0" (selectedIndexChange)="onTabChange($event)">
  <StackLayout *tabItem="{title: 'Home', iconSource: 'res://home'}">
    <Label text="Home Content"></Label>
  </StackLayout>
  <StackLayout *tabItem="{title: 'Browse', iconSource: 'res://browse'}">
    <Label text="Browse Content"></Label>
  </StackLayout>
  <StackLayout *tabItem="{title: 'Search', iconSource: 'res://search'}">
    <Label text="Search Content"></Label>
  </StackLayout>
</TabView>
\`\`\`

## Input Components

### Button

A button component for user interactions.

\`\`\`html
<Button text="Primary Action" (tap)="onPrimaryTap()" class="btn btn-primary"></Button>
<Button text="Secondary Action" (tap)="onSecondaryTap()" class="btn btn-secondary"></Button>
\`\`\`

**Component Usage:**
\`\`\`typescript
export class MyComponent {
  onPrimaryTap() {
    console.log('Primary button tapped');
  }

  onSecondaryTap() {
    console.log('Secondary button tapped');
  }
}
\`\`\`

### TextField

Single-line text input with various input types.

\`\`\`html
<TextField 
  [(ngModel)]="username" 
  hint="Enter username" 
  class="input"
  keyboardType="email"
  autocorrect="false"
  autocapitalizationType="none">
</TextField>

<TextField 
  [(ngModel)]="password" 
  hint="Enter password"
  secure="true"
  class="input">
</TextField>
\`\`\`

**Properties:**
- \`keyboardType\`: "default", "email", "number", "phone", "url"
- \`secure\`: Boolean for password input
- \`autocorrect\`: Boolean for autocorrection
- \`autocapitalizationType\`: "none", "words", "sentences", "allCharacters"

### TextView

Multi-line text input.

\`\`\`html
<TextView 
  [(ngModel)]="description" 
  hint="Enter description"
  class="textarea"
  editable="true">
</TextView>
\`\`\`

### SearchBar

Specialized input for search functionality.

\`\`\`html
<SearchBar 
  [(ngModel)]="searchQuery"
  (textChange)="onSearchTextChange($event)"
  (submit)="onSearchSubmit($event)"
  hint="Search items...">
</SearchBar>
\`\`\`

### Switch

Toggle switch for boolean values.

\`\`\`html
<Switch 
  [(ngModel)]="isEnabled"
  (checkedChange)="onSwitchChange($event)"
  class="switch">
</Switch>
\`\`\`

### Slider

Slider for selecting numeric values within a range.

\`\`\`html
<Slider 
  [(ngModel)]="volume"
  minValue="0"
  maxValue="100"
  (valueChange)="onVolumeChange($event)"
  class="slider">
</Slider>
\`\`\`

### DatePicker & TimePicker

Date and time selection components.

\`\`\`html
<DatePicker 
  [(ngModel)]="selectedDate"
  (dateChange)="onDateChange($event)"
  class="date-picker">
</DatePicker>

<TimePicker 
  [(ngModel)]="selectedTime"
  (timeChange)="onTimeChange($event)"
  class="time-picker">
</TimePicker>
\`\`\`

### ListPicker

Picker for selecting from a list of options.

\`\`\`html
<ListPicker 
  [items]="countries"
  [(ngModel)]="selectedCountry"
  (selectedIndexChange)="onCountryChange($event)"
  class="list-picker">
</ListPicker>
\`\`\`

## Display Components

### Label

Displays read-only text with rich formatting options.

\`\`\`html
<Label text="Simple Text" class="label"></Label>
<Label [text]="dynamicText" class="label"></Label>
<Label textWrap="true" class="body">
  This is a longer text that will wrap to multiple lines when the container width is exceeded.
</Label>
\`\`\`

### Image

Displays images from various sources.

\`\`\`html
<!-- Local resource -->
<Image src="~/assets/logo.png" class="logo"></Image>

<!-- Remote URL -->
<Image [src]="imageUrl" stretch="aspectFit" class="image"></Image>

<!-- With loading placeholder -->
<Image 
  [src]="imageUrl" 
  loadMode="async"
  stretch="aspectFill"
  class="async-image">
</Image>
\`\`\`

**Properties:**
- \`stretch\`: "none", "aspectFit", "aspectFill", "fill"
- \`loadMode\`: "sync", "async"

### WebView

Embeds web content in your application.

\`\`\`html
<WebView 
  [src]="webUrl"
  (loadStarted)="onLoadStarted($event)"
  (loadFinished)="onLoadFinished($event)"
  class="webview">
</WebView>
\`\`\`

### HtmlView

Displays static HTML content.

\`\`\`html
<HtmlView [html]="htmlContent" class="html-content"></HtmlView>
\`\`\`

### ActivityIndicator

Shows loading spinner.

\`\`\`html
<ActivityIndicator 
  [busy]="isLoading"
  class="activity-indicator">
</ActivityIndicator>
\`\`\`

### Progress

Shows progress of an operation.

\`\`\`html
<Progress 
  [value]="currentProgress"
  maxValue="100"
  class="progress">
</Progress>
\`\`\`

## List Components

### ListView

Displays a scrollable list of items with efficient recycling.

\`\`\`html
<ListView [items]="items" (itemTap)="onItemTap($event)" class="list-view">
  <ng-template let-item="item" let-i="index">
    <GridLayout rows="auto, auto" columns="60, *" class="list-item">
      <Image [src]="item.image" row="0" col="0" class="item-image"></Image>
      <Label [text]="item.title" row="0" col="1" class="item-title"></Label>
      <Label [text]="item.description" row="1" col="1" class="item-description"></Label>
    </GridLayout>
  </ng-template>
</ListView>
\`\`\`

**Component Usage:**
\`\`\`typescript
export class ListComponent {
  items = [
    { title: 'Item 1', description: 'Description 1', image: '~/assets/item1.png' },
    { title: 'Item 2', description: 'Description 2', image: '~/assets/item2.png' }
  ];

  onItemTap(event: any) {
    const tappedItem = this.items[event.index];
    console.log('Tapped item:', tappedItem);
  }
}
\`\`\`

### Repeater

Repeats a template for each item in a collection.

\`\`\`html
<StackLayout>
  <StackLayout *ngFor="let item of items" class="repeater-item">
    <Label [text]="item.name" class="item-name"></Label>
    <Label [text]="item.description" class="item-description"></Label>
  </StackLayout>
</StackLayout>
\`\`\`

## Scrolling Components

### ScrollView

Provides scrollable content area.

\`\`\`html
<ScrollView orientation="vertical" class="page">
  <StackLayout>
    <Label text="Scrollable Content" class="h1"></Label>
    <Label text="Item 1" class="label"></Label>
    <Label text="Item 2" class="label"></Label>
    <!-- More content -->
  </StackLayout>
</ScrollView>
\`\`\`

## Advanced Components

### SegmentedBar

Provides segmented control for switching between options.

\`\`\`html
<SegmentedBar 
  [items]="segmentedBarItems"
  [(ngModel)]="selectedIndex"
  (selectedIndexChange)="onSegmentChange($event)"
  class="segmented-bar">
</SegmentedBar>
\`\`\`

**Component Usage:**
\`\`\`typescript
export class SegmentedComponent {
  segmentedBarItems = [
    { title: 'First' },
    { title: 'Second' },
    { title: 'Third' }
  ];
  selectedIndex = 0;

  onSegmentChange(event: any) {
    console.log('Selected index:', event.newIndex);
  }
}
\`\`\`

## Form Integration

### Angular Forms Integration

NativeScript-Angular components work seamlessly with Angular Forms:

\`\`\`typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ns-form',
  template: \`
    <StackLayout [formGroup]="userForm" class="form">
      <TextField 
        formControlName="username"
        hint="Username"
        class="input">
      </TextField>
      
      <TextField 
        formControlName="email"
        hint="Email"
        keyboardType="email"
        class="input">
      </TextField>
      
      <Switch 
        formControlName="agreeToTerms"
        class="switch">
      </Switch>
      
      <Button 
        text="Submit"
        (tap)="onSubmit()"
        [isEnabled]="userForm.valid"
        class="btn btn-primary">
      </Button>
    </StackLayout>
  \`
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    }
  }
}
\`\`\`

## Platform-Specific Styling

Components can be styled differently for iOS and Android:

\`\`\`css
/* Global styles */
.btn {
  font-size: 16;
  color: white;
  background-color: #3498db;
  border-radius: 5;
  padding: 10;
  margin: 10;
}

/* iOS-specific styles */
.btn.ios {
  border-radius: 10;
  font-weight: 600;
}

/* Android-specific styles */
.btn.android {
  text-transform: uppercase;
  elevation: 2;
}
\`\`\`

## Best Practices

### Performance Tips

1. **Use ListView for large datasets** instead of Repeater
2. **Implement item templates efficiently** for ListView
3. **Optimize images** with appropriate stretch modes
4. **Use async loading** for remote images

### Accessibility

Make your components accessible:

\`\`\`html
<Button 
  text="Submit"
  accessibilityLabel="Submit form"
  accessibilityHint="Submits the current form data"
  (tap)="onSubmit()">
</Button>
\`\`\`

### Responsive Design

Use layout containers effectively for different screen sizes:

\`\`\`html
<GridLayout rows="auto, *" columns="*" class="page">
  <StackLayout row="0" class="header">
    <Label text="Header" class="h1"></Label>
  </StackLayout>
  
  <ScrollView row="1">
    <FlexboxLayout flexDirection="column" class="content">
      <!-- Responsive content -->
    </FlexboxLayout>
  </ScrollView>
</GridLayout>
\`\`\`

## Next Steps

- **[Navigation](/guide/navigation)** - Learn about navigation patterns and routing
- **[Styling](/guide/styling)** - Master CSS styling and theming
- **[Data Binding](/guide/data-binding)** - Understand Angular data binding in mobile context
- **[Performance](/guide/performance)** - Optimize your app's performance`;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}