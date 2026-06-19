"use client";

import { motion } from "framer-motion";
import {
  Eye,
  FileCheck2,
  Lock,
  ShieldCheck,
  ShieldEllipsis,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Pillar = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
};

// ─── Content ──────────────────────────────────────────────────────────────────
const pillars: Pillar[] = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Every byte of data — at rest and in transit — is protected with AES-256 and TLS 1.3. No plaintext storage. No half-measures.",
    tags: ["AES-256", "TLS 1.3", "Zero Plaintext"],
  },
  {
    icon: Eye,
    title: "Proactive Penetration Testing",
    description:
      "We attack your system before bad actors do. Full OWASP Top-10 coverage, API fuzzing, and infrastructure scans delivered with remediation reports.",
    tags: ["OWASP Top-10", "API Fuzzing", "CVE Scanning"],
  },
  {
    icon: ShieldEllipsis,
    title: "Zero-Trust Architecture",
    description:
      "Trust nothing, verify everything. Every request is authenticated, every permission is minimal, and lateral movement is eliminated by design.",
    tags: ["Least Privilege", "MFA Enforced", "Micro-segmentation"],
  },
  {
    icon: FileCheck2,
    title: "Compliance & Standards",
    description:
      "Architected to meet GDPR, ISO 27001, and regional data-protection laws — so your business stays protected on both technical and legal fronts.",
    tags: ["GDPR Ready", "ISO 27001", "Audit Trails"],
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Floating shield icon ─────────────────────────────────────────────────────
function ShieldHero() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex items-center justify-center"
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-28 w-28 rounded-full bg-emerald-500/15 blur-2xl"
      />
      {/* Icon container */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/35 bg-emerald-500/10 shadow-[0_0_35px_rgba(16,185,129,0.3)]">
        <ShieldCheck
          size={40}
          className="text-emerald-400"
          strokeWidth={1.5}
        />
      </div>
    </motion.div>
  );
}

// ─── Pillar card ──────────────────────────────────────────────────────────────
function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;

  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-md transition-all duration-350 hover:border-emerald-500/30 hover:shadow-[0_0_35px_rgba(16,185,129,0.1)] md:p-7"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {/* Hover internal radial glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(16,185,129,0.06),transparent_70%)]" />

      {/* Top-left scan line accent */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:border-emerald-400/40 group-hover:bg-emerald-500/15 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      {/* Content */}
      <h2 className="text-lg font-bold tracking-tight text-white">
        {pillar.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {pillar.description}
      </p>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {pillar.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-emerald-500/20 bg-emerald-500/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SecurityPage() {
  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8">
      {/* Background: deep dark with emerald server-room ambiance */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-black" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_5%,rgba(16,185,129,0.05),transparent_70%),radial-gradient(ellipse_40%_30%_at_80%_90%,rgba(16,185,129,0.03),transparent_60%)]" />

      {/* Subtle grid overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* ── Hero ── */}
      <motion.header
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-8 text-center md:gap-10"
      >
        <ShieldHero />

        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            Security · Infrastructure · Trust
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Security isn&apos;t an add-on.{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              It&apos;s our foundation.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Every system SHIFT delivers is engineered with security as a first-class
            requirement — not a checkbox. From architecture to deployment, we build
            with the assumption that threats are real and constant.
          </p>
        </div>

        {/* Horizontal rule with glow */}
        <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </motion.header>

      {/* ── Pillars Grid ── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-16"
        aria-label="Security pillars"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.title} pillar={pillar} />
          ))}
        </div>
      </motion.section>

      {/* ── Trust strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="mt-14 rounded-2xl border border-white/6 bg-white/[0.02] px-6 py-8 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-base font-bold text-white md:text-lg">
              Ready to audit your current stack?
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Book a free security assessment call with our team.
            </p>
          </div>
          <a
            href={`https://wa.me/201211050297?text=${encodeURIComponent(
              "أهلاً ديبو، أنا مهتم بعمل Security Assessment مع SHIFT. ممكن تكلمني؟"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl border border-emerald-500/35 bg-emerald-500/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300 transition-all hover:border-emerald-400/60 hover:bg-emerald-500/25 hover:text-white hover:shadow-[0_0_22px_rgba(16,185,129,0.25)]"
          >
            Request Security Audit →
          </a>
        </div>
      </motion.div>
    </main>
  );
}
