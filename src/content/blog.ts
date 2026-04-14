export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  publishedAt: string;
  cover?: string;
};

export const posts: BlogPost[] = [
  {
    slug: "website-launch-checklist",
    title: "The 30-point website launch checklist we actually use",
    excerpt:
      "A pragmatic pre-launch checklist covering performance, SEO, analytics, accessibility, and ops.",
    author: "Alex Rivera",
    tags: ["Process", "Launch"],
    publishedAt: "2025-02-04",
    cover:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    content: `
A launch is the riskiest moment in a project. Here’s the checklist we run before
flipping the DNS.

## Performance
- Lighthouse ≥ 95 on mobile & desktop
- Images served as AVIF/WebP with responsive srcsets
- Fonts preloaded, swap strategy set

## SEO
- Title tags & meta descriptions for every page
- Canonical URLs
- Sitemap + robots.txt
- Schema markup for Organization and primary content types

## Analytics
- GA4 + server-side tag (optional)
- Conversion events wired and tested
- Debug view confirms fire timing

## Accessibility
- Axe DevTools: zero criticals
- Keyboard nav on every interactive element
- Alt text on all informational images
`.trim(),
  },
  {
    slug: "nextjs-headless-cms",
    title: "Choosing a headless CMS for Next.js in 2025",
    excerpt: "A side-by-side look at Sanity, Payload, and Contentful for modern marketing sites.",
    author: "Dana Park",
    tags: ["Engineering", "CMS"],
    publishedAt: "2025-01-20",
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    content: `
The right CMS depends on your team. Here’s how we choose between Sanity,
Payload, and Contentful for Next.js builds.

## Editor experience
Sanity’s Studio is the most flexible. Payload has the best TypeScript DX for
developers. Contentful wins on enterprise governance.

## Pricing
Payload is self-hosted and free. Sanity scales reasonably. Contentful gets
expensive quickly past the Team plan.

## Our rule of thumb
- Startup, <10 content editors → Sanity
- Engineering-heavy team → Payload
- Enterprise with roles & approvals → Contentful
`.trim(),
  },
  {
    slug: "seo-for-b2b",
    title: "Technical SEO for B2B: the 80/20",
    excerpt: "The handful of technical SEO wins that actually move the needle for B2B sites.",
    author: "Sam Patel",
    tags: ["SEO", "B2B"],
    publishedAt: "2024-12-12",
    cover:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80",
    content: `
Most B2B sites don’t need more backlinks. They need a cleaner crawl, a clearer
topical map, and better on-page targeting.

1. Fix duplicate and thin pages first.
2. Build a topic cluster around your highest-intent keywords.
3. Ship schema.
4. Monitor Core Web Vitals in field data, not just lab.
`.trim(),
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
