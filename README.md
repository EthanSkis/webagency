# Pixelcraft Agency — Static Marketing Site

Marketing site for a web agency, built with Next.js 14 and deployed as a fully static export to
**GitHub Pages**. The dynamic backend (auth, client portal, admin panel, API routes, Stripe
invoicing, email) is currently disabled but preserved in git history — the previous commit
(`29f83b6`) contains the full-stack version, which you can restore when you're ready to host on a
Node runtime.

## What's included

- Home with hero, logo cloud, services grid, process, testimonials, CTA.
- Per-service detail pages (`/services/[slug]`).
- Portfolio / case studies (`/portfolio/[slug]`).
- Pricing (project packages + care plans).
- About, blog (`/blog/[slug]`), privacy, terms.
- Contact form that opens the visitor's mail client (no backend required).
- Automatic `sitemap.xml` and `robots.txt`.

## Tech stack

Next.js 14 (App Router, static export) · TypeScript · Tailwind CSS · Radix/shadcn-style UI · Zod
+ react-hook-form · lucide-react.

## Quick start (local)

```bash
npm install
npm run dev           # http://localhost:3000
```

## Build the static site

```bash
npm run build         # outputs to ./out
```

To preview the output exactly as GitHub Pages will serve it (under a `/webagency` subpath):

```bash
NEXT_PUBLIC_BASE_PATH=/webagency \
NEXT_PUBLIC_APP_URL=https://<you>.github.io/webagency \
npm run build

npx http-server out -p 3001
# then open http://localhost:3001/webagency/
```

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds the site and publishes
   it to Pages automatically. It derives the base path and public URL from the repo name, so you
   don't need to configure anything else for a standard project Pages deployment.

The published site will live at `https://<your-github-username>.github.io/<repo-name>/`.

### Custom domain

If you point a custom domain at Pages:
1. Add a `CNAME` file to `public/` containing your domain.
2. Remove or blank `NEXT_PUBLIC_BASE_PATH` in the workflow (domains serve from root).
3. Set `NEXT_PUBLIC_APP_URL` to `https://yourdomain.com`.

## Environment variables

| Var                       | Purpose                                                          |
| ------------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`     | Public origin, used for sitemap/OG tags                          |
| `NEXT_PUBLIC_BASE_PATH`   | Subpath prefix (e.g. `/webagency`) when hosted on a project path |

The GitHub Actions workflow sets both automatically from the repo name.

## Customizing content

All site copy is static TypeScript — no CMS required. Edit:

- `src/lib/site.ts` — brand name, tagline, contact info, nav.
- `src/content/services.ts` — the 6 services (title, price, timeline, deliverables).
- `src/content/pricing.ts` — project packages + care plans.
- `src/content/portfolio.ts` — case studies.
- `src/content/blog.ts` — blog posts (inline markdown-ish content).

## Backend — how to re-enable later

The full-stack version (Auth.js, Prisma + Postgres, Stripe checkout, client portal, admin panel,
transactional email, contact-form API) was stripped to make the site static-exportable. To bring
it back:

1. `git checkout 29f83b6 -- prisma src/app/api src/app/\(auth\) src/app/\(portal\) src/lib/auth.ts src/lib/db.ts src/lib/email.ts src/lib/stripe.ts src/middleware.ts src/components/providers.tsx src/components/portal`
2. Restore backend deps in `package.json` (`next-auth`, `@auth/prisma-adapter`, `@prisma/client`,
   `prisma`, `bcryptjs`, `stripe`, `resend`, `nodemailer`, plus types).
3. Remove `output: "export"` and the `basePath` config from `next.config.js`.
4. Remove `NEXT_PUBLIC_BASE_PATH` from `Link` / asset paths (Next handles this automatically
   without it).
5. Deploy to a Node host (Vercel, Railway, Fly.io) with a managed Postgres.

## Project layout

```
src/
  app/
    (marketing)/       # All public pages
    globals.css
    layout.tsx
    robots.ts
    sitemap.ts
  components/
    marketing/         # Hero, services grid, testimonials, contact form, …
    ui/                # Button, Input, Card, Badge, Label, Textarea
  content/             # Services, pricing, portfolio, blog (static TS)
  lib/                 # site config, utils, zod validators
.github/workflows/
  deploy.yml           # Builds + deploys to GitHub Pages
public/
  .nojekyll            # Tells Pages not to run Jekyll on the output
```

## License

MIT — use it, fork it, ship it.
