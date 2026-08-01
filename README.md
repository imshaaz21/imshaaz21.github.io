# Shanaaz Ahamed — Personal Portfolio

Personal portfolio website built with React, Vite, and custom CSS. Inspired by modern terminal interfaces with an interactive command palette and smooth scroll-spy navigation.

Live Site: [imshaaz21.github.io](https://imshaaz21.github.io)

---

## Key Features

- **Terminal Aesthetics**: Zsh/Bash-inspired user interface with custom theme presets (Terminal, Cyberpunk, Emerald, Nordic, Minimal).
- **Interactive Command Palette**: Press `Ctrl+K` or `/` to launch the terminal command palette for instant search, section navigation, and theme toggling.
- **High-Performance Navigation**: Hardware-accelerated ScrollSpy powered by `IntersectionObserver` for smooth 60+ fps scrolling.
- **Data-Driven Architecture**: Easily update bio, experience, projects, skills, education, and contact details from `src/data/content.json`.

---

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphism)
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (via GitHub Actions)

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

---

## Project Structure

```text
├── src/
│   ├── components/     # React UI components & Command Palette
│   ├── data/           # content.json (Site content)
│   ├── App.jsx         # Main application layout & ScrollSpy
│   └── index.css       # Design tokens, themes & resets
├── public/             # Static assets (images, CV PDF)
└── .github/workflows/  # Automated GitHub Pages deployment
```

---

## Updating Content

All text content, experience records, projects, and skills are configured in **`src/data/content.json`**. Modifying this file automatically updates the portfolio upon commit.

To update static files (profile picture or CV PDF), replace the corresponding files inside the `public/` folder.

---

## License

MIT © [Shanaaz Ahamed](https://github.com/imshaaz21)
