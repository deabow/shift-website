"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import {
  Fingerprint,
  Gauge,
  Code,
  Shield,
  Globe,
  Cable,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type MouseEvent } from "react";
import { MagneticWrapper } from "@/components/magnetic-wrapper";

// ─── Why SHIFT pillars ────────────────────────────────────────────────────────
type Pillar = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const pillars: Pillar[] = [
  {
    icon: Shield,
    title: "Security-First Engineering",
    body: "Every system we build assumes constant threat. Encryption, zero-trust, and OWASP compliance are baked in from day one, not bolted on after launch.",
  },
  {
    icon: Code,
    title: "Future-Stack Technology",
    body: "Next.js 14, React 18, TypeScript, Tailwind, Framer Motion — we ship with the modern stack so your product doesn't feel outdated in six months.",
  },
  {
    icon: Gauge,
    title: "Performance Obsession",
    body: "Sub-second page loads, 100 Lighthouse scores, and 60fps animations aren't goals — they're minimums. Speed is a feature, and we don't compromise.",
  },
  {
    icon: Fingerprint,
    title: "Battle-Tested Reliability",
    body: "From enterprise ERP dashboards to high-traffic brand sites, every deployment is hardened with rate limiting, auth guards, and defensive error handling.",
  },
  {
    icon: Globe,
    title: "Arabic-First Mindset",
    body: "RTL-first layouts, Arabic content strategy, and cultural nuance built into every pixel. We design for the region, not ported from the West.",
  },
  {
    icon: Cable,
    title: "End-to-End Delivery",
    body: "Strategy, design, engineering, security, SEO, and deployment — one team, one workflow, no handoff gaps. You get a partner, not just a vendor.",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Pillar Card Component with Spotlight Mouse-Tracking Border Glow ───────────
function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = pillar.icon;

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
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-3xl p-[1px] bg-white/[0.08] transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.15)]"
    >
      {/* Mouse Spotlight Border Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
        style={{ background: borderSpotlight }}
      />

      <div className="relative h-full w-full rounded-[calc(1.5rem-1px)] bg-zinc-950/80 backdrop-blur-2xl p-7 flex flex-col justify-between overflow-hidden z-0 border border-white/[0.04]">
        {/* Inner spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10"
          style={{ background: innerSpotlight }}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-xl font-bold text-emerald-400/40 group-hover:text-emerald-400 transition-colors">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:border-emerald-400/40 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Icon size={18} strokeWidth={1.8} />
            </div>
          </div>

          <h3 className="text-xl font-extrabold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            {pillar.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 font-normal">
            {pillar.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_5%,rgba(16,185,129,0.06),transparent_70%)]" />

      {/* Subtle grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* ── Mission Header ── */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>About SHIFT</span>
        </div>

        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-zinc-100 md:text-5xl lg:text-6xl leading-[1.1]">
          We build digital{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            growth engines
          </span>
          , not just websites.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
          SHIFT was founded to bridge the gap between futuristic engineering and
          real business impact. We combine security-first architecture,
          cutting-edge front-end performance, and deep regional UX expertise to
          move ambitious brands into their next era.
        </p>

        {/* Mission card */}
        <div className="mt-10 w-full max-w-3xl rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-400">
            Our Mission Statement
          </p>
          <p className="mt-3 text-lg font-bold leading-relaxed text-zinc-100 md:text-xl">
            &ldquo;To deliver high-performance, security-hardened digital
            platforms that give ambitious businesses the technological edge to
            lead their markets.&rdquo;
          </p>
        </div>
      </motion.section>

      {/* ── Divider ── */}
      <div className="mx-auto mt-20 h-px w-full max-w-md bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      {/* ── Why SHIFT matrix ── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16"
      >
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            Why Choose SHIFT
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            Six pillars that set us apart.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </motion.section>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 flex flex-col items-center gap-6 rounded-3xl border border-white/[0.08] bg-zinc-950/80 p-8 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_70%)]" />

        <div className="relative z-10">
          <p className="text-xl font-extrabold text-zinc-100 md:text-2xl">
            Ready to build your growth engine?
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Talk to Debo and let&apos;s map out your next move.
          </p>
        </div>

        <MagneticWrapper distanceMultiplier={0.3} className="relative z-10">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "201211050297"}?text=${encodeURIComponent("أهلاً ديبو، أنا مهتم بمعرفة المزيد عن SHIFT. ممكن نتكلم؟")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-950 transition hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:bg-emerald-400"
          >
            <span>Talk to Debo</span>
            <ArrowRight className="w-4 h-4 text-zinc-950" />
          </a>
        </MagneticWrapper>
      </motion.div>
    </main>
  );
}
