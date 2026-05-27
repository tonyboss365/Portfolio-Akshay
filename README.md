
# Akshay Kumar Reddy — Portfolio

![Portfolio Banner](public/images/portfolio-text.svg)

## Overview

This repository holds the source for a fast, modern portfolio site built with Vite + React + TypeScript. It highlights projects, skills, and accomplishments, and is designed to be deployed as a static site (Netlify, Vercel, GitHub Pages or a CDN).

Key goals:
- Present work and projects clearly for recruiters and collaborators.
- Be performant, accessible, and mobile-first.
- Keep the repo simple, static-first, and easy to deploy.

## Live preview

If you prefer, I can set up a GitHub Pages or Vercel deployment and add the link here.

## Features

- Lightweight React + TypeScript app scaffolded with Vite
- Theme toggle (light/dark)
- Component-driven architecture for easy extension
- Accessible, responsive layout
- Small static assets and SVG flowcharts for documentation

## Tech stack

- Framework: React (with TypeScript)
- Bundler: Vite
- Styling: CSS (utility classes / custom styles)
- Build output: static files ready for CDN deployment

## Project structure

- `src/` — application source
   - `main.tsx`, `App.tsx` — app entry and root
   - `components/` — reusable UI components
   - `data.ts` — project / content metadata
- `public/` — static assets (images, icons)
- `index.html`, `vite.config.ts`, `tsconfig.json` — build configuration

## Flow & Architecture

High-level flow:

![Flowchart](public/images/flowchart.svg)

Architecture overview:

![Architecture](public/images/architecture.svg)

Design notes:
- The site is static-first: content and images live in `public/` and are served directly.
- Client-side React is used for interactivity (theme toggle, small widgets).

## Screenshots

Placeholder screenshots are included in `public/images/`. Replace these with real screenshots by adding image files and updating the README.

## How to run locally

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

## Deployment

The build output (`dist/`) is static and can be deployed to any static host. Example using GitHub Pages or Vercel is easy to add — tell me which you prefer and I'll add a deploy workflow.

## Contributing

- Create a branch, open a PR with a short description.
- Avoid committing secrets (API keys) — use environment variables and `.env` for local work.

## License

This project is released under the MIT License — see `LICENSE`.

---

If you'd like, I can:
- Add polished screenshots from your local device.
- Add a small CI/CD workflow for automatic deploys (GitHub Actions).
- Generate a more detailed architecture diagram (Mermaid or SVG) and embed it here.

Tell me which of the above to do next and I'll update the repo.
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1b0e88fb-d1a3-40a1-810a-7a017170f839

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
