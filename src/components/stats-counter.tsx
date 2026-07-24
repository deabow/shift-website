"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      motionValue.set(target);
    }
  }, [inView, target, motionValue]);

  return (
    <span ref={ref} dir="ltr" className="inline-block">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  const { t } = useLanguage();

  const stats = [
    { value: 150, suffix: "+", label: t.stats.projects },
    { value: 50, suffix: "+", label: t.stats.clients },
    { value: 4, suffix: "+", label: t.stats.years },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/20"
        >
          {/* Hover radial glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(16,185,129,0.06),transparent_70%)]" />

          <p className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            <CountUp target={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-500 uppercase tracking-[0.18em]">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.section>
  );
}
