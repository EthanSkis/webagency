"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Receipt, LifeBuoy, Shield, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { Role } from "@prisma/client";

const clientNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/invoices", label: "Invoices", icon: Receipt },
  { href: "/support", label: "Support", icon: LifeBuoy },
];

const adminNav = [
  { href: "/admin", label: "Admin", icon: Shield },
];

export function PortalSidebar({ role, user }: { role: Role; user: { name?: string | null; email: string } }) {
  const pathname = usePathname();

  const items = role === "ADMIN" ? [...clientNav, ...adminNav] : clientNav;

  return (
    <aside className="hidden w-60 shrink-0 border-r bg-card/50 md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-5 font-semibold">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            P
          </span>
          {siteConfig.shortName}
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3">
        <div className="mb-2 px-2 text-xs">
          <div className="font-medium">{user.name ?? user.email}</div>
          <div className="text-muted-foreground">{user.email}</div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}
