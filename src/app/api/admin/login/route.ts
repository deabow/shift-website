import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

const DEFAULT_ADMIN_PASSWORD = "shift_secure_2026";
const DEFAULT_ADMIN_SECRET = "shift_session_xK9mP2vL8nQ4wR7jT";

export async function POST(request: Request) {
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET || DEFAULT_ADMIN_SECRET;

  const formData = await request.formData();
  const password = formData.get("password");

  if (typeof password !== "string" || password !== expectedPassword) {
    logger.warn("admin/login", "Failed login attempt");
    return NextResponse.redirect(new URL("/admin?error=invalid", request.url), 303);
  }


  logger.info("admin/login", "Successful login");

  const response = NextResponse.redirect(new URL("/admin/panel", request.url), 303);
  response.cookies.set("shift-admin-auth", adminSecret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}

