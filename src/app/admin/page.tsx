import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const DEFAULT_ADMIN_SECRET = "shift_session_xK9mP2vL8nQ4wR7jT";

export default function AdminLoginPage() {
  const adminSecret = process.env.ADMIN_SECRET || DEFAULT_ADMIN_SECRET;
  const isAuthenticated = Boolean(
    cookies().get("shift-admin-auth")?.value === adminSecret,
  );

  if (isAuthenticated) {
    redirect("/admin/panel");
  }



  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl items-center justify-center px-4 pb-16 pt-10 md:px-8">
      <section className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-zinc-950/90 p-8 shadow-2xl backdrop-blur-2xl md:p-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Admin Control Core</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
          Secure Login
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Authenticate to access the SHIFT admin panel.
        </p>

        <form action="/api/admin/login" method="post" className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2" htmlFor="password">
              Admin Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50"
              placeholder="Enter admin password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-950 transition hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            Login to Admin
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-400 transition hover:text-white"
          >
            ← Return to main website
          </Link>
        </div>
      </section>
    </main>
  );
}
