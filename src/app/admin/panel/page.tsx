import { AdminPortfolioDashboard } from "@/components/admin-portfolio-dashboard";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";

export default function AdminPanelPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-16 pt-6 md:px-8" dir="rtl">
      <section className="w-full rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-colors duration-300">
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck size={14} />
              <span>منطقة الإدارة المشفرة الآمنة</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              لوحة تحكم معرض أعمال SHIFT
            </h1>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              جميع التعديلات والإضافات التي تتم هنا تظهر فورياً وبدون أي تأخير في معرض الأعمال بالموقع.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portfolio"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition hover:border-violet-500/50 hover:text-violet-500"
            >
              <span>معاينة معرض الأعمال بالموقع</span>
              <ExternalLink size={14} />
            </Link>

            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                تسجيل الخروج
              </button>
            </form>
          </div>
        </div>

        <AdminPortfolioDashboard />
      </section>
    </main>
  );
}
