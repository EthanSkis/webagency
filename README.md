# Pixelcraft Agency — Full-Stack Web Agency Platform

A production-ready starter for a web agency that sells website services. It combines a modern
marketing site, a logged-in client portal, an admin panel, Stripe-powered invoicing, transactional
email, and a content system — all in a single Next.js 14 app.

## What's included

**Marketing site** — home, services (with per-service pages), portfolio/case studies, pricing,
about, blog, contact form, privacy/terms, sitemap, robots.

**Client portal** (auth-gated) — dashboard, projects with milestones and files, invoices (with
Stripe Checkout for online payment), support tickets with two-way messaging.

**Admin panel** (role-gated) — lead inbox with status pipeline, client list, project list, invoice
list, ticket list, and ops dashboard metrics.

**API + platform** — Auth.js v5 (credentials + Google/GitHub), Prisma + PostgreSQL, Stripe
checkout and webhooks, Resend/SMTP email with a dev-log fallback, newsletter capture, honeypot-
protected contact form, health check.

## Tech stack

| Layer         | Tool                                                     |
| ------------- | -------------------------------------------------------- |
| Framework     | Next.js 14 (App Router) · TypeScript · React 18          |
| Styling       | Tailwind CSS · Radix primitives · shadcn-style components |
| Auth          | Auth.js v5 (NextAuth) with Prisma adapter                |
| Database      | PostgreSQL via Prisma ORM                                |
| Payments      | Stripe Checkout + webhooks                               |
| Email         | Resend (primary) or SMTP (fallback) with dev console log |
| Forms         | react-hook-form + zod                                    |
| Icons         | lucide-react                                             |

## Getting started

### 1. Prerequisites
- Node.js ≥ 18.18
- Docker (optional, for local Postgres + Mailhog)

### 2. Install

```bash
npm install
cp .env.example .env
```

Fill in `AUTH_SECRET` (`openssl rand -base64 32`). OAuth, Stripe, and email keys are optional for
local development.

### 3. Start local services (optional but recommended)

```bash
docker compose up -d
```

This boots PostgreSQL on `localhost:5432` and Mailhog (SMTP catcher) at `http://localhost:8025`.
To use Mailhog, set in `.env`:

```
SMTP_HOST=localhost
SMTP_PORT=1025
```

### 4. Migrate + seed

```bash
npm run db:push     # sync schema to the database
npm run db:seed     # creates admin + demo client + demo project/invoices/lead
```

The seed prints credentials to stdout. Defaults:

```
Admin:  admin@example.com / change-me-now
Client: demo@client.com   / demo12345
```

### 5. Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Routes map

### Public (marketing)
- `/` — Home
- `/services` and `/services/[slug]`
- `/portfolio` and `/portfolio/[slug]`
- `/pricing`, `/about`, `/blog`, `/blog/[slug]`, `/contact`, `/privacy`, `/terms`

### Auth
- `/login`, `/register`

### Client portal (signed-in)
- `/dashboard` — overview with KPIs
- `/projects` and `/projects/[slug]` — milestones, files, invoices
- `/invoices` and `/invoices/[id]` — pay with Stripe
- `/support`, `/support/new`, `/support/[id]` — two-way ticket messages

### Admin (role: ADMIN)
- `/admin` — ops dashboard
- `/admin/leads` — inquiry inbox + pipeline
- `/admin/clients`, `/admin/projects`, `/admin/invoices`, `/admin/tickets`

### API
- `POST /api/contact` — lead capture (honeypot-protected)
- `POST /api/newsletter` — newsletter subscribe
- `POST /api/auth/register` — account creation
- `GET|POST /api/auth/[...nextauth]` — Auth.js
- `POST /api/stripe/checkout` — create Checkout session for an invoice
- `POST /api/webhooks/stripe` — mark invoices paid on completion
- `GET /api/health` — healthcheck

## Stripe webhooks (local)

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Put the printed `whsec_...` into `STRIPE_WEBHOOK_SECRET` in `.env`.

## Scripts

| Command                | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Next dev server                                      |
| `npm run build`        | Production build                                     |
| `npm run start`        | Start built app                                      |
| `npm run typecheck`    | `tsc --noEmit`                                       |
| `npm run lint`         | ESLint (Next config)                                 |
| `npm run db:generate`  | Prisma client                                        |
| `npm run db:push`      | Sync schema (no migration file)                      |
| `npm run db:migrate`   | Create + apply a named migration                     |
| `npm run db:deploy`    | Apply migrations (production)                        |
| `npm run db:seed`      | Seed demo data                                       |
| `npm run db:studio`    | Prisma Studio UI                                     |

## Deploying

The app is a standard Next.js project. Recommended targets:

- **Vercel** for the app (set all env vars; point `DATABASE_URL` at a managed Postgres).
- **Neon**, **Supabase**, **Railway**, or **RDS** for PostgreSQL.
- **Resend** for transactional email.
- **Stripe** for payments (add the webhook `https://yourdomain.com/api/webhooks/stripe`).

Before going live:
1. Replace the placeholder copy in `src/lib/site.ts`, `/privacy`, `/terms`.
2. Swap the demo case studies and blog posts in `src/content/*`.
3. Run `npm run db:migrate -- --name init` and `npm run db:deploy` on the production DB.
4. Set `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`, `STRIPE_WEBHOOK_SECRET` in the host's env.
5. Smoke test the critical paths: contact form → lead created, register → dashboard, invoice →
   Stripe Checkout → webhook flips status to PAID.

## Project layout

```
src/
  app/
    (marketing)/      # Public pages + layout
    (auth)/           # /login, /register
    (portal)/         # Client dashboard, projects, invoices, support, admin/*
    api/              # Route handlers: contact, newsletter, auth, stripe
    globals.css
    layout.tsx
    robots.ts
    sitemap.ts
  components/
    marketing/        # Hero, services grid, testimonials, contact form, etc.
    portal/           # Sidebar
    ui/               # Button, Input, Card, Badge, Label, Textarea
  content/            # Static site content: services, pricing, portfolio, blog
  lib/                # auth, db, email, stripe, site, utils, validators
  middleware.ts       # Edge gate for portal/admin routes
prisma/
  schema.prisma
  seed.ts
```

## License

MIT — use it, fork it, ship it.
