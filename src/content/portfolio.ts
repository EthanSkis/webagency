export type CaseStudyContent = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  services: string[];
  summary: string;
  metrics: { label: string; value: string }[];
  cover: string;
  liveUrl?: string;
  publishedAt: string;
};

export const caseStudies: CaseStudyContent[] = [
  {
    slug: "northwind-replatform",
    client: "Northwind",
    title: "A full replatform that doubled conversion",
    industry: "SaaS",
    services: ["Design", "Development", "SEO"],
    summary:
      "We replaced an aging WordPress build with a Next.js stack, cut page weight by 72%, and rebuilt the marketing site around the jobs-to-be-done of three target personas.",
    metrics: [
      { label: "Conversion", value: "+98%" },
      { label: "Organic traffic", value: "+38%" },
      { label: "Lighthouse", value: "99" },
    ],
    cover:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "https://example.com",
    publishedAt: "2024-11-05",
  },
  {
    slug: "aster-health-portal",
    client: "Aster Health",
    title: "HIPAA-ready patient portal with 1s load times",
    industry: "Healthcare",
    services: ["Design", "Development"],
    summary:
      "A patient-facing portal integrated with Epic, hosted on a HIPAA-compliant stack, with an accessibility score of 100.",
    metrics: [
      { label: "LCP", value: "0.8s" },
      { label: "A11y", value: "100" },
      { label: "NPS", value: "72" },
    ],
    cover:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    publishedAt: "2024-08-14",
  },
  {
    slug: "brightloop-storefront",
    client: "Brightloop",
    title: "Headless Shopify storefront for a DTC brand",
    industry: "E-commerce",
    services: ["E-commerce", "CRO"],
    summary:
      "A Shopify Hydrogen build with an AOV-boosting upsell flow and a 3x faster PDP than their previous theme.",
    metrics: [
      { label: "AOV", value: "+22%" },
      { label: "Speed", value: "3×" },
      { label: "RPV", value: "+41%" },
    ],
    cover:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
    publishedAt: "2024-06-02",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
