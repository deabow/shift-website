"use client";

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet-500/4 blur-[180px]" />

      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-violet-400">
        Something went wrong
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
        Failed to load services
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 rounded-xl border border-violet-500/40 bg-violet-500/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-violet-300 transition hover:border-violet-400/60 hover:bg-violet-500/20 hover:text-white"
      >
        Try Again
      </button>
    </main>
  );
}
