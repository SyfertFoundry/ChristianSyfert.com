import type { Metadata } from "next";
import { site, mailtoHref } from "@/lib/site";
import ExternalLink from "@/components/ExternalLink";

// Standalone audit, shared by direct link only. It deliberately does NOT use
// SiteHeader/SiteFooter: the page sits outside the portfolio so its single <h1>
// is the report title and the document outline stays clean and demonstrable.
// noindex/nofollow so it never ranks against the library.
export const metadata: Metadata = {
  title: { absolute: "Accessibility audit of spartanburglibraries.org" },
  description:
    "An accessibility audit of spartanburglibraries.org: what the Recite toolbar doesn't fix, who the site leaves out, and what fixing it takes.",
  robots: { index: false, follow: false },
};

// Posting: "Web Services Developer", 40 hours, Headquarters Library
// (/About-Us/Jobs/Job-Posting?ID=51).
const ROLE = "the Web Services Developer role";

// The library's live heading outline, captured as data so it never injects real
// heading levels into THIS page's outline (which is itself part of the point).
// The render indents each row by its level, so the structural chaos (an orphaned
// h5, levels jumping around) is something you see, not just read about.
const capturedOutline: { level: number; text: string; note?: string }[] = [
  { level: 5, text: "Browse by Age Group", note: "first heading on the page" },
  { level: 3, text: "Upcoming Events & Programs" },
  { level: 3, text: "General Announcements" },
  { level: 5, text: "African-American History" },
  { level: 3, text: "More from the Library" },
  { level: 4, text: "Kennedy Room of Local History" },
  { level: 3, text: "Get in touch with us", note: "repeats 4 times" },
  { level: 3, text: "Loading events...", note: "placeholder, never updated" },
];

// The library's own failing color pairs, rendered as live swatches. These hex
// values are theirs, not our design tokens, and are intentionally below 4.5:1:
// the point is to show the unreadable contrast a sighted reader can confirm at a
// glance. Each swatch is aria-hidden; the text beside it carries the same facts.
const contrastFails: {
  sample: string;
  fg: string;
  bg: string;
  where: string;
  detail: string;
  ratio: string;
}[] = [
  { sample: "Account", fg: "#ffffff", bg: "#f38724", where: "Orange action buttons", detail: "white on orange", ratio: "2.5:1" },
  { sample: "Locations", fg: "#82878d", bg: "#f2f3f5", where: "Main navigation", detail: "grey on near-white", ratio: "3.3:1" },
  { sample: "Storytime!", fg: "#ffffff", bg: "#6ec038", where: "Homepage event promo", detail: "white on green", ratio: "2.3:1" },
];

const fixExample = `<!-- 1. Page language: one line in the site layout / master page -->
<html lang="en">                 <!-- currently: <html> with no lang -->

<!-- 2. Heading hierarchy: one h1, then h2/h3 in order (indented to show the outline) -->
<h1>Spartanburg County Public Libraries</h1>
  <h2>Browse by Age Group</h2>   <!-- currently an <h5> with nothing above it -->
    <h3>Kids</h3>
    <h3>Teens</h3>

<!-- 3. Real ARIA roles + accessible names -->
<a href="#teens" role="tab" aria-controls="teens">Teens</a>
                                 <!-- currently role="teens" (not a real role) -->
<a href="/" class="logo" aria-label="Spartanburg County Public Libraries home"></a>
                                 <!-- currently an empty link -->`;

const codeBlock =
  "overflow-x-auto rounded-lg border border-border bg-surface-2 p-4 font-mono text-sm leading-relaxed text-ink";

const h2 =
  "mt-16 scroll-mt-8 text-balance text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-tight text-ink";
const h3 = "mt-8 text-xl font-bold tracking-tight text-sea-ink";
const p = "mt-4 text-lg leading-relaxed text-ink";
const linkStyle =
  "font-semibold text-sea-ink underline decoration-border decoration-2 underline-offset-4 hover:decoration-amber";

export default function SpartanburgAccessibilityAudit() {
  return (
    <main id="main" className="mx-auto w-full max-w-[68ch] px-6 py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-amber-deep">
        Accessibility audit &middot; June 2026
      </p>

      <h1 className="mt-3 break-words text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-ink">
        Accessibility audit of spartanburglibraries.org
      </h1>

      <p className="mt-6 text-xl leading-relaxed text-ink-2">
        I&rsquo;m a Spartanburg County resident, and I&rsquo;m blind, so I use the
        web through a screen reader. That means I don&rsquo;t experience a site by
        how it looks but by the structure underneath it, which is the same thing
        the screen reader reads. I tried to use the library&rsquo;s site, ran into
        enough that got in my way, and checked it against the standard. Here is
        what I found, and why I&rsquo;m passing it along.
      </p>

      <h2 className={h2}>Why I&rsquo;m sending this</h2>
      <p className={p}>
        I found these by trying to use the site, the way anyone in the county
        might. I&rsquo;ve applied for {ROLE}, so I&rsquo;ll be upfront that I have
        a reason to write. But the issues are here either way, and I&rsquo;d
        rather pass them along than not.
      </p>
      <p className={p}>
        Happy to walk through any of it. You can reach me at{" "}
        <a href={mailtoHref} className={linkStyle}>
          {site.email}
        </a>
        .
      </p>

      <h2 className={h2}>Who the site leaves out</h2>
      <p className={p}>
        A library is about access, so it&rsquo;s worth being plain about who the
        current site shuts out. The county has about <strong>328,000</strong>{" "}
        residents (2020 Census). Conservatively:
      </p>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-ink">
        <li>
          About <strong>15,700</strong> are blind or have serious difficulty
          seeing (CDC, roughly 4.8 percent). They&rsquo;re blocked outright:
          headings, labels, and page language are how they get around a site.
        </li>
        <li>
          About <strong>85,000</strong> have a disability of some kind (CDC, about
          1 in 4 adults), and a lot of them lean on these same fixes.
        </li>
        <li>
          About <strong>59,000</strong> are 65 or older, with rising vision and
          dexterity needs, and they&rsquo;re among the heaviest library users.
        </li>
      </ul>
      <p className={p}>
        Not everyone hits every barrier, and these aren&rsquo;t all the same
        person. But the issues in this audit are the ones screen reader and
        keyboard users depend on, so something like <strong>10,000 or more
        residents are directly hindered right now</strong>. Clean structure
        quietly helps everyone else too: people on phones, search ranking, anyone
        in a hurry.
      </p>
      <p className="mt-4 text-base text-ink-2">
        Sources:{" "}
        <ExternalLink href="https://dhds.cdc.gov/" className={linkStyle}>
          CDC Disability and Health Data System
        </ExternalLink>{" "}
        and{" "}
        <ExternalLink
          href="https://www.census.gov/quickfacts/spartanburgcountysouthcarolina"
          className={linkStyle}
        >
          U.S. Census QuickFacts (Spartanburg County, SC)
        </ExternalLink>
        .
      </p>

      <h2 className={h2}>Fixing this is template work, not a rebuild</h2>
      <p className={p}>
        The site runs on Sitecore, a C#/.NET CMS (IIS and ASP.NET underneath, with
        Sitecore&rsquo;s <code className="font-mono">/-/media/</code> asset URLs all
        over the markup). So these fixes live in the Sitecore layouts and rendering
        views (the <code className="font-mono">.cshtml</code> files), edits to the
        markup the templates generate, not a redesign and not a rebuild:
      </p>
      <pre
        className={`${codeBlock} mt-4`}
        tabIndex={0}
        role="group"
        aria-label="Example markup fixes"
      >
        {fixExample}
      </pre>
      <p className={p}>
        The heading restructure is the biggest piece: it&rsquo;s a matter of moving
        the existing headings to the right levels in the layout views, the same
        place the other fixes live.
      </p>

      <h2 className={h2}>What the audit found</h2>
      <p className="mt-5 text-[1.375rem] font-bold leading-snug tracking-tight text-ink">
        The site doesn&rsquo;t meet WCAG 2.2 Level A, the lowest of the three
        conformance levels.
      </p>
      <p className={p}>
        AA, the level most public-facing sites work toward, sits above A, so the
        site isn&rsquo;t close. Each failure below is a specific success
        criterion, checkable against the standard listed next to it.
      </p>
      <div
        className="mt-6 overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Accessibility findings, scrollable"
      >
        <table className="w-full border-collapse text-left text-base">
          <caption className="sr-only">
            Accessibility failures found on spartanburglibraries.org, with the
            WCAG 2.2 success criterion and conformance level each one breaks.
          </caption>
          <thead>
            <tr className="border-b-2 border-border">
              <th scope="col" className="py-2 pr-4 font-bold text-ink">
                Finding
              </th>
              <th scope="col" className="py-2 pr-4 font-bold text-ink">
                WCAG 2.2 criterion
              </th>
              <th scope="col" className="py-2 font-bold text-ink">
                Level
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border align-top">
              <td className="py-3 pr-4">
                <span className="font-semibold text-ink">No page language</span>
                <span className="mt-0.5 block text-ink-2">
                  <code className="font-mono">&lt;html&gt;</code> has no{" "}
                  <code className="font-mono">lang</code>.
                </span>
              </td>
              <td className="py-3 pr-4 text-ink">3.1.1 Language of Page</td>
              <td className="py-3 font-semibold text-ink">A</td>
            </tr>
            <tr className="border-b border-border align-top">
              <td className="py-3 pr-4">
                <span className="font-semibold text-ink">
                  No heading structure
                </span>
                <span className="mt-0.5 block text-ink-2">
                  No <code className="font-mono">h1</code>; the page starts at an{" "}
                  <code className="font-mono">h5</code>.
                </span>
              </td>
              <td className="py-3 pr-4 text-ink">1.3.1 Info and Relationships</td>
              <td className="py-3 font-semibold text-ink">A</td>
            </tr>
            <tr className="border-b border-border align-top">
              <td className="py-3 pr-4">
                <span className="font-semibold text-ink">Invalid ARIA roles</span>
                <span className="mt-0.5 block text-ink-2">
                  <code className="font-mono">role=&quot;teens&quot;</code> and{" "}
                  <code className="font-mono">role=&quot;kids&quot;</code> are not
                  real roles.
                </span>
              </td>
              <td className="py-3 pr-4 text-ink">4.1.2 Name, Role, Value</td>
              <td className="py-3 font-semibold text-ink">A</td>
            </tr>
            <tr className="border-b border-border align-top">
              <td className="py-3 pr-4">
                <span className="font-semibold text-ink">Unnamed links</span>
                <span className="mt-0.5 block text-ink-2">
                  Empty logo link; icon-only links with no text.
                </span>
              </td>
              <td className="py-3 pr-4 text-ink">
                2.4.4 Link Purpose (In Context)
              </td>
              <td className="py-3 font-semibold text-ink">A</td>
            </tr>
            <tr className="align-top">
              <td className="py-3 pr-4">
                <span className="font-semibold text-ink">Low contrast</span>
                <span className="mt-0.5 block text-ink-2">
                  Buttons about 2.5:1, navigation about 3.3:1.
                </span>
              </td>
              <td className="py-3 pr-4 text-ink">1.4.3 Contrast (Minimum)</td>
              <td className="py-3 font-semibold text-ink">AA</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={h2}>
        The Recite toolbar doesn&rsquo;t fix this, and in places makes it worse
      </h2>
      <p className={p}>
        The site runs the Recite accessibility toolbar. I&rsquo;m sure it was
        added with good intentions; it&rsquo;s sold as a way to make a site
        accessible. So I turned it on and checked whether it does.
      </p>

      <h3 className={h3}>What I found with Recite turned on</h3>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-ink">
        <li>The invalid menu roles were unchanged.</li>
        <li>The unnamed links were unchanged.</li>
        <li>
          A page language got set only after a visitor turns the toolbar on, which
          most never do, and it was set to <code className="font-mono">en-gb</code>,
          British English, for a South Carolina library.
        </li>
        <li>Turning it on swapped out some of the live content on the page.</li>
      </ul>

      <h3 className={h3}>Why an overlay can&rsquo;t fix this</h3>
      <p className={p}>
        Recite loads on top of the finished page. A screen reader reads the page
        underneath it, the HTML the templates produce, and the toolbar
        doesn&rsquo;t change that. Overlays like this don&rsquo;t make a site
        conformant; that&rsquo;s a fairly settled point among people who do
        accessibility work. The problems below are in the markup, so that&rsquo;s
        where they have to be fixed.
      </p>

      <h2 className={h2}>What&rsquo;s actually broken</h2>
      <p className={p}>
        None of this shows up in the toolbar. It shows up when you read the page
        the way a screen reader does. Here&rsquo;s what&rsquo;s there, starting
        with the one you can check yourself.
      </p>

      <h3 className={h3}>Low contrast (you can check this one yourself)</h3>
      <p className={p}>
        Several controls don&rsquo;t put enough contrast between the text and its
        background to be reliably readable, and you don&rsquo;t need any tools to
        see it. Measured live:
      </p>
      <div className="mt-5 divide-y divide-border overflow-hidden rounded-lg border border-border">
        {contrastFails.map((c) => (
          <div
            key={c.where}
            className="flex flex-wrap items-center gap-x-5 gap-y-3 bg-surface p-4"
          >
            <span
              aria-hidden
              className="flex h-11 min-w-[6.5rem] items-center justify-center rounded-md px-4 text-base font-bold"
              style={{ backgroundColor: c.bg, color: c.fg }}
            >
              {c.sample}
            </span>
            <span className="text-lg text-ink">
              <strong className="font-semibold">{c.where}:</strong> {c.detail},
              about {c.ratio}. Below the 4.5:1 minimum.
            </span>
          </div>
        ))}
      </div>
      <p className={p}>
        Those thresholds exist so low-vision and older readers can make the text
        out at all.
      </p>

      <h3 className={h3}>No page heading structure</h3>
      <p className={p}>
        Headings are the skeleton of a page. Screen readers, search engines, and
        reader modes all use them to build an outline and let people jump around.
        The homepage has no <code className="font-mono">h1</code> at all, and its
        first heading is an <code className="font-mono">h5</code> with nothing
        above it. From there the levels jump around. This is the live outline I
        captured:
      </p>
      <figure className="mt-5">
        <div
          className="overflow-x-auto rounded-lg border border-border bg-surface p-5"
          tabIndex={0}
          role="group"
          aria-label="Captured heading outline of the live library homepage"
        >
          <p className="font-mono text-sm font-bold text-ink">
            h1
            <span className="ml-3 font-semibold text-ink-2">
              not present anywhere on the page
            </span>
          </p>
          <ul className="mt-3 space-y-2">
            {capturedOutline.map((hd) => (
              <li
                key={`${hd.level}-${hd.text}`}
                className="flex flex-wrap items-baseline gap-x-3 font-mono text-sm"
                style={{ paddingLeft: `${(hd.level - 1) * 0.9}rem` }}
              >
                <span className="shrink-0 font-bold text-sea-ink">h{hd.level}</span>
                <span className="text-ink">{hd.text}</span>
                {hd.note && <span className="text-ink-2">{hd.note}</span>}
              </li>
            ))}
          </ul>
        </div>
        <figcaption className="mt-2 text-base text-ink-2">
          Captured live from spartanburglibraries.org. Each row is indented to its
          heading level, so the jumps are the structure, or what there is of it.
        </figcaption>
      </figure>
      <p className={p}>
        With no outline to move through, a screen reader user has to read the
        whole page top to bottom to find anything. It should be one{" "}
        <code className="font-mono">h1</code> for the page, with nested{" "}
        <code className="font-mono">h2</code> and <code className="font-mono">h3</code>{" "}
        headings in order under it.
      </p>

      <h3 className={h3}>The rest of the Level A failures</h3>
      <p className={p}>
        These put the site below WCAG 2.2 Level A, the lowest bar there is:
      </p>
      <ul className="mt-4 space-y-3 text-lg leading-relaxed text-ink">
        <li>
          <strong>No page language.</strong> The{" "}
          <code className="font-mono">&lt;html&gt;</code> tag has no{" "}
          <code className="font-mono">lang</code>, so a screen reader can&rsquo;t
          pick the right voice or pronunciation.
        </li>
        <li>
          <strong>Invalid menu roles.</strong> The age-group tabs use{" "}
          <code className="font-mono">role=&quot;teens&quot;</code> and{" "}
          <code className="font-mono">role=&quot;kids&quot;</code>, which
          aren&rsquo;t real ARIA roles, so assistive tech doesn&rsquo;t know
          they&rsquo;re tabs. The live markup:
          <pre
            className={`${codeBlock} mt-3`}
            tabIndex={0}
            role="group"
            aria-label="Live markup: invalid tab roles"
          >
            {`<a href="#teens" aria-controls="teens" role="teens" data-toggle="tab">Teens</a>`}
          </pre>
        </li>
        <li>
          <strong>Unnamed links.</strong> The logo is an empty anchor that uses an{" "}
          <code className="font-mono">alt</code> attribute, which does nothing on a
          link, and several icon links hold only a glyph, so a screen reader
          announces them as just &ldquo;link.&rdquo;
          <pre
            className={`${codeBlock} mt-3`}
            tabIndex={0}
            role="group"
            aria-label="Live markup: unnamed links"
          >
            {`<a href="/" class="logo" alt="Spartanburg County Public Libraries"></a>
<a href="http://catalog.infodepot.org/..."><span class="bi bi-book"></span></a>`}
          </pre>
        </li>
      </ul>

      <footer className="mt-20 border-t border-border pt-8 text-base text-ink-2">
        <p>
          {site.name},{" "}
          <a href="/" className={`inline-block py-1 ${linkStyle}`}>
            christiansyfert.com
          </a>
        </p>
      </footer>
    </main>
  );
}
