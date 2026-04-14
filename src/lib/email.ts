import { Resend } from "resend";
import nodemailer from "nodemailer";

import { siteConfig } from "@/lib/site";

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

const from = process.env.EMAIL_FROM ?? `${siteConfig.name} <hello@example.com>`;

let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

let transporter: nodemailer.Transporter | null = null;
if (!resend && process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  });
}

export async function sendEmail(input: SendEmailInput) {
  if (resend) {
    return resend.emails.send({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    });
  }
  if (transporter) {
    return transporter.sendMail({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    });
  }
  // Dev fallback: log to console so the app works without email config.
  // eslint-disable-next-line no-console
  console.warn("[email] No email provider configured. Logging message instead.");
  // eslint-disable-next-line no-console
  console.info({ from, ...input });
  return { id: "dev-log" };
}

export function renderLeadNotification(lead: {
  name: string;
  email: string;
  company?: string | null;
  budget?: string | null;
  message: string;
}) {
  return `
  <div style="font-family:system-ui,sans-serif;max-width:560px">
    <h2 style="margin-bottom:8px">New lead: ${escapeHtml(lead.name)}</h2>
    <p style="color:#555;margin-top:0">A new inquiry just arrived through the website.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tbody>
        ${row("Name", lead.name)}
        ${row("Email", lead.email)}
        ${lead.company ? row("Company", lead.company) : ""}
        ${lead.budget ? row("Budget", lead.budget) : ""}
      </tbody>
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:6px">${escapeHtml(
      lead.message,
    )}</p>
  </div>`;
}

export function renderWelcomeEmail(name: string) {
  return `
  <div style="font-family:system-ui,sans-serif;max-width:560px">
    <h2>Welcome to ${siteConfig.name}, ${escapeHtml(name)}!</h2>
    <p>Your client portal account is ready. You can track your projects, invoices, and support tickets in one place.</p>
    <p><a href="${siteConfig.url}/dashboard" style="display:inline-block;background:#111;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Open your dashboard</a></p>
    <p style="color:#666;font-size:13px">If you have questions, just reply to this email — we read every message.</p>
  </div>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:6px 8px;color:#666;width:120px">${escapeHtml(label)}</td>
    <td style="padding:6px 8px;font-weight:600">${escapeHtml(value)}</td>
  </tr>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
