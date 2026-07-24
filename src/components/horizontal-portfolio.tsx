"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function HorizontalPortfolio() {
  const { t, language } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const xTransformValues = language === "ar" ? ["-1%", "75%"] : ["1%", "-75%"];
  const x = useTransform(scrollYProgress, [0, 1], xTransformValues);

  const projects = [
    {
      id: 1,
      title: t.portfolio.projects.p1.title,
      category: t.portfolio.projects.p1.cat,
      color: "from-emerald-500/20 to-zinc-900",
    },
    {
      id: 2,
      title: t.portfolio.projects.p2.title,
      category: t.portfolio.projects.p2.cat,
      color: "from-purple-500/20 to-zinc-900",
    },
    {
      id: 3,
      title: t.portfolio.projects.p3.title,
      category: t.portfolio.projects.p3.cat,
      color: "from-blue-500/20 to-zinc-900",
    },
    {
      id: 4,
      title: t.portfolio.projects.p4.title,
      category: t.portfolio.projects.p4.cat,
      color: "from-pink-500/20 to-zinc-900",
    }
  ];

  return (
    <section ref={targetRef} className={`relative bg-black ${isMobile ? "py-24" : "h-[300vh]"}`}>
      <div className={`${isMobile ? "relative" : "sticky top-0 h-screen"} flex flex-col items-center justify-center overflow-hidden`}>
        <div className={`${isMobile ? "relative mb-8 px-4 w-full text-center flex flex-col items-center" : "absolute top-24 left-1/2 -translate-x-1/2 text-center w-full z-10 flex flex-col items-center"}`}>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            {t.portfolio.title}
          </h2>
          <p className="text-zinc-400 mt-2">{t.portfolio.subtitle}</p>
        </div>
        
        <motion.div 
          style={isMobile ? {} : { x }} 
          className={`flex gap-4 md:gap-8 ${isMobile ? "overflow-x-auto snap-x snap-mandatory px-4 pb-8 w-full" : "px-12 xl:px-32 mt-24"}`}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative h-[400px] w-[280px] md:h-[600px] md:w-[450px] shrink-0 rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 ${isMobile ? "snap-center" : ""}`}
            >
              {/* Background gradient instead of image for now */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:scale-105 transition-transform duration-700`} />
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center text-center">
                <p className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
