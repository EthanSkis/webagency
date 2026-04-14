export type Plan = {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  interval: "one_time" | "monthly" | "yearly";
  features: string[];
  featured?: boolean;
  cta?: string;
};

export const plans: Plan[] = [
  {
    slug: "launch",
    name: "Launch",
    description: "A polished marketing site for growing teams.",
    priceCents: 800000,
    interval: "one_time",
    features: [
      "Up to 8 custom pages",
      "Brand-aligned design system",
      "CMS setup + training",
      "Basic SEO + analytics",
      "30 days post-launch support",
    ],
  },
  {
    slug: "growth",
    name: "Growth",
    description: "Our most popular package — design, build, grow.",
    priceCents: 1800000,
    interval: "one_time",
    features: [
      "Everything in Launch",
      "Up to 20 pages",
      "Content strategy + copy review",
      "Advanced SEO + schema",
      "A/B testing setup",
      "60 days post-launch support",
    ],
    featured: true,
  },
  {
    slug: "scale",
    name: "Scale",
    description: "Custom platforms, integrations, and ongoing growth.",
    priceCents: 3500000,
    interval: "one_time",
    features: [
      "Everything in Growth",
      "Custom integrations (CRM, ERP)",
      "Headless CMS + personalization",
      "Multilingual / i18n",
      "Quarterly strategy reviews",
    ],
  },
];

export const carePlans: Plan[] = [
  {
    slug: "care-essential",
    name: "Essential",
    description: "Keep your site secure, backed up, and online.",
    priceCents: 49900,
    interval: "monthly",
    features: [
      "Managed hosting",
      "Daily backups",
      "Uptime monitoring",
      "Security patches",
      "1 hour monthly improvements",
    ],
  },
  {
    slug: "care-pro",
    name: "Pro",
    description: "Everything in Essential plus continuous improvements.",
    priceCents: 149900,
    interval: "monthly",
    features: [
      "Everything in Essential",
      "4 hours monthly improvements",
      "Monthly performance report",
      "Priority support (next business day)",
      "Quarterly content audit",
    ],
    featured: true,
  },
  {
    slug: "care-partner",
    name: "Partner",
    description: "We are your extended product team.",
    priceCents: 399900,
    interval: "monthly",
    features: [
      "Everything in Pro",
      "12 hours monthly improvements",
      "Dedicated account manager",
      "Same-day support",
      "Quarterly strategy workshops",
    ],
  },
];
