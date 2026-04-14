import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <header className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            P
          </span>
          <span>{siteConfig.shortName}</span>
        </Link>
      </header>
      <main className="container flex flex-1 items-center justify-center py-12">{children}</main>
    </div>
  );
}
