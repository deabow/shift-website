import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col items-center justify-center px-4 text-center bg-theme-bg transition-colors duration-300">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#9F0F1F]/[0.05] blur-[180px]" />

      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9F0F1F] dark:text-[#FF4D1A] font-alexandria">
        Error 404
      </p>

      <h1 className="mt-6 text-6xl font-bold tracking-tight text-theme-primary md:text-8xl font-alexandria">
        <span className="text-[#9F0F1F] dark:text-[#FF4D1A]">
          الصفحة
        </span>{" "}
        مش موجودة.
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-theme-secondary/80 font-alexandria">
        الصفحة اللي بتدور عليها مش موجودة أو اتنقلت.
        خلينا نرجعك للمكان الصح في موقع حضور | Hodour.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#9F0F1F] px-8 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#F2D3B1] transition-colors hover:bg-[#B91C28] font-alexandria focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
      >
        الرجوع للرئيسية
      </Link>
    </main>
  );
}
