import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-first-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'first-app.component.html',
  styleUrl: './first-app.component.styles.scss'
})
export class FirstAppComponent implements OnInit {
  htmlContent = '';

  async ngOnInit() {
    const markdownContent = `# Your First NativeScript-Angular App

Build your first complete NativeScript-Angular application step by step.

## Create the Project

\`\`\`bash
ns create my-first-app --ng
cd my-first-app
\`\`\`

## Project Structure

Your new project will have this structure:

\`\`\`
my-first-app/
├── src/
│   └── app/
│       ├── app.component.ts
│       ├── app.component.html
│       ├── app.module.ts
│       └── main.ts
├── App_Resources/
└── nativescript.config.ts
\`\`\`

## Add Your First Component

Create a new component:

\`\`\`typescript
// src/app/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: \`
    <Page>
      <ActionBar title="My First App"></ActionBar>
      <StackLayout class="p-20">
        <Label text="Hello, NativeScript-Angular!" class="h1 text-center"></Label>
        <Button text="Click Me!" (tap)="onButtonTap()" class="btn btn-primary"></Button>
      </StackLayout>
    </Page>
  \`
})
export class HomeComponent {
  onButtonTap() {
    alert('Hello from NativeScript-Angular!');
  }
}
\`\`\`

## Run Your App

\`\`\`bash
ns run ios
# or
ns run android
\`\`\`

Congratulations! You've built your first NativeScript-Angular app.

## Next Steps

- Explore [Examples](/examples) for more complex applications
- Join the [Community](/community) for help and discussions`;

    this.htmlContent = await marked(markdownContent);
  }
}