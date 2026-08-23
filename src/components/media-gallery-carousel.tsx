"use client";

import { useState } from "react";
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
}

export function MediaGalleryCarousel({ items, title }: MediaGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex] || items[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="w-full space-y-3">
      {/* ── Main Media Display Container ── */}
      <div className="relative h-64 sm:h-80 md:h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full flex items-center justify-center bg-black"
          >
            {currentItem.type === "image" ? (
              <div className="relative h-full w-full">
                <Image
                  src={currentItem.url}
                  alt={`${title} media ${currentIndex + 1}`}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="h-full w-full">
                <ProjectVideoPlayer
                  videoUrl={currentItem.url}
                  title={`${title} Video`}
                  className="h-full w-full"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Top Bar Meta (Type Badge + Counter + Fullscreen Button) ── */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-violet-400 backdrop-blur-md shadow-lg">
              {currentItem.type === "video" ? (
                <>
                  <Film className="w-3 h-3 text-violet-400" />
                  <span>Video Reel</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3 h-3 text-violet-400" />
                  <span>Photo Showcase</span>
                </>
              )}
            </span>

            {items.length > 1 && (
              <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-zinc-300 backdrop-blur-md">
                {currentIndex + 1} / {items.length}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-zinc-300 backdrop-blur-md transition hover:border-violet-500/40 hover:text-white"
            title="Expand Fullscreen"
          >
            <Maximize2 size={13} />
          </button>
        </div>

        {/* ── Navigation Chevrons (Only if multiple media items) ── */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-zinc-200 backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500 hover:text-zinc-950 hover:shadow-[0_0_20px_rgba(139, 92, 246,0.5)]"
              aria-label="Previous Media"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-zinc-200 backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500 hover:text-zinc-950 hover:shadow-[0_0_20px_rgba(139, 92, 246,0.5)]"
              aria-label="Next Media"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnails Navigation Strip ── */}
      {items.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "border-violet-400 shadow-[0_0_15px_rgba(139, 92, 246,0.4)] scale-105 z-10"
                    : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
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
                  <div className="absolute top-1 right-1 h-3 w-3 rounded-full bg-violet-500/80 flex items-center justify-center">
                    <Play size={7} fill="currentColor" className="text-zinc-950" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Fullscreen Lightbox Modal ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-zinc-900/80 text-white backdrop-blur-md hover:border-violet-400"
            >
              <X size={20} />
            </button>

            <div
              className="relative h-full w-full max-w-5xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem.type === "image" ? (
                <div className="relative h-full w-full">
                  <Image
                    src={currentItem.url}
                    alt={title}
                    fill
                    className="object-contain"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
