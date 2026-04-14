import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validators";
import { sendEmail, renderLeadNotification } from "@/lib/email";
import { siteConfig } from "@/lib/site";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  // Honeypot tripped → pretend success.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const lead = await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
      source: "contact_form",
    },
  });

  // Notify the agency (best-effort — don't fail the request).
  sendEmail({
    to: siteConfig.email,
    replyTo: lead.email,
    subject: `New lead from ${lead.name}`,
    html: renderLeadNotification(lead),
  }).catch(() => {});

  return NextResponse.json({ ok: true, id: lead.id });
}
