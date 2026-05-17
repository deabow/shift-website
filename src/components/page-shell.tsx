type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageShell({ eyebrow, title, description }: PageShellProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col justify-center px-4 pb-16 pt-10 md:px-8">
      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_10px_50px_rgb(0,0,0,0.45)] backdrop-blur-sm md:p-14">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#8B5CF6]">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
          {description}
        </p>
      </section>
    </main>
  );
}
