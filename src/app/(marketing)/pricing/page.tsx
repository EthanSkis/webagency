import Link from "next/link";
import { Check } from "lucide-react";

import { plans, carePlans } from "@/content/pricing";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="container py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-accent">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">Transparent, fixed-scope pricing.</h1>
        <p className="mt-4 text-muted-foreground">
          Every project starts with a fixed scope and fixed price. No hourly surprises.
        </p>
      </header>

      <section className="mt-16">
        <h2 className="text-xl font-semibold">Website projects</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-xl font-semibold">Ongoing care plans</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          After launch, keep your site secure, fast, and continuously improving.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {carePlans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-2xl border bg-secondary/30 p-8 text-center">
        <h2 className="text-2xl font-semibold">Need something custom?</h2>
        <p className="mt-2 text-muted-foreground">
          Enterprise builds, integrations, and multi-year partnerships. Let’s talk.
        </p>
        <Button asChild className="mt-6">
          <Link href="/contact">Request a proposal</Link>
        </Button>
      </section>
    </div>
  );
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const intervalLabel =
    plan.interval === "monthly" ? "/mo" : plan.interval === "yearly" ? "/yr" : "";
  return (
    <div
      className={`flex flex-col rounded-2xl border bg-card p-6 ${
        plan.featured ? "ring-2 ring-accent" : ""
      }`}
    >
      {plan.featured && (
        <div className="mb-4 inline-flex w-fit rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
          Most popular
        </div>
      )}
      <h3 className="text-lg font-semibold">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      <div className="mt-6">
        <span className="text-4xl font-bold">{formatCurrency(plan.priceCents)}</span>
        <span className="text-sm text-muted-foreground">{intervalLabel}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-2 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-accent" />
            {f}
          </li>
        ))}
      </ul>
      <Button asChild className="mt-6" variant={plan.featured ? "default" : "outline"}>
        <Link href={`/contact?plan=${plan.slug}`}>Get started</Link>
      </Button>
    </div>
  );
}
