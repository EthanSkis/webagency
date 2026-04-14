import { Mail, Phone, MapPin } from "lucide-react";

import { ContactForm } from "@/components/marketing/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function ContactPage({
  searchParams,
}: {
  searchParams: { service?: string; plan?: string };
}) {
  const context = searchParams.service ?? searchParams.plan;

  return (
    <div className="container grid gap-12 py-16 md:grid-cols-2">
      <div>
        <p className="text-sm font-medium text-accent">Contact</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">Let’s build something great.</h1>
        <p className="mt-4 text-muted-foreground">
          Tell us about your project. The more detail you share, the more useful our first reply will be.
        </p>

        <ul className="mt-10 space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 text-accent" />
            <a href={`mailto:${siteConfig.email}`} className="hover:underline">
              {siteConfig.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 text-accent" />
            <a href={`tel:${siteConfig.phone}`} className="hover:underline">
              {siteConfig.phone}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-accent" />
            <span>{siteConfig.address}</span>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border bg-card p-6 md:p-8">
        <ContactForm defaultService={context} />
      </div>
    </div>
  );
}
