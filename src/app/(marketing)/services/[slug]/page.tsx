import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { getService, services } from "@/content/services";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  return { title: s?.title ?? "Service", description: s?.summary };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <div className="container py-16">
      <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">
        ← All services
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium text-accent">{service.title}</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{service.tagline}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{service.summary}</p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">What you get</h2>
          <ul className="mt-4 space-y-3">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-accent" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-xl border bg-card p-6">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Investment</dt>
              <dd className="mt-1 text-2xl font-bold">from {formatCurrency(service.priceFromCents)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Timeline</dt>
              <dd className="mt-1 font-semibold">{service.timeline}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Stack</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {service.tech.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <Button asChild className="mt-6 w-full">
            <Link href={`/contact?service=${service.slug}`}>Request a quote</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
