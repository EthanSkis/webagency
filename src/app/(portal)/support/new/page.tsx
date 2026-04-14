import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ticketSchema } from "@/lib/validators";

export const metadata = { title: "New ticket" };

async function createTicket(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user) redirect("/login");

  const parsed = ticketSchema.safeParse({
    subject: formData.get("subject"),
    body: formData.get("body"),
    projectId: formData.get("projectId") || "",
    priority: formData.get("priority"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message ?? "Invalid input");
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      subject: parsed.data.subject,
      body: parsed.data.body,
      priority: parsed.data.priority,
      userId: session.user.id,
      projectId: parsed.data.projectId ? parsed.data.projectId : null,
      messages: {
        create: {
          authorId: session.user.id,
          body: parsed.data.body,
        },
      },
    },
  });

  redirect(`/support/${ticket.id}`);
}

export default async function NewTicketPage() {
  const session = await auth();
  const projects = await prisma.project.findMany({
    where: { clientId: session!.user.id },
    select: { id: true, name: true },
  });

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to support
      </Link>
      <header>
        <h1 className="text-3xl font-bold">New ticket</h1>
        <p className="text-muted-foreground">Tell us what you need. We reply within 1 business day.</p>
      </header>

      <form action={createTicket} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" required minLength={3} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="projectId">Related project</Label>
            <select
              id="projectId"
              name="projectId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Not project-specific</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              name="priority"
              defaultValue="NORMAL"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="body">Describe your request</Label>
          <Textarea id="body" name="body" rows={8} required minLength={10} />
        </div>
        <Button type="submit">Submit ticket</Button>
      </form>
    </div>
  );
}
