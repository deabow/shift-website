import { NextResponse, type NextRequest } from "next/server";

function isAuthenticated(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return false;

  return request.cookies.get("shift-admin-auth")?.value === adminSecret;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/panel")) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/panel/:path*"],
};
