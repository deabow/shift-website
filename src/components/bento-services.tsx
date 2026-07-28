"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import {
  Code2,
  Target,
  Video,
  ArrowUpRight,
  Sparkles,
  Terminal,
  TrendingUp,
  Film,
} from "lucide-react";
import { type MouseEvent } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { MagneticWrapper } from "@/components/magnetic-wrapper";

export function BentoServices() {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-32 z-10 relative">
      {/* Background ambient lighting for Bento section */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[160px]" />

      {/* Section Header with Cyber Badge & Typographic Hierarchy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-20 flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Core Capabilities</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 text-zinc-100 leading-[1.1]">
          {t.services.title}{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            Engineered.
          </span>
        </h2>
        <p className="text-zinc-400 max-w-2xl text-base md:text-xl font-normal leading-relaxed">
          {t.services.subtitle}
        </p>
      </motion.div>

      {/* 12-Column Asymmetric Bento Grid for 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
        {/* Card 1: Web & Software Development (7 Columns) */}
        <BentoCard
          index="01"
          colSpan="lg:col-span-7"
          badge="Engineering"
          title={t.services.items.webSaaS.title}
          description={t.services.items.webSaaS.desc}
          icon={Code2}
          tags={["Next.js 14", "TypeScript", "WebGL 3D", "AI Infrastructure"]}
          ctaText="Explore Architecture"
          ctaHref="/services#engineering"
        >
          {/* Interactive Micro-Widget: Live Code Terminal */}
          <div className="mt-8 rounded-xl border border-white/[0.08] bg-zinc-950/90 p-4 font-mono text-xs shadow-2xl relative overflow-hidden group/code">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3 text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-[11px] text-zinc-400 ml-2 font-sans font-medium flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-emerald-400" />
                  shift-app.config.ts
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-sans flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                OPTIMIZED 100 FPS
              </span>
            </div>
            <div className="space-y-1.5 text-zinc-300 overflow-x-auto leading-relaxed">
              <p className="text-zinc-500">// Initialize High-Frequency Cyber System</p>
              <p>
                <span className="text-emerald-400">export const</span> appConfig ={" "}
                <span className="text-emerald-300">defineEngine</span>&#40;&#123;
              </p>
              <p className="pl-4">
                framework: <span className="text-amber-300">&quot;Next.js App Router&quot;</span>,
              </p>
              <p className="pl-4">
                performance: <span className="text-amber-300">&quot;Ultra Low Latency&quot;</span>,
              </p>
              <p className="pl-4">
                cyberShield: <span className="text-emerald-400">true</span>,
              </p>
              <p>&#125;&#41;;</p>
            </div>
          </div>
        </BentoCard>

        {/* Card 2: Digital Marketing & Demand Gen (5 Columns) */}
        <BentoCard
          index="02"
          colSpan="lg:col-span-5"
          badge="Growth Engine"
          title={t.services.items.marketing.title}
          description={t.services.items.marketing.desc}
          icon={Target}
          tags={["Omnichannel Ads", "SEO Authority", "Funnel Optimization"]}
          ctaText="Scale Demand"
          ctaHref="/services#marketing"
        >
          {/* Interactive Micro-Widget: Growth Metric Card */}
          <div className="mt-8 rounded-xl border border-white/[0.08] bg-zinc-950/90 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Conversion Surge
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                +340% YoY
              </span>
            </div>

            {/* Glowing SVG Curve Graph */}
            <div className="h-20 w-full relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,50 Q40,45 80,30 T160,15 T200,5"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M0,50 Q40,45 80,30 T160,15 T200,5 L200,60 L0,60 Z"
                  fill="url(#growthGradient)"
                />
                {/* Glowing Pulse Dot */}
                <circle cx="200" cy="5" r="4" fill="#34d399" className="animate-ping" />
                <circle cx="200" cy="5" r="4" fill="#10b981" />
              </svg>
            </div>
          </div>
        </BentoCard>

        {/* Card 3: Media Production & Branding (Full 12 Columns Master Showcase) */}
        <BentoCard
          index="03"
          colSpan="lg:col-span-12"
          badge="Cinematic Studio"
          title={t.services.items.branding.title}
          description={t.services.items.branding.desc}
          icon={Video}
          tags={["8K Commercial Video", "Brand Identity Systems", "Sound Design & Scoring", "3D Motion Design"]}
          ctaText="View Showreel"
          ctaHref="/services#media"
          isWide
        >
          {/* Interactive Micro-Widget: Camera Viewfinder & Soundwave Equalizer */}
          <div className="mt-8 lg:mt-0 rounded-xl border border-white/[0.08] bg-zinc-950/90 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/[0.08] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-zinc-200 font-bold tracking-wider">REC ● 8K RAW</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
                <span>FPS: 60</span>
                <span>ISO: 800</span>
                <span className="text-emerald-400 font-semibold">ANAMORPHIC</span>
              </div>
            </div>

            {/* Live Audio Equalizer Waveform Visualizer */}
            <div className="flex items-center justify-center gap-1.5 h-12 py-2">
              {[40, 75, 30, 95, 60, 100, 45, 85, 50, 90, 65, 35, 80, 55, 95, 40].map((height, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-emerald-600 via-emerald-400 to-teal-200 rounded-full"
                  animate={{
                    height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: i * 0.08,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-3 border-t border-white/[0.08] font-mono">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Film className="w-3.5 h-3.5 text-emerald-400" />
                SHIFT CINEMA CORE v2.4
              </span>
              <span className="text-emerald-400/80">DOLBY ATMOS SYNC</span>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   BentoCard Component with Spotlight Mouse-Tracking Glow Effect
   ───────────────────────────────────────────────────────────── */
interface BentoCardProps {
  index: string;
  colSpan: string;
  badge: string;
  title: string;
  description: string;
  icon: any;
  tags: string[];
  ctaText: string;
  ctaHref: string;
  isWide?: boolean;
  children?: React.ReactNode;
}

function BentoCard({
  index,
  colSpan,
  badge,
  title,
  description,
  icon: Icon,
  tags,
  ctaText,
  ctaHref,
  isWide = false,
  children,
}: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);

    // Subtle 3D tilt calculation (max 4 degrees)
    const calcRotateX = ((y - height / 2) / (height / 2)) * -4;
    const calcRotateY = ((x - width / 2) / (width / 2)) * 4;
    rotateX.set(calcRotateX);
    rotateY.set(calcRotateY);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const borderSpotlight = useMotionTemplate`
    radial-gradient(
      320px circle at ${mouseX}px ${mouseY}px,
      rgba(16, 185, 129, 0.8) 0%,
      rgba(16, 185, 129, 0.2) 45%,
      transparent 80%
    )
  `;

  const innerSpotlight = useMotionTemplate`
    radial-gradient(
      450px circle at ${mouseX}px ${mouseY}px,
      rgba(16, 185, 129, 0.12) 0%,
      rgba(5, 150, 105, 0.03) 50%,
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative rounded-3xl p-[1px] bg-white/[0.08] transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.15)] ${colSpan}`}
    >
      {/* ── Advanced Hover State: Mouse-Tracking Spotlight Border Glow ── */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
        style={{ background: borderSpotlight }}
      />

      {/* Main Glassmorphic Inner Container */}
      <div className="relative h-full w-full rounded-[calc(1.5rem-1px)] bg-zinc-950/80 backdrop-blur-2xl p-7 md:p-9 flex flex-col justify-between overflow-hidden z-0 border border-white/[0.04]">
        {/* Cursor-following ambient inner card glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10"
          style={{ background: innerSpotlight }}
        />

        {/* Background Grid Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 -z-10" />

        <div>
          {/* Top Row: Numeric Cyber Index & Badge */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-2xl md:text-3xl font-black text-emerald-400/40 group-hover:text-emerald-400 transition-colors duration-500">
              {index}
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              <Icon className="w-3.5 h-3.5 text-emerald-400" />
              <span>{badge}</span>
            </div>
          </div>

          {/* Content & Micro-Widget Layout */}
          <div className={isWide ? "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" : "block"}>
            <div className={isWide ? "lg:col-span-6" : ""}>
              {/* Title & High Contrast Typography */}
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight mb-3 group-hover:text-white transition-colors">
                {title}
              </h3>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-normal">
                {description}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-zinc-400 bg-zinc-900/90 border border-white/[0.06] px-2.5 py-1 rounded-md group-hover:border-emerald-500/20 group-hover:text-zinc-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Custom Micro-Widget Slot */}
            {children && <div className={isWide ? "lg:col-span-6" : ""}>{children}</div>}
          </div>
        </div>

        {/* Card Footer CTA Button with Framer Motion Magnetic Wrapper */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
          <MagneticWrapper distanceMultiplier={0.25}>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-300 group-hover:text-emerald-400 transition-colors py-2 px-1"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </MagneticWrapper>

          <div className="w-2 h-2 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_#10b981] transition-all" />
        </div>
      </div>
    </motion.div>
  );
}
