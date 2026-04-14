export type ServiceContent = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  tech: string[];
  priceFromCents: number;
  timeline: string;
};

export const services: ServiceContent[] = [
  {
    slug: "web-design",
    title: "Web Design",
    tagline: "Beautifully on-brand. Ruthlessly conversion-focused.",
    summary:
      "We blend brand strategy and UX research into designs your customers will love and your team will be proud to ship.",
    deliverables: [
      "Discovery + UX workshop",
      "Sitemap & information architecture",
      "Wireframes (mobile & desktop)",
      "High-fidelity Figma designs",
      "Brand system & style guide",
    ],
    tech: ["Figma", "FigJam", "Hotjar", "Maze"],
    priceFromCents: 800000,
    timeline: "3-5 weeks",
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Fast, accessible, SEO-ready websites built to last.",
    summary:
      "Modern builds on Next.js, TypeScript, and your CMS of choice. Scores 95+ on Lighthouse by default.",
    deliverables: [
      "Next.js or headless CMS build",
      "Responsive, accessible components",
      "Editor training & handoff",
      "Core Web Vitals tuning",
      "Analytics + monitoring",
    ],
    tech: ["Next.js", "TypeScript", "Sanity/Payload", "Vercel", "Tailwind"],
    priceFromCents: 1200000,
    timeline: "4-8 weeks",
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    tagline: "Stores that convert, on platforms that scale.",
    summary:
      "Shopify, BigCommerce, or headless storefronts with Stripe + Shopify Hydrogen. PCI-safe by design.",
    deliverables: [
      "Storefront design & build",
      "Product catalog setup",
      "Checkout & payments",
      "Email automation",
      "Analytics & CRO hooks",
    ],
    tech: ["Shopify", "Stripe", "Hydrogen", "Klaviyo"],
    priceFromCents: 1500000,
    timeline: "6-10 weeks",
  },
  {
    slug: "seo",
    title: "SEO & Growth",
    tagline: "Compounding traffic from people who are ready to buy.",
    summary:
      "Technical SEO, content strategy, and on-page optimization that actually moves rankings.",
    deliverables: [
      "Technical SEO audit",
      "Content strategy & topical map",
      "On-page optimization",
      "Internal linking & schema",
      "Monthly performance reports",
    ],
    tech: ["Ahrefs", "GSC", "GA4", "Looker Studio"],
    priceFromCents: 250000,
    timeline: "Monthly retainer",
  },
  {
    slug: "care-plans",
    title: "Care Plans",
    tagline: "We keep your site secure, fast, and improving.",
    summary:
      "Hosting, backups, security patches, and a monthly budget for improvements. Sleep well.",
    deliverables: [
      "Managed hosting",
      "Daily backups",
      "Security monitoring",
      "Monthly improvement hours",
      "Priority support SLA",
    ],
    tech: ["Vercel", "Sentry", "Cloudflare", "Uptime monitoring"],
    priceFromCents: 49900,
    timeline: "Monthly",
  },
  {
    slug: "cro",
    title: "CRO & Analytics",
    tagline: "Find the money hiding in your funnel.",
    summary:
      "Instrumentation, experimentation, and a clear point-of-view on what to change next.",
    deliverables: [
      "Analytics audit & setup",
      "Experiment roadmap",
      "A/B test implementation",
      "Quarterly CRO reports",
    ],
    tech: ["GA4", "PostHog", "VWO", "Looker Studio"],
    priceFromCents: 350000,
    timeline: "Monthly retainer",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
