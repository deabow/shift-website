"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Orbitron } from "next/font/google";
import { MouseEvent, useEffect, useRef } from "react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "900"],
});

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*".split("");

    const draw = () => {
      // Translucent black background to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Green text
      ctx.fillStyle = "#10b981"; 
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const loop = (time: number) => {
      if (time - lastTime > interval) {
        draw();
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full opacity-80" />;
}

export function RevealMaskText() {
  // Start mouse values in the center so mask initializes gracefully
  const cursorX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const cursorY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 40, mass: 0.5 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 40, mass: 0.5 });

  const maskImage = useMotionTemplate`radial-gradient(220px circle at ${smoothX}px ${smoothY}px, black 0%, rgba(0, 0, 0, 0.8) 40%, transparent 100%)`;

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - bounds.left);
    cursorY.set(event.clientY - bounds.top);
  };

  const onLeave = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(bounds.width / 2);
    cursorY.set(bounds.height / 2);
  };

  return (
    <div
      id="shift-reveal-target"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/60 md:min-h-[420px]"
    >
      {/* Base Layer: subtle gradient background and solid white text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_60%)]" />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <span
          className={`${orbitron.className} select-none text-7xl font-black tracking-[0.22em] text-white transition-opacity duration-300 sm:text-8xl md:text-9xl lg:text-[10rem]`}
        >
          SHIFT
        </span>
      </div>

      {/* Reveal Mask Layer (Hidden by default, revealed under cursor) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black"
        style={{ WebkitMaskImage: maskImage, maskImage }}
      >
        {/* Matrix Code Animation Background */}
        <div className="absolute inset-0">
          <MatrixCanvas />
        </div>

        {/* Text inside the mask: hollow with green stroke to match the Matrix vibe */}
        <span
          className={`${orbitron.className} relative z-10 select-none text-7xl font-black tracking-[0.22em] text-transparent sm:text-8xl md:text-9xl lg:text-[10rem]`}
          style={{ WebkitTextStroke: "2px #10b981" }}
        >
          SHIFT
        </span>
      </motion.div>
    </div>
  );
}
