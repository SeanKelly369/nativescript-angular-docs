# NativeScript-Angular Documentation

[![Netlify Status](https://api.netlify.com/api/v1/badges/REPLACE_ME/deploy-status)](https://app.netlify.com/sites/nativescript-angular/deploys)

This is the source for the **NativeScript-Angular documentation website**:
👉 [nativescript-angular.org](https://nativescript-angular.org/) (update link when live!)

Contributions are welcome—most of the documentation content lives in the `/docs` directory.

---

## 🚀 Setup

Clone this repo to your local machine and install the dependencies.

```bash
git clone https://github.com/NativeScript/nativescript-angular-docs.git
cd nativescript-angular-docs
npm install
```

## 🛠️ Start documentation

We use the Angular CLI for development and documentation.

Start the site locally:

```bash
npm start
```
or
```bash
ng serve
```

Open the provided URL in your browser to view the live documentation site.


## 🏗️ Build documentation

Generate a production-ready static build:

```bash
ng build --configuration=production
```

The output will be in the dist/ directory.
You can deploy this to any static web host (Netlify, Vercel, GitHub Pages, etc).

## 🔗 Good practices
### Check broken links
To make sure all documentation links work, we recommend running a link checker on the built output:

```
npm run build
npx linkinator dist/
```

## 📚 Contributing

1. Documentation lives in the /docs directory as Markdown or Angular components.
2. Please open pull requests for improvements, fixes, or new guides.
3. For larger changes, open a Discussion or Issue first to coordinate with the team.


## 💬 Get in Touch

Chat with us live on [Discord](https://discord.com/invite/RgmpGky9GR)