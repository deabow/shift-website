"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { MagneticWrapper } from "./magnetic-wrapper";
import { Menu, X, Globe, ArrowRight, Sparkles } from "lucide-react";

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);



const CEO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

export default function SiteNavbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: t.nav.home, index: "01" },
    { href: "/about", label: t.nav.about, index: "02" },
    { href: "/services", label: t.nav.services, index: "03" },
    { href: "/portfolio", label: t.nav.portfolio, index: "04" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <header className="sticky top-0 z-50 px-4 pb-2 pt-4 md:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/80 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:px-6"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <span className="text-base font-extrabold tracking-[0.25em] text-zinc-100 group-hover:text-white transition-colors">
            SHIFT
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <ul className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-xl px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${isActive ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-xl bg-violet-400 shadow-[0_0_20px_rgba(139, 92, 246,0.5)]"
                      transition={{ type: "spring", stiffness: 430, damping: 35 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Controls (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <MagneticWrapper distanceMultiplier={0.25}>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-400 backdrop-blur-md transition hover:border-violet-500/40 hover:bg-violet-500/10"
            >
              <Globe className="w-3.5 h-3.5 text-violet-400" />
              <span>{language === "en" ? "عربي" : "EN"}</span>
            </button>
          </MagneticWrapper>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-3 text-zinc-400">
            <a
              href="https://www.facebook.com/profile.php?id=61591717865503"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-violet-400"
              aria-label="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
          </div>
        </div>

        {/* Mobile Header Right Controls: Language Pill + Animated Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-lg border border-white/15 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-bold uppercase text-violet-400 transition active:scale-95"
          >
            <Globe className="w-3 h-3 text-violet-400" />
            <span>{language === "en" ? "عربي" : "EN"}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-zinc-900/80 text-zinc-100 backdrop-blur-md transition active:scale-95 hover:border-violet-500/40"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-violet-400" /> : <Menu className="w-5 h-5 text-zinc-100" />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Curtain Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden mt-2 mx-auto w-full max-w-6xl rounded-3xl border border-white/[0.08] bg-zinc-950/95 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
          >
            <div className="p-6 flex flex-col justify-between space-y-6">
              {/* Top Cyber Status Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                  <span>Navigation System</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">SHIFT v2.4</span>
              </div>

              {/* Staggered Navigation Links */}
              <ul className="flex flex-col space-y-2">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between rounded-2xl p-3.5 transition-all ${isActive
                          ? "bg-violet-500/10 border border-violet-500/20 text-white font-bold"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-violet-400/50">
                            {link.index}
                          </span>
                          <span className="text-base tracking-wide">{link.label}</span>
                        </div>

                        {isActive ? (
                          <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_#8b5cf6]" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-zinc-600" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Bottom Drawer Actions: WhatsApp CTA + Social Icons */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col space-y-4">
                <a
                  href={`https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent("Hello SHIFT, I'm reaching out from your website.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-violet-500 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-950 shadow-[0_0_25px_rgba(139, 92, 246,0.4)] active:scale-[0.98] transition-transform"
                >
                  <span>Talk to SHIFT</span>
                  <ArrowRight className="w-4 h-4 text-zinc-950" />
                </a>

                <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1">
                  <span>Connect with us</span>
                  <div className="flex items-center gap-4 text-zinc-300">
                    <a
                      href="https://www.facebook.com/profile.php?id=61591717865503"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-violet-400 transition-colors"
                      aria-label="Facebook"
                    >
                      <FacebookIcon size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
