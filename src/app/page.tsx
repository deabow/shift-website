"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
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
  CheckCircle2,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

import { ProjectVideoPlayer } from "@/components/project-video-player";
import { BentoPortfolio } from "@/components/bento-portfolio";
import { StatsCounter } from "@/components/stats-counter";
import { ClientMarquee } from "@/components/client-marquee";
import { Testimonials } from "@/components/testimonials";
import { InteractiveProjectPlanner } from "@/components/interactive-project-planner";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
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

// ── 3D Tilt Perspective Card Component ──
function HeroShowreelTiltCard({
  imageLoaded,
  setImageLoaded,
  onPlay,
  language,
}: {
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
  onPlay: () => void;
  language: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="mt-12 w-full max-w-5xl rounded-3xl border border-theme-border bg-theme-card p-3 md:p-4 shadow-2xl relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_25px_70px_rgba(159,15,31,0.25)]"
      data-cursor-text={language === "ar" ? "تشغيل" : "Play"}
    >
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-theme-surface">
        <Image
          src="/portfolio-media/khaleej-real-estate-compilation-cover.jpeg"
          alt="Hodour Production Reel 2026 - استعراض أعمال حضور"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className={`object-cover object-center transition-all duration-700 ease-out ${
            imageLoaded ? "blur-0 scale-100 opacity-100" : "blur-md scale-105 opacity-80"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

        {/* Top Feature Badges */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white border border-white/10 shadow-sm">
            <Film className="w-3.5 h-3.5 text-[#FF4D1A]" />
            <span className="font-alexandria">
              {language === "ar" ? "استعراض إنتاجات حضور 2026" : "Hodour Production Reel 2026"}
            </span>
          </span>

          <div className="hidden sm:flex items-center gap-2">
            <span className="rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#F2D3B1] border border-white/10">
              4K Drone Cinema
            </span>
            <span className="rounded-full bg-[#9F0F1F]/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow">
              Commercials & Media
            </span>
          </div>
        </div>

        {/* Center Play Showreel Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 z-10">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            onClick={onPlay}
            className="group/play relative flex items-center justify-center rounded-full bg-[#9F0F1F] p-5 md:p-6 text-white shadow-[0_0_35px_rgba(159,15,31,0.7)] transition-colors duration-200 hover:bg-[#B91C28] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
            aria-label="مشاهدة فيديو استعراض أعمال حضور"
          >
            {/* Pulsing ring */}
            <span className="absolute -inset-2 rounded-full border-2 border-[#FF4D1A]/50 animate-ping pointer-events-none" />
            <Play className="w-7 h-7 md:w-8 md:h-8 fill-white translate-x-0.5" />
          </motion.button>

          <button
            onClick={onPlay}
            className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-white drop-shadow-md hover:text-[#F2D3B1] transition-colors font-alexandria inline-flex items-center gap-2"
          >
            <span>{language === "ar" ? "مشاهدة شو ريل الحضور" : "Watch Hodour Showreel"}</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white/90 font-mono">
              01:45
            </span>
          </button>
        </div>

        {/* Bottom Quick Metric Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 pointer-events-none font-alexandria z-10">
          <span className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>
              {language === "ar"
                ? "تصوير سينمائي • حملات إعلانية • منصات سحابية"
                : "Cinematography • Campaigns • Web Platforms"}
            </span>
          </span>
          <span className="hidden sm:inline-block bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-mono text-[11px] text-[#F2D3B1]">
            Vimeo 4K Showcase
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  const quickChips = [
    { icon: Film, labelAr: "إنتاج سينمائي ودرون 4K", labelEn: "4K Drone & Cinema", target: "#portfolio" },
    { icon: Palette, labelAr: "هوية بصرية وتصميم", labelEn: "Brand Identity", target: "#services" },
    { icon: Globe, labelAr: "منصات ومواقع سريعة", labelEn: "Next.js Web Platforms", target: "#portfolio" },
    { icon: TrendingUp, labelAr: "حملات إعلانية ممولة", labelEn: "Paid Ad Campaigns", target: "#services" },
    { icon: Sparkles, labelAr: "خطط مشروعك في 30 ثانية", labelEn: "Plan in 30 Seconds", target: "#project-planner" },
  ];

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden bg-theme-bg transition-colors duration-300">
      {/* Dynamic Ambient Background Elements */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-theme-bg" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(800px_circle_at_50%_15%,rgba(159,15,31,0.09),transparent_70%)]" />
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
      <section className="flex w-full max-w-6xl flex-col items-center justify-center px-4 md:px-8 pt-10 pb-12 md:pt-16 md:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center"
        >
          {/* Live Availability Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#9F0F1F] dark:text-[#FF4D1A] bg-[#9F0F1F]/[0.08] dark:bg-[#FF4D1A]/10 border border-[#9F0F1F]/25 px-4 py-2 rounded-full backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4D1A] animate-ping inline-block" />
            <span className="font-alexandria">
              {language === "ar"
                ? "متاحون للمشاريع الكبرى 2026 • استجابة خلال 15 دقيقة"
                : "Accepting Q3/Q4 Strategic Projects • 15-Min Response"}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 md:mt-8 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-theme-primary leading-[1.15] font-alexandria max-w-4xl"
          >
            {t.hero.titleLine1}{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#9F0F1F] dark:text-[#FF4D1A] inline-block">
              {t.hero.titleLine2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-base md:text-xl leading-relaxed text-theme-secondary/85 font-alexandria"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="#project-planner"
              className="group relative flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl bg-[#9F0F1F] px-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#F2D3B1] shadow-[0_4px_25px_rgba(159,15,31,0.35)] transition-all duration-300 hover:bg-[#B91C28] hover:shadow-[0_4px_35px_rgba(159,15,31,0.5)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
            >
              <span className="relative z-10 flex items-center gap-2 font-alexandria">
                <Sparkles className="w-4 h-4 text-[#FF4D1A]" />
                <span>{language === "ar" ? "خطط مشروعك فوراً" : "Plan Your Project"}</span>
                <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>

            <Link
              href="#portfolio"
              className="group flex h-14 w-full sm:w-auto items-center justify-center rounded-xl border border-theme-border bg-theme-card px-8 text-xs font-extrabold uppercase tracking-[0.18em] text-theme-primary backdrop-blur-xl shadow-sm transition-all hover:border-[#9F0F1F]/50 hover:bg-[#9F0F1F]/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
            >
              <span className="flex items-center gap-2 font-alexandria">
                <span>{t.hero.btnWork}</span>
                <Arrow className="w-4 h-4 text-theme-muted transition-all group-hover:text-theme-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          </motion.div>

          {/* Quick-Jump Interactive Chips */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl"
          >
            {quickChips.map((chip, idx) => {
              const Icon = chip.icon;
              const label = language === "ar" ? chip.labelAr : chip.labelEn;
              return (
                <a
                  key={idx}
                  href={chip.target}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-surface/70 hover:bg-theme-card hover:border-[#9F0F1F]/40 text-xs font-bold text-theme-secondary hover:text-theme-primary transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
                >
                  <Icon className="w-3.5 h-3.5 text-[#9F0F1F] dark:text-[#FF4D1A]" />
                  <span className="font-alexandria">{label}</span>
                </a>
              );
            })}
          </motion.div>

          {/* ── 3D Tilt Perspective Showreel Card ── */}
          <HeroShowreelTiltCard
            imageLoaded={heroImageLoaded}
            setImageLoaded={setHeroImageLoaded}
            onPlay={() => setShowHeroVideo(true)}
            language={language}
          />
        </motion.div>
      </section>

      {/* ── Integrated Interactive Stats Counter ── */}
      <StatsCounter />

      {/* ── Integrated Brand Partners Marquee ── */}
      <ClientMarquee />

      {/* ── Interactive Services Overview ── */}
      <section className="w-full max-w-6xl px-4 md:px-8 py-16 md:py-24" id="services">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9F0F1F] dark:text-[#FF4D1A] mb-3 font-alexandria">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D1A] animate-pulse" />
            <span>{t.services.title}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-theme-primary font-alexandria">
            {language === "ar" ? "خدمات تصنع الفارق لحضورك" : "Services That Build Your Presence"}
          </h2>
          <p className="mt-3 text-sm md:text-base text-theme-secondary/70 max-w-2xl mx-auto font-alexandria">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, idx) => {
            const Icon = serviceIcons[idx];
            const service = t.services.items[key];
            const whatsappText =
              language === "ar"
                ? `أهلاً حضور، أنا مهتم بخدمة ${service.title} وعايز أعرف تفاصيل العرض الفني.`
                : `Hello Hodour, I'm interested in ${service.title} and would like to know the technical proposal.`;

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group card-ember rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#9F0F1F]/40 relative overflow-hidden"
              >
                {/* Subtle top ambient indicator */}
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#9F0F1F]/30 to-transparent group-hover:via-[#FF4D1A] transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#9F0F1F]/20 bg-[#9F0F1F]/10 text-[#9F0F1F] dark:text-[#FF4D1A] transition-all duration-300 group-hover:bg-[#9F0F1F] group-hover:text-[#F2D3B1] group-hover:shadow-[0_0_20px_rgba(159,15,31,0.3)]">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <span className="font-mono text-xs font-bold text-theme-muted">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-theme-primary font-alexandria group-hover:text-[#9F0F1F] dark:group-hover:text-[#FF4D1A] transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-theme-secondary/80 leading-relaxed font-alexandria">
                    {service.desc}
                  </p>

                  {/* Bullet deliverables preview */}
                  <div className="mt-5 space-y-2 border-t border-theme-border/60 pt-4">
                    {service.bullets.slice(0, 3).map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-theme-secondary/90 font-alexandria">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D1A] shrink-0" />
                        <span className="truncate">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-theme-border flex items-center justify-between">
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "201211050297"}?text=${encodeURIComponent(
                      whatsappText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#9F0F1F] dark:text-[#FF4D1A] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F] rounded-lg p-1"
                  >
                    <span className="font-alexandria">
                      {language === "ar" ? "طلب استشارة سريعة" : "Quick Consultation"}
                    </span>
                    <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </a>
                  <span className="w-2 h-2 rounded-full bg-[#9F0F1F]/30 group-hover:bg-[#FF4D1A] transition-colors" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Unique Interactive Feature: Interactive Project Planner ── */}
      <InteractiveProjectPlanner />

      {/* ── Bento Portfolio Section with Real Media ── */}
      <div className="w-full relative">
        <BentoPortfolio />
      </div>

      {/* ── Integrated Client Testimonials ── */}
      <Testimonials />

      {/* ── Bottom Call To Action ── */}
      <section className="w-full max-w-5xl px-4 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-6 rounded-3xl border border-theme-border bg-theme-card p-8 md:p-14 text-center relative overflow-hidden shadow-xl"
        >
          <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(159,15,31,0.12),transparent_70%)]" />

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#9F0F1F]/10 px-3 py-1 text-xs font-bold text-[#9F0F1F] dark:text-[#FF4D1A] mb-3 font-alexandria">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4D1A]" />
              <span>{language === "ar" ? "خطوتك القادمة تبدأ هنا" : "Your Next Move Starts Here"}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-theme-primary font-alexandria leading-snug">
              {t.cta.notSure}
            </h2>
            <p className="mt-3 text-sm md:text-base text-theme-secondary/80 font-alexandria">
              {t.cta.notSureDesc}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "201211050297"}?text=${encodeURIComponent(
                language === "ar"
                  ? "أهلاً حضور، محتاج استشارة سريعة بخصوص خطة تسويق وإنتاج لمشروعي."
                  : "Hello Hodour, I'd like a quick consultation regarding marketing and production for my project."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_4px_25px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20bd5a] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="font-alexandria">{t.cta.talkToUs}</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-theme-border bg-theme-surface px-8 text-xs font-extrabold uppercase tracking-[0.16em] text-theme-primary transition-colors hover:border-[#9F0F1F]/50 hover:bg-[#9F0F1F]/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
            >
              <span className="font-alexandria">{t.cta.getStarted}</span>
              <Arrow className="w-4 h-4 text-theme-muted" />
            </Link>
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
                  <span className="text-sm font-bold text-white font-alexandria">
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
