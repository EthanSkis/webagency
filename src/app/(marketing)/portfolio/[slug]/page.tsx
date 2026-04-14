import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { caseStudies, getCaseStudy } from "@/content/portfolio";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getCaseStudy(params.slug);
  return { title: c?.title ?? "Case study" };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();

  return (
    <div className="container max-w-4xl py-16">
      <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground">
        ← All work
      </Link>

      <header className="mt-6">
        <p className="text-sm font-medium text-accent">
          {c.client} · {c.industry}
        </p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{c.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{c.summary}</p>
      </header>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border">
        <Image src={c.cover} alt={c.title} fill className="object-cover" priority />
      </div>

      <div className="mt-10 grid gap-4 rounded-xl border bg-card p-6 md:grid-cols-3">
        {c.metrics.map((m) => (
          <div key={m.label}>
            <div className="text-3xl font-bold text-accent">{m.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 prose prose-neutral max-w-none dark:prose-invert">
        <h2>The challenge</h2>
        <p>
          {c.client} came to us with a site that looked dated and struggled on mobile. Bounce rates
          were climbing and the marketing team had no control over content.
        </p>
        <h2>What we did</h2>
        <ul>
          {c.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h2>The outcome</h2>
        <p>
          Weeks after launch, the numbers spoke for themselves. See the metrics above. The team now
          ships content updates in minutes, not days.
        </p>
      </div>

      <div className="mt-12 flex gap-3">
        <Button asChild>
          <Link href="/contact">Start a project like this</Link>
        </Button>
        {c.liveUrl && (
          <Button asChild variant="outline">
            <Link href={c.liveUrl} target="_blank" rel="noreferrer">
              Visit live site ↗
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
