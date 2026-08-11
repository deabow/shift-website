"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { ArrowRight, Sparkles, Play, X, ExternalLink, Film, Image as ImageIcon, PlusCircle, Eye } from "lucide-react";
import { PortfolioProject } from "@/lib/portfolio-types";
import { ProjectVideoPlayer } from "@/components/project-video-player";

function getCategoryLabel(category: string, isAr: boolean) {
  if (category === "web-dev" || category.includes("Web")) {
    return isAr ? "تطوير الويب والبرمجيات" : "Web & Software Development";
  }
  if (category === "digital-marketing" || category.includes("Marketing")) {
    return isAr ? "التسويق الرقمي" : "Digital Marketing";
  }
  if (category === "media-production" || category.includes("Media")) {
    return isAr ? "الإنتاج الإعلامي وبناء الهوية" : "Media Production & Branding";
  }
  return category;
}

// Spotlight Bento Card Component
function BentoGridCard({
  project,
  isMain,
  onClick,
}: {
  project: PortfolioProject;
  isMain?: boolean;
  onClick: (p: PortfolioProject) => void;
}) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    const calcRotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
    const calcRotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
    rotateX.set(calcRotateX);
    rotateY.set(calcRotateY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const borderSpotlight = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(16, 185, 129, 0.8) 0%,
      rgba(16, 185, 129, 0.2) 45%,
      transparent 80%
    )
  `;

  const coverImage = project.imageUrl || "/portfolio-covers/al-khaleej-cover.png";
  const hasVideo = Boolean(project.videoUrl);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative rounded-3xl p-[1px] bg-black/10 dark:bg-white/[0.08] cursor-pointer transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.25)] ${
        project.bentoSpan || (isMain ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1")
      }`}
    >
      {/* Mouse Spotlight Border */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-30"
        style={{ background: borderSpotlight }}
      />

      <div className="relative h-full w-full min-h-[340px] md:min-h-[420px] rounded-[calc(1.5rem-1px)] overflow-hidden bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl z-0 flex flex-col justify-between p-6 md:p-8">
        {/* Cover image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImage}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-[0.8] group-hover:brightness-95"
        />

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

        {/* Top Badges */}
        <div className="relative z-20 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-white/15 text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 backdrop-blur-md shadow-lg">
            {hasVideo ? (
              <>
                <Film size={13} className="text-emerald-400" />
                <span>{isAr ? "فيديو سينمائي 8K" : "Cinematic Reel"}</span>
              </>
            ) : (
              <>
                <ImageIcon size={13} className="text-emerald-400" />
                <span>{isAr ? "مشروع تقني" : "Tech Showcase"}</span>
              </>
            )}
          </span>

          <span className="text-[10px] font-mono font-semibold text-zinc-300 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
            {project.clientType || "SHIFT Agency"}
          </span>
        </div>

        {/* Hover Center Indicator */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-400 group-hover:opacity-100 pointer-events-none">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-500/25 text-emerald-300 backdrop-blur-md group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] transition-all duration-500">
            {hasVideo ? <Play size={24} className="ml-1 fill-current" /> : <Eye size={24} />}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="relative z-20 flex flex-col justify-end text-right">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white group-hover:text-emerald-300 transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-xs md:text-sm leading-relaxed text-zinc-300 line-clamp-2">
            {project.description}
          </p>

          {/* Key tags */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
              {project.keyFeatures.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function BentoPortfolio() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [apiProjects, setApiProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    fetch("/api/portfolio?published=true", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: PortfolioProject[]) => {
        if (Array.isArray(data)) {
          setApiProjects(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = apiProjects.filter((project) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "web-dev") return project.category === "web-dev" || project.category.includes("Web");
    if (selectedCategory === "digital-marketing") return project.category === "digital-marketing" || project.category.includes("Marketing");
    if (selectedCategory === "media-production") return project.category === "media-production" || project.category.includes("Media");
    return true;
  });

  const categoryTabs = [
    { id: "all", label: isAr ? "كل الأعمال" : "All Projects" },
    { id: "web-dev", label: isAr ? "تطوير الويب والتطبيقات" : "Web & Software" },
    { id: "digital-marketing", label: isAr ? "التسويق الرقمي" : "Digital Marketing" },
    { id: "media-production", label: isAr ? "الإنتاج الإعلامي والسينمائي" : "Media Production" },
  ];

  return (
    <section className="relative w-full py-20 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>{isAr ? "معرض أعمال SHIFT التفاعلي" : "Interactive Portfolio Bento"}</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-zinc-200 dark:to-zinc-500 dark:bg-clip-text">
          {t.portfolio.title}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
          {t.portfolio.subtitle}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-1.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl">
        {categoryTabs.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`relative rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all duration-300 ${
                isActive ? "text-zinc-950" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-portfolio-tab"
                  className="absolute inset-0 rounded-xl bg-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 rounded-3xl border border-white/10 bg-zinc-900/40 animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty State when no real projects exist */}
      {!loading && filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg rounded-3xl border border-dashed border-black/20 dark:border-white/20 bg-white/50 dark:bg-zinc-950/50 p-10 text-center backdrop-blur-xl flex flex-col items-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
            <Sparkles size={28} />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            {isAr ? "لا توجد مشاريع مضافة حالياً" : "No Portfolio Projects Yet"}
          </h3>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
            {isAr
              ? "يتم التحكم بكافة المشاريع والمعروضات بشكل كامل ومباشر من خلال لوحة التحكم الخاصة بالشركة."
              : "All portfolio projects are managed 100% dynamically from the admin panel."}
          </p>
          <Link
            href="/admin"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-zinc-950 transition hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            <PlusCircle size={16} />
            <span>{isAr ? "إضافة مشروع من لوحة التحكم" : "Add Project from Admin Panel"}</span>
          </Link>
        </motion.div>
      )}

      {/* Bento Grid */}
      {!loading && filteredProjects.length > 0 && (
        <motion.div
          layout
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <BentoGridCard
                key={project.id}
                project={project}
                isMain={idx === 0}
                onClick={(p) => setActiveModalProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Interactive Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl"
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-zinc-950 p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-right"
              dir={isAr ? "rtl" : "ltr"}
            >
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 left-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-zinc-300 backdrop-blur-md transition hover:border-emerald-500/50 hover:bg-emerald-500 hover:text-zinc-950"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  {getCategoryLabel(activeModalProject.category, isAr)}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                  {activeModalProject.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  {activeModalProject.clientType || "Enterprise Showcase"}
                </p>
              </div>

              {/* Video Player or Image Preview */}
              <div className="relative mb-6 h-64 sm:h-80 md:h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                {activeModalProject.videoUrl ? (
                  <ProjectVideoPlayer
                    videoUrl={activeModalProject.videoUrl}
                    title={activeModalProject.title}
                    className="h-full w-full"
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={activeModalProject.imageUrl || "/portfolio-covers/al-khaleej-cover.png"}
                    alt={activeModalProject.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-emerald-400 mb-2">عن المشروع</h3>
                  <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
                    {activeModalProject.description}
                  </p>
                </div>

                {activeModalProject.challenge && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                        🎯 التحدي والهدف
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {activeModalProject.challenge}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                        🚀 الحل والتنفيذ
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {activeModalProject.solution}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "201211050297"}?text=${encodeURIComponent(`أهلاً ديبو، شفت مشروع "${activeModalProject.title}" وعايز انفذ فكرة مشابهة لشركتي.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-zinc-950 transition hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.55)]"
                  >
                    <span>طلب مشروع مشابه على واتساب</span>
                    <ArrowRight size={16} />
                  </a>

                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-white transition-colors"
                    >
                      <span>زيارة الموقع المباشر</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
