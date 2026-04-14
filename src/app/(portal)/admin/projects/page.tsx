import Link from "next/link";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";

export const metadata = { title: "Admin · Projects" };

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: { client: true, _count: { select: { milestones: true, invoices: true } } },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">All active and historical projects.</p>
      </header>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium">
                  <Link href={`/projects/${p.slug}`} className="hover:underline">
                    {p.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {p._count.milestones} milestones · {p._count.invoices} invoices
                  </div>
                </td>
                <td className="px-4 py-3">
                  {p.client.name ?? p.client.email}
                  <div className="text-xs text-muted-foreground">{p.client.email}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="info">{p.status.replace("_", " ")}</Badge>
                </td>
                <td className="px-4 py-3">
                  {p.budgetCents ? formatCurrency(p.budgetCents) : "—"}
                </td>
                <td className="px-4 py-3">{p.dueDate ? formatDate(p.dueDate) : "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(p.updatedAt)}</td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
