import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { assertStripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { invoiceId } = (await req.json().catch(() => ({}))) as { invoiceId?: string };
  if (!invoiceId) return NextResponse.json({ error: "Missing invoiceId" }, { status: 400 });

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { items: true, client: true },
  });
  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  if (invoice.clientId !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (invoice.status === "PAID") {
    return NextResponse.json({ error: "Invoice already paid." }, { status: 400 });
  }

  const stripe = assertStripe();
  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: invoice.client.email,
    line_items: invoice.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: invoice.currency,
        unit_amount: item.unitCents,
        product_data: { name: item.description },
      },
    })),
    metadata: { invoiceId: invoice.id },
    success_url: absoluteUrl(`/invoices/${invoice.id}?checkout=success`),
    cancel_url: absoluteUrl(`/invoices/${invoice.id}?checkout=cancel`),
  });

  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { stripeSessionId: checkout.id },
  });

  return NextResponse.json({ url: checkout.url });
}
