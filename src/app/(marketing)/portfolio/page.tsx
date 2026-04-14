import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/content/portfolio";

export const metadata = { title: "Our Work" };

export default function PortfolioPage() {
  return (
    <div className="container py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-accent">Our work</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">Recent launches.</h1>
        <p className="mt-4 text-muted-foreground">
          A selection of projects across SaaS, e-commerce, healthcare, and nonprofit.
        </p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {caseStudies.map((c) => (
          <Link
            key={c.slug}
            href={`/portfolio/${c.slug}`}
            className="group overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={c.cover}
                alt={c.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {c.client} · {c.industry}
              </div>
              <h2 className="mt-2 text-xl font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
              <div className="mt-4 flex gap-4">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-lg font-bold text-accent">{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
