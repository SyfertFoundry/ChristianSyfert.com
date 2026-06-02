import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";
import ExternalLink from "@/components/ExternalLink";
import { site, mailtoHref } from "@/lib/site";
import { getWorkFeed, type WorkItem } from "@/lib/work";

const rowBase =
  "group block -mx-4 rounded-xl px-4 py-7 transition-[transform,background-color] duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-0.5 hover:bg-sea/5 focus-visible:-translate-y-0.5 focus-visible:bg-sea/5";

const metaLink =
  "inline-flex items-center gap-1.5 font-semibold text-sea-ink underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-amber";

function KindAndYear({ item }: { item: WorkItem }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm font-semibold text-sea-ink">
        {item.kind === "writing" ? "Writing" : "Project"}
      </span>
      <span className="text-sm tabular-nums text-ink-2">
        {new Date(item.date).getFullYear()}
      </span>
    </div>
  );
}

function WorkRow({ item, index }: { item: WorkItem; index: number }) {
  const li = (children: React.ReactNode) => (
    <li
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
      className="border-t border-border last:border-b"
    >
      {children}
    </li>
  );

  // Writing: the whole row is a single link to the article.
  if (item.kind === "writing" && item.href) {
    return li(
      <a href={item.href} className={rowBase}>
        <KindAndYear item={item} />
        <h3 className="mt-1.5 flex items-center gap-2 text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-sea-ink group-focus-visible:text-sea-ink">
          {item.title}
          <ArrowRightIcon className="h-5 w-5 shrink-0 -translate-x-1 text-sea-ink opacity-0 transition-all duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
        </h3>
        <p className="mt-2 max-w-[60ch] text-lg leading-relaxed text-ink-2">
          {item.blurb}
        </p>
      </a>,
    );
  }

  // Project: discrete, labeled links so one project can point at several places
  // (a live site, its source, a write-up) without nesting links. The status pill
  // is metadata, not a destination.
  const hasMeta = item.status || item.live || item.source || item.writeup;
  return li(
    <div className="py-7">
      <KindAndYear item={item} />
      <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-ink">
        {item.title}
      </h3>
      <p className="mt-2 max-w-[60ch] text-lg leading-relaxed text-ink-2">
        {item.blurb}
      </p>
      {hasMeta && (
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {item.status && (
            <span className="rounded-full bg-surface-2 px-3 py-1 font-medium text-ink-2">
              {item.status}
            </span>
          )}
          {item.live && (
            <ExternalLink href={item.live} className={`${metaLink} gap-2`}>
              <span className="live-dot inline-flex h-2 w-2 rounded-full bg-sea" />
              Live
              <ArrowUpRightIcon className="h-4 w-4" />
            </ExternalLink>
          )}
          {item.source && (
            <ExternalLink href={item.source} className={metaLink}>
              Source on GitHub
              <ArrowUpRightIcon className="h-4 w-4" />
            </ExternalLink>
          )}
          {item.writeup && (
            <a href={item.writeup} className={metaLink}>
              Read the write-up
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>,
  );
}

export default function Home() {
  const feed = getWorkFeed();

  return (
    <>
      <SiteHeader />

      <main id="main">
        <span id="top" className="sr-only" />

        {/* ─── A quiet hello ─────────────────────────────────────────────── */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="beam-a absolute -right-32 -top-40 h-[40rem] w-[40rem] rounded-full bg-sea/20 blur-3xl" />
            <div className="beam-b absolute -left-24 top-36 h-[26rem] w-[26rem] rounded-full bg-amber/30 blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-3xl px-6 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
            <h1
              id="hero-heading"
              data-reveal
              style={{ "--i": 0 } as React.CSSProperties}
              className="text-[clamp(2.4rem,6vw,4rem)] font-bold tracking-tight text-ink"
            >
              Hey, I&rsquo;m <span className="text-sea-ink">Christian.</span>
            </h1>
            <p
              data-reveal
              style={{ "--i": 1 } as React.CSSProperties}
              className="mt-6 max-w-[52ch] text-xl leading-relaxed text-ink-2"
            >
              I build AI and software, and I care about making things that feel
              good to use. Have a look around.
            </p>
            <p
              data-reveal
              style={{ "--i": 2 } as React.CSSProperties}
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-sea/10 px-4 py-2 text-sm font-semibold text-sea-ink ring-1 ring-inset ring-sea/20"
            >
              <span className="live-dot inline-flex h-2 w-2 rounded-full bg-sea" />
              {site.availability}
            </p>
          </div>
        </section>

        {/* ─── The work (the real hero of the page) ──────────────────────── */}
        <section aria-labelledby="work-heading" className="border-t border-border/60 bg-surface">
          <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
            <h2
              id="work-heading"
              data-reveal
              className="text-3xl font-bold tracking-tight text-ink"
            >
              Things I&rsquo;ve made and written.
            </h2>
            <ol className="mt-10 flex flex-col">
              {feed.map((item, i) => (
                <WorkRow key={`${item.kind}-${item.title}`} item={item} index={i} />
              ))}
            </ol>
          </div>
        </section>

        {/* ─── A warm sign-off ───────────────────────────────────────────── */}
        <section
          aria-labelledby="hi-heading"
          className="on-dark scroll-mt-8 bg-sea-drench text-on-sea"
        >
          <span id="contact" className="sr-only" />
          <div className="mx-auto w-full max-w-3xl px-6 py-24 sm:px-8 sm:py-28">
            <p
              data-reveal
              className="max-w-[60ch] text-xl leading-loose text-on-sea/90"
            >
              I came to engineering from psychology, by way of founding a couple
              of things. I&rsquo;m blind, and I build everything through a screen
              reader. I think it makes the work better, and me a little more
              stubborn about the details.
            </p>

            <h2
              id="hi-heading"
              data-reveal
              style={{ "--i": 1 } as React.CSSProperties}
              className="mt-14 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-on-sea"
            >
              Say hi.
            </h2>
            <p
              data-reveal
              style={{ "--i": 2 } as React.CSSProperties}
              className="mt-3 text-lg text-on-sea/85"
            >
              I&rsquo;m always up for talking shop, or about a role. No forms,
              just email.
            </p>

            <div
              data-reveal
              style={{ "--i": 3 } as React.CSSProperties}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2.5 rounded-xl bg-amber-bright px-6 py-3.5 text-lg font-bold text-ink shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
                <MailIcon className="h-5 w-5" />
                {site.email}
              </a>
              {site.linkedinUrl && (
                <a
                  href={site.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-on-sea transition-colors hover:bg-on-sea/10"
                >
                  <LinkedInIcon className="h-5 w-5" />
                  LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {site.githubUrl && (
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-on-sea transition-colors hover:bg-on-sea/10"
                >
                  <GitHubIcon className="h-5 w-5" />
                  GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
