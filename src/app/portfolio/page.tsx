"use client";

import { PortfolioProject } from "@/lib/portfolio-types";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectVideoPlayer } from "@/components/project-video-player";
import Image from "next/image";
import { useEffect, useState } from "react";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzgwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMjAnIGhlaWdodD0nODAnIGZpbGw9JyMxMjEyMTYnLz48L3N2Zz4=";

function PortfolioTile({
  project,
  index,
  onOpen,
}: {
  project: PortfolioProject;
  index: number;
  onOpen: (project: PortfolioProject) => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl border border-[#8B5CF6]/35 bg-white/[0.04] ${project.bentoSpan}`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block h-full w-full text-left"
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          placeholder="blur"
          blurDataURL={blurDataURL}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition duration-700 ${loaded ? "scale-100 blur-0" : "scale-105 blur-md"}`}
          onLoadingComplete={() => setLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 opacity-80 transition group-hover:opacity-95" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-xs uppercase tracking-[0.18em] text-[#C4B5FD]">
            {project.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
        </div>
      </button>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/portfolio?published=true", {
          cache: "no-store",
        });
        const data = (await response.json()) as PortfolioProject[];
        setProjects(data);
      } finally {
        setLoading(false);
      }
    };

    void loadProjects();
    const interval = window.setInterval(() => {
      void loadProjects();
    }, 4000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-16 pt-10 md:px-8">
      <section className="rounded-3xl border border-[#8B5CF6]/20 bg-white/[0.03] p-8 shadow-[0_14px_70px_rgb(0,0,0,0.55)] backdrop-blur-sm md:p-14">
        <p className="text-xs uppercase tracking-[0.22em] text-[#8B5CF6]">
          Portfolio Access
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Exclusive SHIFT showcase.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
          Public view is limited to published case studies only. Draft work and
          unpublished projects stay protected in the admin workspace.
        </p>

        <div className="mt-8 inline-flex rounded-full border border-[#8B5CF6]/35 bg-[#8B5CF6]/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[#C4B5FD]">
          Protected View • Published Only
        </div>

        <div className="mt-10 grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[210px]">
          {projects.map((project, index) => (
            <PortfolioTile
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
        {!loading && projects.length === 0 && (
          <p className="mt-6 text-sm text-zinc-400">
            No published projects yet. Add and publish projects from the admin panel.
          </p>
        )}
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
              className="w-full max-w-4xl rounded-3xl border border-white/15 bg-[#0f0f12]/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl md:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#C4B5FD]">
                    {selectedProject.category}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg border border-white/20 bg-white/[0.02] px-3 py-1.5 text-sm text-zinc-200"
                >
                  Close
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#8B5CF6]/35 bg-black/45">
                <ProjectVideoPlayer
                  videoUrl={selectedProject.videoUrl}
                  title={selectedProject.title}
                  className="aspect-video h-full w-full"
                />
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm leading-relaxed text-zinc-300">
                  {selectedProject.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {selectedProject.results}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
