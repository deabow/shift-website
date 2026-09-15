import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "hodour-admin-auth";
export const LEGACY_ADMIN_COOKIE_NAME = "hdour-admin-auth";
export const DEFAULT_ADMIN_SECRET = "shift_session_xK9mP2vL8nQ4wR7jT";
export const DEFAULT_ADMIN_PASSWORD = "shift_secure_2026";

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET || DEFAULT_ADMIN_SECRET;
}

export function requireAuth():
  | { ok: true }
  | { ok: false; response: NextResponse } {
  const secret = getAdminSecret();

  const cookieStore = cookies();
  const token =
    cookieStore.get(ADMIN_COOKIE_NAME)?.value ||
    cookieStore.get(LEGACY_ADMIN_COOKIE_NAME)?.value;

  if (token !== secret) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized. Admin authentication required." },
        { status: 401 },
      ),
    };
  }

  return { ok: true };
}


