export const siteConfig = {
  name: "Pixelcraft Agency",
  shortName: "Pixelcraft",
  tagline: "Websites that grow your business.",
  description:
    "We design, build, and maintain high-performance websites for ambitious businesses. Strategy, design, development, and ongoing care — under one roof.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  email: "hello@pixelcraft.agency",
  phone: "+1 (555) 010-1188",
  address: "1188 Market Street, Suite 400, San Francisco, CA",
  social: {
    twitter: "https://twitter.com/pixelcraft",
    linkedin: "https://linkedin.com/company/pixelcraft",
    github: "https://github.com/pixelcraft",
    instagram: "https://instagram.com/pixelcraft",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
