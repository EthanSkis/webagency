import Link from "next/link";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin · Tickets" };

export default async function AdminTicketsPage() {
  const tickets = await prisma.supportTicket.findMany({
    orderBy: { updatedAt: "desc" },
    include: { user: true, project: true },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Support tickets</h1>
        <p className="text-muted-foreground">All client tickets across projects.</p>
      </header>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tickets.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-3 font-medium">
                  <Link href={`/support/${t.id}`} className="hover:underline">
                    {t.subject}
                  </Link>
                </td>
                <td className="px-4 py-3">{t.user.name ?? t.user.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.project?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge variant={t.priority === "URGENT" ? "danger" : "secondary"}>
                    {t.priority}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={t.status === "RESOLVED" || t.status === "CLOSED" ? "success" : "info"}>
                    {t.status.replace("_", " ")}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(t.updatedAt)}</td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No tickets yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
