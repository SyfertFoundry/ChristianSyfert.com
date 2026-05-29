"use client";

import { useEffect } from "react";

/**
 * Adds `.reveal-in` to every `[data-reveal]` element as it scrolls into view,
 * driving the choreographed entrance defined in globals.css.
 *
 * Accessibility contract:
 *  - The `anim` class is only on <html> when JS is on AND reduced motion is OFF
 *    (set by an inline head script). If it's absent, this observer no-ops and
 *    the CSS leaves all content fully visible. Nothing is ever JS-gated.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("anim")) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
