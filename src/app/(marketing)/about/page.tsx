import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "About" };

const values = [
  {
    title: "Outcomes over outputs",
    body: "We ship things that move business metrics, not just ship things.",
  },
  {
    title: "Clarity over cleverness",
    body: "Honest communication, predictable timelines, no agency theater.",
  },
  {
    title: "Craft by default",
    body: "Design systems, accessibility, performance — not afterthoughts.",
  },
  {
    title: "Long-term partners",
    body: "Most of our clients stay with us for years. That’s the goal.",
  },
];

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & Creative Director",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
  },
  {
    name: "Dana Park",
    role: "Head of Engineering",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
  },
  {
    name: "Jordan Lee",
    role: "Principal Designer",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
  },
  {
    name: "Sam Patel",
    role: "SEO & Growth Lead",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-accent">About</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            A small team of designers, engineers, and strategists.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We started in 2017 with a simple idea: most agencies are hard to work with. We wanted to
            build one we’d actually hire. Today we partner with teams from early-stage startups to
            publicly-traded companies — all of them looking for a calmer, more effective way to ship
            great web work.
          </p>
        </header>
      </section>

      <section className="border-y bg-secondary/30">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold">What we believe</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border bg-background p-6">
                <h3 className="text-base font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-2xl font-semibold">The team</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="text-center">
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border">
                <Image src={m.image} alt={m.name} fill className="object-cover" />
              </div>
              <div className="mt-4 font-semibold">{m.name}</div>
              <div className="text-sm text-muted-foreground">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <div className="rounded-2xl border bg-card p-10 text-center">
          <h2 className="text-2xl font-semibold">Want to work with us?</h2>
          <p className="mt-2 text-muted-foreground">
            We take on a handful of new projects each quarter.
          </p>
          <Button asChild className="mt-6">
            <Link href="/contact">Start a project</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
