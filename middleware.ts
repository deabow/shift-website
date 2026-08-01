import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_ADMIN_SECRET = "shift_session_xK9mP2vL8nQ4wR7jT";

function isAuthenticated(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET || DEFAULT_ADMIN_SECRET;
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

