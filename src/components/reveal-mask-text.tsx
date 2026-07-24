"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Orbitron } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
});

export function RevealMaskText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const radius = useMotionValue(0);

  const smoothX = useSpring(cursorX, { stiffness: 250, damping: 25, mass: 0.4 });
  const smoothY = useSpring(cursorY, { stiffness: 250, damping: 25, mass: 0.4 });
  const smoothRadius = useSpring(radius, { stiffness: 150, damping: 22 });

  const clipPath = useMotionTemplate`circle(${smoothRadius}px at ${smoothX}px ${smoothY}px)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
    radius.set(280);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isMobile) {
      radius.set(0);
    }
  };

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobile);
      if (mobile) {
        setIsHovered(true);
        radius.set(120);
      } else {
        setIsHovered(false);
        radius.set(0);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    let autoAnimateId: number;
    let angle = 0;
    
    const autoAnimate = () => {
      if (isMobile && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const movementRadius = Math.min(rect.width, rect.height) * 0.3;
        
        cursorX.set(centerX + Math.cos(angle) * movementRadius);
        cursorY.set(centerY + Math.sin(angle) * movementRadius);
        
        angle += 0.02;
      }
      autoAnimateId = requestAnimationFrame(autoAnimate);
    };
    
    if (isMobile) {
      autoAnimate();
    }
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (autoAnimateId) cancelAnimationFrame(autoAnimateId);
    };
  }, [isMobile, cursorX, cursorY, radius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 1000);
    let height = (canvas.height = canvas.offsetHeight || 300);

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);

    let drops = Array(columns)
      .fill(1)
      .map(() => Math.floor(Math.random() * -(height / fontSize)));

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-/<>".split("");

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#10b981";
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (Math.random() > 0.98) {
          ctx.fillStyle = "#ffffff";
          ctx.fillText(char, x, y);
          ctx.fillStyle = "#10b981";
        }

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const renderLoop = (time: number) => {
      if (time - lastTime > interval) {
        drawMatrix();
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 1000;
      height = canvas.height = canvas.offsetHeight || 300;
      columns = Math.floor(width / fontSize);
      drops = Array(columns)
        .fill(1)
        .map(() => Math.floor(Math.random() * -(height / fontSize)));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex w-full max-w-5xl items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.06] bg-zinc-900/40 p-2 md:p-4 backdrop-blur-xl transition-colors duration-500 h-28 sm:h-44 md:h-72 lg:h-[320px]"
      animate={{
        borderColor: isHovered
          ? "rgba(16, 185, 129, 0.4)"
          : "rgba(255, 255, 255, 0.06)",
        boxShadow: isHovered
          ? "0 0 60px rgba(16, 185, 129, 0.15), inset 0 0 30px rgba(16, 185, 129, 0.08)"
          : "0 20px 70px rgba(0, 0, 0, 0.5), inset 0 0 0px rgba(0, 0, 0, 0)",
      }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
    >
      {/* Ambient radial glow behind the card */}
      <div className="pointer-events-none absolute -inset-20 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,theme(colors.emerald.500/12),transparent_70%)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

      {/* Layer 1: static text outline + fill */}
      <svg className="absolute inset-0 h-full w-full select-none">
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="2"
          fill="none"
          className={`${orbitron.className} uppercase text-[20vw] sm:text-7xl md:text-9xl lg:text-[15rem] tracking-[0.02em] sm:tracking-[0.08em] md:tracking-[0.12em] lg:tracking-[0.16em] font-black`}
        >
          SHIFT
        </text>
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.85)"
          className={`${orbitron.className} uppercase text-[20vw] sm:text-7xl md:text-9xl lg:text-[15rem] tracking-[0.02em] sm:tracking-[0.08em] md:tracking-[0.12em] lg:tracking-[0.16em] font-black`}
        >
          SHIFT
        </text>
      </svg>

      {/* Layer 2: Matrix canvas reveal */}
      <motion.div
        className="pointer-events-none absolute inset-0 h-full w-full bg-black/90"
        style={{ clipPath }}
      >
        <svg className="h-full w-full select-none">
          <defs>
            <clipPath id="shift-text-clip">
              <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                className={`${orbitron.className} uppercase text-[20vw] sm:text-7xl md:text-9xl lg:text-[15rem] tracking-[0.02em] sm:tracking-[0.08em] md:tracking-[0.12em] lg:tracking-[0.16em] font-black`}
              >
                SHIFT
              </text>
            </clipPath>
          </defs>
          <foreignObject
            x="0"
            y="0"
            width="100%"
            height="100%"
            clipPath="url(#shift-text-clip)"
          >
            <canvas ref={canvasRef} className="block h-full w-full bg-black" />
          </foreignObject>
        </svg>
      </motion.div>
    </motion.div>
  );
}
