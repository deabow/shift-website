export default function SecurityLoading() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col items-center px-4 pb-24 pt-12 md:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black" />

      <div className="flex flex-col items-center gap-8 text-center md:gap-10">
        <div className="h-20 w-20 animate-pulse rounded-2xl bg-white/5" />

        <div className="max-w-3xl animate-pulse">
          <div className="mx-auto h-3 w-48 rounded-full bg-white/5" />
          <div className="mx-auto mt-4 h-10 w-full max-w-2xl rounded-lg bg-white/5" />
          <div className="mx-auto mt-5 h-5 w-96 max-w-full rounded-lg bg-white/5" />
        </div>

        <div className="h-px w-full max-w-md bg-white/5" />
      </div>

      <div className="mt-16 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-white/5 bg-zinc-900/20 p-6 md:p-7"
          >
            <div className="mb-5 h-11 w-11 rounded-xl bg-white/5" />
            <div className="h-6 w-48 rounded-lg bg-white/5" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full rounded-lg bg-white/5" />
              <div className="h-4 w-5/6 rounded-lg bg-white/5" />
              <div className="h-4 w-4/6 rounded-lg bg-white/5" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="h-6 w-20 rounded-full bg-white/5"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
