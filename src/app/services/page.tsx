"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent } from "react";
import {
  ExternalLink,
  Code2,
  Target,
  Video,
  type LucideIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ServiceCard = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  whatsappText: string;
  accentClass: string;
  glowColor: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const DEBO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

const services: ServiceCard[] = [
  {
    icon: Code2,
    title: "Web & Software Development",
    tagline: "Next.js · AI Systems · WebGL · ERP",
    description:
      "We architect bespoke digital systems built for scale and dominance. From immersive Next.js applications and AI-powered workflows to enterprise ERP platforms and high-fidelity 3D WebGL experiences — we engineer the digital infrastructure ambitious brands deserve.",
    bullets: [
      "Custom Next.js App Router Architecture",
      "AI Agent & LLM Integration",
      "Bespoke ERP & Scalable E-commerce",
      "Interactive 3D WebGL / WebGPU Experiences",
      "Headless CMS & API-first Systems",
    ],
    whatsappText:
      "Hello, I'm interested in Web & Software Development with SHIFT. Can we talk?",
    accentClass:
      "hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]",
    glowColor: "rgba(59,130,246,0.06)",
  },
  {
    icon: Target,
    title: "Digital Marketing",
    tagline: "Paid Ads · Social Growth · Demand Generation",
    description:
      "Revenue is engineered, not hoped for. We deploy data-driven ad campaigns that convert, strategic social media systems that compound, and growth engines calibrated for your market. Every campaign is a precision instrument designed to scale your pipeline.",
    bullets: [
      "High-Conversion Meta & Google Ad Campaigns",
      "Strategic Social Media Growth Systems",
      "Account-Based Marketing (ABM)",
      "Data-Driven Demand Generation",
      "Analytics, Attribution & Revenue Reporting",
    ],
    whatsappText:
      "Hello, I'm interested in Digital Marketing services from SHIFT. Can we talk?",
    accentClass:
      "hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]",
    glowColor: "rgba(16,185,129,0.06)",
  },
  {
    icon: Video,
    title: "Media Production & Branding",
    tagline: "Cinematic Video · Photography · Visual Identity",
    description:
      "First impressions are permanent. We produce cinematic brand films, commercial photography, and premium visual identities that command authority the moment they appear. We don't design logos — we craft brand worlds.",
    bullets: [
      "Cinematic Drone & Commercial Videography",
      "Professional Commercial Photography",
      "Premium Brand Identity Systems",
      "Motion Graphics & Visual Storytelling",
      "Full Visual Positioning Strategy",
    ],
    whatsappText:
      "Hello, I'm interested in Media Production & Branding from SHIFT. Can we talk?",
    accentClass:
      "hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]",
    glowColor: "rgba(139,92,246,0.06)",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service }: { service: ServiceCard }) {
  const Icon = service.icon;
  const href = `https://wa.me/${DEBO_WHATSAPP}?text=${encodeURIComponent(service.whatsappText)}`;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col items-center text-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-lg transition-all duration-300 ${service.accentClass} md:p-8`}
      whileHover={{ scale: 1.018 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Mouse Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              420px circle at ${mouseX}px ${mouseY}px,
              ${service.glowColor},
              transparent 80%
            )
          `,
        }}
      />

      {/* Hover radial gradient reveal */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Icon */}
      <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.1)]">
        <Icon size={22} strokeWidth={1.7} />
      </div>

      {/* Tagline pill */}
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
        {service.tagline}
      </p>

      {/* Title */}
      <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
        {service.title}
      </h2>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
        {service.description}
      </p>

      {/* Feature bullets */}
      <ul className="mt-5 space-y-2.5 flex-1 flex flex-col items-center w-full">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2.5 text-sm text-zinc-300">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 group-hover:bg-white transition-colors duration-300" />
            {bullet}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/btn mt-7 flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-zinc-300 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        Get Started
        <ExternalLink
          size={13}
          className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      </a>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-20 pt-12 md:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-[200px]" />

      {/* ── Section header ── */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12 max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">
          Our Core Disciplines
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Three pillars.{" "}
          <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            Infinite impact.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
          SHIFT operates at the intersection of engineering precision, marketing intelligence, and visual mastery — delivering outcomes that move the needle for brands that refuse to be ordinary.
        </p>

        {/* Divider accent */}
        <div className="mt-7 h-px w-24 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
      </motion.header>

      {/* ── Service Cards Grid ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
      >
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </motion.div>

      {/* ── Bottom CTA strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.025] px-6 py-8 text-center backdrop-blur-sm sm:flex-row sm:justify-center"
      >
        <div className="flex flex-col items-center sm:items-start sm:mr-4">
          <p className="text-lg font-bold text-white md:text-xl">
            Not sure which service fits your project?
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Talk to us directly and get a tailored recommendation in minutes.
          </p>
        </div>
        <a
          href={`https://wa.me/${DEBO_WHATSAPP}?text=${encodeURIComponent(
            "Hello SHIFT, I'm exploring your services and would love a tailored recommendation for my project."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:shadow-[0_0_28px_rgba(16,185,129,0.5)] hover:bg-emerald-400"
        >
          Talk to SHIFT →
        </a>
      </motion.div>
    </main>
  );
}
