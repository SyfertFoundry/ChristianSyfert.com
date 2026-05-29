/**
 * Single source of truth for atomic site values + the project entries that feed
 * the unified work list. Derived from content/source/linkedin-profile.md.
 * The home page is a showcase, not a pitch: keep copy warm and sparse.
 */

export const site = {
  name: "Christian Syfert",
  role: "AI Engineer & Full-Stack Developer",
  availability: "Open to new work",

  email: "christiansyfert@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/christiansyfert",
  githubUrl: null as string | null, // TODO: add GitHub profile URL when ready
};

export const mailtoHref = `mailto:${site.email}`;

/**
 * Projects for the unified work feed. Add a `live` or `source` URL and the item
 * becomes clickable and (for `live`) grows a gentle "live" pulse automatically.
 * Until then it shows quietly with its status. No broken links ever ship.
 */
export interface Project {
  title: string;
  blurb: string;
  date: string; // ISO; orders the unified feed
  status?: string;
  live?: string | null;
  source?: string | null;
}

export const projects: Project[] = [
  {
    title: "WhisperForm",
    blurb:
      "A conversational form that replaces dead lead-capture with actual dialogue. An agentic loop with strict tool-calling and schema-locked output.",
    date: "2026-04-01",
    status: "Building now",
    live: null, // TODO: add when live → lights up with a pulse
    source: null, // TODO
  },
  {
    title: "Enterprise document intelligence",
    blurb:
      "A fine-tuned model that read the documents a Fortune 500 used to process by hand. Weeks of work, down to hours. I built nearly all of it.",
    date: "2025-12-01",
    status: "The story, soon",
    live: null, // under NDA; the write-up will live in the articles
    source: null,
  },
  // Earlier work (Counsel ’n Co, counselling roles) lives on LinkedIn. The home
  // stays tight; add entries here as they earn a place in the showcase.
];
