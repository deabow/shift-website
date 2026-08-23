"use client";

import { useEffect, useRef } from "react";

/**
 * High-performance particle background.
 *
 * Optimizations vs. the original:
 * 1. Particle cap at 60 (was ~207 on 1080p).
 * 2. Spatial-grid line drawing — only checks neighbours, dropping
 *    comparisons from O(n²) ≈ 21 000 → ~200 per frame.
 * 3. Squared-distance checks — no Math.sqrt per pair.
 * 4. Throttled mousemove (every 32 ms).
 * 5. Pauses when tab is hidden (visibilitychange).
 * 6. Proper cleanup of every listener.
 */

const MAX_PARTICLES = 60;
const CONNECT_DIST = 110;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
const MOUSE_DIST = 90;
const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;
const CELL_SIZE = CONNECT_DIST; // grid cell matches connection distance

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animId = 0;
    let paused = false;

    // ── Mouse (throttled) ──────────────────────────────────────
    const mouse = { x: -9999, y: -9999 };
    let lastMouseTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseTime < 32) return; // ~30 Hz cap
      lastMouseTime = now;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // ── Particle pool ──────────────────────────────────────────
    // Pre-allocated typed arrays for x, y, vx, vy, size
    const px  = new Float32Array(MAX_PARTICLES);
    const py  = new Float32Array(MAX_PARTICLES);
    const pvx = new Float32Array(MAX_PARTICLES);
    const pvy = new Float32Array(MAX_PARTICLES);
    const psz = new Float32Array(MAX_PARTICLES);
    let count = 0;

    function initParticles() {
      count = Math.min(MAX_PARTICLES, Math.floor((w * h) / 18000));
      for (let i = 0; i < count; i++) {
        px[i]  = Math.random() * w;
        py[i]  = Math.random() * h;
        pvx[i] = Math.random() - 0.5;
        pvy[i] = Math.random() - 0.5;
        psz[i] = Math.random() * 1.8 + 0.2;
      }
    }

    // ── Spatial grid ───────────────────────────────────────────
    // Each cell stores indices of particles inside it.
    let gridCols = 0;
    let gridRows = 0;
    let grid: number[][] = [];

    function rebuildGrid() {
      gridCols = Math.ceil(w / CELL_SIZE) || 1;
      gridRows = Math.ceil(h / CELL_SIZE) || 1;
      grid = new Array(gridCols * gridRows);
      for (let i = 0; i < grid.length; i++) grid[i] = [];
    }

    function populateGrid() {
      for (let i = 0; i < grid.length; i++) grid[i].length = 0;
      for (let i = 0; i < count; i++) {
        const col = Math.min(Math.floor(px[i] / CELL_SIZE), gridCols - 1);
        const row = Math.min(Math.floor(py[i] / CELL_SIZE), gridRows - 1);
        grid[row * gridCols + col].push(i);
      }
    }

    // ── Resize ─────────────────────────────────────────────────
    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      rebuildGrid();
    }

    // ── Animation loop ─────────────────────────────────────────
    function frame() {
      if (paused) { animId = requestAnimationFrame(frame); return; }

      ctx.clearRect(0, 0, w, h);

      // Update particles
      for (let i = 0; i < count; i++) {
        px[i] += pvx[i];
        py[i] += pvy[i];

        if (px[i] > w) px[i] = 0;
        else if (px[i] < 0) px[i] = w;
        if (py[i] > h) py[i] = 0;
        else if (py[i] < 0) py[i] = h;

        // Mouse repulsion (squared distance — no sqrt)
        const dx = mouse.x - px[i];
        const dy = mouse.y - py[i];
        const dSq = dx * dx + dy * dy;
        if (dSq < MOUSE_DIST_SQ && dSq > 0) {
          px[i] -= dx * 0.08;
          py[i] -= dy * 0.08;
        }
      }

      // Draw particles
      ctx.fillStyle = "rgba(139, 92, 246, 0.45)";
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        ctx.moveTo(px[i] + psz[i], py[i]);
        ctx.arc(px[i], py[i], psz[i], 0, Math.PI * 2);
      }
      ctx.fill();

      // Draw lines via spatial grid (only check neighbouring cells)
      populateGrid();
      ctx.lineWidth = 0.4;

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const cellIdx = row * gridCols + col;
          const cell = grid[cellIdx];
          if (cell.length === 0) continue;

          // Check this cell against itself + 4 forward neighbours
          // (right, bottom-left, bottom, bottom-right) to avoid duplicates
          const neighbours = [cellIdx];
          if (col + 1 < gridCols) neighbours.push(cellIdx + 1);
          if (row + 1 < gridRows) {
            if (col - 1 >= 0) neighbours.push((row + 1) * gridCols + col - 1);
            neighbours.push((row + 1) * gridCols + col);
            if (col + 1 < gridCols) neighbours.push((row + 1) * gridCols + col + 1);
          }

          for (const nIdx of neighbours) {
            const nCell = grid[nIdx];
            const sameCell = nIdx === cellIdx;
            for (let a = 0; a < cell.length; a++) {
              const startB = sameCell ? a + 1 : 0;
              for (let b = startB; b < nCell.length; b++) {
                const i = cell[a];
                const j = nCell[b];
                const ldx = px[i] - px[j];
                const ldy = py[i] - py[j];
                const ldSq = ldx * ldx + ldy * ldy;
                if (ldSq < CONNECT_DIST_SQ) {
                  const alpha = 0.14 * (1 - ldSq / CONNECT_DIST_SQ);
                  ctx.strokeStyle = `rgba(139, 92, 246,${alpha})`;
                  ctx.beginPath();
                  ctx.moveTo(px[i], py[i]);
                  ctx.lineTo(px[j], py[j]);
                  ctx.stroke();
                }
              }
            }
          }
        }
      }

      animId = requestAnimationFrame(frame);
    }

    // ── Visibility (pause when tab hidden) ─────────────────────
    const onVisibility = () => { paused = document.hidden; };

    // ── Bootstrap ──────────────────────────────────────────────
    resize();
    frame();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-15"
      style={{ opacity: 0.7 }}
    />
  );
}
