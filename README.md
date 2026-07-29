# Portfolio

Source for [imshaaz21.github.io](https://imshaaz21.github.io) - a minimal, single-page portfolio built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

## Update content

All page content (bio, experience, projects, skills, education, contact) lives in **`src/data/content.json`**. Edit that file (via the GitHub web editor, the GitHub mobile app, or locally) and push/commit to `main`. A GitHub Actions workflow (`.github/workflows/deploy.yml`) rebuilds and redeploys the site automatically. No backend, no database, no build step to run by hand.

To update your photo or the downloadable CV, replace the file in `public/` (`my-image.png`, `Shanaaz-Ahamed-CV.pdf`). The filenames referenced in `content.json` must match.

**CV note:** the publicly downloadable CV should not include the References section (personal contact details of your references). Keep a separate full version for direct applications.

## Deploy

Deployment is automatic on every push to `main` via GitHub Actions → GitHub Pages. One-time setup required: **Settings → Pages → Source: GitHub Actions**.
