import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site for SEO + Netlify CDN. See ARCHITECTURE.md.
  output: "export",
  // `output: export` disables the on-request image optimizer; images are
  // pre-optimized at build time instead (ARCHITECTURE.md > Images).
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
