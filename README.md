# christiansyfert.com

The personal portfolio of Christian Syfert, AI engineer and full-stack developer. A warm, fast, accessibility-first showcase of work and writing.

## Accessibility first

Accessibility is the foundation of this project, not a final pass. The site targets **WCAG AAA**, and the screen-reader experience is designed with the same care as the visual one: semantic HTML, correct heading and landmark structure, full keyboard navigation, visible focus states, skip links, and `prefers-reduced-motion` support throughout. Every color pairing is verified for AAA contrast at build time before it can ship.

## Stack

- **Next.js** (App Router) + **TypeScript**, statically exported (`output: "export"`) to plain HTML/CSS/JS for SEO, crawlability, and low latency. No server runtime in production.
- **Tailwind CSS v4** with an OKLCH design-token system as the single source of truth.
- **Atkinson Hyperlegible** typeface, chosen for low-vision legibility.
- Deployed on **Netlify** from the repo (git push is the deploy), serving the static `out/` directory from the CDN.

## Content

Articles are Markdown files in `content/articles/`. Drop a new `.md` file in and it ships, no route wiring required: the build enumerates every file via `generateStaticParams()`. A `remark`/`rehype` pipeline runs at build time:

- GitHub-flavored Markdown, syntax highlighting via Shiki, and slugged, autolinked headings.
- Mermaid diagrams rendered to inline, brand-themed SVG (with screen-reader titles and descriptions).
- Outbound links hardened with `rel="noopener noreferrer"` and an accessible "opens in a new tab" cue.

## Local development

```bash
npm install
npm run dev          # dev server on http://localhost:3001
npm run build        # static export to out/ (runs the contrast audit first)
npm run check:contrast   # verify every color pairing meets WCAG AAA
```

`npm run build` runs the AAA contrast audit as a prebuild gate, so a contrast regression fails the build (and the deploy).
