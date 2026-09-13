"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StatsCounter() {
  const { t } = useLanguage();

  const stats = [
    { value: 150, suffix: "+", label: t.stats.projects },
    { value: 80, suffix: "+", label: t.stats.clients },
    { value: 5, suffix: "+", label: t.stats.years },
  ];

  return (
    <section className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl border border-[#F2D3B1]/[0.06] bg-[#0B0B0C]"
          >
            <span className="text-4xl md:text-5xl font-extrabold text-[#9F0F1F] font-changa">
              <AnimatedNumber target={stat.value} />
              {stat.suffix}
            </span>
            <span className="mt-2 text-sm text-[#F2D3B1]/50 font-tajawal">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
