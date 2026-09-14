"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  ExternalLink,
  X,
  Film,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { ProjectVideoPlayer } from "@/components/project-video-player";

export interface PortfolioItem {
  id: string;
  category: "media" | "web";
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  clientAr: string;
  clientEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageUrl: string;
  videoUrl?: string;
  liveUrl?: string;
  tagAr: string;
  tagEn: string;
  metricAr?: string;
  metricEn?: string;
}

export const REAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p_khaleej_drone",
    category: "media",
    titleAr: "الإنتاج السينمائي والتصوير الجوي لمولات السادات التجارية",
    titleEn: "عالية  Aerial Drone Cinematography — Commercial Malls",
    categoryAr: "إنتاج إعلامي وسينمائي",
    categoryEn: "Media & Cinema",
    clientAr: "شركة الخليج للتطوير العقاري",
    clientEn: "Al-Khaleej Real Estate",
    descriptionAr: "تصوير جوي سينمائي بالدرون بدقة عالية  يبرز فخامة المعمار ومواقع المشروعات الاستثمارية ونسب الإنجاز لجذب كبار المستثمرين.",
    descriptionEn: "عالية  aerial cinematography and color grading highlighting architectural scale and prime commercial investment locations.",
    imageUrl: "/portfolio-media/khaleej-real-estate-compilation-cover.jpeg",
    videoUrl: "https://vimeo.com/1217314483",
    tagAr: "تصوير درون عالية  • مونتاج سينمائي",
    tagEn: "عالية  Drone • Color Grading",
    metricAr: "تغطية 12+ مشروع تجاري",
    metricEn: "12+ Commercial Malls",
  },
  {
    id: "p_kamal_video",
    category: "media",
    titleAr: "الفيديو المؤسسي والتعريفي — مكاتب الشيخ زايد والسادات",
    titleEn: "Corporate Brand Film — Sheikh Zayed & Sadat",
    categoryAr: "إنتاج إعلامي وسينمائي",
    categoryEn: "Media & Cinema",
    clientAr: "مؤسسة كمال أبو علي القانونية",
    clientEn: "Kamal Abou Ali Law Firm",
    descriptionAr: "إنتاج فيديو تعريفي سينمائي وجلسات تصوير مؤسسي احترافية تعكس الهيبة والخبرة العريقة للفريق القانوني وفروع المؤسسة.",
    descriptionEn: "Cinematic corporate film and professional photography capturing team authority and executive presence across all offices.",
    imageUrl: "/portfolio-media/kamal-abou-ali-law-video-cover.jpeg",
    videoUrl: "https://vimeo.com/1217349863",
    tagAr: "فيديو تعريفي • جلسات تصوير",
    tagEn: "Brand Film • Corporate Shoot",
    metricAr: "ترسيخ المكانة الرقمية",
    metricEn: "Executive Brand Authority",
  },
  {
    id: "p_ahmed_video",
    category: "media",
    titleAr: "الفيلم الميداني والتواجد الجماهيري للحملة الانتخابية",
    titleEn: "Documentary Field Campaign Film",
    categoryAr: "إنتاج إعلامي وحملات",
    categoryEn: "Media & Campaigns",
    clientAr: "حملة النائب أحمد أبو زيد",
    clientEn: "MP Ahmed Abou Zeid Campaign",
    descriptionAr: "تصوير سينمائي ميداني وتعديل ألوان واقعي في مواقع العمل الطبيعية لنقل التلاحم مع المواطنين وملايين المشاهدات.",
    descriptionEn: "On-ground documentary filming with dynamic color grading highlighting direct constituent engagement and viral reach.",
    imageUrl: "/portfolio-media/mp-ahmed-abou-zeid-campaign-cover.jpeg",
    videoUrl: "https://vimeo.com/1217349916",
    tagAr: "تغطية ميدانية • ملايين المشاهدات",
    tagEn: "Field Coverage • Viral Reach",
    metricAr: "+2 مليون مشاهدة تفاعلية",
    metricEn: "+2M Video Reach",
  },
  {
    id: "p_kamal_web",
    category: "web",
    titleAr: "المنصة الرقمية الفاخرة وحجز الاستشارات القانونية",
    titleEn: "Digital Legal Platform & Consultation Portal",
    categoryAr: "تطوير مواقع وبرمجيات",
    categoryEn: "Web Development",
    clientAr: "مؤسسة كمال أبو علي القانونية",
    clientEn: "Kamal Abou Ali Law Firm",
    descriptionAr: "موقع سريع وفائق الأمان بنظام Next.js 14 بتجربة مستخدم تفاعلية راقية لرقمنة وحجز الاستشارات القانونية مباشرة.",
    descriptionEn: "High-performance responsive platform built with Next.js 14 for rapid legal consultations and seamless inquiry management.",
    imageUrl: "/portfolio-media/kamal-web-screen-1.png",
    liveUrl: "https://aboalilawfirm.com/",
    tagAr: "Next.js 14 • حجز استشارات",
    tagEn: "Next.js 14 • Rapid Booking",
    metricAr: "+300% طلبات حجز رقمية",
    metricEn: "+300% Booking Inquiries",
  },
  {
    id: "p_ahmed_platform",
    category: "web",
    titleAr: "منظومة إدارة وتتبع طلبات المواطنين الرقمية",
    titleEn: "Citizen Request Management & Service Tracking System",
    categoryAr: "تطوير منصات وتطبيقات",
    categoryEn: "Platform Development",
    clientAr: "مكتب خدمة المواطنين — النائب أحمد أبو زيد",
    clientEn: "MP Ahmed Abou Zeid Service Office",
    descriptionAr: "تطوير منصة رقمية تفاعلية وقاعدة بيانات سحابية منظمة لاستقبال وتصنيف آلاف الطلبات والشكاوى مع لوحة متابعة فورية للإنجازات.",
    descriptionEn: "Interactive web portal and cloud database system for managing constituent requests with real-time progress tracking.",
    imageUrl: "/portfolio-media/mp-platform-home.png",
    tagAr: "قاعدة بيانات • إشراف فوري",
    tagEn: "Cloud Database • Live Tracking",
    metricAr: "تسريع الاستجابة بنسبة 95%",
    metricEn: "95% Faster Response Time",
  },
  {
    id: "p_khaleej_compilation",
    category: "media",
    titleAr: "الفيديو الترويجي الشامل لمشروعات واستثمارات السادات",
    titleEn: "Comprehensive Investment & Commercial Showcase Film",
    categoryAr: "إنتاج إعلامي وتسويق عقاري",
    categoryEn: "Commercial Video",
    clientAr: "شركة الخليج للتطوير العقاري",
    clientEn: "Al-Khaleej Real Estate",
    descriptionAr: "فيلم ترويجي شامل يجمع كافة المشروعات والمواقع التجارية في مدينة السادات، تم تزويده لفريق المبيعات كأداة تسويق مرئية عالية التأثير.",
    descriptionEn: "Comprehensive commercial film documenting multiple prime retail and investment locations across Sadat City.",
    imageUrl: "/portfolio-media/khaleej-real-estate-compilation-cover.jpeg",
    videoUrl: "https://drive.google.com/file/d/1uvCsyHN_RqUhRzK0MJRMB-ARrdPUmFad/view?usp=drive_link",
    tagAr: "تسويق عقاري • تغطية شاملة",
    tagEn: "Real Estate • Complete Coverage",
    metricAr: "أداة تسويق واستثمار رئيسية",
    metricEn: "Primary Sales Asset",
  },
];

export function BentoPortfolio() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const [activeFilter, setActiveFilter] = useState<"all" | "media" | "web">("all");
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const filteredItems = REAL_PORTFOLIO_ITEMS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20" id="portfolio">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9F0F1F] dark:text-[#FF4D1A] mb-3 font-alexandria">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D1A] animate-pulse" />
            <span>{t.portfolio.title}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-theme-primary font-alexandria leading-tight">
            {t.portfolio.subtitle}
          </h2>
          <p className="mt-2.5 text-sm md:text-base text-theme-secondary/80 font-alexandria max-w-xl">
            {language === "ar"
              ? "استعراض لإنتاجات 2026 الحقيقية — مشاريع فعلية تم تصويرها وتطويرها بدقة واحترافية متكاملة."
              : "Showcasing real 2026 productions — authentic client projects filmed and developed with full precision."}
          </p>
        </div>

        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-sm font-bold text-[#9F0F1F] dark:text-[#FF4D1A] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A] rounded-lg p-1.5 min-h-[44px]"
        >
          <span className="font-alexandria">
            {language === "ar" ? "استعرض كافة الأعمال" : "View All Works"}
          </span>
          <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </motion.div>

      {/* Filter Tabs — Expandable Gallery Format */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-theme-border pb-4">
        {[
          { key: "all", labelAr: "كافة الأعمال (6 مشاريع)", labelEn: "All Works (6 Projects)" },
          { key: "media", labelAr: "إنتاج سينمائي وتصوير (4)", labelEn: "Cinematography & Media (4)" },
          { key: "web", labelAr: "تطوير مواقع ومنصات (2)", labelEn: "Web & Platforms (2)" },
        ].map((tab) => {
          const isActive = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as "all" | "media" | "web")}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold font-alexandria transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A] ${isActive
                  ? "bg-[#9F0F1F] text-[#F2D3B1] shadow-md dark:shadow-[0_0_15px_rgba(159,15,31,0.5)]"
                  : "bg-theme-card border border-theme-border text-theme-secondary hover:text-theme-primary hover:border-[#9F0F1F]/30"
                }`}
            >
              {language === "ar" ? tab.labelAr : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* Expandable Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => {
            const title = language === "ar" ? item.titleAr : item.titleEn;
            const category = language === "ar" ? item.categoryAr : item.categoryEn;
            const client = language === "ar" ? item.clientAr : item.clientEn;
            const description = language === "ar" ? item.descriptionAr : item.descriptionEn;
            const tag = language === "ar" ? item.tagAr : item.tagEn;
            const metric = language === "ar" ? item.metricAr : item.metricEn;
            const isLoaded = loadedImages[item.id];

            return (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative flex flex-col rounded-3xl border border-theme-border bg-theme-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#9F0F1F]/40"
              >
                {/* Media Thumbnail Container with blur-to-sharp loading */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-theme-surface">
                  <Image
                    src={item.imageUrl}
                    alt={`مشروع حضور: ${title} - ${client}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover object-center transition-all duration-500 ease-out ${isLoaded ? "blur-0 scale-100 opacity-100" : "blur-md scale-105 opacity-80"
                      }`}
                    onLoad={() =>
                      setLoadedImages((prev) => ({ ...prev, [item.id]: true }))
                    }
                    priority={idx < 3}
                  />

                  {/* Ambient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/10">
                      {item.videoUrl ? (
                        <Film className="w-3 h-3 text-[#FF4D1A]" />
                      ) : (
                        <Globe className="w-3 h-3 text-[#FF4D1A]" />
                      )}
                      <span className="font-alexandria">{category}</span>
                    </span>

                    <span className="rounded-full bg-[#9F0F1F]/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-[#F2D3B1] shadow-sm font-alexandria border border-white/10">
                      {tag}
                    </span>
                  </div>

                  {/* Video Play Trigger (Centered) */}
                  {item.videoUrl && (
                    <button
                      onClick={() =>
                        setActiveVideo({ url: item.videoUrl!, title })
                      }
                      className="absolute inset-0 flex items-center justify-center group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
                      aria-label={`تشغيل فيديو عمل حضور: ${title}`}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9F0F1F] text-white shadow-[0_0_25px_rgba(159,15,31,0.6)] transition-colors duration-200 group-hover/btn:bg-[#B91C28]">
                        <Play className="w-5 h-5 fill-white translate-x-0.5" />
                      </div>
                    </button>
                  )}

                  {/* Live Website Link Overlay */}
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px] focus-visible:opacity-100 focus-visible:outline-none"
                      aria-label={`زيارة موقع منصة ${title}`}
                    >
                      <div className="flex items-center gap-2 rounded-xl bg-[#9F0F1F] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F2D3B1] shadow-md transition-colors hover:bg-[#B91C28]">
                        <span className="font-alexandria">{language === "ar" ? "زيارة الموقع الحي" : "Visit Live Site"}</span>
                        <ExternalLink className="w-4 h-4 text-[#F2D3B1]" />
                      </div>
                    </a>
                  )}

                  {/* Bottom Image Metric Bar */}
                  {metric && (
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 pointer-events-none">
                      <span className="inline-flex items-center gap-1 rounded-md bg-black/75 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white font-alexandria border border-white/10">
                        <CheckCircle2 className="w-3 h-3 text-[#FF4D1A]" />
                        <span>{metric}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Information */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#9F0F1F] dark:text-[#FF4D1A] mb-1.5 font-alexandria">
                      {client}
                    </p>
                    <h3 className="text-lg md:text-xl font-extrabold text-theme-primary font-alexandria leading-snug group-hover:text-[#9F0F1F] dark:group-hover:text-[#FF4D1A] transition-colors">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-xs md:text-sm text-theme-secondary/80 font-alexandria leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-theme-border flex items-center justify-between">
                    {item.videoUrl ? (
                      <button
                        onClick={() =>
                          setActiveVideo({ url: item.videoUrl!, title })
                        }
                        className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold text-[#9F0F1F] dark:text-[#FF4D1A] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A] rounded-lg p-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span className="font-alexandria">
                          {language === "ar" ? "مشاهدة الفيديو" : "Watch Video"}
                        </span>
                      </button>
                    ) : item.liveUrl ? (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-[#9F0F1F] dark:text-[#FF4D1A] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A] rounded-lg p-1"
                      >
                        <span className="font-alexandria">
                          {language === "ar" ? "تصفح الموقع" : "Browse Website"}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-theme-muted font-alexandria">
                        {language === "ar" ? "منظومة سحابية خاصة" : "Custom Cloud System"}
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-theme-muted">
                      Hodour 2026
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-zinc-950">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#FF4D1A]" />
                  <span className="text-sm font-bold text-white font-alexandria">
                    {activeVideo.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#9F0F1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="إغلاق الفيديو"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Container */}
              <div className="aspect-video w-full bg-black">
                <ProjectVideoPlayer
                  videoUrl={activeVideo.url}
                  title={activeVideo.title}
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
