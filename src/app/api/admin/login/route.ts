import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!expectedPassword || !adminSecret) {
    logger.error("admin/login", "Server misconfiguration: ADMIN_PASSWORD or ADMIN_SECRET missing");
    return NextResponse.redirect(new URL("/admin?error=server_error", request.url), 303);
  }

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

