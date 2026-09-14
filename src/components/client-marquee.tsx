"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

const CLIENTS = [
  "Al-Khaleej Real Estate",
  "KemboGreen",
  "Ronaq Decor",
  "Olix Star",
  "On The Way",
  "Al-Khaleej Real Estate",
  "KemboGreen",
  "Ronaq Decor",
  "Olix Star",
  "On The Way",
];

export function ClientMarquee() {
  const { language } = useLanguage();
  const xTransform = language === "ar" ? ["0%", "50%"] : ["0%", "-50%"];

  return (
    <section className="mt-20 w-full overflow-hidden">
      <p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[#F2D3B1]/30 font-alexandria">
        {language === "ar" ? "شركاء النجاح" : "Trusted By"}
      </p>

      <div className="relative flex overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#0B0B0C] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#0B0B0C] to-transparent" />

        <motion.div
          animate={{ x: xTransform }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 gap-16 whitespace-nowrap px-8"
        >
          {CLIENTS.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none text-sm font-bold uppercase tracking-[0.22em] text-[#F2D3B1]/20 transition-colors duration-300 hover:text-[#9F0F1F]"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
