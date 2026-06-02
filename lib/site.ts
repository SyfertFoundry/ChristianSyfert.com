/**
 * Single source of truth for atomic site values. Derived from
 * content/source/linkedin-profile.md. Projects that feed the unified work list
 * live as files in content/projects/*.md (see lib/projects.ts).
 * The home page is a showcase, not a pitch: keep copy warm and sparse.
 */

export const site = {
  name: "Christian Syfert",
  role: "AI Engineer & Full-Stack Developer",
  availability: "Open to new work",

  email: "christiansyfert@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/christiansyfert",
  githubUrl: "https://github.com/SyfertFoundry" as string | null,
};

export const mailtoHref = `mailto:${site.email}`;
