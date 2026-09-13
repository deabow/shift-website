"use client";

import { motion } from "framer-motion";
import { BentoPortfolio } from "@/components/bento-portfolio";
import { useLanguage } from "@/lib/language-context";
import { Film, Globe, Sparkles } from "lucide-react";

export default function PortfolioPage() {
  const { language } = useLanguage();

  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-8 md:px-8 bg-theme-bg transition-colors duration-300">
      {/* Dynamic Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-theme-bg" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_5%,rgba(159,15,31,0.06),transparent_70%)]" />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto pt-6 pb-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9F0F1F]/[0.08] border border-[#9F0F1F]/20 text-[#9F0F1F] text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-changa">
            {language === "ar" ? "معرض أعمال حضور" : "Hodour Portfolio"}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-primary leading-[1.15] font-changa">
          {language === "ar" ? (
            <>
              أعمال صنعت <span className="text-[#9F0F1F]">حضوراً استثنائياً</span>
            </>
          ) : (
            <>
              Work That Created <span className="text-[#9F0F1F]">Real Presence</span>
            </>
          )}
        </h1>

        <p className="mt-4 text-base md:text-lg text-theme-secondary/80 font-tajawal max-w-2xl mx-auto">
          {language === "ar"
            ? "استعراض لأبرز مشاريع الإنتاج الإعلامي، التصوير السينمائي، الحملات الإعلانية، وتطوير المنصات الرقمية لعملائنا في مصر."
            : "A showcase of our premier media productions, cinematic filming, advertising campaigns, and custom web platforms in Egypt."}
        </p>
      </motion.div>

      {/* Portfolio Showcase Grid */}
      <BentoPortfolio />
    </main>
  );
}
