import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PayInvoiceButton } from "./pay-button";
import { siteConfig } from "@/lib/site";

export default async function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { items: true, project: true, client: true },
  });
  if (!invoice || (invoice.clientId !== session!.user.id && session!.user.role !== "ADMIN")) {
    notFound();
  }

  const unpaid = invoice.status === "SENT" || invoice.status === "OVERDUE";

  return (
    <div className="space-y-6">
      <Link href="/invoices" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to invoices
      </Link>

      <div className="rounded-xl border bg-card p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Invoice</div>
            <h1 className="text-3xl font-bold">{invoice.number}</h1>
            <div className="mt-1 text-sm text-muted-foreground">
              Issued {formatDate(invoice.issuedAt)}
              {invoice.dueAt && ` · Due ${formatDate(invoice.dueAt)}`}
            </div>
          </div>
          <Badge
            variant={
              invoice.status === "PAID"
                ? "success"
                : invoice.status === "OVERDUE"
                  ? "danger"
                  : "warning"
            }
          >
            {invoice.status}
          </Badge>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">From</div>
            <div className="mt-1 font-semibold">{siteConfig.name}</div>
            <div className="text-sm text-muted-foreground">{siteConfig.address}</div>
            <div className="text-sm text-muted-foreground">{siteConfig.email}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Billed to</div>
            <div className="mt-1 font-semibold">{invoice.client.name ?? invoice.client.email}</div>
            <div className="text-sm text-muted-foreground">{invoice.client.email}</div>
            {invoice.client.company && (
              <div className="text-sm text-muted-foreground">{invoice.client.company}</div>
            )}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2 text-right">Qty</th>
                <th className="px-4 py-2 text-right">Unit</th>
                <th className="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoice.items.map((it) => (
                <tr key={it.id}>
                  <td className="px-4 py-2">{it.description}</td>
                  <td className="px-4 py-2 text-right">{it.quantity}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(it.unitCents)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(it.amountCents)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-secondary/30 text-sm">
              <tr>
                <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                  Subtotal
                </td>
                <td className="px-4 py-2 text-right">{formatCurrency(invoice.subtotalCents)}</td>
              </tr>
              {invoice.taxCents > 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                    Tax
                  </td>
                  <td className="px-4 py-2 text-right">{formatCurrency(invoice.taxCents)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={3} className="px-4 py-2 text-right font-semibold">
                  Total
                </td>
                <td className="px-4 py-2 text-right text-base font-bold">
                  {formatCurrency(invoice.totalCents, invoice.currency.toUpperCase())}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {invoice.notes && (
          <div className="mt-6 rounded-md bg-secondary/30 p-4 text-sm">
            <div className="font-semibold">Notes</div>
            <p className="mt-1 text-muted-foreground">{invoice.notes}</p>
          </div>
        )}

        {unpaid && (
          <div className="mt-8">
            <PayInvoiceButton invoiceId={invoice.id} />
          </div>
        )}
      </div>
    </div>
  );
}
