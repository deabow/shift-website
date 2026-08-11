"use client";

import { RevealMaskText } from "@/components/reveal-mask-text";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { MagneticWrapper } from "@/components/magnetic-wrapper";
import { ArrowRight } from "lucide-react";

const ClientMarquee = dynamic(() => import("@/components/client-marquee").then(mod => mod.ClientMarquee));
const BentoServices = dynamic(() => import("@/components/bento-services").then(mod => mod.BentoServices));
const BentoPortfolio = dynamic(() => import("@/components/bento-portfolio").then(mod => mod.BentoPortfolio));
const StatsCounter = dynamic(() => import("@/components/stats-counter").then(mod => mod.StatsCounter));
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => mod.Testimonials));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 18 },
  },
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Cinematic lighting layers */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(1300px_circle_at_50%_40%,rgba(16,185,129,0.08),transparent_65%),radial-gradient(800px_circle_at_20%_80%,rgba(5,150,105,0.04),transparent_55%)] dark:bg-[#030303]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,theme(colors.emerald.900/10),transparent_70%)]" />

      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:48px_48px]"
        style={{
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none fixed left-1/2 top-1/3 -z-10 h-[520px] w-[95vw] max-w-[1000px] -translate-x-1/2 rounded-full bg-[#10b981]/6 blur-[200px]" />

      {/* ── Hero ── */}
      <section className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 md:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center px-2 md:px-0"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400/90 bg-emerald-500/[0.08] border border-emerald-500/20 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>{t.hero.badge}</span>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 md:mt-8 w-full">
            <RevealMaskText />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-10 md:mt-12 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl px-4 md:px-0 leading-[1.1]"
          >
            {t.hero.titleLine1} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-zinc-900 via-emerald-600 to-[#10b981] dark:from-zinc-100 dark:via-[#a7f3d0] dark:to-[#10b981] bg-clip-text text-transparent">
              {t.hero.titleLine2}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-3xl text-lg md:text-2xl leading-relaxed text-zinc-600 dark:text-zinc-400 px-4 md:px-0"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <MagneticWrapper className="w-full sm:w-auto" distanceMultiplier={0.3} springConfig={{ stiffness: 200, damping: 12, mass: 0.1 }}>
              <Link
                href="/services"
                className="group relative flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl bg-emerald-500 px-8 text-xs font-extrabold uppercase tracking-[0.18em] text-zinc-950 transition-all duration-500 hover:shadow-[0_0_45px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: "-100%", skewX: "-20deg" }}
                  whileHover={{ x: "200%", skewX: "-20deg" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                <span className="relative z-10 py-4 flex items-center gap-2">
                  <span>{t.hero.btnServices}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </MagneticWrapper>

            <MagneticWrapper className="w-full sm:w-auto" distanceMultiplier={0.3} springConfig={{ stiffness: 200, damping: 12, mass: 0.1 }}>
              <Link
                href="/portfolio"
                className="group flex h-14 w-full sm:w-auto items-center justify-center rounded-xl border border-black/15 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900/60 px-8 text-xs font-extrabold uppercase tracking-[0.18em] text-zinc-800 dark:text-zinc-100 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] hover:text-emerald-600 dark:hover:text-white hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="py-4 flex items-center gap-2">
                  <span>{t.hero.btnWork}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300" />
                </span>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full max-w-5xl px-4 pb-24 md:px-8">
        <ClientMarquee />
      </section>

      <div className="w-full z-10 relative">
        <BentoServices />
      </div>

      <div className="w-full relative">
        <BentoPortfolio />
      </div>

      <section className="w-full max-w-5xl px-4 md:px-8">
        <StatsCounter />
      </section>

      <div className="w-full relative">
        <Testimonials />
      </div>
    </main>
  );
}
