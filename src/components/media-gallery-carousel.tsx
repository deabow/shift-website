"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
  Image as ImageIcon,
  Maximize2,
  X,
} from "lucide-react";
import { ProjectVideoPlayer } from "@/components/project-video-player";
import { MediaItem } from "@/lib/portfolio-types";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzgwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMjAnIGhlaWdodD0nODAnIGZpbGw9JyMxMjEyMTYnLz48L3N2Zz4=";

interface MediaGalleryCarouselProps {
  items: MediaItem[];
  title: string;
  className?: string;
}

export function MediaGalleryCarousel({ items, title, className = "" }: MediaGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Normalize items to ensure there's at least one valid item
  const validItems = items && items.length > 0 ? items : [];

  const handleNext = useCallback(() => {
    if (validItems.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % validItems.length);
  }, [validItems.length]);

  const handlePrev = useCallback(() => {
    if (validItems.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + validItems.length) % validItems.length);
  }, [validItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen]);

  if (validItems.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-white/10 bg-zinc-950 text-zinc-500">
        <ImageIcon className="h-8 w-8 text-zinc-600" />
      </div>
    );
  }

  const currentItem = validItems[currentIndex] || validItems[0];
  const isImage = currentItem.type === "image";

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* ── Main Media Display Stage ── */}
      <div className="relative h-64 sm:h-80 md:h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl group select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full flex items-center justify-center bg-black"
          >
            {isImage ? (
              <div className="relative h-full w-full">
                {/* Support both Cloudinary/external URLs and local seed paths */}
                <Image
                  src={currentItem.url}
                  alt={currentItem.caption || `${title} showcase - slide ${currentIndex + 1}`}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="object-contain md:object-cover transition-transform duration-700 group-hover:scale-103"
                  priority={currentIndex === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="h-full w-full">
                <ProjectVideoPlayer
                  videoUrl={currentItem.url}
                  title={`${title} Video Reel`}
                  className="h-full w-full"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Top Bar Badges & Counter ── */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/85 border border-white/15 text-[10px] font-extrabold uppercase tracking-wider text-violet-400 backdrop-blur-md shadow-lg">
              {currentItem.type === "video" ? (
                <>
                  <Film className="w-3 h-3 text-violet-400" />
                  <span>Cinematic Video Reel</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3 h-3 text-violet-400" />
                  <span>HQ Screenshot Preview</span>
                </>
              )}
            </span>

            {validItems.length > 1 && (
              <span className="px-2.5 py-1 rounded-full bg-black/75 border border-white/10 text-[10px] font-mono font-bold text-zinc-200 backdrop-blur-md">
                {currentIndex + 1} / {validItems.length}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-zinc-950/85 text-zinc-300 backdrop-blur-md transition hover:border-violet-500/50 hover:bg-violet-500 hover:text-zinc-950 shadow-md"
            title="Expand Fullscreen Lightbox"
          >
            <Maximize2 size={13} />
          </button>
        </div>

        {/* Caption Overlay (if provided) */}
        {currentItem.caption && (
          <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
            <div className="inline-block px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 text-xs text-zinc-200 backdrop-blur-md">
              {currentItem.caption}
            </div>
          </div>
        )}

        {/* ── Navigation Arrows ── */}
        {validItems.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-950/80 text-zinc-200 backdrop-blur-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-violet-500/50 hover:bg-violet-500 hover:text-zinc-950 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-950/80 text-zinc-200 backdrop-blur-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-violet-500/50 hover:bg-violet-500 hover:text-zinc-950 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnails Strip ── */}
      {validItems.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {validItems.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.45)] scale-105 z-10 brightness-100"
                    : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30 brightness-75 hover:brightness-100"
                }`}
              >
                {item.type === "image" ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-violet-400">
                    <Play size={16} fill="currentColor" />
                  </div>
                )}
                {item.type === "video" && (
                  <div className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-violet-500 flex items-center justify-center shadow">
                    <Play size={8} fill="currentColor" className="text-zinc-950" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Fullscreen Cinema Lightbox Modal ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8 select-none"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close / Controls */}
            <div className="absolute top-5 right-5 z-30 flex items-center gap-3">
              <span className="text-xs font-mono font-semibold text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-white/10">
                {currentIndex + 1} / {validItems.length}
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-zinc-900/90 text-white backdrop-blur-md transition hover:border-violet-400 hover:bg-violet-500 hover:text-zinc-950"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stage */}
            <div
              className="relative h-full w-full max-w-6xl max-h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {isImage ? (
                <div className="relative h-full w-full">
                  <Image
                    src={currentItem.url}
                    alt={title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              ) : (
                <div className="h-full w-full">
                  <ProjectVideoPlayer
                    videoUrl={currentItem.url}
                    title={title}
                    className="h-full w-full"
                  />
                </div>
              )}

              {/* Lightbox Nav */}
              {validItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-zinc-950/80 text-white backdrop-blur-md hover:bg-violet-500 hover:text-zinc-950 transition"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-zinc-950/80 text-white backdrop-blur-md hover:bg-violet-500 hover:text-zinc-950 transition"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
