import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { services } from "@/content/services";
import { caseStudies } from "@/content/portfolio";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticPaths = ["", "/services", "/portfolio", "/pricing", "/about", "/blog", "/contact", "/privacy", "/terms"];

  const now = new Date();
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, lastModified: now })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: now })),
    ...caseStudies.map((c) => ({ url: `${base}/portfolio/${c.slug}`, lastModified: new Date(c.publishedAt) })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.publishedAt) })),
  ];
}
