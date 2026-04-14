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
