import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/**
 * Projects for the unified work feed. Drop a `content/projects/*.md` file in and
 * it ships, exactly like an article. Give it a `live` or `source` URL and the
 * item becomes clickable and (for `live`) grows a gentle "live" pulse
 * automatically. Until then it shows quietly with its `status`. No broken links
 * ever ship. The Markdown body is currently unused by the feed; it is room for a
 * future write-up.
 */
export interface Project {
  slug: string;
  title: string;
  blurb: string;
  date: string; // ISO; orders the unified feed
  status: string | null;
  live: string | null;
  source: string | null;
  article: string | null; // slug of an internal article for a "more details" write-up
}

function getSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function toProject(slug: string): Project {
  const file = path.join(PROJECTS_DIR, `${slug}.md`);
  const { data } = matter(fs.readFileSync(file, "utf8"));
  // Empty frontmatter values (`live:` with nothing after) parse as null already;
  // coerce anything falsy to null so the feed's "has a URL?" check is reliable.
  return {
    slug,
    title: String(data.title ?? slug),
    blurb: String(data.blurb ?? ""),
    date: new Date(data.date ?? Date.now()).toISOString(),
    status: data.status ? String(data.status) : null,
    live: data.live ? String(data.live) : null,
    source: data.source ? String(data.source) : null,
    article: data.article ? String(data.article) : null,
  };
}

/** All projects, newest first. */
export function getAllProjects(): Project[] {
  return getSlugs()
    .map(toProject)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
