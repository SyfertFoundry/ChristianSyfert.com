import { site, mailtoHref } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-surface">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="space-y-1">
          <p className="font-bold text-ink">{site.name}</p>
          <p className="text-sm text-ink-2">
            Built with accessibility as the first principle, not the last check.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={mailtoHref}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-sea-ink"
          >
            <MailIcon className="h-5 w-5" />
            <span className="sr-only">Email {site.name}</span>
          </a>
          {site.linkedinUrl && (
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-sea-ink"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-sea-ink"
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="sr-only">
                {site.name} on GitHub (opens in a new tab)
              </span>
            </a>
          )}
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 pb-8 text-sm text-ink-2 sm:px-8">
        © {year} {site.name}
      </div>
    </footer>
  );
}
