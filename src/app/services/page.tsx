"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent } from "react";
import {
  Database,
  ExternalLink,
  Code2,
  Shield,
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
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const DEBO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

const services: ServiceCard[] = [
  {
    icon: Code2,
    title: "Web & SaaS Development",
    tagline: "Next.js · AI · ERP · WebGL",
    description:
      "Custom Next.js web applications, AI integrations, ERP solutions, E-commerce, and high-end interactive 3D WebGL/WebGPU experiences. We build digital products that dominate markets.",
    bullets: [
      "Custom Next.js App Router Architecture",
      "Advanced AI Models & Agent Integration",
      "Bespoke ERP & Scalable E-commerce",
      "Interactive 3D WebGL / WebGPU Experiences",
    ],
    whatsappText:
      "Hello, I am interested in Web & SaaS Development. Can we talk?",
  },
  {
    icon: Target,
    title: "Digital Marketing & Demand Generation",
    tagline: "B2B/B2C · ABM · Lead Gen",
    description:
      "High-conversion B2B/B2C ad campaigns, account-based marketing (ABM), lead generation, and strategic growth engines designed to aggressively scale your revenue.",
    bullets: [
      "High-Conversion Ad Campaigns",
      "Account-Based Marketing (ABM)",
      "Strategic Growth Engines",
      "Data-Driven Lead Generation",
    ],
    whatsappText:
      "Hello, I am interested in Digital Marketing & Demand Generation. Can we talk?",
  },
  {
    icon: Video,
    title: "Cinematic Visual Production & Branding",
    tagline: "Premium Identity · Graphic Design · Drone",
    description:
      "Premium brand identity, striking graphic design, and cinematic drone videography. We craft visual narratives that instantly position your brand as an industry leader.",
    bullets: [
      "Premium Brand Identity Systems",
      "High-End Graphic Design",
      "Cinematic Drone Videography",
      "Visual Positioning Strategy",
    ],
    whatsappText:
      "Hello, I am interested in Cinematic Visual Production & Branding. Can we talk?",
  },
  {
    icon: Shield,
    title: "Cybersecurity & Penetration Testing",
    tagline: "Pentest · Vulnerability · Secure SDLC",
    description:
      "Securing digital infrastructure, vulnerability assessments, and web application security. We build impenetrable fortresses around your most valuable digital assets.",
    bullets: [
      "Digital Infrastructure Hardening",
      "Advanced Vulnerability Assessments",
      "Web Application Security",
      "Complete Penetration Testing",
    ],
    whatsappText:
      "Hello, I am interested in Cybersecurity & Penetration Testing. Can we talk?",
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
      className="group relative flex flex-col items-center text-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-lg transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)] md:p-8"
      whileHover={{ scale: 1.025 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Mouse Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(16,185,129,0.06),
              transparent 80%
            )
          `,
        }}
      />

      {/* Hover radial gradient reveal */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(16,185,129,0.07),transparent_70%)]" />

      {/* Icon */}
      <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/15 group-hover:shadow-[0_0_18px_rgba(16,185,129,0.3)]">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      {/* Tagline pill */}
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/70">
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
      <ul className="mt-5 space-y-2.5 flex-1 flex flex-col items-center">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2.5 text-sm text-zinc-300">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            {bullet}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/btn mt-7 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300 transition-all duration-300 hover:border-emerald-400/60 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:text-white"
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
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/4 blur-[200px]" />

      {/* ── Section header ── */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12 max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">
          What we build
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Gravity-defying digital{" "}
          <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            solutions.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
          SHIFT delivers full-stack engineering, mobile execution, enterprise
          systems, and security depth for ambitious teams that need speed
          without compromise.
        </p>

        {/* Divider accent */}
        <div className="mt-7 h-px w-24 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
      </motion.header>

      {/* ── Service Cards Grid ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
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
            Talk to Debo directly and get a tailored recommendation in minutes.
          </p>
        </div>
        <a
          href={`https://wa.me/${DEBO_WHATSAPP}?text=${encodeURIComponent(
            "أهلاً ديبو، أنا مهتم بخدمات SHIFT ومش عارف أنسب خدمة ليا. ممكن تساعدني؟"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:shadow-[0_0_28px_rgba(16,185,129,0.5)] hover:bg-emerald-400"
        >
          Talk to Debo →
        </a>
      </motion.div>
    </main>
  );
}
