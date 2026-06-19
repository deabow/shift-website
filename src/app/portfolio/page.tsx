"use client";

import { PortfolioProject } from "@/lib/portfolio-types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Play, ExternalLink, X } from "lucide-react";

// ─── Blur placeholder ────────────────────────────────────────────────────────
const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzgwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMjAnIGhlaWdodD0nODAnIGZpbGw9JyMxMjEyMTYnLz48L3N2Zz4=";

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Bento Card ──────────────────────────────────────────────────────────────
function BentoCard({
  project,
  onOpen,
}: {
  project: PortfolioProject;
  onOpen: (p: PortfolioProject) => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      variants={cardVariants}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${project.bentoSpan} cursor-pointer`}
      onClick={() => onOpen(project)}
      style={{ minHeight: "260px" }}
    >
      {/* Thumbnail */}
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImgLoaded(true)}
      />

      {/* Persistent dark gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#10b981]/60 bg-[#10b981]/20 text-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Play size={22} fill="currentColor" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">
            View Case Study
          </span>
        </div>
      </div>

      {/* Card footer meta */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#10b981]">
          {project.clientType}
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-12">
          {project.description}
        </p>
      </div>

      {/* Published badge */}
      <div className="absolute right-4 top-4 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
        Published
      </div>
    </motion.article>
  );
}

// ─── Case Study Modal ─────────────────────────────────────────────────────────
function CaseStudyModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0e0e11]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl md:p-8"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-400 transition hover:text-white"
          aria-label="Close modal"
        >
          <X size={15} />
        </button>

        {/* Hero image */}
        <div className="relative h-52 overflow-hidden rounded-2xl border border-white/10 md:h-72">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Play video placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#10b981]/50 bg-[#10b981]/20 text-[#10b981] shadow-[0_0_30px_rgba(16,185,129,0.35)]">
                <Play size={26} fill="currentColor" />
              </div>
              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm">
                Video coming soon
              </span>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#10b981]">
            {project.clientType}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {project.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            {project.description}
          </p>
        </div>

        {/* Detail cards */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Challenge", body: project.challenge },
            { label: "Our Solution", body: project.solution },
            { label: "Results", body: project.results },
          ].map(({ label, body }) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#10b981]">
                {label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300">{body}</p>
            </div>
          ))}
        </div>

        {/* Key features */}
        {project.keyFeatures.length > 0 && (
          <div className="mt-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Key Deliverables
            </p>
            <div className="flex flex-wrap gap-2">
              {project.keyFeatures.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-3 py-1 text-xs font-medium text-emerald-300"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/portfolio/${project.slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#10b981] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            <ExternalLink size={14} />
            Full Case Study
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-300 transition hover:border-[#10b981]/40 hover:text-white"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/portfolio?published=true", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as PortfolioProject[];
      setProjects(data.filter((p) => p.published));
    } catch {
      // Silently handle network errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProjects();

    // Auto-poll every 4 s – picks up admin changes without page reload
    intervalRef.current = setInterval(() => {
      void fetchProjects();
    }, 4000);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-20 pt-12 md:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#10b981]/4 blur-[200px]" />

      {/* Section header */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-10"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#10b981]">
          Our Work
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
          Exclusive SHIFT showcase.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
          Every project is a case study in craft — from identity systems to
          large-scale environmental branding.
        </p>

        {/* Status pill */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live · Published only
        </div>
      </motion.header>

      {/* Bento Grid */}
      {loading ? (
        // Skeleton placeholders
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
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-4 text-4xl">📂</div>
          <p className="text-lg font-semibold text-white">No projects published yet.</p>
          <p className="mt-2 text-sm text-zinc-400">
            Add and publish projects from the admin panel.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 md:grid-cols-3 auto-rows-[260px]"
        >
          {projects.map((project) => (
            <BentoCard
              key={project.id}
              project={project}
              onOpen={setSelected}
            />
          ))}
        </motion.div>
      )}

      {/* Case Study Modal */}
      <AnimatePresence>
        {selected && (
          <CaseStudyModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
