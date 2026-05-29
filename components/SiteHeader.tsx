import { site, mailtoHref } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function SiteHeader() {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <a
          href="/"
          className="rounded-md text-lg font-bold tracking-tight text-ink transition-colors hover:text-sea-ink"
        >
          {site.name}
        </a>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <a
            href="/articles/"
            className="hidden rounded-md px-3 py-2 font-medium text-ink-2 transition-colors hover:text-sea-ink sm:inline-block"
          >
            Writing
          </a>
          <a
            href="/#contact"
            className="hidden rounded-md px-3 py-2 font-medium text-ink-2 transition-colors hover:text-sea-ink sm:inline-block"
          >
            Contact
          </a>

          {site.linkedinUrl && (
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2.5 text-ink-2 transition-colors hover:bg-surface hover:text-sea-ink"
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
              className="rounded-md p-2.5 text-ink-2 transition-colors hover:bg-surface hover:text-sea-ink"
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="sr-only">
                {site.name} on GitHub (opens in a new tab)
              </span>
            </a>
          )}
          <a
            href={mailtoHref}
            className="ml-1 rounded-lg bg-sea px-4 py-2 font-semibold text-on-sea transition-colors hover:bg-sea-deep"
          >
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
