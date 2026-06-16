import type { Metadata } from "next";
import ExternalLink from "@/components/ExternalLink";

// Standalone evidence page, shared by direct link only. It deliberately does
// NOT use SiteHeader/SiteFooter: the page sits outside the portfolio so its
// single <h1> is the report title and the document outline stays clean and
// demonstrable. noindex/nofollow so it never ranks against the library.
export const metadata: Metadata = {
  title: { absolute: "Accessibility review of spartanburglibraries.org" },
  description:
    "A Spartanburg County library patron's accessibility review of the library website, with a live technical audit and template-level fixes.",
  robots: { index: false, follow: false },
};

// The library's live heading outline, captured as data so it never injects real
// heading levels into THIS page's outline (which is the whole demonstration).
const brokenOutline = `(no <h1> anywhere on the page)

h5   Browse by Age Group          first heading on the page, nothing above it
h3   Upcoming Events & Programs
h3   General Announcements
h3   New Books
h5   African-American History
h5   OverDrive eBooks & audiobooks
h3   More from the Library
h4   Kennedy Room of Local History
h4   Library Cards
h3   Get in touch with us
...   (the h5 to h3 to h5 to h3 to h4 pattern repeats across the
       Adults, Teens and Kids tab panels)
h3   New York Times Best Sellers   appears 4 times
h3   Get in touch with us          appears 4 times
h3   Loading events...             placeholder text, never updated`;

const fixExample = `<!-- 1. Page language: one line in the site layout / master page -->
<html lang="en">                 <!-- currently: <html> with no lang -->

<!-- 2. Heading hierarchy: one h1, then nested levels in order -->
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
  "mt-16 scroll-mt-8 text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-tight text-ink";
const h3 = "mt-8 text-xl font-bold tracking-tight text-sea-ink";
const p = "mt-4 text-lg leading-relaxed text-ink";

export default function SpartanburgAccessibilityReview() {
  return (
    <main id="main" className="mx-auto w-full max-w-[68ch] px-6 py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-amber-deep">
        Accessibility review &middot; June 2026
      </p>

      <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-ink">
        Accessibility review of spartanburglibraries.org
      </h1>

      <p className="mt-6 text-xl leading-relaxed text-ink-2">
        I&rsquo;m a Spartanburg County library patron, and I&rsquo;m blind. I use
        a screen reader every day, the software that reads a web page aloud and
        lets me move around it. I went to the library&rsquo;s website to do
        something simple and couldn&rsquo;t, so I ran a technical audit to back up
        what I ran into. This page is what I found, in plain terms, with the fixes.
      </p>

      <p className={p}>
        One thing to try first: with your screen reader, pull up the list of
        headings on this page and jump between them. Notice that you always know
        where you are and what each section is. That is the experience the library
        site does not give. Here is why, and how to fix it.
      </p>

      <h2 className={h2}>The short version</h2>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-ink">
        <li>
          The site fails <strong>WCAG 2.2 Level A</strong>, the baseline bar that
          comes before AA and AAA.
        </li>
        <li>
          The main blockers: no heading structure, no page language, invalid menu
          roles, and unnamed links.
        </li>
        <li>
          <strong>The Recite accessibility toolbar does not fix any of these.</strong>{" "}
          I tested it live; the proof is below.
        </li>
      </ul>

      <h2 className={h2}>Who this affects</h2>
      <p className={p}>
        Spartanburg County is home to about <strong>328,000</strong> residents
        (2020 Census). Being conservative about it:
      </p>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-ink">
        <li>
          About <strong>15,700</strong> residents are blind or have serious
          difficulty seeing (CDC, roughly 4.8 percent). These are people directly
          blocked: headings, labels, and page language are exactly how we navigate.
        </li>
        <li>
          About <strong>85,000</strong> have a disability of some kind (CDC, about
          1 in 4 adults). Many of them benefit from these same fixes.
        </li>
        <li>
          About <strong>59,000</strong> are 65 or older, with rising vision and
          dexterity needs, and they are heavy library users.
        </li>
      </ul>
      <p className={p}>
        Not everyone hits every barrier. But these specific issues are the ones
        screen reader and keyboard users depend on, so on the order of{" "}
        <strong>10,000 or more county residents are directly hindered</strong>, and
        good structure quietly helps everyone else too: mobile users, search
        ranking, and anyone skimming in a hurry.
      </p>
      <p className="mt-4 text-base text-ink-2">
        Sources:{" "}
        <ExternalLink
          href="https://dhds.cdc.gov/"
          className="font-semibold text-sea-ink underline decoration-border decoration-2 underline-offset-4 hover:decoration-amber"
        >
          CDC Disability and Health Data System
        </ExternalLink>{" "}
        and{" "}
        <ExternalLink
          href="https://www.census.gov/quickfacts/spartanburgcountysouthcarolina"
          className="font-semibold text-sea-ink underline decoration-border decoration-2 underline-offset-4 hover:decoration-amber"
        >
          U.S. Census QuickFacts (Spartanburg County, SC)
        </ExternalLink>
        .
      </p>

      <h2 className={h2}>The biggest problem: no heading structure</h2>
      <p className={p}>
        Headings are how a screen reader user skims a page, the way a sighted
        person&rsquo;s eye jumps around. I press one key to list every heading and
        move between them. On this site there is no top-level heading and the
        levels jump around, so there is no outline to move through. I have to read
        the whole page top to bottom to find anything. It is a table of contents
        with the chapters shuffled and the title missing.
      </p>
      <p className={p}>
        Here is the actual heading outline I captured from the live homepage:
      </p>
      <figure className="mt-4">
        <pre className={codeBlock} aria-label="Captured heading outline of the live library homepage">
          {brokenOutline}
        </pre>
        <figcaption className="mt-2 text-base text-ink-2">
          Captured live from spartanburglibraries.org. There is no{" "}
          <code className="font-mono">h1</code>, and the first heading on the page
          is an <code className="font-mono">h5</code> with no <code className="font-mono">h2</code> to{" "}
          <code className="font-mono">h4</code> above it.
        </figcaption>
      </figure>
      <p className={p}>
        It should be one <code className="font-mono">h1</code> for the page, with
        nested <code className="font-mono">h2</code> and <code className="font-mono">h3</code> headings in
        order under it. The fixes section shows how.
      </p>

      <h2 className={h2}>Other Level A problems</h2>

      <h3 className={h3}>No page language</h3>
      <p className={p}>
        The <code className="font-mono">&lt;html&gt;</code> tag has no{" "}
        <code className="font-mono">lang</code> attribute, so a screen reader
        can&rsquo;t choose the right voice or pronunciation for the page.
      </p>

      <h3 className={h3}>Invalid menu roles</h3>
      <p className={p}>
        The age-group tabs use <code className="font-mono">role=&quot;teens&quot;</code> and{" "}
        <code className="font-mono">role=&quot;kids&quot;</code>. Those are not real ARIA
        roles, so assistive technology doesn&rsquo;t know they&rsquo;re tabs. The
        live markup is literally:
      </p>
      <pre className={`${codeBlock} mt-4`}>
        {`<a href="#teens" aria-controls="teens" role="teens" data-toggle="tab">Teens</a>`}
      </pre>

      <h3 className={h3}>Unnamed links</h3>
      <p className={p}>
        The logo link and several icon links have no text or label, so a screen
        reader announces them as just &ldquo;link.&rdquo; The logo is an empty
        anchor that uses an <code className="font-mono">alt</code> attribute, which
        does nothing on a link, and the catalog, learning-tools, and downloadables
        links contain only an icon glyph:
      </p>
      <pre className={`${codeBlock} mt-4`}>
        {`<a href="/" class="logo" alt="Spartanburg County Public Libraries"></a>
<a href="http://catalog.infodepot.org/..."><span class="bi bi-book"></span></a>`}
      </pre>

      <h3 className={h3}>Low contrast</h3>
      <p className={p}>
        Several controls fall below the 4.5:1 minimum that text needs to be
        readable. Measured live:
      </p>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-ink">
        <li>
          The orange action buttons (&ldquo;Account,&rdquo; &ldquo;Go!,&rdquo;
          &ldquo;Sign Up&rdquo;): white text on orange measures about{" "}
          <strong>2.5:1</strong>.
        </li>
        <li>
          The main navigation links (Home, Events, Locations, Contact and the
          rest): grey text on a near-white bar measures about <strong>3.3:1</strong>.
        </li>
        <li>
          The &ldquo;children&rsquo;s storytime events!&rdquo; promo: white text on
          green measures about <strong>2.3:1</strong>.
        </li>
      </ul>

      <h2 className={h2}>About the Recite toolbar (tested live)</h2>
      <p className={p}>
        The site includes the Recite accessibility toolbar, which I know was added
        in good faith. I turned it on and re-checked the same issues:
      </p>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-ink">
        <li>The invalid menu roles were unchanged.</li>
        <li>The unnamed links were unchanged.</li>
        <li>
          A page language was added only after I activated the toolbar, which most
          visitors never do, and it was set to <code className="font-mono">en-gb</code>,
          British English, for a South Carolina library.
        </li>
      </ul>
      <p className={p}>
        It is a layer on top of the page; it can&rsquo;t fix the structure
        underneath, and it even swaps out some live content when enabled. It
        doesn&rsquo;t move the site toward conformance.
      </p>

      <h2 className={h2}>How to fix it</h2>
      <p className={p}>
        Your stack is C# and .NET, so these live in your Razor views
        (<code className="font-mono">.cshtml</code>), Web Forms master pages
        (<code className="font-mono">.aspx</code>), or CMS templates. They&rsquo;re
        changes to the markup that gets generated, not a rebuild:
      </p>
      <pre className={`${codeBlock} mt-4`}>{fixExample}</pre>
      <p className={p}>
        These are template-level edits, not a redesign. The heading restructure is
        the biggest lift, but it&rsquo;s structural: it&rsquo;s the markup, not the
        look.
      </p>

      <h2 className={h2}>Want help?</h2>
      <p className={p}>
        I&rsquo;m happy to walk through any of this or help prioritize it. I just
        want the library to work for everyone who uses it. If it&rsquo;s useful, I
        can pull the full per-element findings together too.
      </p>

      <footer className="mt-20 border-t border-border pt-8 text-base text-ink-2">
        <a
          href="/"
          className="font-semibold text-sea-ink underline decoration-border decoration-2 underline-offset-4 hover:decoration-amber"
        >
          &mdash; Christian Syfert
        </a>
      </footer>
    </main>
  );
}
