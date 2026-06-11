---
baseline_commit: NO_VCS
---

# Story 1.1: Project Scaffold and Cloudflare Deploy

Status: in-progress

## Story

As a developer,
I want to set up the project structure, CDN dependencies, and Cloudflare Pages deploy pipeline,
so that Hoàng WEB is accessible online and ready for feature development.

## Acceptance Criteria

1. **Cloudflare deploy.** Given the GitHub repo is connected to Cloudflare Pages, When I push to the `main` branch, Then Cloudflare Pages auto-deploys with zero config, And the site is live at `https://hoangweb.pages.dev`.
2. **File structure.** Given the repo is cloned, When I list the root, Then I see `index.html`, `scripts/`, `styles/`, And no build tool or package.json exists.
3. **CDN vendors loaded.** Given `index.html` loads in a browser, When the page renders, Then Tailwind CSS v3, Google Fonts (Inter), and Material Symbols Outlined icons are loaded via CDN.
4. **Mobile-first viewport.** Given `index.html` loads, When I inspect `<head>`, Then the viewport meta tag sets `width=device-width, initial-scale=1.0`.
5. **No build step.** Given the file structure, When any file is served, Then it is valid static HTML/CSS/JS with zero compilation.
6. **ES module scripts.** Given `index.html`, When scripts load, Then `storage.js`, `timer.js`, `ui.js`, `app.js` are loaded as `<script type="module">`, And `app.js` is the entry point with `defer`.

## Tasks / Subtasks

- [x] Task 1: Create directory structure (AC: #2)
  - [x] Create `scripts/` dir
  - [x] Create `styles/` dir
- [x] Task 2: Write `styles/base.css` (AC: #3, #4)
  - [x] Import Inter font `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap')`
  - [x] Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`
  - [x] Set CSS custom properties for the Hoàng WEB design token (near-black bg, accent green, glass surfaces) per UX DESIGN.md tokens
  - [x] Base reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`, `html { font-family: 'Inter', system-ui, sans-serif; background: #0c0f0f; color: #e8edeb; }`
- [x] Task 3: Write `index.html` (AC: #3, #4, #6)
  - [x] `<head>`: viewport meta, charset UTF-8, title "Hoàng WEB"
  - [x] Tailwind CDN: `<script src="https://cdn.tailwindcss.com"></script>`
  - [x] Material Symbols: `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`
  - [x] Inter font: `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" rel="stylesheet">`
  - [x] Stylesheet: `<link rel="stylesheet" href="styles/base.css">`
  - [x] Scripts (type="module", defer): `storage.js`, `timer.js`, `ui.js`, `app.js`
  - [x] `<body>`: mount div `<div id="app"></div>` as SPA root
  - [x] Empty `<script>` block for Tailwind config with `tailwind.config = { theme: { extend: { colors: { ... } } } }`
- [x] Task 4: Write placeholder scripts (AC: #6)
  - [x] `scripts/storage.js`: `export {}`
  - [x] `scripts/timer.js`: `export {}`
  - [x] `scripts/ui.js`: `export {}`
  - [x] `scripts/app.js`: `console.log('Hoàng WEB v1.0')`  (entry point)
- [ ] Task 5: Deploy to Cloudflare Pages (AC: #1)
  - [ ] Create GitHub repo `hoang-web` (or user provides existing)
  - [ ] Init git: `git init`, `git add .`, `git commit -m "init: project scaffold"`
  - [ ] Push to `main` branch
  - [ ] In Cloudflare Dashboard → Pages → Create → Connect to GitHub → select repo
  - [ ] Build settings: Framework preset = None, Build command = (empty), Build output = `/` (root)
  - [ ] Deploy and verify at `https://hoangweb.pages.dev`

## Dev Notes

- **Zero build step.** Cloudflare Pages serves the root directory directly — no build command, no output directory override needed.
- **CDN priority order:** Tailwind first (utility classes available to HTML), then fonts, then icons, then custom CSS, then scripts.
- **Tailwind CDN config.** Inline `<script>` before closing `</head>`: `tailwind.config = { darkMode: 'class', theme: { extend: { fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }, colors: { 'hw-bg': '#0c0f0f', 'hw-surface': '#1a1f1f', 'hw-surface-2': '#242b2b', 'hw-border': '#2a3333', 'hw-accent': '#4cf479', 'hw-accent-dim': '#3ccf64', 'hw-text': '#e8edeb', 'hw-text-dim': '#889696', 'hw-danger': '#f44c6e' } } } }`
- **ES modules.** All scripts use `type="module"`; `app.js` is the sole entry point and must be loaded last. Modules share state via imports, not globals.
- **Material Symbols.** Icon names map to Google's catalog. Use `<span class="material-symbols-outlined">menu</span>`. Default `wght` 400, `FILL` 0 — adjust inline or via CSS.
- **No `package.json`.** The project is intentionally build-free. No npm, no bundler, no transpiler.
- **Inter font fallback.** The `system-ui, sans-serif` stack ensures legible fallback if Inter doesn't load.

### Project Structure Notes

```
/
├── index.html          # SPA shell, CDN loads, module script tags
├── styles/
│   └── base.css        # Tailwind directives, design tokens, global reset
├── scripts/
│   ├── storage.js      # localStorage CRUD (placeholder)
│   ├── timer.js        # Pomodoro timer logic (placeholder)
│   ├── ui.js           # DOM helpers, render functions (placeholder)
│   └── app.js          # Entry point — routing, init (placeholder)
└── _bmad-output/       # Planning + sprint artifacts (gitignored? no, tracked)
```

- **No `assets/` or `public/`** — root is the web root; `index.html` lives at root so Cloudflare Pages serves it automatically.
- **`_bmad-output/`** is tracked in git (design artifacts are part of project context). If user wants it gitignored, add `.gitignore` with `_bmad-output/`.

### References

- Design tokens (colors, typography, glass cards): [Source: DESIGN.md#Design-Tokens] [Source: DESIGN.md#Color-Palette]
- Tailwind CSS v3 CDN docs: https://tailwindcss.com/docs/installation/play-cdn
- Material Symbols catalog: https://fonts.google.com/icons
- Cloudflare Pages static deploy: https://developers.cloudflare.com/pages/framework-presets/static-site/
- Inter font: https://fonts.google.com/specimen/Inter

## Dev Agent Record

### Agent Model Used

big-pickle (opencode agent)

### Debug Log References

### Completion Notes List

### File List
- `index.html`
- `styles/base.css`
- `scripts/storage.js`
- `scripts/timer.js`
- `scripts/ui.js`
- `scripts/app.js`
