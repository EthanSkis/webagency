import Link from "next/link";
import { FolderKanban, Receipt, LifeBuoy } from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [projects, invoices, tickets] = await Promise.all([
    prisma.project.findMany({
      where: { clientId: userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { milestones: true },
    }),
    prisma.invoice.findMany({
      where: { clientId: userId },
      orderBy: { issuedAt: "desc" },
      take: 5,
    }),
    prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 3,
    }),
  ]);

  const outstanding = invoices
    .filter((i) => i.status === "SENT" || i.status === "OVERDUE")
    .reduce((sum, i) => sum + i.totalCents, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">
          Welcome back{session?.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground">
          Here’s the latest across your projects, invoices, and support.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat
          icon={<FolderKanban className="h-4 w-4 text-accent" />}
          label="Active projects"
          value={projects.filter((p) => !["LAUNCHED", "CANCELLED"].includes(p.status)).length.toString()}
          href="/projects"
        />
        <Stat
          icon={<Receipt className="h-4 w-4 text-accent" />}
          label="Outstanding balance"
          value={formatCurrency(outstanding)}
          href="/invoices"
        />
        <Stat
          icon={<LifeBuoy className="h-4 w-4 text-accent" />}
          label="Open tickets"
          value={tickets.filter((t) => t.status !== "RESOLVED" && t.status !== "CLOSED").length.toString()}
          href="/support"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <EmptyState
              title="No projects yet"
              body="When we kick off a project, it will appear here with milestones and status updates."
            />
          ) : (
            <ul className="divide-y">
              {projects.map((p) => {
                const done = p.milestones.filter((m) => m.completed).length;
                const total = p.milestones.length;
                return (
                  <li key={p.id} className="flex items-center justify-between py-3">
                    <div>
                      <Link href={`/projects/${p.slug}`} className="font-medium hover:underline">
                        {p.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">
                        {total > 0 ? `${done}/${total} milestones` : "No milestones yet"}
                        {p.dueDate && ` · Due ${formatDate(p.dueDate)}`}
                      </div>
                    </div>
                    <Badge variant="info">{p.status.replace("_", " ")}</Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <EmptyState title="No invoices yet" body="Invoices will appear here when issued." />
          ) : (
            <ul className="divide-y">
              {invoices.map((i) => (
                <li key={i.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link href={`/invoices/${i.id}`} className="font-medium hover:underline">
                      {i.number}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      Issued {formatDate(i.issuedAt)}
                      {i.dueAt && ` · Due ${formatDate(i.dueAt)}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{formatCurrency(i.totalCents)}</span>
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
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border bg-card p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </Link>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="py-8 text-center">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
