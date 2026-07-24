"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

const CLIENTS = [
  "Al-Khaleej Real Estate",
  "Dev-UNIT SaaS",
  "Ronaq Decor",
  "KemboGreen",
  "Olix Star",
  "On The Way",
  "KemboGreen",
  "Al-Khaleej Real Estate",
  "Dev-UNIT SaaS",
  "Ronaq Decor",
  "Olix Star",
  "On The Way",
];

export function ClientMarquee() {
  const { t, language } = useLanguage();
  const xTransform = language === "ar" ? ["0%", "50%"] : ["0%", "-50%"];

  return (
    <section className="mt-20 w-full overflow-hidden">
      <p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
        {t.clients.trustedBy}
      </p>

      <div className="relative flex overflow-hidden">
        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black to-transparent" />

        <motion.div
          animate={{ x: xTransform }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 gap-16 whitespace-nowrap px-8"
        >
          {CLIENTS.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none text-sm font-bold uppercase tracking-[0.22em] text-zinc-600 transition-colors duration-300 hover:text-emerald-400"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
