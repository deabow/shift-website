"use client";

import { RevealMaskText } from "@/components/reveal-mask-text";
import { motion } from "framer-motion";
import Link from "next/link";

// Animation configs for staggered entry
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const, // Custom cubic-bezier for smooth velocity curve
    },
  },
};

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4 py-20 md:px-8">
      {/* 3D Depth Backdrop: radial gradients blending from deep black to dark emerald */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(1300px_circle_at_50%_40%,rgba(16,185,129,0.075),transparent_65%),radial-gradient(800px_circle_at_20%_80%,rgba(5,150,105,0.03),transparent_55%)] bg-[#030303]" />

      {/* Cybernetic background grid system with radial masking */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:48px_48px]" 
        style={{
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)"
        }}
      />

      {/* Glowing neon emerald center core */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[480px] w-[95vw] max-w-[900px] -translate-x-1/2 rounded-full bg-[#10b981]/5 blur-[170px]" />

      {/* Core layout containing staggered animated elements */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center px-2 md:px-0"
      >
        {/* Subtle tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xs font-bold uppercase tracking-[0.3em] text-[#10b981]/80"
        >
          Shift Agency
        </motion.p>

        {/* Central interactive reveal component */}
        <motion.div variants={itemVariants} className="mt-6 md:mt-8 w-full">
          <RevealMaskText />
        </motion.div>

        {/* Sleek, cyber-grade headline with subtle entrance and gradient highlights */}
        <motion.h1
          variants={itemVariants}
          className="mt-10 md:mt-12 text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl md:text-6xl px-4 md:px-0"
        >
          Cyber-grade digital experiences <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-zinc-200 via-[#a7f3d0] to-[#10b981] bg-clip-text text-transparent">
            with gravity-defying performance.
          </span>
        </motion.h1>

        {/* Supporting description copy */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-3xl text-lg md:text-2xl leading-relaxed text-zinc-400 px-4 md:px-0"
        >
          Immersive interfaces, secure engineering, and futuristic systems built to move
          ambitious brands into their next era.
        </motion.p>

        {/* Action Call-to-Actions (CTAs) */}
        <motion.div
          variants={itemVariants}
          className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto px-4 md:px-0"
        >
          {/* Primary Action Button */}
          <Link
            href="/services"
            className="group relative flex h-13 w-full md:w-auto items-center justify-center rounded-xl bg-[#10b981] px-8 text-xs font-bold uppercase tracking-[0.16em] text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.55)]"
          >
            Explore Services
          </Link>

          {/* Secondary Action Button */}
          <Link
            href="/portfolio"
            className="flex h-13 w-full md:w-auto items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-8 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#10b981] hover:bg-[#10b981]/5 hover:text-white"
          >
            View Our Work
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
