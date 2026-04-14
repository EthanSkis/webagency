import Link from "next/link";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";

export const metadata = { title: "Clients" };

export default async function ClientsPage() {
  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { projects: true, invoices: true } },
      invoices: { select: { totalCents: true, status: true } },
    },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-muted-foreground">Everyone with a portal account.</p>
      </header>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Projects</th>
              <th className="px-4 py-3">Invoiced</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {clients.map((c) => {
              const totalInvoiced = c.invoices.reduce((s, i) => s + i.totalCents, 0);
              return (
                <tr key={c.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium">{c.name ?? c.email}</div>
                    <a href={`mailto:${c.email}`} className="text-xs text-muted-foreground hover:underline">
                      {c.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">{c.company ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{c._count.projects}</Badge>
                  </td>
                  <td className="px-4 py-3">{formatCurrency(totalInvoiced)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(c.createdAt)}</td>
                </tr>
              );
            })}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No clients yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        Tip: clients can self-register at{" "}
        <Link href="/register" className="underline">
          /register
        </Link>
        , or you can onboard them manually via Prisma Studio (<code>npm run db:studio</code>).
      </p>
    </div>
  );
}
