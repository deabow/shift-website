"use client";

import { PortfolioProject } from "@/lib/portfolio-types";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { Play, ExternalLink, X, Sparkles, ArrowUpRight } from "lucide-react";
import { MagneticWrapper } from "@/components/magnetic-wrapper";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzgwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMjAnIGhlaWdodD0nODAnIGZpbGw9JyMxMjEyMTYnLz48L3N2Zz4=";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

// ─── BentoCard with Mouse-Tracking Border Spotlight ───────────────────────────
function BentoCard({
  project,
  onOpen,
}: {
  project: PortfolioProject;
  onOpen: (p: PortfolioProject) => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    const calcRotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const calcRotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    rotateX.set(calcRotateX);
    rotateY.set(calcRotateY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const borderSpotlight = useMotionTemplate`
    radial-gradient(
      320px circle at ${mouseX}px ${mouseY}px,
      rgba(16, 185, 129, 0.8) 0%,
      rgba(16, 185, 129, 0.2) 45%,
      transparent 80%
    )
  `;

  return (
    <motion.article
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        minHeight: "280px",
      }}
      className={`group relative rounded-3xl p-[1px] bg-white/[0.08] cursor-pointer transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.2)] ${project.bentoSpan}`}
    >
      {/* Mouse Spotlight Border Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-30"
        style={{ background: borderSpotlight }}
      />

      <div className="relative h-full w-full rounded-[calc(1.5rem-1px)] overflow-hidden bg-zinc-950/90 backdrop-blur-2xl z-0">
        {/* Image */}
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          placeholder="blur"
          blurDataURL={blurDataURL}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-10" />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-400 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              <Play size={22} fill="currentColor" />
            </motion.div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">
              Explore Case Study
            </span>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col justify-end">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              {project.clientType}
            </span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>
          <h3 className="text-xl font-extrabold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2 opacity-0 max-h-0 transition-all duration-400 group-hover:opacity-100 group-hover:max-h-12 font-normal">
            {project.description}
          </p>
        </div>
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
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring" as const, stiffness: 100, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl border border-white/[0.08] bg-zinc-950/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.9)] backdrop-blur-2xl md:p-8 overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-zinc-400 backdrop-blur-sm transition hover:text-white hover:border-emerald-500/40"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Hero image */}
        <div className="relative h-56 overflow-hidden rounded-2xl border border-white/[0.08] md:h-72">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.4)]">
                <Play size={26} fill="currentColor" />
              </div>
              <span className="rounded-full border border-white/10 bg-black/60 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-sm">
                Case Reel Active
              </span>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
            {project.clientType}
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-100 md:text-3xl">
            {project.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>
        </div>

        {/* Detail cards */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Challenge", body: project.challenge },
            { label: "Our Solution", body: project.solution },
            { label: "Results", body: project.results },
          ].map(({ label, body }) => (
            <div
              key={label}
              className="rounded-xl border border-white/[0.06] bg-zinc-900/60 p-4 backdrop-blur-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                {label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300">{body}</p>
            </div>
          ))}
        </div>

        {/* Key features */}
        {project.keyFeatures.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Key Deliverables
            </p>
            <div className="flex flex-wrap gap-2">
              {project.keyFeatures.map((f) => (
                <span
                  key={f}
                  className="rounded-md border border-white/[0.06] bg-zinc-900/90 px-3 py-1 text-[11px] font-semibold text-zinc-300"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <MagneticWrapper className="flex-1" distanceMultiplier={0.25}>
            <Link
              href={`/portfolio/${project.slug}`}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-500 px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-950 transition-all duration-500 hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:bg-emerald-400"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ExternalLink size={14} />
                Full Case Study
              </span>
            </Link>
          </MagneticWrapper>

          <MagneticWrapper className="flex-1" distanceMultiplier={0.25}>
            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-zinc-900/60 px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:text-white"
            >
              Close
            </button>
          </MagneticWrapper>
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

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/portfolio?published=true", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as PortfolioProject[];
      setProjects(data.filter((p) => p.published));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProjects();
  }, []);

  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8">
      {/* Cinematic backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,theme(colors.emerald.900/8),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#10b981]/5 blur-[220px]" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Selected Missions</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 md:text-5xl lg:text-6xl leading-[1.1]">
          Exclusive SHIFT showcase.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
          Every project is a case study in craft — from identity systems to
          large-scale environmental branding and digital architecture.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live &middot; Verified Case Studies
        </div>
      </motion.header>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 auto-rows-[280px]">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`animate-pulse rounded-3xl border border-white/5 bg-zinc-900/30 ${
                i === 1 ? "md:col-span-2" : "md:col-span-1"
              }`}
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center rounded-3xl border border-white/[0.08] bg-zinc-950/80 p-8 backdrop-blur-2xl">
          <div className="mb-4 text-4xl">📂</div>
          <p className="text-xl font-bold text-zinc-100">No projects published yet.</p>
          <p className="mt-2 text-sm text-zinc-400">
            Add and publish projects from the admin panel to showcase your work.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 md:grid-cols-3 auto-rows-[280px]"
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
