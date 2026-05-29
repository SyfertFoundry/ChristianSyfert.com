import type { MetadataRoute } from "next";
import { getAllArticleMeta } from "@/lib/articles";

const BASE = "https://christiansyfert.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticleMeta().map((a) => ({
    url: `${BASE}/articles/${a.slug}/`,
    lastModified: a.date,
  }));

  return [
    { url: `${BASE}/`, lastModified: new Date().toISOString() },
    { url: `${BASE}/articles/`, lastModified: new Date().toISOString() },
    ...articles,
  ];
}
