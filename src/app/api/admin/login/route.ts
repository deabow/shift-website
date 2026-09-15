import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import {
  ADMIN_COOKIE_NAME,
  LEGACY_ADMIN_COOKIE_NAME,
  DEFAULT_ADMIN_PASSWORD,
  getAdminSecret,
} from "@/lib/auth";

export async function POST(request: Request) {
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  const adminSecret = getAdminSecret();

  const formData = await request.formData();
  const password = formData.get("password");

  if (typeof password !== "string" || password !== expectedPassword) {
    logger.warn("admin/login", "Failed login attempt");
    return NextResponse.redirect(new URL("/admin?error=invalid", request.url), 303);
  }

  logger.info("admin/login", "Successful login");

  const response = NextResponse.redirect(new URL("/admin/panel", request.url), 303);
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  };

  response.cookies.set(ADMIN_COOKIE_NAME, adminSecret, cookieOptions);
  response.cookies.set(LEGACY_ADMIN_COOKIE_NAME, adminSecret, cookieOptions);

  return response;
}

