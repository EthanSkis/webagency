import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              P
            </span>
            <span>{siteConfig.shortName}</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">{siteConfig.description}</p>
        </div>

        <FooterColumn title="Services">
          <FooterLink href="/services/web-design">Web Design</FooterLink>
          <FooterLink href="/services/web-development">Web Development</FooterLink>
          <FooterLink href="/services/ecommerce">E-commerce</FooterLink>
          <FooterLink href="/services/seo">SEO & Growth</FooterLink>
          <FooterLink href="/services/care-plans">Care Plans</FooterLink>
        </FooterColumn>

        <FooterColumn title="Agency">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/portfolio">Our Work</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterColumn>

        <FooterColumn title="Contact">
          <p className="text-sm text-muted-foreground">{siteConfig.address}</p>
          <a href={`mailto:${siteConfig.email}`} className="text-sm hover:underline">
            {siteConfig.email}
          </a>
          <a href={`tel:${siteConfig.phone}`} className="text-sm hover:underline">
            {siteConfig.phone}
          </a>
        </FooterColumn>
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">{title}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
      {children}
    </Link>
  );
}
