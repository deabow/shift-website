"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PortfolioProject } from "@/lib/portfolio-types";

// Fallback static projects used when no real projects exist yet
function useFallbackProjects(t: ReturnType<typeof useLanguage>["t"]) {
  return [
    { id: "1", title: t.portfolio.projects.p1.title, category: t.portfolio.projects.p1.cat, color: "from-emerald-500/20 to-zinc-900", imageUrl: "" },
    { id: "2", title: t.portfolio.projects.p2.title, category: t.portfolio.projects.p2.cat, color: "from-purple-500/20 to-zinc-900", imageUrl: "" },
    { id: "3", title: t.portfolio.projects.p3.title, category: t.portfolio.projects.p3.cat, color: "from-blue-500/20 to-zinc-900", imageUrl: "" },
    { id: "4", title: t.portfolio.projects.p4.title, category: t.portfolio.projects.p4.cat, color: "from-pink-500/20 to-zinc-900", imageUrl: "" },
  ];
}

const GRADIENT_COLORS = [
  "from-emerald-500/20 to-zinc-900",
  "from-purple-500/20 to-zinc-900",
  "from-blue-500/20 to-zinc-900",
  "from-pink-500/20 to-zinc-900",
  "from-amber-500/20 to-zinc-900",
  "from-cyan-500/20 to-zinc-900",
];

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
  const fallbackProjects = useFallbackProjects(t);
  
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

  const xTransformValues = language === "ar" ? ["-1%", "75%"] : ["1%", "-75%"];
  const x = useTransform(scrollYProgress, [0, 1], xTransformValues);

  // Use real projects if available, otherwise fallback to static data
  const hasRealProjects = apiProjects.length > 0;
  const displayProjects = hasRealProjects
    ? apiProjects.map((p, i) => ({
        id: p.id,
        title: p.title,
        category: getCategoryLabel(p.category, isAr),
        color: GRADIENT_COLORS[i % GRADIENT_COLORS.length],
        imageUrl: p.imageUrl,
        slug: p.slug,
      }))
    : fallbackProjects;

  return (
    <section ref={targetRef} className={`relative bg-black ${isMobile ? "py-24" : "h-[300vh]"}`}>
      <div className={`${isMobile ? "relative" : "sticky top-0 h-screen"} flex flex-col items-center justify-center overflow-hidden`}>
        <div className={`${isMobile ? "relative mb-8 px-4 w-full text-center flex flex-col items-center" : "absolute top-24 left-1/2 -translate-x-1/2 text-center w-full z-10 flex flex-col items-center"}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{isAr ? "معرض أعمال شيفت" : "Selected Works"}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            {t.portfolio.title}
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl">{t.portfolio.subtitle}</p>
        </div>
        
        <motion.div 
          style={isMobile ? {} : { x }} 
          className={`flex gap-4 md:gap-8 ${isMobile ? "overflow-x-auto snap-x snap-mandatory px-4 pb-8 w-full" : "px-12 xl:px-32 mt-24"}`}
        >
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative h-[400px] w-[280px] md:h-[600px] md:w-[450px] shrink-0 rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 ${isMobile ? "snap-center" : ""}`}
            >
              {/* Background — real image or gradient fallback */}
              {project.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:scale-105 transition-transform duration-700`} />
              )}
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center text-center">
                <p className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA to portfolio page */}
        <div className={`${isMobile ? "mt-4" : "absolute bottom-24"} z-10`}>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-zinc-900/60 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-100 backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-white"
          >
            <span>{isAr ? "شوف كل الأعمال" : "View All Projects"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
