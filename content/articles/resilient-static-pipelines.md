---
title: "Resilient static pipelines: rendering diagrams without a runtime"
description: "Pushing Mermaid diagrams, syntax highlighting, and link hygiene to build time so the shipped page needs zero JavaScript to be correct."
date: "2026-02-09"
tags: ["static sites", "performance", "build tooling"]
featured: true
links:
  - label: "Source on GitHub"
    href: "https://github.com/"
---

Placeholder case study. A static site should ship correct HTML before a single byte of JavaScript runs. That principle pushes a surprising amount of work to build time.

## The build does the hard part

Diagrams render to inline SVG at build time. Code highlights at build time. External links get their `rel` and new-tab semantics at build time. The browser receives a finished document.

```ts
const html = await processor.process(markdown);
// html is complete: SVG diagrams, highlighted code, safe links.
```

## Where each concern lives

```mermaid
flowchart TD
  accTitle: Build-time rendering pipeline
  accDescr: Markdown flows through parsing, diagram rendering, syntax highlighting, and link hardening, producing static HTML that is served from a CDN with no client runtime.
  M[Markdown] --> P[Parse]
  P --> D[Render diagrams to SVG]
  P --> H[Highlight code]
  P --> L[Harden links]
  D --> O[Static HTML]
  H --> O
  L --> O
  O --> CDN[Served from CDN]
```

The payoff: the page is fast, crawlable, and works identically whether or not scripts load.
