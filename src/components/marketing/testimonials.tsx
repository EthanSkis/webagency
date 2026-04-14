const quotes = [
  {
    quote:
      "They replatformed our site in 6 weeks. Organic traffic is up 38% and conversion nearly doubled.",
    author: "Maya Chen",
    role: "Head of Marketing, Northwind",
  },
  {
    quote:
      "The team feels like an extension of ours. Clear communication, pragmatic choices, beautiful work.",
    author: "James Okafor",
    role: "Founder, Brightloop",
  },
  {
    quote:
      "Our old site took 6 seconds to load. The new one is under 1. Bounce rate dropped off a cliff.",
    author: "Priya Shah",
    role: "COO, Aster Health",
  },
];

export function Testimonials() {
  return (
    <section className="container py-20">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium text-accent">Clients</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Teams like yours, shipping better work.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {quotes.map((q) => (
          <figure key={q.author} className="rounded-xl border bg-card p-6">
            <blockquote className="text-base text-foreground">“{q.quote}”</blockquote>
            <figcaption className="mt-6 text-sm">
              <div className="font-semibold">{q.author}</div>
              <div className="text-muted-foreground">{q.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
