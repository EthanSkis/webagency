import Link from "next/link";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const session = await auth();
  const projects = await prisma.project.findMany({
    where: { clientId: session!.user.id },
    orderBy: { updatedAt: "desc" },
    include: { milestones: true },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">All of your engagements with us.</p>
      </header>

      {projects.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <p className="font-medium">No projects yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            When we kick off a project together, you’ll see it here.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {projects.map((p) => {
            const done = p.milestones.filter((m) => m.completed).length;
            const total = p.milestones.length;
            const pct = total ? Math.round((done / total) * 100) : 0;
            return (
              <li key={p.id} className="rounded-xl border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/projects/${p.slug}`} className="text-lg font-semibold hover:underline">
                      {p.name}
                    </Link>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {p.budgetCents ? `${formatCurrency(p.budgetCents)} budget · ` : ""}
                      Started {formatDate(p.startDate)}
                      {p.dueDate ? ` · Due ${formatDate(p.dueDate)}` : ""}
                    </div>
                  </div>
                  <Badge variant="info">{p.status.replace("_", " ")}</Badge>
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>
                      {done}/{total} milestones
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
