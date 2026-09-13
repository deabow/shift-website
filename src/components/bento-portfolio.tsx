"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function BentoPortfolio() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  // Placeholder portfolio items (will be replaced with real data from portfolio store)
  const placeholderItems = [
    {
      title: language === "ar" ? "حملة تسويقية متكاملة" : "Integrated Marketing Campaign",
      category: language === "ar" ? "التسويق الرقمي" : "Digital Marketing",
    },
    {
      title: language === "ar" ? "هوية بصرية لعيادة" : "Clinic Brand Identity",
      category: language === "ar" ? "التصميم الجرافيكي" : "Graphic Design",
    },
    {
      title: language === "ar" ? "فيديو إعلاني" : "Promotional Video",
      category: language === "ar" ? "الإنتاج الإعلامي" : "Media Production",
    },
    {
      title: language === "ar" ? "موقع تجارة إلكترونية" : "E-Commerce Website",
      category: language === "ar" ? "تطوير المواقع" : "Web Development",
    },
  ];

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
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9F0F1F] mb-3 font-changa">
            {t.portfolio.title}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F2D3B1] font-changa leading-tight">
            {t.portfolio.subtitle}
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#9F0F1F] hover:text-[#FF4D1A] transition-colors shrink-0"
        >
          <span>{language === "ar" ? "شوف كل الأعمال" : "View All Work"}</span>
          <Arrow className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {placeholderItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            className="group relative rounded-2xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] overflow-hidden transition-all duration-500 hover:border-[#9F0F1F]/30 hover:shadow-[0_0_40px_rgba(159,15,31,0.08)]"
          >
            {/* Placeholder image area */}
            <div className="aspect-[16/10] w-full bg-[#2E2A29]/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(159,15,31,0.08),transparent_70%)]" />
              <span className="text-[#F2D3B1]/15 text-6xl font-changa font-bold">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Info */}
            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9F0F1F] mb-1.5 font-changa">
                {item.category}
              </p>
              <h3 className="text-lg font-bold text-[#F2D3B1] font-changa group-hover:text-white transition-colors">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
