"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Palette,
  TrendingUp,
  Globe,
  Users,
} from "lucide-react";

const BentoPortfolio = dynamic(
  () =>
    import("@/components/bento-portfolio").then((mod) => mod.BentoPortfolio),
  { ssr: false }
);
const StatsCounter = dynamic(
  () => import("@/components/stats-counter").then((mod) => mod.StatsCounter),
  { ssr: false }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 18 },
  },
};

const serviceIcons = [Camera, Palette, TrendingUp, Globe, Users];

const serviceKeys = [
  "mediaProduction",
  "graphicDesign",
  "digitalMarketing",
  "webDevelopment",
  "socialMediaManagement",
] as const;

export default function Home() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden bg-[#0B0B0C]">
      {/* Ambient background — ember glow, no purple */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#0B0B0C]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(800px_circle_at_50%_30%,rgba(159,15,31,0.06),transparent_60%)]" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(242,211,177,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(242,211,177,0.008)_1px,transparent_1px)] bg-[size:48px_48px]"
        style={{
          maskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      {/* ── Hero ── */}
      <section className="flex min-h-[85vh] w-full max-w-5xl flex-col items-center justify-center px-4 md:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center px-2 md:px-0"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#9F0F1F] bg-[#9F0F1F]/[0.08] border border-[#9F0F1F]/20 px-4 py-1.5 rounded-full backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F] animate-pulse inline-block" />
            <span className="font-changa">{t.hero.badge}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="mt-8 md:mt-10 text-4xl font-extrabold tracking-tight text-[#F2D3B1] sm:text-5xl md:text-7xl px-4 md:px-0 leading-[1.1] font-changa"
          >
            {t.hero.titleLine1}{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#9F0F1F]">{t.hero.titleLine2}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-base md:text-xl leading-relaxed text-[#F2D3B1]/60 px-4 md:px-0 font-tajawal"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link
              href="/services"
              className="group relative flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl bg-[#9F0F1F] px-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#F2D3B1] transition-all duration-500 hover:shadow-[0_0_35px_rgba(159,15,31,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 py-4 flex items-center gap-2">
                <span>{t.hero.btnServices}</span>
                <Arrow className="w-4 h-4 text-[#F2D3B1] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            <Link
              href="/portfolio"
              className="group flex h-14 w-full sm:w-auto items-center justify-center rounded-xl border border-[#F2D3B1]/15 bg-[#2E2A29]/40 px-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#F2D3B1] backdrop-blur-2xl transition-all duration-500 hover:border-[#9F0F1F]/40 hover:bg-[#9F0F1F]/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="py-4 flex items-center gap-2">
                <span>{t.hero.btnWork}</span>
                <Arrow className="w-4 h-4 text-[#F2D3B1]/60 group-hover:text-[#F2D3B1] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all duration-300" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Services Overview ── */}
      <section className="w-full max-w-6xl px-4 md:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F2D3B1] font-changa">
            {t.services.title}
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#F2D3B1]/50 max-w-2xl mx-auto font-tajawal">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceKeys.map((key, idx) => {
            const Icon = serviceIcons[idx];
            const service = t.services.items[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="group card-ember rounded-2xl p-6 flex flex-col gap-4 transition-all duration-400"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#9F0F1F]/20 bg-[#9F0F1F]/10 text-[#9F0F1F] transition-all duration-300 group-hover:border-[#9F0F1F]/40 group-hover:shadow-[0_0_15px_rgba(159,15,31,0.2)]">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-bold text-[#F2D3B1] font-changa group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-[#F2D3B1]/50 leading-relaxed font-tajawal">
                  {service.desc}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9F0F1F] hover:text-[#FF4D1A] transition-colors mt-auto"
                >
                  <span>{t.cta.learnMore}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Portfolio Preview ── */}
      <div className="w-full relative">
        <BentoPortfolio />
      </div>

      {/* ── Stats ── */}
      <section className="w-full max-w-5xl px-4 md:px-8">
        <StatsCounter />
      </section>

      {/* ── Bottom CTA ── */}
      <section className="w-full max-w-5xl px-4 md:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 rounded-3xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(159,15,31,0.06),transparent_70%)]" />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F2D3B1] font-changa">
              {t.cta.notSure}
            </h2>
            <p className="mt-2 text-sm text-[#F2D3B1]/50 font-tajawal">
              {t.cta.notSureDesc}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#9F0F1F] px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] transition hover:shadow-[0_0_35px_rgba(159,15,31,0.4)]"
            >
              <span>{t.cta.getStarted}</span>
              <Arrow className="w-4 h-4 text-[#F2D3B1]" />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "201211050297"}?text=${encodeURIComponent(
                language === "ar"
                  ? "أهلاً حضور، محتاج أعرف أكتر عن خدماتكم."
                  : "Hello Hodour, I'd like to learn more about your services."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#F2D3B1]/15 bg-[#2E2A29]/40 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] transition hover:border-[#9F0F1F]/40 hover:bg-[#9F0F1F]/10"
            >
              <span>{t.cta.talkToUs}</span>
              <Arrow className="w-4 h-4 text-[#F2D3B1]/60" />
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
