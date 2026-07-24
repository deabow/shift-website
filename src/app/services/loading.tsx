export default function ServicesLoading() {
  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-20 pt-12 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/4 blur-[200px]" />

      <div className="mb-12 max-w-3xl animate-pulse">
        <div className="h-3 w-24 rounded-full bg-white/5" />
        <div className="mt-4 h-10 w-full max-w-xl rounded-lg bg-white/5" />
        <div className="mt-5 h-5 w-96 max-w-full rounded-lg bg-white/5" />
        <div className="mt-7 h-px w-24 rounded-full bg-white/5" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-white/5 bg-zinc-900/30 p-6 md:p-8"
          >
            <div className="mb-5 h-12 w-12 rounded-xl bg-white/5" />
            <div className="mb-2 h-3 w-32 rounded-full bg-white/5" />
            <div className="h-6 w-48 rounded-lg bg-white/5" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full rounded-lg bg-white/5" />
              <div className="h-4 w-3/4 rounded-lg bg-white/5" />
            </div>
            <div className="mt-5 space-y-2">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-4 w-full rounded-lg bg-white/5" />
              ))}
            </div>
            <div className="mt-7 h-11 w-full rounded-xl bg-white/5" />
          </div>
        ))}
      </div>
    </main>
  );
}
