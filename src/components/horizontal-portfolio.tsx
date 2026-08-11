"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { ArrowRight, Sparkles, Play, X, ExternalLink, Film, Image as ImageIcon } from "lucide-react";
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

export function HorizontalPortfolio() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [apiProjects, setApiProjects] = useState<PortfolioProject[]>([]);
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch real published projects from API
  useEffect(() => {
    fetch("/api/portfolio?published=true", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: PortfolioProject[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setApiProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const xTransformValues = isAr ? ["-1%", "75%"] : ["1%", "-75%"];
  const x = useTransform(scrollYProgress, [0, 1], xTransformValues);

  return (
    <section ref={targetRef} className={`relative bg-black ${isMobile ? "py-24" : "h-[300vh]"}`}>
      <div className={`${isMobile ? "relative" : "sticky top-0 h-screen"} flex flex-col items-center justify-center overflow-hidden`}>
        {/* Section Header */}
        <div className={`${isMobile ? "relative mb-8 px-4 w-full text-center flex flex-col items-center" : "absolute top-24 left-1/2 -translate-x-1/2 text-center w-full z-10 flex flex-col items-center"}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{isAr ? "معرض أعمال شيفت المميزة" : "Selected Works"}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            {t.portfolio.title}
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm md:text-base">{t.portfolio.subtitle}</p>
        </div>
        
        {/* Horizontal Project Showcase Cards */}
        <motion.div 
          style={isMobile ? {} : { x }} 
          className={`flex gap-6 md:gap-10 ${isMobile ? "overflow-x-auto snap-x snap-mandatory px-4 pb-8 w-full" : "px-12 xl:px-32 mt-28"}`}
        >
          {apiProjects.map((project) => {
            const hasVideo = Boolean(project.videoUrl);
            const coverImage = project.imageUrl || "/portfolio-covers/al-khaleej-cover.png";

            return (
              <motion.div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`group relative h-[420px] w-[300px] md:h-[580px] md:w-[460px] shrink-0 rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-pointer ${isMobile ? "snap-center" : ""}`}
              >
                {/* High quality cover image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                />

                {/* Ambient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-500" />

                {/* Top Badge: Type Indicator */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-md shadow-lg">
                    {hasVideo ? (
                      <>
                        <Film className="w-3 h-3 text-emerald-400" />
                        <span>{isAr ? "فيلم سينمائي" : "Cinematic Reel"}</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-emerald-400" />
                        <span>{isAr ? "مشروع تقني" : "Tech Showcase"}</span>
                      </>
                    )}
                  </span>

                  <span className="text-[10px] font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                    {project.clientType || "SHIFT Agency"}
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/20 text-emerald-300 backdrop-blur-md group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] transition-all duration-500">
                    {hasVideo ? <Play size={24} className="ml-1 fill-current" /> : <ArrowRight size={24} />}
                  </div>
                </div>

                {/* Bottom Title & Meta */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 flex flex-col text-right">
                  <p className="text-xs font-extrabold tracking-widest text-emerald-400 uppercase mb-1">
                    {getCategoryLabel(project.category, isAr)}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA to Full Portfolio */}
        <div className={`${isMobile ? "mt-6" : "absolute bottom-16"} z-10`}>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-zinc-900/80 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-zinc-100 backdrop-blur-2xl transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 hover:shadow-[0_0_35px_rgba(16,185,129,0.4)]"
          >
            <span>{isAr ? "عرض جميع المشاريع والتفاصيل" : "View All Projects & Cases"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Interactive Cinema Lightbox Modal ── */}
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
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 left-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-zinc-300 backdrop-blur-md transition hover:border-emerald-500/50 hover:bg-emerald-500 hover:text-zinc-950"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  {getCategoryLabel(activeModalProject.category, isAr)}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                  {activeModalProject.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  {activeModalProject.clientType || "Enterprise Showcase"}
                </p>
              </div>

              {/* Video Player or Cover Image */}
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

              {/* Description & Impact Grid */}
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
                        🎯 التحدي والهادف
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

                {/* Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "201211050297"}?text=${encodeURIComponent(`أهلاً ديبو، شفت مشروع "${activeModalProject.title}" وعايز انفذ فكرة مشابهة لشركتي.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-zinc-950 transition hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
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
