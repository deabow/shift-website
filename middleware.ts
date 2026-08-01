import { NextResponse, type NextRequest } from "next/server";

function isAuthenticated(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return false;

  const cookieValue = request.cookies.get("shift-admin-auth")?.value;
  return cookieValue === adminSecret;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/panel and all its subroutes
  if (pathname.startsWith("/admin/panel")) {
    if (!isAuthenticated(request)) {
      const loginUrl = new URL("/admin", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/panel/:path*"],
};

