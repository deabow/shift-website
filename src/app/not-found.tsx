import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#9F0F1F]/[0.04] blur-[180px]" />

      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9F0F1F] font-changa">
        Error 404
      </p>

      <h1 className="mt-6 text-6xl font-bold tracking-tight text-[#F2D3B1] md:text-8xl font-changa">
        <span className="text-[#9F0F1F]">
          الصفحة
        </span>{" "}
        مش موجودة.
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-[#F2D3B1]/50 font-tajawal">
        الصفحة اللي بتدور عليها مش موجودة أو اتنقلت.
        خلينا نرجعك للمكان الصح.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#9F0F1F] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#F2D3B1] transition hover:shadow-[0_0_25px_rgba(159,15,31,0.4)] font-changa"
      >
        الرجوع للرئيسية
      </Link>
    </main>
  );
}
