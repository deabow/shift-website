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
  Sparkles,
  Camera,
} from "lucide-react";
import { ProjectVideoPlayer } from "@/components/project-video-player";

interface PortfolioItem {
  id: string;
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
}

const REAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p_khaleej_drone",
    titleAr: "الإنتاج السينمائي والتصوير الجوي لمولات السادات",
    titleEn: "Cinematic Drone Production — Commercial Malls",
    categoryAr: "إنتاج إعلامي",
    categoryEn: "Media Production",
    clientAr: "شركة الخليج للتطوير العقاري",
    clientEn: "Al-Khaleej Real Estate",
    descriptionAr: "تصوير جوي سينمائي بالدرون بدقة 8K يبرز فخامة المعمار ومواقع المشروعات الاستثمارية.",
    descriptionEn: "8K cinematic aerial drone cinematography highlighting architectural scale and prime investment locations.",
    imageUrl: "/portfolio-media/khaleej-real-estate-compilation-cover.jpeg",
    videoUrl: "https://vimeo.com/1217314483",
    tagAr: "تصوير درون 8K • مونتاج سينمائي",
    tagEn: "8K Drone • Color Grading",
  },
  {
    id: "p_kamal_video",
    titleAr: "الفيديو المؤسسي والتعريفي — الشيخ زايد والسادات",
    titleEn: "Corporate Brand Film — Sheikh Zayed & Sadat",
    categoryAr: "إنتاج إعلامي",
    categoryEn: "Media Production",
    clientAr: "مؤسسة كمال أبو علي القانونية",
    clientEn: "Kamal Abou Ali Law Firm",
    descriptionAr: "إنتاج فيديو تعريفي سينمائي وجلسات تصوير مؤسسي تعكس الهيبة والخبرة العريقة.",
    descriptionEn: "Cinematic corporate film and professional photography capturing team authority and premium offices.",
    imageUrl: "/portfolio-media/kamal-abou-ali-law-video-cover.jpeg",
    videoUrl: "https://vimeo.com/1217349863",
    tagAr: "فيديو تعريفي • جلسات تصوير",
    tagEn: "Brand Film • Corporate Shoot",
  },
  {
    id: "p_ahmed_video",
    titleAr: "الفيلم الميداني والتواجد الجماهيري للحملة الانتخابية",
    titleEn: "Field Campaign Cinematic Film",
    categoryAr: "إنتاج إعلامي وحملات",
    categoryEn: "Media & Campaigns",
    clientAr: "حملة النائب أحمد أبو زيد",
    clientEn: "MP Ahmed Abou Zeid Campaign",
    descriptionAr: "تصوير ميداني وتعديل ألوان سينمائي في مواقع العمل الطبيعية لنقل التلاحم مع المواطنين.",
    descriptionEn: "On-ground documentary filming with dynamic color grading highlighting direct constituent engagement.",
    imageUrl: "/portfolio-media/mp-ahmed-abou-zeid-campaign-cover.jpeg",
    videoUrl: "https://vimeo.com/1217349916",
    tagAr: "تغطية ميدانية • ملايين المشاهدات",
    tagEn: "Field Coverage • Viral Reach",
  },
  {
    id: "p_kamal_web",
    titleAr: "المنصة الرقمية الفاخرة وحجز الاستشارات القانونية",
    titleEn: "Digital Legal Platform & Consultation Portal",
    categoryAr: "تطوير مواقع وبرمجيات",
    categoryEn: "Web Development",
    clientAr: "مؤسسة كمال أبو علي القانونية",
    clientEn: "Kamal Abou Ali Law Firm",
    descriptionAr: "موقع سريع وفائق الأمان بتجربة مستخدم تفاعلية راقية لرقمنة طلبات الاستشارات.",
    descriptionEn: "High-performance responsive platform built with Next.js for rapid legal consultations.",
    imageUrl: "/portfolio-media/kamal-web-screen-1.png",
    liveUrl: "https://aboalilawfirm.com/",
    tagAr: "Next.js 14 • تجربة مستخدم راقية",
    tagEn: "Next.js 14 • Luxury UI/UX",
  },
];

export function BentoPortfolio() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9F0F1F] mb-3 font-changa">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F] animate-pulse" />
            <span>{t.portfolio.title}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-theme-primary font-changa leading-tight">
            {t.portfolio.subtitle}
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-sm font-bold text-[#9F0F1F] hover:text-[#FF4D1A] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F] rounded-lg p-1"
        >
          <span className="font-changa">
            {language === "ar" ? "استعرض كافة الأعمال" : "View All Works"}
          </span>
          <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </motion.div>

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REAL_PORTFOLIO_ITEMS.map((item, idx) => {
          const title = language === "ar" ? item.titleAr : item.titleEn;
          const category = language === "ar" ? item.categoryAr : item.categoryEn;
          const client = language === "ar" ? item.clientAr : item.clientEn;
          const description = language === "ar" ? item.descriptionAr : item.descriptionEn;
          const tag = language === "ar" ? item.tagAr : item.tagEn;

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.55 }}
              className="group relative flex flex-col rounded-3xl border border-theme-border bg-theme-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:border-[#9F0F1F]/40 hover:-translate-y-1"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-theme-surface">
                <Image
                  src={item.imageUrl}
                  alt={`${title} - ${client}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx < 2}
                />

                {/* Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white border border-white/10">
                    {item.videoUrl ? (
                      <Film className="w-3 h-3 text-[#FF4D1A]" />
                    ) : (
                      <Globe className="w-3 h-3 text-[#FF4D1A]" />
                    )}
                    <span>{category}</span>
                  </span>

                  <span className="rounded-full bg-[#9F0F1F]/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white shadow-md">
                    {tag}
                  </span>
                </div>

                {/* Video Play / Action Trigger */}
                {item.videoUrl && (
                  <button
                    onClick={() =>
                      setActiveVideo({ url: item.videoUrl!, title })
                    }
                    className="absolute inset-0 flex items-center justify-center group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`تشغيل فيديو ${title}`}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#9F0F1F] text-white shadow-[0_0_30px_rgba(159,15,31,0.6)] transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-[#C41E2F]">
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </div>
                  </button>
                )}

                {/* Live Website Link */}
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px] focus-visible:opacity-100 focus-visible:outline-none"
                    aria-label={`زيارة موقع ${title}`}
                  >
                    <div className="flex items-center gap-2 rounded-xl bg-[#9F0F1F] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105">
                      <span>{language === "ar" ? "زيارة المنصة الحية" : "Visit Live Site"}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                )}
              </div>

              {/* Project Information */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#9F0F1F] mb-1 font-changa">
                    {client}
                  </p>
                  <h3 className="text-xl font-extrabold text-theme-primary font-changa leading-snug group-hover:text-[#9F0F1F] transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2.5 text-sm text-theme-secondary/80 font-tajawal leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="pt-4 border-t border-theme-border flex items-center justify-between">
                  {item.videoUrl ? (
                    <button
                      onClick={() =>
                        setActiveVideo({ url: item.videoUrl!, title })
                      }
                      className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#9F0F1F] hover:text-[#FF4D1A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F] rounded-lg p-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="font-changa">
                        {language === "ar" ? "مشاهدة العمل بالفيديو" : "Watch Video"}
                      </span>
                    </button>
                  ) : item.liveUrl ? (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#9F0F1F] hover:text-[#FF4D1A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F] rounded-lg p-1"
                    >
                      <span className="font-changa">
                        {language === "ar" ? "تصفح الموقع" : "Browse Website"}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}

                  <span className="text-[11px] font-mono text-theme-muted">
                    Hodour 2026
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-zinc-950">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#FF4D1A]" />
                  <span className="text-sm font-bold text-white font-changa">
                    {activeVideo.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#9F0F1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="إغلاق الفيديو"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
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
