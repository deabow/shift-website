type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageShell({ eyebrow, title, description }: PageShellProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col justify-center px-4 pb-16 pt-10 md:px-8">
      <section className="rounded-3xl border border-theme-border bg-theme-card p-8 shadow-sm backdrop-blur-sm md:p-14">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#9F0F1F] dark:text-[#FF4D1A] font-alexandria">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-theme-primary md:text-6xl font-alexandria">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-theme-secondary/80 md:text-lg font-alexandria">
          {description}
        </p>
      </section>
    </main>
  );
}

