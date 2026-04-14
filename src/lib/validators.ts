import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please share your name.").max(120),
  email: z.string().email("Enter a valid email address."),
  company: z.string().max(120).optional().or(z.literal("")),
  budget: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a bit more — at least 10 characters.").max(5000),
  // Honeypot: bots will fill it; humans won't.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    password: z.string().min(8, "Use at least 8 characters."),
    confirm: z.string().min(8),
    company: z.string().max(120).optional().or(z.literal("")),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const ticketSchema = z.object({
  subject: z.string().min(3).max(160),
  body: z.string().min(10).max(5000),
  projectId: z.string().cuid().optional().or(z.literal("")),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});
