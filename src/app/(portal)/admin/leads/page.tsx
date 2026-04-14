import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { LeadStatus } from "@prisma/client";

export const metadata = { title: "Leads" };

async function updateStatus(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const status = formData.get("status") as LeadStatus;
  if (!id || !status) return;
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

const STATUSES: LeadStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"];

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Leads</h1>
        <p className="text-muted-foreground">Inquiries from the website contact form.</p>
      </header>

      {leads.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground">
          No leads yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Budget</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leads.map((l) => (
                <tr key={l.id} className="align-top">
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {formatDate(l.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{l.name}</div>
                    <a href={`mailto:${l.email}`} className="text-xs text-muted-foreground hover:underline">
                      {l.email}
                    </a>
                    {l.phone && <div className="text-xs text-muted-foreground">{l.phone}</div>}
                  </td>
                  <td className="px-4 py-3">{l.company ?? "—"}</td>
                  <td className="px-4 py-3">{l.budget ?? "—"}</td>
                  <td className="px-4 py-3">
                    <form action={updateStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={l.id} />
                      <select
                        name="status"
                        defaultValue={l.status}
                        className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded-md border bg-background px-2 py-1 text-xs hover:bg-accent/10"
                      >
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 max-w-sm text-muted-foreground">
                    <p className="line-clamp-3 whitespace-pre-wrap">{l.message}</p>
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
