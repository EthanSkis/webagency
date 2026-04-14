import { PrismaClient, InvoiceStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "change-me-now";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Agency Admin",
      role: "ADMIN",
      passwordHash: await bcrypt.hash(adminPassword, 12),
    },
  });

  const client = await prisma.user.upsert({
    where: { email: "demo@client.com" },
    update: {},
    create: {
      email: "demo@client.com",
      name: "Demo Client",
      company: "Demo Co.",
      role: "CLIENT",
      passwordHash: await bcrypt.hash("demo12345", 12),
    },
  });

  const project = await prisma.project.upsert({
    where: { slug: "demo-co-marketing-site" },
    update: {},
    create: {
      slug: "demo-co-marketing-site",
      name: "Demo Co. marketing site",
      description: "Full redesign and rebuild on Next.js.",
      clientId: client.id,
      status: "DEVELOPMENT",
      budgetCents: 1800000,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45),
      milestones: {
        create: [
          { order: 1, title: "Kickoff & discovery", completed: true, completedAt: new Date() },
          { order: 2, title: "Wireframes approved", completed: true, completedAt: new Date() },
          { order: 3, title: "High-fidelity designs approved", completed: false },
          { order: 4, title: "Development complete", completed: false },
          { order: 5, title: "Launch", completed: false },
        ],
      },
    },
  });

  // Seed a paid + open invoice
  await prisma.invoice.upsert({
    where: { number: "INV-DEMO-0001" },
    update: {},
    create: {
      number: "INV-DEMO-0001",
      clientId: client.id,
      projectId: project.id,
      status: InvoiceStatus.PAID,
      paidAt: new Date(),
      subtotalCents: 500000,
      totalCents: 500000,
      items: {
        create: [{ description: "Deposit — Demo Co. rebuild", quantity: 1, unitCents: 500000, amountCents: 500000 }],
      },
    },
  });
  await prisma.invoice.upsert({
    where: { number: "INV-DEMO-0002" },
    update: {},
    create: {
      number: "INV-DEMO-0002",
      clientId: client.id,
      projectId: project.id,
      status: InvoiceStatus.SENT,
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
      subtotalCents: 800000,
      totalCents: 800000,
      items: {
        create: [
          { description: "Design milestone", quantity: 1, unitCents: 500000, amountCents: 500000 },
          { description: "Dev sprint 1", quantity: 1, unitCents: 300000, amountCents: 300000 },
        ],
      },
    },
  });

  // Seed a demo lead
  await prisma.lead.create({
    data: {
      name: "Priya Example",
      email: "priya@example.com",
      company: "Example Ltd",
      budget: "25k_50k",
      message: "We’re replatforming our marketing site from WordPress and would love a quote.",
      source: "seed",
    },
  });

  // eslint-disable-next-line no-console
  console.log("Seed complete.");
  // eslint-disable-next-line no-console
  console.log(`Admin login: ${admin.email} / ${adminPassword}`);
  // eslint-disable-next-line no-console
  console.log(`Client login: ${client.email} / demo12345`);
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
