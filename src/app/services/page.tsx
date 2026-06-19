"use client";

import { motion } from "framer-motion";
import {
  Database,
  ExternalLink,
  Globe,
  Shield,
  Smartphone,
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
const DEBO_WHATSAPP = "201211050297";

const services: ServiceCard[] = [
  {
    icon: Globe,
    title: "Custom Web Development",
    tagline: "Next.js · React · TypeScript",
    description:
      "High-end web platforms built for speed, SEO, and scale. From landing pages to complex SaaS products — crafted with the latest App Router architecture.",
    bullets: [
      "Next.js App Router & Server Components",
      "Core Web Vitals & Lighthouse 100",
      "SEO-first technical architecture",
      "Enterprise-grade performance tuning",
    ],
    whatsappText:
      "أهلاً ديبو، أنا مهتم بخدمة Custom Web Development من SHIFT. ممكن تكلمني؟",
  },
  {
    icon: Smartphone,
    title: "Mobile App Solutions",
    tagline: "Flutter · React Native · Expo",
    description:
      "Cross-platform mobile apps that feel native on iOS and Android. One codebase, zero compromises on performance or UX.",
    bullets: [
      "Flutter & React Native hybrid builds",
      "Shared business logic across platforms",
      "App Store & Play Store deployment",
      "Real-time features & push notifications",
    ],
    whatsappText:
      "أهلاً ديبو، أنا مهتم بخدمة Mobile App Solutions من SHIFT. ممكن تكلمني؟",
  },
  {
    icon: Database,
    title: "Enterprise Systems",
    tagline: "ERP · Dashboards · Automation",
    description:
      "Custom ERP workflows, role-based management dashboards, and scalable internal tooling built to bring operational clarity to complex organizations.",
    bullets: [
      "Custom ERP & workflow modules",
      "Role-based access control systems",
      "Automated reporting & data pipelines",
      "Legacy system integration & migration",
    ],
    whatsappText:
      "أهلاً ديبو، أنا مهتم بخدمة Enterprise Systems من SHIFT. ممكن تكلمني؟",
  },
  {
    icon: Shield,
    title: "Cybersecurity & Pentesting",
    tagline: "OWASP · Pentest · Secure SDLC",
    description:
      "Security-first engineering built into every layer. Vulnerability assessments, penetration testing, and secure coding standards before and after launch.",
    bullets: [
      "Web & API vulnerability scanning",
      "Full penetration testing reports",
      "Secure Software Development Lifecycle",
      "Post-pentest remediation support",
    ],
    whatsappText:
      "أهلاً ديبو، أنا مهتم بخدمة Cybersecurity & Pentesting من SHIFT. ممكن تكلمني؟",
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

  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-lg transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)] md:p-8"
      whileHover={{ scale: 1.025 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
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
      <ul className="mt-5 space-y-2.5 flex-1">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
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
        className="mb-12 max-w-3xl"
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
        <div className="mt-7 h-px w-24 bg-gradient-to-r from-emerald-400/60 to-transparent" />
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
        className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.025] px-6 py-8 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left"
      >
        <div>
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
