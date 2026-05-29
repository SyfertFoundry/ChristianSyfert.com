import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import "./globals.css";

// Atkinson Hyperlegible: designed by the Braille Institute for maximum
// legibility, including for low-vision readers. The typeface is part of the
// argument here, not just decoration.
const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://christiansyfert.com"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Christian Syfert is an AI engineer and full-stack developer building fine-tuned models, agentic architectures, and LLM pipelines. Accessibility-first, developed entirely through a screen reader.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description:
      "AI engineer and full-stack developer. Fine-tuned models, agentic architectures, and LLM pipelines, built accessibility-first.",
    url: "https://christiansyfert.com",
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.name },
  robots: { index: true, follow: true },
};

// Enable choreographed motion only when JS is on AND the user hasn't asked for
// reduced motion. Runs before paint so there's no flash of pre-animation state.
const motionGate = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${atkinson.variable} ${atkinson.className}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
