import Link from "next/link";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Admin · Invoices" };

export default async function AdminInvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { issuedAt: "desc" },
    include: { client: true },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">All invoices, across all clients.</p>
      </header>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Number</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Issued</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {invoices.map((i) => (
              <tr key={i.id}>
                <td className="px-4 py-3 font-medium">
                  <Link href={`/invoices/${i.id}`} className="hover:underline">
                    {i.number}
                  </Link>
                </td>
                <td className="px-4 py-3">{i.client.name ?? i.client.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(i.issuedAt)}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {i.dueAt ? formatDate(i.dueAt) : "—"}
                </td>
                <td className="px-4 py-3">{formatCurrency(i.totalCents)}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      i.status === "PAID"
                        ? "success"
                        : i.status === "OVERDUE"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {i.status}
                  </Badge>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No invoices yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
