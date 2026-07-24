import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function AdminLoginPage() {
  const adminSecret = process.env.ADMIN_SECRET;
  const isAuthenticated = adminSecret
    ? cookies().get("shift-admin-auth")?.value === adminSecret
    : false;

  if (isAuthenticated) {
    redirect("/admin/panel");
  }

  const errorParam = null; // In Next.js 14, we can use searchParams but this is a server component
  // For simplicity, we check via URL in client-side or just show the form

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl items-center px-4 pb-16 pt-10 md:px-8">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_60px_rgb(0,0,0,0.5)] backdrop-blur-sm md:p-10">
        <p className="text-xs uppercase tracking-[0.22em] text-[#8B5CF6]">
          Admin Access
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Secure login
        </h1>
        <p className="mt-3 text-zinc-300">
          Authenticate to access the SHIFT admin panel.
        </p>

        {!adminSecret && (
          <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            ADMIN_SECRET environment variable is not configured. Please set it in .env.local.
          </div>
        )}

        <form action="/api/admin/login" method="post" className="mt-8 space-y-4">
          <label className="block text-sm text-zinc-200" htmlFor="password">
            Admin password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#8B5CF6]"
            placeholder="Enter password"
          />
          <button
            type="submit"
            disabled={!adminSecret}
            className="w-full rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login to Admin
          </button>
        </form>

        <Link
          href="/"
          className="mt-5 inline-block text-sm text-zinc-400 transition hover:text-white"
        >
          Return to home
        </Link>
      </section>
    </main>
  );
}
