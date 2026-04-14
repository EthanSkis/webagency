import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-radial absolute inset-0 -z-10" />
      <div className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Booking projects for Q3
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Websites that <span className="text-accent">grow</span> your business.
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl">
            We design, build, and maintain high-performance websites that win customers and make your
            team proud — without the usual agency drama.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">See our work</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Trusted by 120+ teams · Average launch time: 6 weeks · 4.9★ client rating
          </p>
        </div>
      </div>
    </section>
  );
}
