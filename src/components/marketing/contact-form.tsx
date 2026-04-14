"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { siteConfig } from "@/lib/site";

// The backend is currently disabled — the site is a static export.
// Submissions open the visitor's mail client with a pre-filled email.
export function ContactForm() {
  const searchParams = useSearchParams();
  const [defaultMessage, setDefaultMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const context = searchParams.get("service") ?? searchParams.get("plan");
    if (context) {
      setDefaultMessage(`I'm interested in ${context}.\n\n`);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    values: { name: "", email: "", company: "", budget: "", message: defaultMessage, website: "" },
  });

  function onSubmit(values: ContactInput) {
    const lines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company ? `Company: ${values.company}` : "",
      values.budget ? `Budget: ${values.budget}` : "",
      "",
      values.message,
    ].filter(Boolean);

    const subject = `New inquiry from ${values.name}`;
    const body = lines.join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="rounded-xl border bg-emerald-50 p-6 text-emerald-900">
        <h3 className="text-lg font-semibold">Email ready to send.</h3>
        <p className="mt-2 text-sm">
          We’ve opened your mail client with a pre-filled message to{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline">
            {siteConfig.email}
          </a>
          . If nothing happened, please email us directly — we read every message.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot */}
      <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <Input placeholder="Jane Doe" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input type="email" placeholder="jane@company.com" {...register("email")} />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <Input placeholder="Acme, Inc." {...register("company")} />
        </Field>
        <Field label="Budget" error={errors.budget?.message}>
          <select
            {...register("budget")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Select…</option>
            <option value="under_10k">Under $10k</option>
            <option value="10k_25k">$10k – $25k</option>
            <option value="25k_50k">$25k – $50k</option>
            <option value="50k_100k">$50k – $100k</option>
            <option value="100k_plus">$100k+</option>
          </select>
        </Field>
      </div>
      <Field label="Tell us about your project" error={errors.message?.message}>
        <Textarea rows={6} placeholder="Goals, timeline, links to examples you love…" {...register("message")} />
      </Field>

      <div className="flex items-center gap-3">
        <Button type="submit" size="lg">
          Send inquiry
        </Button>
        <p className="text-xs text-muted-foreground">
          Opens your email client — the server-side form is temporarily disabled.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
