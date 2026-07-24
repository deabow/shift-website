import { OpenChatButton } from "@/components/open-chat-button";
import { ProjectVideoPlayer } from "@/components/project-video-player";
import { getProjectBySlug } from "@/lib/portfolio-store";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type CaseStudyPageProps = {
  params: {
    slug: string;
  };
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project || !project.published) {
    return { title: "Case Study | SHIFT" };
  }

  return {
    title: `${project.title} | SHIFT Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | SHIFT Case Study`,
      description: project.description,
      type: "article",
      images: [{ url: project.imageUrl, width: 1400, height: 934, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | SHIFT Case Study`,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project || !project.published) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-20 pt-10 md:px-8">
      <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_12px_60px_rgb(0,0,0,0.5)] backdrop-blur-sm">
        <header className="border-b border-white/10 p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[#C4B5FD]">
            {project.category}
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-200 md:text-base">
            {project.description}
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#8B5CF6]/35 bg-black/40">
            <ProjectVideoPlayer
              videoUrl={project.videoUrl}
              title={project.title}
              className="aspect-video h-full w-full"
            />
          </div>
        </header>

        <div className="grid gap-5 p-6 md:grid-cols-3 md:gap-6 md:p-10">
          <section className="rounded-2xl border border-white/10 bg-black/30 p-5 md:col-span-1">
            <h2 className="text-lg font-semibold text-white">The Challenge</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {project.challenge}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-black/30 p-5 md:col-span-1">
            <h2 className="text-lg font-semibold text-white">Our Solution</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {project.solution}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-black/30 p-5 md:col-span-1">
            <h2 className="text-lg font-semibold text-white">Final Results</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {project.results}
            </p>
          </section>
        </div>

        <section className="border-y border-white/10 bg-black/20 px-6 py-8 md:px-10">
          <h3 className="text-xl font-semibold text-white">Key Features</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.keyFeatures.map((feature) => (
              <div
                key={feature}
                className="rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 py-3 text-sm font-medium text-zinc-100"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>

        <div className="px-6 pb-10 pt-8 md:px-10">
          <OpenChatButton className="w-full rounded-2xl bg-[#8B5CF6] px-6 py-4 text-center text-base font-semibold text-white shadow-[0_12px_35px_rgba(139,92,246,0.45)] transition hover:bg-[#7C3AED]">
            Start a similar project
          </OpenChatButton>
        </div>
      </article>
    </main>
  );
}
