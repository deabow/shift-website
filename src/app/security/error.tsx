"use client";

export default function SecurityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black" />

      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
        Something went wrong
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
        Failed to load security page
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300 transition hover:border-emerald-400/60 hover:bg-emerald-500/20 hover:text-white"
      >
        Try Again
      </button>
    </main>
  );
}
