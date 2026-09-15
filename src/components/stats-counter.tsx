"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { Film, Users, Award, TrendingUp, Sparkles } from "lucide-react";

function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
  const { language } = useLanguage();

  const stats = [
    {
      value: 150,
      suffix: "+",
      labelAr: "مشروع سينمائي ورقمي مكتمل",
      labelEn: "Completed Media & Web Projects",
      subAr: "أفلام مؤسسية، درون 4K، وتطوير منصات",
      subEn: "Brand Films, 4K Drone & Web Portals",
      icon: Film,
    },
    {
      value: 80,
      suffix: "+",
      labelAr: "شريك نجاح ومؤسسة كبرى",
      labelEn: "Enterprise & Business Partners",
      subAr: "شركات عقارية، مكاتب محاماة، وكيانات",
      subEn: "Real Estate, Legal & Corporate",
      icon: Users,
    },
    {
      value: 99,
      suffix: "%",
      labelAr: "نسبة رضا واعتماد مستمر",
      labelEn: "Client Satisfaction & Retention",
      subAr: "علاقات عمل وثيقة وتطوير دائم",
      subEn: "Long-term Partnerships & Results",
      icon: TrendingUp,
    },
    {
      value: 5,
      suffix: "+",
      labelAr: "سنوات من صناعة الحضور",
      labelEn: "Years of Crafting Presence",
      subAr: "خبرة متخصصة ودقيقة في السوق المصري",
      subEn: "Dedicated Egyptian Market Mastery",
      icon: Award,
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const label = language === "ar" ? stat.labelAr : stat.labelEn;
          const sub = language === "ar" ? stat.subAr : stat.subEn;

          return (
            <motion.div
              key={stat.labelEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between p-6 md:p-7 rounded-3xl border border-theme-border bg-theme-card shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#9F0F1F]/40 overflow-hidden"
            >
              {/* Subtle glowing corner */}
              <div className="absolute top-0 end-0 w-24 h-24 bg-[radial-gradient(ellipse_at_top_right,rgba(159,15,31,0.12),transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#9F0F1F]/10 text-[#9F0F1F] dark:text-[#FF4D1A] group-hover:bg-[#9F0F1F] group-hover:text-[#F2D3B1] transition-all duration-300 group-hover:scale-105 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-[#FF4D1A] opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="text-3xl md:text-4xl font-black text-theme-primary font-alexandria tracking-tight flex items-baseline gap-0.5">
                  <span className="text-[#9F0F1F] dark:text-[#FF4D1A]">
                    <AnimatedNumber target={stat.value} />
                  </span>
                  <span className="text-[#FF4D1A] text-2xl font-bold">{stat.suffix}</span>
                </div>

                <h3 className="mt-2 text-sm font-bold text-theme-primary font-alexandria leading-snug">
                  {label}
                </h3>
              </div>

              <p className="mt-3 text-xs text-theme-secondary/70 font-alexandria leading-relaxed border-t border-theme-border/60 pt-3">
                {sub}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
