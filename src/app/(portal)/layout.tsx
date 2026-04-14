import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { PortalSidebar } from "@/components/portal/sidebar";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-secondary/20">
      <PortalSidebar
        role={session.user.role}
        user={{ name: session.user.name, email: session.user.email ?? "" }}
      />
      <div className="flex-1">
        <div className="mx-auto max-w-6xl p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
