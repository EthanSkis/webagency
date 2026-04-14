import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="container py-20">
      <div className="overflow-hidden rounded-2xl border bg-primary p-10 text-primary-foreground md:p-16">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Ready to build something great?</h2>
            <p className="mt-3 text-primary-foreground/80">
              Tell us about your project. We’ll reply within one business day with next steps.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
