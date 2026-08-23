import { OpenChatButton } from "@/components/open-chat-button";
import { MediaGalleryCarousel } from "@/components/media-gallery-carousel";
import { getProjectBySlug } from "@/lib/portfolio-store";
import { renderFormattedDescription } from "@/lib/link-utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe } from "lucide-react";

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

  const mediaItems =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [
          ...(project.imageUrl ? [{ type: "image" as const, url: project.imageUrl }] : []),
          ...(project.videoUrl ? [{ type: "video" as const, url: project.videoUrl }] : []),
        ];

  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-20 pt-10 md:px-8">
      <article className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/90 shadow-[0_12px_60px_rgb(0,0,0,0.5)] backdrop-blur-2xl">
        <header className="border-b border-white/10 p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="text-xs uppercase tracking-[0.22em] text-violet-400 font-bold bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
              {project.category}
            </span>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-300 text-xs font-bold transition hover:bg-violet-500 hover:text-zinc-950 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
              >
                <Globe size={14} />
                <span>Visit Live Website</span>
              </a>
            )}
          </div>

          <h1 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            {project.title}
          </h1>

          <div className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
            {renderFormattedDescription(project.description)}
          </div>

          <div className="mt-8">
            <MediaGalleryCarousel items={mediaItems} title={project.title} />
          </div>
        </header>

        <div className="grid gap-5 p-6 md:grid-cols-3 md:gap-6 md:p-10">
          <section className="rounded-2xl border border-white/10 bg-black/30 p-5 md:col-span-1">
            <h2 className="text-lg font-bold text-violet-400 mb-2">The Challenge</h2>
            <div className="text-sm leading-relaxed text-zinc-300">
              {renderFormattedDescription(project.challenge)}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-black/30 p-5 md:col-span-1">
            <h2 className="text-lg font-bold text-violet-400 mb-2">Our Solution</h2>
            <div className="text-sm leading-relaxed text-zinc-300">
              {renderFormattedDescription(project.solution)}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-black/30 p-5 md:col-span-1">
            <h2 className="text-lg font-bold text-violet-400 mb-2">Final Results</h2>
            <div className="text-sm leading-relaxed text-zinc-300">
              {renderFormattedDescription(project.results)}
            </div>
          </section>
        </div>

        <section className="border-y border-white/10 bg-black/20 px-6 py-8 md:px-10">
          <h3 className="text-xl font-bold text-white">Key Features & Deliverables</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.keyFeatures.map((feature) => (
              <div
                key={feature}
                className="rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>

        <div className="px-6 pb-10 pt-8 md:px-10 flex flex-col sm:flex-row gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-500 px-6 py-4 text-center text-sm font-extrabold uppercase tracking-wider text-zinc-950 shadow-[0_12px_35px_rgba(139,92,246,0.45)] transition hover:bg-violet-400"
            >
              <Globe size={18} />
              <span>Launch Live Website</span>
            </a>
          )}

          <OpenChatButton className="flex-1 rounded-2xl border border-white/20 bg-zinc-900 px-6 py-4 text-center text-sm font-extrabold uppercase tracking-wider text-white transition hover:border-violet-500/50 hover:bg-zinc-800">
            Start a Similar Project
          </OpenChatButton>
        </div>
      </article>
    </main>
  );
}

