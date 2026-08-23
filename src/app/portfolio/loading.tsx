export default function PortfolioLoading() {
  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-20 pt-12 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#8b5cf6]/4 blur-[200px]" />

      <div className="mb-10 animate-pulse">
        <div className="h-3 w-20 rounded-full bg-white/5" />
        <div className="mt-4 h-10 w-96 max-w-full rounded-lg bg-white/5" />
        <div className="mt-4 h-5 w-72 max-w-full rounded-lg bg-white/5" />
        <div className="mt-5 h-6 w-40 rounded-full bg-white/5" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 auto-rows-[260px]">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`animate-pulse rounded-2xl border border-white/5 bg-white/[0.03] ${
              i === 1 ? "md:col-span-2" : "md:col-span-1"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
