import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DEFAULT_ADMIN_SECRET = "hdour_session_xK9mP2vL8nQ4wR7jT";

export function requireAuth():
  | { ok: true }
  | { ok: false; response: NextResponse } {
  const secret = process.env.ADMIN_SECRET || DEFAULT_ADMIN_SECRET;

  const cookieStore = cookies();
  const token = cookieStore.get("hodour-admin-auth")?.value || cookieStore.get("hdour-admin-auth")?.value;

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


