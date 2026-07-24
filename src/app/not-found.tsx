import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/4 blur-[180px]" />

      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
        Error 404
      </p>

      <h1 className="mt-6 text-6xl font-bold tracking-tight text-white md:text-8xl">
        <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
          Lost in
        </span>{" "}
        space.
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
        Let&apos;s get you back on course.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#10b981] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
      >
        Return Home
      </Link>
    </main>
  );
}
