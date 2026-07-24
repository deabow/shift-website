import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  logger.info("admin/logout", "User logged out");

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set("shift-admin-auth", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
