import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";

async function addMessage(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user) redirect("/login");

  const ticketId = formData.get("ticketId") as string;
  const body = (formData.get("body") as string)?.trim();
  if (!ticketId || !body) return;

  const ticket = await prisma.supportTicket.findUnique({ where: { id: ticketId } });
  if (!ticket) return;
  if (ticket.userId !== session.user.id && session.user.role !== "ADMIN" && session.user.role !== "STAFF") {
    return;
  }

  await prisma.ticketMessage.create({
    data: { ticketId, authorId: session.user.id, body },
  });
  await prisma.supportTicket.update({
    where: { id: ticketId },
    data: { status: session.user.role === "ADMIN" ? "WAITING_ON_CLIENT" : "IN_PROGRESS" },
  });

  redirect(`/support/${ticketId}`);
}

export default async function TicketPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const ticket = await prisma.supportTicket.findUnique({
    where: { id: params.id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      project: true,
    },
  });

  if (!ticket) notFound();
  if (ticket.userId !== session!.user.id && session!.user.role !== "ADMIN") notFound();

  // Fetch authors for messages
  const authorIds = Array.from(new Set(ticket.messages.map((m) => m.authorId)));
  const authors = await prisma.user.findMany({
    where: { id: { in: authorIds } },
    select: { id: true, name: true, email: true, role: true },
  });
  const authorById = new Map(authors.map((a) => [a.id, a]));

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to support
      </Link>
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{ticket.subject}</h1>
          <div className="mt-1 text-xs text-muted-foreground">
            Opened {formatDate(ticket.createdAt)}
            {ticket.project ? ` · ${ticket.project.name}` : ""}
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant={ticket.priority === "URGENT" ? "danger" : "secondary"}>{ticket.priority}</Badge>
          <Badge variant="info">{ticket.status.replace("_", " ")}</Badge>
        </div>
      </header>

      <div className="space-y-4">
        {ticket.messages.map((m) => {
          const author = authorById.get(m.authorId);
          const isStaff = author?.role === "ADMIN" || author?.role === "STAFF";
          return (
            <div
              key={m.id}
              className={`rounded-xl border p-4 ${isStaff ? "bg-accent/5 border-accent/30" : "bg-card"}`}
            >
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold">
                  {author?.name ?? author?.email ?? "Unknown"}
                  {isStaff && <span className="ml-2 text-accent">Team</span>}
                </span>
                <span className="text-muted-foreground">{formatDate(m.createdAt)}</span>
              </div>
              <p className="whitespace-pre-wrap text-sm">{m.body}</p>
            </div>
          );
        })}
      </div>

      <form action={addMessage} className="space-y-3 rounded-xl border bg-card p-4">
        <input type="hidden" name="ticketId" value={ticket.id} />
        <Textarea name="body" rows={4} placeholder="Reply…" required minLength={1} />
        <Button type="submit">Send reply</Button>
      </form>
    </div>
  );
}
