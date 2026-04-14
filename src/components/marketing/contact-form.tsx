"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validators";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      message: defaultService ? `I'm interested in ${defaultService}.\n\n` : "",
    },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border bg-emerald-50 p-6 text-emerald-900">
        <h3 className="text-lg font-semibold">Thanks — we got it.</h3>
        <p className="mt-2 text-sm">
          We’ll reply within one business day. In the meantime, feel free to{" "}
          <a href="/portfolio" className="underline">
            browse our work
          </a>
          .
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
        <Button type="submit" disabled={status === "submitting"} size="lg">
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </Button>
        <p className="text-xs text-muted-foreground">We reply within 1 business day.</p>
      </div>

      {status === "error" && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">{errorMessage}</p>
      )}
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
