"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for the outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer (desktop)
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      // Check for cursor text data attributes
      const customTextElem = target.closest("[data-cursor-text]") as HTMLElement | null;
      if (customTextElem) {
        setCursorText(customTextElem.getAttribute("data-cursor-text"));
      } else {
        setCursorText(null);
      }

      const clickable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        (target.classList && target.classList.contains("cursor-pointer"));

      setIsHovering(Boolean(clickable));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision inner dot (instant 1:1 response) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block rounded-full bg-[#FF4D1A] shadow-[0_0_12px_#FF4D1A]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 6 : 4,
          height: isHovering ? 6 : 4,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing smooth magnetic aura / ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:flex items-center justify-center rounded-full border border-[#9F0F1F]/40 backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorText ? 72 : isHovering ? 48 : 28,
          height: cursorText ? 72 : isHovering ? 48 : 28,
          backgroundColor: isHovering
            ? "rgba(159, 15, 31, 0.15)"
            : "rgba(255, 77, 26, 0.04)",
          borderColor: isHovering
            ? "rgba(255, 77, 26, 0.6)"
            : "rgba(159, 15, 31, 0.35)",
          boxShadow: isHovering
            ? "0 0 25px rgba(159, 15, 31, 0.35)"
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {cursorText && (
          <span className="font-alexandria text-[10px] font-extrabold uppercase tracking-wider text-[#F2D3B1] bg-[#9F0F1F]/90 px-2 py-0.5 rounded-full shadow">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
