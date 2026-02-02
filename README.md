# NativeScript-Angular Documentation
![Angular](https://img.shields.io/badge/Angular-20%2B-dd0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![License](https://img.shields.io/github/license/SeanKelly369/nativescript-angular-docs)

This is the source for the **NativeScript-Angular documentation website**, an Angular-powered site inspired by the NativeScript Vue documentation.

## 🚀 Features

- **Modern Angular Architecture**: Built with Angular 20+ using standalone components
- **Responsive Design**: Mobile-first design that works on all devices  
- **Markdown Support**: Documentation content written in Markdown and rendered dynamically
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Fast Navigation**: Client-side routing with lazy loading
- **Code Highlighting**: Syntax highlighting for code examples
- **SEO Friendly**: Server-side rendering (SSR) support for better SEO

## 🛠️ Setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/SeanKelly369/nativescript-angular-docs.git
cd nativescript-angular-docs
npm install
```

## 🏃‍♂️ Development

Start the dev server:

```bash
npm start
# or
npm run dev
# or  
ng serve
```

Visit [http://localhost:4200](http://localhost:4200) in your browser.
The site reloads automatically on code changes.

## 🏗️ Build

Generate a production-ready build:

```bash
npm run build
```

The output will be in `dist/`. You can deploy this to Netlify, Vercel, GitHub Pages, or any static host.

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
nativescript-angular-docs/
├── src/
│   ├── app/
│   │   ├── pages/           # Angular page components
│   │   │   ├── home/
│   │   │   ├── getting-started/
│   │   │   ├── guide/
│   │   │   ├── examples/
│   │   │   ├── api/
│   │   │   └── community/
│   │   ├── app.html         # Main app template
│   │   ├── app.scss         # Global styles
│   │   ├── app.ts           # Root component
│   │   └── app.routes.ts    # Routing config
│   ├── content/             # Markdown docs
│   ├── assets/              # Static assets
│   └── styles.scss          # Global styles
├── public/                  # Public assets
├── angular.json             # Angular CLI config
├── package.json             # Dependencies & scripts
└── README.md
```

## 📝 Adding Content

### Documentation Pages

1. Create/edit Markdown files in `src/content/`
2. Content is auto-loaded into the matching Angular page
3. Use standard Markdown features (code blocks, tables, images, links, blockquotes)

### New Pages

1. Create a new component in `src/app/pages/`
2. Add the route in `src/app/app.routes.ts`
3. Update navigation in `src/app/app.html`

Example:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h1>New Page</h1>
      <p>Content goes here...</p>
    </div>
  `
})
export class NewPageComponent {}
```

## 🎨 Styling

- **Colors**: Primary blue `#0066cc`, grays, semantic colors
- **Typography**: System font stack with hierarchy
- **Spacing**: Consistent scale
- **Responsive**: Mobile-first
- **Dark Mode**: Automatic based on system settings

## 🔗 Link Checking

Check for broken links:

```bash
npm run build
npm run check-links
```

## 🚀 Deployment

### Netlify (Recommended)

1. Connect repo on Netlify
2. Build command: `npm run build`
3. Publish dir: `dist/nativescript-angular-docs`
4. Deploy!

### Vercel

1. Import repo on Vercel
2. Auto-detects Angular project
3. Deploy

### GitHub Pages

1. Build: `npm run build`
2. Deploy `dist/nativescript-angular-docs` folder to Pages

## 📚 Contributing

We welcome contributions!

- **Docs**: Fix typos, improve clarity, add guides/examples
- **Code**: Bug fixes, new features, performance, accessibility
- **Process**:
  1. Fork repo
  2. Create feature branch
  3. Make/test changes
  4. Commit & push
  5. Open PR

For larger changes, please open a Discussion/Issue first.

## 🧪 Testing

Run tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## 📄 License

MIT License

Copyright (c) 2026 Sean Kelly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## 💬 Get in Touch

- **Issues**: [GitHub Issues](https://github.com/SeanKelly369/nativescript-angular-docs/issues)
- **Discord**: [Join community](https://discord.com/invite/RgmpGky9GR)
- **Stack Overflow**: [Ask questions](https://stackoverflow.com/questions/tagged/nativescript-angular)
- **Twitter/X**: [@NativeScript](https://twitter.com/nativescript)

## 🙏 Acknowledgments

- Inspired by [NativeScript Vue Docs](https://github.com/nativescript-vue/nativescript-vue.org)
- Built with [Angular](https://angular.dev)
- Styled with SCSS
- Markdown powered by [marked](https://marked.js.org)

---

**Happy documenting!** 📖✨
