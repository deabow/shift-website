import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "shift123";

  if (typeof password !== "string" || password !== expectedPassword) {
    return NextResponse.redirect(new URL("/admin", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin/panel", request.url), 303);
  response.cookies.set("shift-admin-auth", process.env.ADMIN_SECRET ?? "shift_secure_session_v1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
