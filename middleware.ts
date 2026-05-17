import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdminPanelRoute = request.nextUrl.pathname.startsWith("/admin/panel");
  if (!isAdminPanelRoute) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get("shift-admin-auth")?.value === (process.env.ADMIN_SECRET ?? "shift_secure_session_v1");
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/panel/:path*"],
};
