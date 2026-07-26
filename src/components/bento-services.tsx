"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Code2, Target, Video } from "lucide-react";
import type { MouseEvent } from "react";
import { useLanguage } from "@/lib/language-context";

export function BentoServices() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.items.webSaaS.title,
      description: t.services.items.webSaaS.desc,
      icon: Code2,
      className:
        "md:col-span-1 md:row-span-2 bg-zinc-900/40 border-blue-500/20 hover:border-blue-500/50",
      iconColor: "text-blue-400",
      glowColor: "rgba(59,130,246,0.08)",
      badge: "Engineering",
    },
    {
      title: t.services.items.marketing.title,
      description: t.services.items.marketing.desc,
      icon: Target,
      className:
        "md:col-span-2 bg-zinc-900/40 border-emerald-500/20 hover:border-emerald-500/50",
      iconColor: "text-emerald-400",
      glowColor: "rgba(16,185,129,0.08)",
      badge: "Growth",
    },
    {
      title: t.services.items.branding.title,
      description: t.services.items.branding.desc,
      icon: Video,
      className:
        "md:col-span-2 bg-zinc-900/40 border-purple-500/20 hover:border-purple-500/50",
      iconColor: "text-purple-400",
      glowColor: "rgba(139,92,246,0.08)",
      badge: "Production",
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-8 py-24 z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col items-center text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent">
          {t.services.title}
        </h2>
        <p className="text-zinc-400 max-w-2xl text-lg">{t.services.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6">
        {services.map((service, index) => (
          <BentoCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}

function BentoCard({ service, index }: { service: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      className={`group relative p-6 md:p-8 rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 ${service.className}`}
    >
      {/* Mouse Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              ${service.glowColor},
              transparent 80%
            )
          `,
        }}
      />

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Badge */}
      <div className="relative z-10 mb-5">
        <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${service.iconColor} bg-white/5 border border-white/10 rounded-full px-3 py-1`}>
          {service.badge}
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          className={`w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 ${service.iconColor}`} />
        </div>
        <h3 className="text-xl font-bold text-zinc-100 mb-3">{service.title}</h3>
        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
