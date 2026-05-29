import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ExternalLink from "@/components/ExternalLink";
import { ArrowUpRightIcon } from "@/components/icons";
import { getArticle, getArticleSlugs } from "@/lib/articles";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await getArticle(slug);
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: "article",
        publishedTime: meta.date,
      },
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticle(slug);
  } catch {
    notFound();
  }
  const { meta, html } = article;

  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          <a
            href="/articles/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sea-ink transition-colors hover:text-sea-deep"
          >
            <span aria-hidden>←</span> All writing
          </a>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-2">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span aria-hidden>·</span>
              <span>{meta.readingMinutes} min read</span>
            </div>
            <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-tight text-ink">
              {meta.title}
            </h1>
            {meta.description && (
              <p className="mt-4 text-xl leading-relaxed text-ink-2">
                {meta.description}
              </p>
            )}
            {meta.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-sea-ink"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <article
            className="prose mt-12"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {meta.links.length > 0 && (
            <footer className="mt-14 border-t border-border pt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-ink-2">
                Links
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {meta.links.map((link) => (
                  <li key={link.label}>
                    <ExternalLink
                      href={link.href}
                      className="inline-flex items-center gap-1 font-semibold text-sea-ink underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-amber"
                    >
                      {link.label}
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </footer>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
