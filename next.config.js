// Static export config for GitHub Pages.
// The backend (auth, API routes, database) has been disabled; this config
// produces a fully static site in `out/` that can be served by GitHub Pages,
// Cloudflare Pages, Netlify, S3, or any static host.
//
// When hosting under a subpath (e.g. GitHub project pages at
// https://<user>.github.io/<repo>/), set NEXT_PUBLIC_BASE_PATH=/<repo>
// before building. The GitHub Actions workflow in .github/workflows/deploy.yml
// does this automatically.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // next/image optimization requires a server; disable for static export.
    unoptimized: true,
  },
};

module.exports = nextConfig;
