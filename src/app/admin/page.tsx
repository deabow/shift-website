import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function AdminLoginPage() {
  const isAuthenticated = cookies().get("shift-admin-auth")?.value === (process.env.ADMIN_SECRET ?? "shift_secure_session_v1");

  if (isAuthenticated) {
    redirect("/admin/panel");
  }

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
            className="w-full rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED]"
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
