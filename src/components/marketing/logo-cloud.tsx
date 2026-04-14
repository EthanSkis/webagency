const logos = [
  "Northwind",
  "Brightloop",
  "Aster Health",
  "Orbital",
  "Fernway",
  "Harbor & Co.",
];

export function LogoCloud() {
  return (
    <section className="border-y bg-secondary/30">
      <div className="container py-10">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by ambitious teams
        </p>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-6">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center text-sm font-semibold text-muted-foreground/80"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
