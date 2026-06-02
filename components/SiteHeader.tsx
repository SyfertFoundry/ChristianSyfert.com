import { site, mailtoHref } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function SiteHeader() {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <a
          href="/"
          className="inline-flex min-h-11 items-center rounded-md text-lg font-bold tracking-tight text-ink transition-colors hover:text-sea-ink"
        >
          {site.name}
        </a>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <a
            href="/articles/"
            className="hidden min-h-11 items-center rounded-md px-3 font-medium text-ink-2 transition-colors hover:text-sea-ink sm:inline-flex"
          >
            Writing
          </a>
          <a
            href="/#contact"
            className="hidden min-h-11 items-center rounded-md px-3 font-medium text-ink-2 transition-colors hover:text-sea-ink sm:inline-flex"
          >
            Contact
          </a>

          {site.linkedinUrl && (
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface hover:text-sea-ink"
            >
              <LinkedInIcon className="h-5 w-5" />
              <span className="sr-only">
                {site.name} on LinkedIn (opens in a new tab)
              </span>
            </a>
          )}
          {site.githubUrl && (
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface hover:text-sea-ink"
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="sr-only">
                {site.name} on GitHub (opens in a new tab)
              </span>
            </a>
          )}
          <a
            href={mailtoHref}
            className="ml-1 inline-flex min-h-11 items-center rounded-lg bg-sea px-4 font-semibold text-on-sea transition-colors hover:bg-sea-deep"
          >
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
