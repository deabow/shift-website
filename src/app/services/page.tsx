"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";
import {
  ExternalLink,
  Code2,
  Target,
  Video,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { MagneticWrapper } from "@/components/magnetic-wrapper";

// ─── Types ────────────────────────────────────────────────────────────────────
type ServiceCardData = {
  index: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  whatsappText: string;
  badge: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const CEO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

const services: ServiceCardData[] = [
  {
    index: "01",
    icon: Code2,
    badge: "Engineering",
    title: "Web & Software Development",
    tagline: "Next.js 14 · AI Systems · WebGL 3D · Enterprise ERP",
    description:
      "We architect bespoke digital systems built for scale and dominance. From immersive Next.js applications and AI-powered workflows to enterprise ERP platforms and high-fidelity 3D WebGL experiences — we engineer the digital infrastructure ambitious brands deserve.",
    bullets: [
      "Custom Next.js App Router Architecture",
      "AI Agent & LLM Orchestration",
      "Bespoke Enterprise ERP Platforms",
      "Interactive 3D WebGL / WebGPU Experiences",
      "Headless CMS & High-Frequency APIs",
    ],
    whatsappText:
      "Hello, I'm interested in Web & Software Development with SHIFT. Can we talk?",
  },
  {
    index: "02",
    icon: Target,
    badge: "Growth Engine",
    title: "Digital Marketing",
    tagline: "Paid Ads · Social Growth · Demand Generation",
    description:
      "Revenue is engineered, not hoped for. We deploy data-driven ad campaigns that convert, strategic social media systems that compound, and growth engines calibrated for your market. Every campaign is a precision instrument designed to scale your pipeline.",
    bullets: [
      "High-Conversion Meta & Google Ad Campaigns",
      "Strategic Social Media Growth Systems",
      "Account-Based Marketing (ABM)",
      "Data-Driven Demand Generation Systems",
      "Real-Time Attribution & Revenue Dashboards",
    ],
    whatsappText:
      "Hello, I'm interested in Digital Marketing services from SHIFT. Can we talk?",
  },
  {
    index: "03",
    icon: Video,
    badge: "Cinematic Studio",
    title: "Media Production & Branding",
    tagline: "Cinematic Video · Photography · Visual Identity",
    description:
      "First impressions are permanent. We produce cinematic brand films, commercial photography, and premium visual identities that command authority the moment they appear. We don't design logos — we craft brand worlds.",
    bullets: [
      "Cinematic 8K Commercial Videography",
      "Professional Product & Editorial Photography",
      "Premium Brand Identity Systems",
      "3D Motion Graphics & Visual Storytelling",
      "Full Visual Positioning Strategy",
    ],
    whatsappText:
      "Hello, I'm interested in Media Production & Branding from SHIFT. Can we talk?",
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

// ─── Service Card Component ────────────────────────────────────────────────────
function ServiceCard({ service }: { service: ServiceCardData }) {
  const Icon = service.icon;
  const href = `https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(service.whatsappText)}`;
  
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
      rgba(139, 92, 246, 0.8) 0%,
      rgba(139, 92, 246, 0.2) 45%,
      transparent 80%
    )
  `;

  const innerSpotlight = useMotionTemplate`
    radial-gradient(
      450px circle at ${mouseX}px ${mouseY}px,
      rgba(139, 92, 246, 0.12) 0%,
      rgba(124, 58, 237, 0.03) 50%,
      transparent 80%
    )
  `;

  return (
    <motion.article
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl p-[1px] bg-white/[0.08] transition-all duration-500 hover:shadow-[0_0_50px_rgba(139, 92, 246,0.15)]"
    >
      {/* Spotlight Mouse-Tracking Border Glow */}
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
          {/* Header row: index + badge */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-2xl md:text-3xl font-black text-violet-400/40 group-hover:text-violet-400 transition-colors duration-500">
              {service.index}
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
              <Icon className="w-3.5 h-3.5 text-violet-400" />
              <span>{service.badge}</span>
            </div>
          </div>

          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400/70">
            {service.tagline}
          </p>

          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-100 group-hover:text-white transition-colors mb-3">
            {service.title}
          </h2>

          <p className="text-sm leading-relaxed text-zinc-400 font-normal mb-6">
            {service.description}
          </p>

          <ul className="space-y-3 mb-8">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2.5 text-xs md:text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-violet-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button with Framer Motion Magnetic Wrapper */}
        <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
          <MagneticWrapper distanceMultiplier={0.25}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-500/10 border border-violet-500/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-violet-400 transition-all duration-300 hover:bg-violet-500 hover:text-zinc-950 hover:shadow-[0_0_30px_rgba(139, 92, 246,0.4)]"
            >
              <span>Consult via WhatsApp</span>
              <ExternalLink size={13} />
            </a>
          </MagneticWrapper>

          <div className="w-2 h-2 rounded-full bg-violet-500/30 group-hover:bg-violet-400 group-hover:shadow-[0_0_10px_#8b5cf6] transition-all" />
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-violet-500/5 blur-[200px]" />

      {/* ── Section header ── */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="mb-16 max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/[0.08] border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(139, 92, 246,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span>Our Core Disciplines</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 md:text-5xl lg:text-6xl leading-[1.1]">
          Three pillars.{" "}
          <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            Infinite impact.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
          SHIFT operates at the intersection of engineering precision, marketing intelligence, and visual mastery — delivering outcomes that move the needle for brands that refuse to be ordinary.
        </p>

        <div className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      </motion.header>

      {/* ── Service Cards Grid ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
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
        className="mt-16 flex flex-col items-center gap-6 rounded-3xl border border-white/[0.08] bg-zinc-950/80 p-8 text-center backdrop-blur-2xl sm:flex-row sm:justify-between sm:text-left shadow-2xl relative overflow-hidden"
      >
        <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(139, 92, 246,0.08),transparent_70%)]" />

        <div className="relative z-10 flex flex-col">
          <p className="text-xl font-bold text-zinc-100 md:text-2xl">
            Not sure which service fits your project?
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Talk to us directly and get a tailored architectural recommendation in minutes.
          </p>
        </div>

        <MagneticWrapper distanceMultiplier={0.3} className="relative z-10 shrink-0">
          <a
            href={`https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(
              "Hello SHIFT, I'm exploring your services and would love a tailored recommendation for my project."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-950 transition hover:shadow-[0_0_35px_rgba(139, 92, 246,0.5)] hover:bg-violet-400"
          >
            <span>Talk to SHIFT</span>
            <ArrowRight className="w-4 h-4 text-zinc-950" />
          </a>
        </MagneticWrapper>
      </motion.div>
    </main>
  );
}
