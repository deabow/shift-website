"use client";

import { motion } from "framer-motion";
import {
  Fingerprint,
  Gauge,
  Code,
  Shield,
  Globe,
  Cable,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

// ─── Pillar Card ──────────────────────────────────────────────────────────────
function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = pillar.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/25 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(16,185,129,0.06),transparent_70%)]" />

      {/* Number */}
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
        {String(index + 1).padStart(2, "0")}
      </p>

      {/* Icon */}
      <div className="mb-4 mt-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:border-emerald-400/40 group-hover:shadow-[0_0_14px_rgba(16,185,129,0.25)]">
        <Icon size={18} strokeWidth={1.8} />
      </div>

      <h3 className="text-lg font-bold tracking-tight text-white">
        {pillar.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {pillar.body}
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_5%,rgba(16,185,129,0.04),transparent_70%)]" />

      {/* Subtle grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* ── Mission ── */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
          About SHIFT
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          We build digital{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
            growth engines
          </span>
          , not just websites.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
          SHIFT was founded to bridge the gap between futuristic engineering and
          real business impact. We combine security-first architecture,
          cutting-edge front-end performance, and deep regional UX expertise to
          move ambitious brands into their next era.
        </p>

        {/* Mission card */}
        <div className="mt-10 w-full max-w-3xl rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 backdrop-blur-sm md:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-400/70">
            Our Mission
          </p>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-zinc-100 md:text-xl">
            &ldquo;To deliver high-performance, security-hardened digital
            platforms that give ambitious businesses the technological edge to
            lead their markets.&rdquo;
          </p>
        </div>
      </motion.section>

      {/* ── Divider ── */}
      <div className="mx-auto mt-20 h-px w-full max-w-md bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      {/* ── Why SHIFT matrix ── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16"
      >
        <div className="mb-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            Why Choose SHIFT
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Six pillars that set us apart.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-8 text-center backdrop-blur-sm"
      >
        <p className="text-lg font-bold text-white md:text-xl">
          Ready to build your growth engine?
        </p>
        <p className="text-sm text-zinc-400">
          Talk to Debo and let&apos;s map out your next move.
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "201211050297"}?text=${encodeURIComponent("أهلاً ديبو، أنا مهتم بمعرفة المزيد عن SHIFT. ممكن نتكلم؟")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 rounded-xl bg-[#10b981] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
        >
          Talk to Debo
        </a>
      </motion.div>
    </main>
  );
}
