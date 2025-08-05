# NativeScript-Angular Documentation

[![Netlify Status](https://api.netlify.com/api/v1/badges/REPLACE_ME/deploy-status)](https://app.netlify.com/sites/nativescript-angular/deploys)

This is the source for the **NativeScript-Angular documentation website**, an Angular version inspired by the NativeScript Vue documentation site.

## 🚀 Features

- **Modern Angular Architecture**: Built with Angular 20+ using standalone components
- **Responsive Design**: Mobile-first design that works on all devices  
- **Markdown Support**: Documentation content written in Markdown and rendered dynamically
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Fast Navigation**: Client-side routing with lazy loading for optimal performance
- **Code Highlighting**: Syntax highlighting for code examples
- **SEO Friendly**: Server-side rendering support for better SEO

## 🛠️ Setup

Clone this repo to your local machine and install the dependencies:

```bash
git clone https://github.com/NativeScript/nativescript-angular-docs.git
cd nativescript-angular-docs
npm install
```

## 🏃‍♂️ Development

Start the development server:

```bash
npm start
# or
npm run dev
# or  
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser to view the documentation site.

The site will automatically reload when you make changes to the source files.

## 🏗️ Build

Generate a production-ready static build:

```bash
npm run build
```

The output will be in the `dist/` directory. You can deploy this to any static web host (Netlify, Vercel, GitHub Pages, etc).

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
nativescript-angular-docs/
├── src/
│   ├── app/
│   │   ├── pages/           # Page components
│   │   │   ├── home/        # Home page
│   │   │   ├── getting-started/  # Getting started guide
│   │   │   ├── guide/       # Main documentation guide
│   │   │   ├── examples/    # Code examples
│   │   │   ├── api/         # API reference
│   │   │   └── community/   # Community resources
│   │   ├── app.html         # Main app template
│   │   ├── app.scss         # Global styles
│   │   ├── app.ts           # Root component
│   │   └── app.routes.ts    # Routing configuration
│   ├── content/             # Markdown content files
│   │   ├── getting-started/
│   │   ├── guide/
│   │   ├── examples/
│   │   ├── api/
│   │   └── community/
│   ├── assets/              # Static assets
│   └── styles.scss          # Global styles
├── public/                  # Public assets (logos, images)
├── angular.json             # Angular CLI configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 📝 Adding Content

### Documentation Pages

1. Create or edit Markdown files in the `src/content/` directory
2. The content is automatically loaded and rendered by the respective page components
3. Use standard Markdown syntax with support for:
   - Code blocks with syntax highlighting
   - Links and images
   - Lists and tables
   - Blockquotes

### New Pages

To add a new page:

1. Create a new component in `src/app/pages/`
2. Add the route to `src/app/app.routes.ts`
3. Update the navigation in `src/app/app.html`

Example component:

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

The site uses SCSS for styling with a design system based on:

- **Colors**: Primary blue (#0066cc), grays, and semantic colors
- **Typography**: System font stack with proper hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Reusable component styles
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Automatic dark mode support

## 🔗 Link Checking

To ensure all documentation links work correctly:

```bash
npm run build
npm run check-links
```

This will build the site and check for broken links using linkinator.

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/nativescript-angular-docs`
4. Deploy!

### Vercel

1. Import your GitHub repository to Vercel
2. Vercel will automatically detect the Angular project
3. Deploy!

### GitHub Pages

1. Build the project: `npm run build`
2. Deploy the `dist/nativescript-angular-docs` folder to GitHub Pages

## 📚 Contributing

We welcome contributions! Here's how you can help:

### Documentation

1. **Fix typos or improve clarity**: Edit the Markdown files in `src/content/`
2. **Add new guides**: Create new documentation pages
3. **Update examples**: Keep code examples current and working
4. **Improve navigation**: Enhance the site structure and user experience

### Code

1. **Fix bugs**: Report and fix issues
2. **Add features**: Enhance the documentation site functionality
3. **Improve performance**: Optimize loading and rendering
4. **Enhance accessibility**: Make the site more accessible

### Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test your changes: `npm start`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

For larger changes, please open a Discussion or Issue first to coordinate with the team.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Get in Touch

- **GitHub Issues**: [Report bugs or request features](https://github.com/NativeScript/nativescript-angular-docs/issues)
- **Discord**: [Join our community](https://discord.com/invite/RgmpGky9GR)
- **Stack Overflow**: [Ask questions](https://stackoverflow.com/questions/tagged/nativescript-angular)
- **Twitter**: [@NativeScript](https://twitter.com/nativescript)

## 🙏 Acknowledgments

- Inspired by the [NativeScript Vue documentation site](https://github.com/nativescript-vue/nativescript-vue.org)
- Built with [Angular](https://angular.dev)
- Styled with modern CSS and SCSS
- Markdown processing with [marked](https://marked.js.org)

---

**Happy documenting!** 📖✨