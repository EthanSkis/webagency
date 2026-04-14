import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Circle, FileText } from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const session = await auth();
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      milestones: { orderBy: { order: "asc" } },
      invoices: { orderBy: { issuedAt: "desc" } },
      files: { orderBy: { uploadedAt: "desc" } },
    },
  });

  if (!project || (project.clientId !== session!.user.id && session!.user.role !== "ADMIN")) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
          ← All projects
        </Link>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="mt-1 max-w-2xl text-muted-foreground">{project.description}</p>
            )}
          </div>
          <Badge variant="info">{project.status.replace("_", " ")}</Badge>
        </div>
      </div>

      <section className="grid gap-4 rounded-xl border bg-card p-6 md:grid-cols-4">
        <Fact label="Start" value={formatDate(project.startDate)} />
        <Fact label="Due" value={project.dueDate ? formatDate(project.dueDate) : "—"} />
        <Fact label="Launched" value={project.launchDate ? formatDate(project.launchDate) : "—"} />
        <Fact
          label="Budget"
          value={project.budgetCents ? formatCurrency(project.budgetCents) : "—"}
        />
      </section>

      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Milestones</h2>
        {project.milestones.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No milestones yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {project.milestones.map((m) => (
              <li key={m.id} className="flex items-start gap-3 rounded-lg border p-3">
                {m.completed ? (
                  <Check className="mt-0.5 h-4 w-4 text-emerald-600" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{m.title}</div>
                    {m.dueDate && (
                      <div className="text-xs text-muted-foreground">Due {formatDate(m.dueDate)}</div>
                    )}
                  </div>
                  {m.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Files</h2>
        {project.files.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No files uploaded yet.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {project.files.map((f) => (
              <li key={f.id} className="flex items-center justify-between rounded-md border p-3 text-sm">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <a href={f.url} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                    {f.name}
                  </a>
                </div>
                <div className="text-xs text-muted-foreground">{formatDate(f.uploadedAt)}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Invoices</h2>
        {project.invoices.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No invoices for this project yet.</p>
        ) : (
          <ul className="mt-4 divide-y">
            {project.invoices.map((i) => (
              <li key={i.id} className="flex items-center justify-between py-3 text-sm">
                <Link href={`/invoices/${i.id}`} className="font-medium hover:underline">
                  {i.number}
                </Link>
                <div className="flex items-center gap-3">
                  <span>{formatCurrency(i.totalCents)}</span>
                  <Badge variant={i.status === "PAID" ? "success" : "warning"}>{i.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}
