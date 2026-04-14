import Link from "next/link";
import { Code2, PaintBucket, ShoppingBag, Search, LifeBuoy, LineChart } from "lucide-react";

const services = [
  {
    icon: PaintBucket,
    title: "Web Design",
    summary: "Brand-aligned, conversion-focused designs that feel unmistakably you.",
    href: "/services/web-design",
  },
  {
    icon: Code2,
    title: "Web Development",
    summary: "Fast, accessible, SEO-friendly builds on Next.js, headless CMS, and modern tooling.",
    href: "/services/web-development",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    summary: "Shopify, Stripe, and headless storefronts that sell while you sleep.",
    href: "/services/ecommerce",
  },
  {
    icon: Search,
    title: "SEO & Growth",
    summary: "Technical SEO, content strategy, and analytics that compound over time.",
    href: "/services/seo",
  },
  {
    icon: LifeBuoy,
    title: "Care Plans",
    summary: "Hosting, security, backups, and monthly improvements — we keep it running.",
    href: "/services/care-plans",
  },
  {
    icon: LineChart,
    title: "CRO & Analytics",
    summary: "Measure what matters, iterate on what moves the needle.",
    href: "/services/cro",
  },
];

export function ServicesGrid() {
  return (
    <section className="container py-20">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium text-accent">What we do</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Everything a modern website needs.</h2>
        <p className="mt-4 text-muted-foreground">
          Strategy, design, engineering, and care under one roof. Pick the pieces you need — or let us
          handle it end-to-end.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group rounded-xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
            <span className="mt-4 inline-block text-sm font-medium text-accent group-hover:underline">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
