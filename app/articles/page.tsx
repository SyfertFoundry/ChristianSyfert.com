import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAllArticleMeta } from "@/lib/articles";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Case studies and write-ups on accessibility, resilient systems, and building for the web.",
};

export default function ArticlesIndex() {
  const articles = getAllArticleMeta();

  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          <header className="max-w-2xl">
            <h1 className="text-[clamp(2.2rem,5vw,3.25rem)] font-bold tracking-tight text-ink">
              Writing
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              Case studies and notes on accessibility, resilient systems, and
              the craft of building for the web.
            </p>
          </header>

          {articles.length === 0 ? (
            <p className="mt-16 text-lg text-ink-2">
              No articles yet. Check back soon.
            </p>
          ) : (
            <ol className="mt-12 flex flex-col">
              {articles.map((a) => (
                <li
                  key={a.slug}
                  className="group border-t border-border py-8 last:border-b"
                >
                  <article>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-2">
                      <time dateTime={a.date}>{formatDate(a.date)}</time>
                      <span aria-hidden>·</span>
                      <span>{a.readingMinutes} min read</span>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight">
                      <a
                        href={`/articles/${a.slug}/`}
                        className="text-ink transition-colors hover:text-sea-ink focus-visible:text-sea-ink"
                      >
                        {a.title}
                      </a>
                    </h2>
                    <p className="mt-2 max-w-[62ch] text-lg leading-relaxed text-ink-2">
                      {a.description}
                    </p>
                    {a.tags.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {a.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-sea-ink"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
