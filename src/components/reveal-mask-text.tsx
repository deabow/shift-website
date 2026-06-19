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

  // Motion values to track spotlight cursor position and radius
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const radius = useMotionValue(0);

  // Springs for smooth transition physics
  const springConfig = { stiffness: 350, damping: 35, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const smoothRadius = useSpring(radius, { stiffness: 180, damping: 28 });

  // Generate dynamic clip path template for CSS spotlight mask
  const clipPath = useMotionTemplate`circle(${smoothRadius}px at ${smoothX}px ${smoothY}px)`;

  // Handles mouse movement over the card
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
  };

  // On hover start, expand spotlight circle radius
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
    radius.set(260); // Spotlight circle radius
  };

  // On hover exit, snap radius back to 0
  const handleMouseLeave = () => {
    setIsHovered(false);
    radius.set(0);
  };

  // Matrix Digital Rain Canvas Animation Effect
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
    
    // Spawn drops at various offsets above the canvas to stagger entrance
    let drops = Array(columns)
      .fill(1)
      .map(() => Math.floor(Math.random() * -(height / fontSize)));

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-/<>".split("");

    const drawMatrix = () => {
      // Semi-transparent black background to leave code trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Terminal green style code raindrops
      ctx.fillStyle = "#10b981";
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Render head of digital drop in bright white for high contrast digital aesthetics
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#ffffff";
          ctx.fillText(char, x, y);
          ctx.fillStyle = "#10b981";
        }

        // Reset raindrop back to top at random intervals
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let lastTime = 0;
    const fps = 30; // Target Matrix speed
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
      className="relative flex w-full max-w-5xl items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c]/60 p-4 transition-colors duration-500 h-44 sm:h-56 md:h-72 lg:h-[320px]"
      animate={{
        borderColor: isHovered ? "rgba(16, 185, 129, 0.45)" : "rgba(255, 255, 255, 0.08)",
        boxShadow: isHovered
          ? "0 0 45px rgba(16, 185, 129, 0.28), inset 0 0 20px rgba(16, 185, 129, 0.12)"
          : "0 15px 60px rgba(0, 0, 0, 0.65), inset 0 0 0px rgba(0, 0, 0, 0)",
      }}
    >
      {/* Background cyber grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

      {/* Layer 1: Clean minimalist static text (Base state) */}
      <svg className="absolute inset-0 h-full w-full select-none">
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="2"
          fill="none"
          className={`${orbitron.className} uppercase text-7xl md:text-9xl lg:text-[15rem] tracking-[0.04em] sm:tracking-[0.08em] md:tracking-[0.12em] lg:tracking-[0.16em] font-black`}
        >
          SHIFT
        </text>
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.85)"
          className={`${orbitron.className} uppercase text-7xl md:text-9xl lg:text-[15rem] tracking-[0.04em] sm:tracking-[0.08em] md:tracking-[0.12em] lg:tracking-[0.16em] font-black transition-all duration-300 group-hover:opacity-10`}
        >
          SHIFT
        </text>
      </svg>

      {/* Layer 2: Matrix Canvas text reveal (Masked/Hover state) */}
      <motion.div
        className="pointer-events-none absolute inset-0 h-full w-full bg-black"
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
                className={`${orbitron.className} uppercase text-7xl md:text-9xl lg:text-[15rem] tracking-[0.04em] sm:tracking-[0.08em] md:tracking-[0.12em] lg:tracking-[0.16em] font-black`}
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
