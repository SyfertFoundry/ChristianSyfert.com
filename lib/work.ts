import { getAllArticleMeta } from "@/lib/articles";
import { getAllProjects } from "@/lib/projects";

/**
 * One unified, newest-first feed of everything Christian has made and written:
 * articles (real routes, always clickable) interwoven with projects. A writing
 * row is a single link to its article. A project row carries its own discrete,
 * labeled links (live, source, write-up), so a project can point at several
 * places at once. The home page leads visitors here.
 */
export interface WorkItem {
  kind: "writing" | "project";
  title: string;
  blurb: string;
  date: string;
  href: string | null; // writing only: the internal article route (row is the link)
  live: string | null; // project: external live URL
  source: string | null; // project: external source repo URL
  writeup: string | null; // project: internal route to a "more details" article
  status: string | null;
}

export function getWorkFeed(): WorkItem[] {
  const writing: WorkItem[] = getAllArticleMeta().map((a) => ({
    kind: "writing",
    title: a.title,
    blurb: a.description,
    date: a.date,
    href: `/articles/${a.slug}/`,
    live: null,
    source: null,
    writeup: null,
    status: null,
  }));

  const built: WorkItem[] = getAllProjects().map((p) => ({
    kind: "project",
    title: p.title,
    blurb: p.blurb,
    date: p.date,
    href: null,
    live: p.live ?? null,
    source: p.source ?? null,
    writeup: p.article ? `/articles/${p.article}/` : null,
    status: p.status ?? null,
  }));

  return [...writing, ...built].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
}
