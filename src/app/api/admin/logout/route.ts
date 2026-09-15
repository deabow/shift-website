import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { ADMIN_COOKIE_NAME, LEGACY_ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  logger.info("admin/logout", "User logged out");

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };

  response.cookies.set(ADMIN_COOKIE_NAME, "", cookieOptions);
  response.cookies.set(LEGACY_ADMIN_COOKIE_NAME, "", cookieOptions);

  return response;
}
