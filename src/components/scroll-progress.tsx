"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-[#9F0F1F] via-[#FF4D1A] to-[#F2D3B1] shadow-[0_0_10px_rgba(255,77,26,0.6)]"
      style={{ scaleX }}
    />
  );
}
