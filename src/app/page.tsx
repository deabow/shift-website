import { RevealMaskText } from "@/components/reveal-mask-text";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pb-8 pt-24 md:px-8">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(900px_circle_at_50%_10%,rgba(139,92,246,0.2),transparent_55%),radial-gradient(700px_circle_at_80%_85%,rgba(45,212,191,0.12),transparent_50%)]" />
      <div className="hero-3d-orb pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <section className="relative mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_70px_rgb(0,0,0,0.55)] backdrop-blur-sm md:p-10">
        <p className="text-center text-xs uppercase tracking-[0.24em] text-[#8B5CF6]">
          Shift Agency
        </p>
        <h1 className="mt-5 text-center text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Cyber-grade digital experiences with gravity-defying performance.
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-zinc-300 md:text-base">
          Immersive interfaces, secure engineering, and futuristic systems built
          to move brands into their next era.
        </p>

        <div className="relative mt-8 h-[58vh] min-h-[420px]">
          <RevealMaskText />
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5" />
          <div className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-[#8B5CF6]/25 blur-3xl" />
        </div>
      </section>
    </main>
  );
}
