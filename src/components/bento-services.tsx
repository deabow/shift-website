"use client";

/**
 * BentoServices — Legacy component, currently not used.
 * Service cards are now rendered inline on the homepage and services page.
 * Kept for potential future use with the new Hodour service structure.
 */

import { motion } from "framer-motion";
import {
  Camera,
  Palette,
  TrendingUp,
  Globe,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

const serviceIcons = [Camera, Palette, TrendingUp, Globe, Users] as const;
const serviceKeys = [
  "mediaProduction",
  "graphicDesign",
  "digitalMarketing",
  "webDevelopment",
  "socialMediaManagement",
] as const;

export function BentoServices() {
  const { t, language } = useLanguage();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#F2D3B1] font-alexandria">
          {t.services.title}
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#F2D3B1]/50 max-w-2xl mx-auto font-alexandria">
          {t.services.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {serviceKeys.map((key, idx) => {
          const Icon = serviceIcons[idx];
          const service = t.services.items[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group card-ember rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#9F0F1F]/20 bg-[#9F0F1F]/10 text-[#9F0F1F]">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-[#F2D3B1] font-alexandria">
                  {service.title}
                </h3>
              </div>
              <p className="text-sm text-[#F2D3B1]/50 leading-relaxed font-alexandria">
                {service.desc}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9F0F1F] hover:text-[#FF4D1A] transition-colors mt-auto"
              >
                {language === "ar" ? "اعرف أكتر" : "Learn More"}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
