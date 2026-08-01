import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function requireAuth():
  | { ok: true }
  | { ok: false; response: NextResponse } {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Server misconfiguration. ADMIN_SECRET environment variable is missing." },
        { status: 500 },
      ),
    };
  }

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

