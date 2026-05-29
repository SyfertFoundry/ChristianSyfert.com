import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { fromHtml } from "hast-util-from-html";
import type { Root, Element, ElementContent } from "hast";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const KROKI_CACHE_DIR = path.join(process.cwd(), "node_modules", ".cache", "kroki");

export interface ArticleLink {
  label: string;
  href: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  cover?: string;
  featured: boolean;
  links: ArticleLink[];
  readingMinutes: number;
}

export interface Article {
  meta: ArticleMeta;
  html: string;
}

// ─── Discovery ────────────────────────────────────────────────────────────────
function getSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readRaw(slug: string) {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  return matter(fs.readFileSync(file, "utf8"));
}

function toMeta(slug: string): ArticleMeta {
  const { data, content } = readRaw(slug);
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: new Date(data.date ?? Date.now()).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    featured: Boolean(data.featured),
    links: Array.isArray(data.links) ? (data.links as ArticleLink[]) : [],
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

/** All article metadata, newest first. Cheap: frontmatter only, no rendering. */
export function getAllArticleMeta(): ArticleMeta[] {
  return getSlugs()
    .map(toMeta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** Featured articles for the home teaser; falls back to the latest few. */
export function getFeaturedArticleMeta(limit = 3): ArticleMeta[] {
  const all = getAllArticleMeta();
  const featured = all.filter((a) => a.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

// ─── Mermaid via Kroki (build-time inline SVG, on-disk cached) ──────────────────
function textOf(node: Element): string {
  return node.children
    .map((c) => (c.type === "text" ? c.value : c.type === "element" ? textOf(c) : ""))
    .join("");
}

// Theme every diagram to the brand palette so authors never see Mermaid's
// default lavender. Authors can still override by including their own
// %%{init}%% directive. Hex approximations of the OKLCH tokens in DESIGN.md.
const MERMAID_INIT =
  '%%{init: {"theme":"base","themeVariables":{' +
  '"primaryColor":"#d8e9ea","primaryBorderColor":"#2a7d8c",' +
  '"primaryTextColor":"#16212b","lineColor":"#3a6b75",' +
  '"secondaryColor":"#f3e7d2","tertiaryColor":"#eef4f4",' +
  '"fontFamily":"Atkinson Hyperlegible, system-ui, sans-serif"},' +
  '"flowchart":{"curve":"basis"}}}%%\n';

function brandifyMermaid(source: string): string {
  return source.includes("%%{init") ? source : MERMAID_INIT + source;
}

async function krokiSvg(rawSource: string): Promise<string> {
  const source = brandifyMermaid(rawSource);
  const hash = crypto.createHash("sha256").update(source).digest("hex").slice(0, 16);
  const cacheFile = path.join(KROKI_CACHE_DIR, `${hash}.svg`);
  if (fs.existsSync(cacheFile)) return fs.readFileSync(cacheFile, "utf8");

  const res = await fetch("https://kroki.io/mermaid/svg", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: source,
  });
  if (!res.ok) {
    throw new Error(`Kroki failed (${res.status}) rendering a Mermaid diagram`);
  }
  const svg = await res.text();
  fs.mkdirSync(KROKI_CACHE_DIR, { recursive: true });
  fs.writeFileSync(cacheFile, svg);
  return svg;
}

/**
 * Replaces ```mermaid fenced blocks with the inlined SVG Kroki renders, wrapped
 * in a <figure role="img">. Diagrams should carry `accTitle:` / `accDescr:`
 * inside the source so the SVG includes a screen-reader title and description.
 */
function rehypeMermaidKroki() {
  return async (tree: Root) => {
    const jobs: { parent: Element | Root; index: number; source: string }[] = [];
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || index == null || !parent) return;
      const code = node.children.find(
        (c): c is Element => c.type === "element" && c.tagName === "code",
      );
      const className = code?.properties?.className;
      const classes = Array.isArray(className) ? className : [];
      if (!code || !classes.includes("language-mermaid")) return;
      jobs.push({ parent: parent as Element | Root, index, source: textOf(code) });
    });

    for (const job of jobs) {
      const svg = await krokiSvg(job.source);
      const parsed = fromHtml(svg, { fragment: true, space: "svg" });
      const figure: Element = {
        type: "element",
        tagName: "figure",
        // No role here: the inlined SVG carries its own title/desc semantics
        // from the diagram's accTitle/accDescr directives.
        properties: { className: ["diagram"] },
        children: parsed.children as ElementContent[],
      };
      job.parent.children[job.index] = figure;
    }
  };
}

// ─── Render ─────────────────────────────────────────────────────────────────
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeMermaidKroki) // before Shiki, so mermaid isn't treated as code
  .use(rehypeShiki, { theme: "github-light" })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" },
    content: { type: "text", value: "#" },
  })
  .use(rehypeExternalLinks, {
    target: "_blank",
    rel: ["noopener", "noreferrer"],
    content: {
      type: "element",
      tagName: "span",
      properties: { className: ["sr-only"] },
      children: [{ type: "text", value: " (opens in a new tab)" }],
    },
  })
  .use(rehypeStringify, { allowDangerousHtml: true });

export async function getArticle(slug: string): Promise<Article> {
  const { content } = readRaw(slug);
  const html = String(await processor.process(content));
  return { meta: toMeta(slug), html };
}

export function getArticleSlugs(): string[] {
  return getSlugs();
}
