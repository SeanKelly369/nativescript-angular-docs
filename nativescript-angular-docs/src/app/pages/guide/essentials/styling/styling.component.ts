import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-styling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './styling.component.html',
})
export class StylingComponent implements OnInit {
  htmlContent: SafeHtml = '';

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  async ngOnInit(): Promise<void> {
    const markdownContent = `# Styling in NativeScript-Angular

Learn how to style your NativeScript-Angular applications.

## CSS Support

NativeScript supports a subset of CSS properties optimized for mobile:

\`\`\`css
.title {
  font-size: 24;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 20;
}

.button {
  background-color: #0066cc;
  color: white;
  border-radius: 5;
  padding: 10 20;
}
\`\`\`

## Platform-Specific Styles

Use platform-specific CSS files:

- \`app.android.css\` - Android-specific styles
- \`app.ios.css\` - iOS-specific styles

## SCSS Support

NativeScript supports SCSS out of the box:

\`\`\`scss
$primary-color: #0066cc;
$border-radius: 5;

.card {
  background-color: white;
  border-radius: $border-radius;
  elevation: 3; // Android shadow
  
  .title {
    color: $primary-color;
    font-weight: bold;
  }
}
\`\`\`

## Next Steps

- [First App](/guide/first-app) - Build your first complete app`;

    this.htmlContent = await marked(markdownContent);
    this.changeDetectorRef.markForCheck();
  }
}