import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Admin" };

export default async function AdminOverviewPage() {
  const [leadCount, clientCount, activeProjects, revenueAgg, outstandingAgg, openTickets] =
    await Promise.all([
      prisma.lead.count(),
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.project.count({
        where: { status: { notIn: ["LAUNCHED", "CANCELLED"] } },
      }),
      prisma.invoice.aggregate({
        where: { status: "PAID" },
        _sum: { totalCents: true },
      }),
      prisma.invoice.aggregate({
        where: { status: { in: ["SENT", "OVERDUE"] } },
        _sum: { totalCents: true },
      }),
      prisma.supportTicket.count({ where: { status: { notIn: ["RESOLVED", "CLOSED"] } } }),
    ]);

  const cards = [
    { label: "Total revenue", value: formatCurrency(revenueAgg._sum.totalCents ?? 0) },
    { label: "Outstanding", value: formatCurrency(outstandingAgg._sum.totalCents ?? 0) },
    { label: "Leads", value: leadCount.toString() },
    { label: "Clients", value: clientCount.toString() },
    { label: "Active projects", value: activeProjects.toString() },
    { label: "Open tickets", value: openTickets.toString() },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Agency dashboard</h1>
        <p className="text-muted-foreground">Operational overview at a glance.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
