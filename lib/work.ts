import { getAllArticleMeta } from "@/lib/articles";
import { projects } from "@/lib/site";

/**
 * One unified, newest-first feed of everything Christian has made and written:
 * articles (real routes, always clickable) interwoven with projects (clickable
 * once they have a live or source URL). The home page leads visitors here.
 */
export interface WorkItem {
  kind: "writing" | "project";
  title: string;
  blurb: string;
  date: string;
  href: string | null; // internal article route, or external live/source URL
  external: boolean;
  live: string | null;
  source: string | null;
  status: string | null;
}

export function getWorkFeed(): WorkItem[] {
  const writing: WorkItem[] = getAllArticleMeta().map((a) => ({
    kind: "writing",
    title: a.title,
    blurb: a.description,
    date: a.date,
    href: `/articles/${a.slug}/`,
    external: false,
    live: null,
    source: null,
    status: null,
  }));

  const built: WorkItem[] = projects.map((p) => {
    const href = p.live ?? p.source ?? null;
    return {
      kind: "project",
      title: p.title,
      blurb: p.blurb,
      date: p.date,
      href,
      external: href != null,
      live: p.live ?? null,
      source: p.source ?? null,
      status: p.status ?? null,
    };
  });

  return [...writing, ...built].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
}
