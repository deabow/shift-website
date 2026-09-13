"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Palette,
  TrendingUp,
  Globe,
  Users,
  Play,
  X,
  Sparkles,
  Film,
  Award,
} from "lucide-react";
import { ProjectVideoPlayer } from "@/components/project-video-player";

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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 95, damping: 20 },
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

  const [showHeroVideo, setShowHeroVideo] = useState(false);

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden bg-theme-bg transition-colors duration-300">
      {/* Dynamic Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-theme-bg" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(800px_circle_at_50%_20%,rgba(159,15,31,0.07),transparent_65%)]" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] bg-[size:48px_48px]"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      {/* ── Hero Section ── */}
      <section className="flex w-full max-w-6xl flex-col items-center justify-center px-4 md:px-8 pt-12 pb-20 md:pt-20 md:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9F0F1F] bg-[#9F0F1F]/[0.08] border border-[#9F0F1F]/25 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4D1A] animate-pulse inline-block" />
            <span className="font-changa">{t.hero.badge}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 md:mt-8 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-theme-primary leading-[1.15] font-changa max-w-4xl"
          >
            {t.hero.titleLine1}{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#9F0F1F] inline-block">{t.hero.titleLine2}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-base md:text-xl leading-relaxed text-theme-secondary/80 font-tajawal"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/services"
              className="group relative flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl bg-[#9F0F1F] px-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#F2D3B1] shadow-[0_4px_25px_rgba(159,15,31,0.35)] transition-all duration-300 hover:bg-[#B91C28] hover:shadow-[0_4px_35px_rgba(159,15,31,0.5)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
            >
              <span className="relative z-10 flex items-center gap-2 font-changa">
                <span>{t.hero.btnServices}</span>
                <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>

            <Link
              href="/portfolio"
              className="group flex h-14 w-full sm:w-auto items-center justify-center rounded-xl border border-theme-border bg-theme-card px-8 text-xs font-extrabold uppercase tracking-[0.18em] text-theme-primary backdrop-blur-xl shadow-sm transition-all duration-300 hover:border-[#9F0F1F]/50 hover:bg-[#9F0F1F]/10 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F]"
            >
              <span className="flex items-center gap-2 font-changa">
                <span>{t.hero.btnWork}</span>
                <Arrow className="w-4 h-4 text-theme-muted transition-all group-hover:text-theme-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          </motion.div>

          {/* ── Hero Real Media Showreel Banner ── */}
          <motion.div
            variants={itemVariants}
            className="mt-14 w-full max-w-5xl rounded-3xl border border-theme-border bg-theme-card p-3 md:p-4 shadow-xl relative overflow-hidden"
          >
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-theme-surface">
              <Image
                src="/portfolio-media/kamal-abou-ali-law-video-cover.jpeg"
                alt="Hodour Media Production Showcase"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

              {/* Top Feature Badges */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white border border-white/10">
                  <Film className="w-3.5 h-3.5 text-[#FF4D1A]" />
                  <span className="font-changa">
                    {language === "ar" ? "استعراض إنتاجات حضور 2026" : "Hodour Production Reel 2026"}
                  </span>
                </span>

                <div className="hidden sm:flex items-center gap-2">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#F2D3B1] border border-white/10">
                    8K Drone Cinema
                  </span>
                  <span className="rounded-full bg-[#9F0F1F]/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow">
                    Commercials & Media
                  </span>
                </div>
              </div>

              {/* Center Play Showreel Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <button
                  onClick={() => setShowHeroVideo(true)}
                  className="group/play flex items-center justify-center rounded-full bg-[#9F0F1F] p-5 md:p-6 text-white shadow-[0_0_40px_rgba(159,15,31,0.7)] transition-all duration-300 hover:scale-110 hover:bg-[#C41E2F] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
                  aria-label="مشاهدة فيديو استعراض أعمال حضور"
                >
                  <Play className="w-7 h-7 md:w-8 md:h-8 fill-white translate-x-0.5" />
                </button>
                <button
                  onClick={() => setShowHeroVideo(true)}
                  className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-white drop-shadow-md hover:text-[#F2D3B1] transition-colors font-changa"
                >
                  {language === "ar" ? "مشاهدة شو ريل الحضور" : "Watch Hodour Showreel"}
                </button>
              </div>

              {/* Bottom Quick Metric Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 pointer-events-none font-tajawal">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  {language === "ar" ? "تصوير سينمائي • حملات إعلانية • مواقع ومنصات" : "Cinematography • Campaigns • Platforms"}
                </span>
                <span className="hidden sm:inline-block bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 font-mono text-[11px]">
                  Vimeo 4K Showcase
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Services Overview ── */}
      <section className="w-full max-w-6xl px-4 md:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9F0F1F] mb-3 font-changa">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F] animate-pulse" />
            <span>{t.services.title}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-theme-primary font-changa">
            {language === "ar" ? "خدمات تصنع الفارق لحضورك" : "Services That Build Your Presence"}
          </h2>
          <p className="mt-3 text-sm md:text-base text-theme-secondary/70 max-w-2xl mx-auto font-tajawal">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, idx) => {
            const Icon = serviceIcons[idx];
            const service = t.services.items[key];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="group card-ember rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#9F0F1F]/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#9F0F1F]/20 bg-[#9F0F1F]/10 text-[#9F0F1F] transition-all duration-300 group-hover:bg-[#9F0F1F] group-hover:text-[#F2D3B1] group-hover:shadow-[0_0_20px_rgba(159,15,31,0.3)]">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <span className="font-mono text-xs font-bold text-theme-muted">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-theme-primary font-changa group-hover:text-[#9F0F1F] transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-theme-secondary/80 leading-relaxed font-tajawal">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-theme-border flex items-center justify-between">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#9F0F1F] hover:text-[#FF4D1A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F] rounded-lg p-1"
                  >
                    <span className="font-changa">{t.cta.learnMore}</span>
                    <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </Link>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F]/30 group-hover:bg-[#FF4D1A] transition-colors" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Portfolio Section with Real Media ── */}
      <div className="w-full relative">
        <BentoPortfolio />
      </div>

      {/* ── Stats Counter ── */}
      <section className="w-full max-w-5xl px-4 md:px-8 py-8">
        <StatsCounter />
      </section>

      {/* ── Bottom Call To Action ── */}
      <section className="w-full max-w-5xl px-4 md:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 rounded-3xl border border-theme-border bg-theme-card p-8 md:p-14 text-center relative overflow-hidden shadow-lg"
        >
          <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(159,15,31,0.08),transparent_70%)]" />

          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl md:text-4xl font-extrabold text-theme-primary font-changa leading-snug">
              {t.cta.notSure}
            </h2>
            <p className="mt-3 text-sm md:text-base text-theme-secondary/80 font-tajawal">
              {t.cta.notSureDesc}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#9F0F1F] px-8 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] shadow-[0_0_25px_rgba(159,15,31,0.3)] transition-all hover:bg-[#B91C28] hover:shadow-[0_0_35px_rgba(159,15,31,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
            >
              <span className="font-changa">{t.cta.getStarted}</span>
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
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-theme-border bg-theme-surface px-8 text-xs font-extrabold uppercase tracking-[0.16em] text-theme-primary transition-all hover:border-[#9F0F1F]/50 hover:bg-[#9F0F1F]/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F]"
            >
              <span className="font-changa">{t.cta.talkToUs}</span>
              <Arrow className="w-4 h-4 text-theme-muted" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Hero Video Lightbox */}
      <AnimatePresence>
        {showHeroVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8"
            onClick={() => setShowHeroVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-zinc-950">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#FF4D1A]" />
                  <span className="text-sm font-bold text-white font-changa">
                    {language === "ar" ? "استعراض أعمال وإنتاج حضور السينمائي" : "Hodour Production Showreel"}
                  </span>
                </div>
                <button
                  onClick={() => setShowHeroVideo(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#9F0F1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="إغلاق الفيديو"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <ProjectVideoPlayer
                  videoUrl="https://vimeo.com/1217314483"
                  title="Hodour Media Production Reel"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
