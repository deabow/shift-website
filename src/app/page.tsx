"use client";

import { RevealMaskText } from "@/components/reveal-mask-text";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { MagneticWrapper } from "@/components/magnetic-wrapper";

const ClientMarquee = dynamic(() => import("@/components/client-marquee").then(mod => mod.ClientMarquee));
const BentoServices = dynamic(() => import("@/components/bento-services").then(mod => mod.BentoServices));
const HorizontalPortfolio = dynamic(() => import("@/components/horizontal-portfolio").then(mod => mod.HorizontalPortfolio));

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
    <main className="relative flex w-full flex-col items-center overflow-hidden bg-black">
      {/* Cinematic lighting layers */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(1300px_circle_at_50%_40%,rgba(16,185,129,0.08),transparent_65%),radial-gradient(800px_circle_at_20%_80%,rgba(5,150,105,0.04),transparent_55%)] bg-[#030303]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,theme(colors.emerald.900/10),transparent_70%)]" />

      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:48px_48px]"
        style={{
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none fixed left-1/2 top-1/3 -z-10 h-[520px] w-[95vw] max-w-[1000px] -translate-x-1/2 rounded-full bg-[#10b981]/6 blur-[200px]" />

      {/* ── Hero ── */}
      <section className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center px-2 md:px-0"
        >
          <motion.p
            variants={itemVariants}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400/70 bg-emerald-500/[0.07] border border-emerald-500/15 px-4 py-1.5 rounded-full"
          >
            {t.hero.badge}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-6 md:mt-8 w-full">
            <RevealMaskText />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-10 md:mt-12 text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl md:text-6xl px-4 md:px-0 leading-[1.1]"
          >
            {t.hero.titleLine1} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-zinc-100 via-[#a7f3d0] to-[#10b981] bg-clip-text text-transparent">
              {t.hero.titleLine2}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-3xl text-lg md:text-2xl leading-relaxed text-zinc-400 px-4 md:px-0"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto px-4 md:px-0"
          >
            <MagneticWrapper className="w-full md:w-auto">
              <Link
                href="/services"
                className="group relative flex h-13 w-full md:w-auto items-center justify-center overflow-hidden rounded-xl bg-[#10b981] px-8 text-xs font-bold uppercase tracking-[0.16em] text-black transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
              >
                <motion.span
                  className="absolute inset-0 bg-white/30"
                  initial={{ x: "-100%", skewX: "-15deg" }}
                  whileHover={{ x: "200%", skewX: "-15deg" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10 py-4">{t.hero.btnServices}</span>
              </Link>
            </MagneticWrapper>

            <MagneticWrapper className="w-full md:w-auto">
              <Link
                href="/portfolio"
                className="group flex h-13 w-full md:w-auto items-center justify-center rounded-xl border border-white/15 bg-zinc-900/50 px-8 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_0_35px_rgba(16,185,129,0.2)] hover:text-white"
              >
                <span className="py-4">{t.hero.btnWork}</span>
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
        <HorizontalPortfolio />
      </div>
    </main>
  );
}
