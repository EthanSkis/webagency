import Link from "next/link";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Invoices" };

export default async function InvoicesPage() {
  const session = await auth();
  const invoices = await prisma.invoice.findMany({
    where: { clientId: session!.user.id },
    orderBy: { issuedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">Pay online or download a PDF.</p>
      </header>

      {invoices.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <p className="font-medium">No invoices yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Invoices will appear here when issued.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Invoice</th>
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
                            : i.status === "SENT"
                              ? "warning"
                              : "secondary"
                      }
                    >
                      {i.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
