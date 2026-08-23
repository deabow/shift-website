"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Direct motion values without spring physics lag for instantaneous 1:1 mouse tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Only enable custom cursor on desktop screens
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Hover detection for interactive buttons, links, and clickable cards
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      const clickable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        (target.classList && target.classList.contains("cursor-pointer"));

      if (clickable) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        width: 32,
        height: 32,
      }}
      animate={{
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "rgba(139, 92, 246, 0.9)" : "rgba(255, 255, 255, 0.15)",
        border: isHovering ? "none" : "1.5px solid rgba(255, 255, 255, 0.7)",
      }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-violet-400"
        animate={{
          opacity: isHovering ? 0 : 1,
        }}
      />
    </motion.div>
  );
}
