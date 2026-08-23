"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CTO, Nexus Corp",
    content: "Shift Agency completely transformed our digital presence. Their cyber-security integration and flawless design brought our platform to the next level.",
  },
  {
    name: "David Chen",
    role: "Founder, Zenith Web3",
    content: "The level of performance and aesthetic polish they deliver is unmatched. They are truly building the future of the web.",
  },
  {
    name: "Elena Rodriguez",
    role: "Director, Omni Systems",
    content: "Working with Shift was a revelation. Their team understands the intersection of deep tech and human-centric design perfectly.",
  },
  {
    name: "Marcus Thorne",
    role: "Lead Engineer, Vault Protocol",
    content: "Gravity-defying performance is not just a buzzword for them. Our application load times decreased by 400% after their rewrite.",
  }
];

export function Testimonials() {
  const { t, language } = useLanguage();
  
  const xTransform = language === "ar" ? ["0%", "50%"] : ["0%", "-50%"];

  return (
    <section className="w-full py-24 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.purple.900/10),transparent_70%)] pointer-events-none" />
      
      <div className="text-center mb-16 px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            {t.testimonials.title}
          </span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          {t.testimonials.subtitle}
        </p>
      </div>

      {/* Marquee Container */}
      <div className="flex w-full overflow-hidden relative z-10">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
        
        <motion.div
          animate={{ x: xTransform }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex gap-6 px-4 w-max"
        >
          {/* Double array for infinite seamless scroll */}
          {[...testimonials, ...testimonials].map((tItem, idx) => (
            <div
              key={idx}
              className="w-[85vw] sm:w-[350px] md:w-[450px] bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-purple-500/50 transition-colors shrink-0 flex flex-col items-center text-center"
            >
              <div className="flex justify-center text-purple-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 text-lg mb-6 leading-relaxed text-center" dir="ltr">&quot;{tItem.content}&quot;</p>
              <div dir="ltr" className="text-center">
                <h4 className="text-white font-bold">{tItem.name}</h4>
                <p className="text-violet-400 text-sm">{tItem.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
