import type { ReactNode } from "react";

/**
 * Outbound link to a GitHub repo or product site. Opens in a new tab with
 * secure rel attributes and an explicit, screen-reader-announced cue that a
 * new tab will open (required for AAA / predictable behavior).
 */
export default function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
