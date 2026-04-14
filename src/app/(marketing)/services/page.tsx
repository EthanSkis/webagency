import Link from "next/link";
import { services } from "@/content/services";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Services" };

export default function ServicesIndexPage() {
  return (
    <div className="container py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-accent">Services</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">Everything your website needs.</h1>
        <p className="mt-4 text-muted-foreground">
          Pick the services that fit — or let us handle the whole thing end-to-end.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group rounded-xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <span className="text-sm text-muted-foreground">
                from {formatCurrency(s.priceFromCents)}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
            <p className="mt-4 text-sm">{s.summary}</p>
            <span className="mt-4 inline-block text-sm font-medium text-accent group-hover:underline">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
