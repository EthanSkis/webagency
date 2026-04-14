import Link from "next/link";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Support" };

export default async function SupportPage() {
  const session = await auth();
  const tickets = await prisma.supportTicket.findMany({
    where: { userId: session!.user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-muted-foreground">Open a ticket or track existing ones.</p>
        </div>
        <Button asChild>
          <Link href="/support/new">New ticket</Link>
        </Button>
      </header>

      {tickets.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <p className="font-medium">No tickets yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Open your first ticket if you have a question.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {tickets.map((t) => (
            <li key={t.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/support/${t.id}`} className="text-lg font-semibold hover:underline">
                    {t.subject}
                  </Link>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Updated {formatDate(t.updatedAt)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={t.priority === "URGENT" ? "danger" : "secondary"}>
                    {t.priority}
                  </Badge>
                  <Badge variant={t.status === "RESOLVED" || t.status === "CLOSED" ? "success" : "info"}>
                    {t.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
