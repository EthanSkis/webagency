import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware runs on the Edge and cannot use Prisma directly, so we gate
// routes by inspecting the session cookie presence + role claims via Auth.js.
// Deeper authorization checks live in the route/layout components.

const CLIENT_PATHS = [/^\/dashboard/, /^\/projects/, /^\/invoices/, /^\/support/];
const ADMIN_PATHS = [/^\/admin/];

function hasSessionCookie(req: NextRequest) {
  // Auth.js v5 uses `authjs.session-token` (or `__Secure-authjs.session-token` in production).
  return (
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth =
    CLIENT_PATHS.some((p) => p.test(pathname)) || ADMIN_PATHS.some((p) => p.test(pathname));

  if (!needsAuth) return NextResponse.next();

  if (!hasSessionCookie(req)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/invoices/:path*", "/support/:path*", "/admin/:path*"],
};
