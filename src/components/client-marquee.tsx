"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Building, Sparkles } from "lucide-react";

const CLIENTS = [
  { nameAr: "مؤسسة كمال أبو علي القانونية", nameEn: "Kamal Abou Ali Law Firm", sectorAr: "قطاع قانوني", sectorEn: "Legal Firm" },
  { nameAr: "شركة الخليج للتطوير العقاري", nameEn: "Al-Khaleej Real Estate", sectorAr: "تطوير عقاري", sectorEn: "Real Estate" },
  { nameAr: "مكتب خدمة المواطنين — د. أحمد أبو زيد", nameEn: "MP Ahmed Abou Zeid Office", sectorAr: "مؤسسي وحملات", sectorEn: "Public Campaign" },
  { nameAr: "كيمبو جرين للاندسكيب", nameEn: "KemboGreen Landscape", sectorAr: "لاندسكيب وبيئة", sectorEn: "Landscape" },
  { nameAr: "رونق هوم للديكور", nameEn: "Ronaq Decor & Interiors", sectorAr: "تشطيبات وديكور", sectorEn: "Interior Design" },
  { nameAr: "أوليكس ستار التجارية", nameEn: "Olix Star Commercial", sectorAr: "تجارة واستيراد", sectorEn: "Trading" },
  { nameAr: "أون ذا واي لاكجري", nameEn: "On The Way Luxury", sectorAr: "خدمات وضيافة", sectorEn: "Hospitality" },
];

export function ClientMarquee() {
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const xTransform = isRTL ? ["0%", "50%"] : ["0%", "-50%"];

  // Double the list for seamless infinite loop
  const duplicatedClients = [...CLIENTS, ...CLIENTS];

  return (
    <section className="w-full overflow-hidden py-10 md:py-14 border-y border-theme-border/60 bg-theme-surface/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4D1A] animate-pulse" />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-theme-secondary/70 font-alexandria">
            {language === "ar"
              ? "شركاء النجاح وثقة قادة الأعمال"
              : "Trusted by Institutional Leaders & Brands"}
          </p>
        </div>
        <span className="text-[11px] font-mono text-theme-muted hidden sm:inline-block">
          {language === "ar" ? "تأثير موثّق 2026" : "Proven Track Record"}
        </span>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Soft edge fade masks using CSS variables for perfect light/dark adaptability */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-r from-theme-bg to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-l from-theme-bg to-transparent" />

        <motion.div
          animate={{ x: xTransform }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex shrink-0 gap-6 md:gap-8 whitespace-nowrap px-4 group-hover:[animation-play-state:paused]"
        >
          {duplicatedClients.map((client, i) => {
            const name = language === "ar" ? client.nameAr : client.nameEn;
            const sector = language === "ar" ? client.sectorAr : client.sectorEn;
            return (
              <div
                key={`${client.nameEn}-${i}`}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-theme-border/80 bg-theme-card/90 shadow-sm transition-all duration-300 hover:border-[#9F0F1F]/50 hover:bg-theme-card hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#9F0F1F]/10 text-[#9F0F1F] dark:text-[#FF4D1A]">
                  <Building className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-start">
                  <span className="text-xs md:text-sm font-bold text-theme-primary font-alexandria">
                    {name}
                  </span>
                  <span className="text-[10px] text-theme-muted font-alexandria">
                    {sector}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
