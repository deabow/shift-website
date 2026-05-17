import { AdminPortfolioDashboard } from "@/components/admin-portfolio-dashboard";
import Link from "next/link";

export default function AdminPanelPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-16 pt-10 md:px-8">
      <section className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_60px_rgb(0,0,0,0.5)] backdrop-blur-sm md:p-12">
        <p className="text-xs uppercase tracking-[0.22em] text-[#8B5CF6]">
          Protected Area
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          SHIFT Admin Panel
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          You are authenticated. Case studies in this panel are connected to the
          same data source used by <code>/portfolio/[slug]</code>, so you can
          wire create/edit forms here later.
        </p>

        <AdminPortfolioDashboard />

        <div className="mt-6">
          <Link
            href="/portfolio"
            className="inline-flex rounded-lg border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#C4B5FD] transition hover:bg-[#8B5CF6]/20"
          >
            Open public portfolio
          </Link>
        </div>

        <form action="/api/admin/logout" method="post" className="mt-8">
          <button
            type="submit"
            className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#8B5CF6] hover:text-[#C4B5FD]"
          >
            Logout
          </button>
        </form>
      </section>
    </main>
  );
}
