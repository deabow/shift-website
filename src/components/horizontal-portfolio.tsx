"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Play,
  X,
  ExternalLink,
  Film,
  Image as ImageIcon,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { PortfolioProject, MediaItem } from "@/lib/portfolio-types";
import { MediaGalleryCarousel } from "@/components/media-gallery-carousel";

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

const DEFAULT_PORTFOLIO_FALLBACKS: PortfolioProject[] = [
  {
    id: "p_kamal_abou_ali_law_video",
    slug: "kamal-abou-ali-law-firm-video",
    title: "الفيديو التعريفي والمؤسسي — مؤسسة كمال أبو علي القانونية",
    category: "media-production",
    clientType: "استشارات قانونية ومحاماة",
    description: "إنتاج فيديو تعريفي وجلسات تصوير مؤسسي احترافية لمكاتب كمال أبو علي بالشيخ زايد ومدينة السادات لإبراز حجم ونشاط الفريق.",
    imageUrl: "/portfolio-media/kamal-abou-ali-law-video-cover.jpeg",
    videoUrl: "https://vimeo.com/1217349863",
    gallery: [
      { type: "video", url: "https://vimeo.com/1217349863" },
      { type: "image", url: "/portfolio-media/kamal-abou-ali-law-video-cover.jpeg" },
    ],
    liveUrl: "",
    challenge: "إبراز قوة واحترافية الكادر القانوني والمقرات بأسلوب سينمائي موثوق.",
    solution: "تصوير مؤسسي سينمائي وإخراج فيديو تعريفي يعكس الهيبة والثقة.",
    results: "ترسيخ المكانة المرموقة للمؤسسة أمام الشركات والعملاء.",
    keyFeatures: ["فيديو تعريفي", "تصوير مؤسسي", "الشيخ زايد والسادات"],
    bentoSpan: "md:col-span-2 md:row-span-2",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p_kamal_abou_ali_law_web",
    slug: "kamal-abou-ali-law-firm-website",
    title: "الموقع الإلكتروني والمنصة الرقمية — مؤسسة كمال أبو علي",
    category: "web-dev",
    clientType: "استشارات قانونية ومحاماة",
    description: "تصميم وتطوير موقع إلكتروني فاخر وسريع لتسهيل الاستشارات القانونية واستعراض التخصصات وفروع المؤسسة.",
    imageUrl: "/portfolio-media/kamal-web-screen-1.png",
    videoUrl: "",
    gallery: [
      { type: "image", url: "/portfolio-media/kamal-web-screen-1.png", caption: "الصفحة الرئيسية والواجهة الترحيبية" },
      { type: "image", url: "/portfolio-media/kamal-web-screen-2.png", caption: "منظومة الاستشارات والخدمات القانونية" },
      { type: "image", url: "/portfolio-media/kamal-web-screen-3.png", caption: "استعراض خبرات وسجل قضايا المؤسسة" },
      { type: "image", url: "/portfolio-media/kamal-web-screen-4.png", caption: "فريق المستشارين وكبار المحامين" },
      { type: "image", url: "/portfolio-media/kamal-web-screen-5.png", caption: "نموذج حجز الاستشارة المباشرة" },
      { type: "image", url: "/portfolio-media/kamal-web-screen-6.png", caption: "فروع ومقرات المؤسسة بالشيخ زايد والسادات" },
      { type: "image", url: "/portfolio-media/kamal-web-screen-7.png", caption: "التوافق التام مع كافة مقاسات الموبايل" },
    ],
    liveUrl: "https://aboalilawfirm.com/",
    challenge: "تبسيط حجز الاستشارات القانونية واستعراض القضايا المعقدة برقي.",
    solution: "تطوير موقع Next.js 14 فائق السرعة والأمان مع تجربة مستخدم سلسة.",
    results: "زيادة الحجوزات والاستشارات الرقمية المباشرة عبر الموقع.",
    keyFeatures: ["تطوير ويب", "Next.js 14", "حجز استشارات"],
    bentoSpan: "md:col-span-1 md:row-span-1",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p_ahmed_abou_zeid_video",
    slug: "mp-ahmed-abou-zeid-video",
    title: "الفيديو السينمائي للحملة الميدانية — النائب أحمد أبو زيد",
    category: "media-production",
    clientType: "شخصية سياسية / عامة",
    description: "فيديو سينمائي تم تصويره ميدانياً في المزارع والشارع مع تعديل ألوان Color Grading احترافي لإبراز التواصل المباشر مع المواطنين.",
    imageUrl: "/portfolio-media/mp-ahmed-abou-zeid-campaign-cover.jpeg",
    videoUrl: "https://vimeo.com/1217349916",
    gallery: [
      { type: "video", url: "https://vimeo.com/1217349916" },
      { type: "image", url: "/portfolio-media/mp-ahmed-abou-zeid-campaign-cover.jpeg" },
    ],
    liveUrl: "",
    challenge: "تقديم رسالة مرئية مؤثرة وواقعية تعبر عن التواجد الميداني الحقيقي.",
    solution: "تصوير في بيئة العمل الطبيعية وتعديل ألوان سينمائي داكن متوازن.",
    results: "تحقيق ملايين المشاهدات وتفاعل جماهيري غير مسبوق للحملة.",
    keyFeatures: ["تصوير ميداني", "Color Grading", "إنتاج سينمائي"],
    bentoSpan: "md:col-span-2 md:row-span-1",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

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

  // Fetch real published projects from API (Cloud DB or seed)
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

  const projectsToDisplay = apiProjects.length > 0 ? apiProjects : DEFAULT_PORTFOLIO_FALLBACKS;

  // Prepare gallery items for active modal
  const modalMediaItems: MediaItem[] = activeModalProject
    ? activeModalProject.gallery && activeModalProject.gallery.length > 0
      ? activeModalProject.gallery
      : [
          ...(activeModalProject.imageUrl ? [{ type: "image" as const, url: activeModalProject.imageUrl }] : []),
          ...(activeModalProject.videoUrl ? [{ type: "video" as const, url: activeModalProject.videoUrl }] : []),
        ]
    : [];

  return (
    <section ref={targetRef} className={`relative bg-black ${isMobile ? "py-24" : "h-[300vh]"}`}>
      <div className={`${isMobile ? "relative" : "sticky top-0 h-screen"} flex flex-col items-center justify-center overflow-hidden`}>
        {/* Section Header */}
        <div className={`${isMobile ? "relative mb-8 px-4 w-full text-center flex flex-col items-center" : "absolute top-20 left-1/2 -translate-x-1/2 text-center w-full z-10 flex flex-col items-center"}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/[0.08] border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
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
          {projectsToDisplay.map((project) => {
            const hasVideo = Boolean(project.videoUrl);
            const coverImage = project.imageUrl || "/portfolio-covers/al-khaleej-cover.png";
            const galleryCount = project.gallery?.length ?? 0;

            return (
              <motion.div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`group relative h-[430px] w-[310px] md:h-[580px] md:w-[470px] shrink-0 rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-pointer ${isMobile ? "snap-center" : ""}`}
              >
                {/* High quality cover image (supports Cloudinary & local paths) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                />

                {/* Ambient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-violet-900/10 group-hover:bg-transparent transition-colors duration-500" />

                {/* Top Badges */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/85 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-violet-400 backdrop-blur-md shadow-lg">
                      {hasVideo ? (
                        <>
                          <Film className="w-3 h-3 text-violet-400" />
                          <span>{isAr ? "فيلم سينمائي 8K" : "Cinematic Reel"}</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3 h-3 text-violet-400" />
                          <span>{isAr ? "مشروع تقني" : "Tech Showcase"}</span>
                        </>
                      )}
                    </span>

                    {galleryCount > 1 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-[10px] font-bold text-violet-300 backdrop-blur-md">
                        <Layers size={11} />
                        <span>{isAr ? `${galleryCount} لقطات` : `${galleryCount} Screens`}</span>
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-zinc-300 bg-black/70 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                    {project.clientType || "SHIFT Agency"}
                  </span>
                </div>

                {/* Center Play / View Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 text-violet-300 backdrop-blur-md group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-zinc-950 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] transition-all duration-500">
                    {hasVideo ? <Play size={24} className="ml-1 fill-current" /> : <ArrowRight size={24} />}
                  </div>
                </div>

                {/* Bottom Title & Meta */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 flex flex-col text-right">
                  <p className="text-xs font-extrabold tracking-widest text-violet-400 uppercase mb-1">
                    {getCategoryLabel(project.category, isAr)}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-violet-300 transition-colors leading-tight">
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
        <div className={`${isMobile ? "mt-6" : "absolute bottom-12"} z-10`}>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 rounded-xl border border-violet-500/30 bg-zinc-900/80 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-zinc-100 backdrop-blur-2xl transition-all duration-300 hover:border-violet-400 hover:bg-violet-500 hover:text-zinc-950 hover:shadow-[0_0_35px_rgba(139,92,246,0.4)]"
          >
            <span>{isAr ? "عرض جميع المشاريع والتفاصيل" : "View All Projects & Cases"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Interactive Cinema Lightbox Modal with Full Gallery ── */}
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
                className="absolute top-5 left-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-zinc-300 backdrop-blur-md transition hover:border-violet-500/50 hover:bg-violet-500 hover:text-zinc-950 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
                  {getCategoryLabel(activeModalProject.category, isAr)}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                  {activeModalProject.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  {activeModalProject.clientType || "Enterprise Showcase"}
                </p>
              </div>

              {/* Full Interactive Media Carousel in Modal */}
              <div className="mb-6">
                <MediaGalleryCarousel
                  items={modalMediaItems}
                  title={activeModalProject.title}
                />
              </div>

              {/* Description & Impact Grid */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-violet-400 mb-2">
                    {isAr ? "عن المشروع ونطاق العمل" : "Project Overview"}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
                    {activeModalProject.description}
                  </p>
                </div>

                {activeModalProject.challenge && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1.5 flex items-center gap-1.5">
                        <Sparkles size={14} />
                        <span>{isAr ? "التحدي والهدف الاستراتيجي" : "Challenge & Goal"}</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {activeModalProject.challenge}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        <span>{isAr ? "الحل والتنفيذ التقني" : "Solution & Delivery"}</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {activeModalProject.solution}
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "201211050297"}?text=${encodeURIComponent(`أهلاً CEO SHIFT، اطلعت على مشروع "${activeModalProject.title}" وأرغب في تنفيذ حل مماثل لشركتي.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-zinc-950 transition hover:bg-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] cursor-pointer"
                    >
                      <span>{isAr ? "طلب مشروع مشابه على واتساب" : "Request Similar Project"}</span>
                      <ArrowRight size={16} />
                    </a>

                    <Link
                      href={`/portfolio/${activeModalProject.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-zinc-900/80 px-5 py-3 text-xs font-bold text-zinc-200 hover:border-violet-400 hover:text-white transition"
                    >
                      <span>{isAr ? "عرض دراسة الحالة كاملة" : "Full Case Study"}</span>
                      <ExternalLink size={13} />
                    </Link>
                  </div>

                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-white transition-colors"
                    >
                      <span>{isAr ? "زيارة الموقع المباشر" : "Visit Live Website"}</span>
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
