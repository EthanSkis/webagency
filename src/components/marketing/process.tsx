const steps = [
  {
    n: "01",
    title: "Discovery",
    body: "We align on goals, audience, and success metrics. You leave the kickoff with a clear plan.",
  },
  {
    n: "02",
    title: "Design",
    body: "Wireframes and brand-aligned high-fidelity designs in Figma — reviewed collaboratively.",
  },
  {
    n: "03",
    title: "Build",
    body: "Weekly demos, staging environments, and a proper handoff (not a zip file in your inbox).",
  },
  {
    n: "04",
    title: "Launch & grow",
    body: "We ship, measure, and iterate. Optional care plans keep the site secure, fast, and improving.",
  },
];

export function Process() {
  return (
    <section className="border-y bg-secondary/30">
      <div className="container py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium text-accent">How we work</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">A process built on clarity.</h2>
          <p className="mt-4 text-muted-foreground">
            Short feedback loops, weekly demos, and zero surprises. You always know where your project stands.
          </p>
        </div>
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-xl border bg-background p-6">
              <div className="text-sm font-semibold text-accent">{s.n}</div>
              <div className="mt-2 text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
