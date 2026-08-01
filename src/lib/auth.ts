import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DEFAULT_ADMIN_SECRET = "shift_session_xK9mP2vL8nQ4wR7jT";

export function requireAuth():
  | { ok: true }
  | { ok: false; response: NextResponse } {
  const secret = process.env.ADMIN_SECRET || DEFAULT_ADMIN_SECRET;

  const cookieStore = cookies();
  const token = cookieStore.get("shift-admin-auth")?.value;

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


