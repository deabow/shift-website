"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import { MagneticWrapper } from "./magnetic-wrapper";
import { Menu, X, Globe, ArrowRight, Sun, Moon } from "lucide-react";

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const DEBO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

export default function SiteNavbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
        className="relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-black/10 dark:border-white/[0.08] bg-white/80 dark:bg-zinc-950/80 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:px-6 transition-colors duration-300"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <span className="text-base font-extrabold tracking-[0.25em] text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
            SHIFT
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <ul className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-xl px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                    isActive ? "text-zinc-950 dark:text-zinc-950 font-extrabold" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-xl bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
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
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <MagneticWrapper distanceMultiplier={0.25}>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/60 text-zinc-700 dark:text-emerald-400 backdrop-blur-md transition hover:border-emerald-500/40 hover:text-emerald-500"
              aria-label="Toggle Theme"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun size={16} className="text-emerald-400" /> : <Moon size={16} className="text-zinc-700" />}
            </button>
          </MagneticWrapper>

          {/* Language Toggle Button */}
          <MagneticWrapper distanceMultiplier={0.25}>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 backdrop-blur-md transition hover:border-emerald-500/40 hover:bg-emerald-500/10"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === "en" ? "عربي" : "EN"}</span>
            </button>
          </MagneticWrapper>

          <div className="h-4 w-px bg-black/10 dark:bg-white/10" />

          <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
            <a
              href="https://www.facebook.com/profile.php?id=61591717865503"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-emerald-500"
              aria-label="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
          </div>
        </div>

        {/* Mobile Header Right Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-emerald-400 transition active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={15} className="text-emerald-400" /> : <Moon size={15} className="text-zinc-700" />}
          </button>

          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-lg border border-black/10 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900/80 px-2.5 py-1 text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 transition active:scale-95"
          >
            <Globe className="w-3 h-3 text-emerald-500" />
            <span>{language === "en" ? "عربي" : "EN"}</span>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 backdrop-blur-md transition active:scale-95 hover:border-emerald-500/40"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-emerald-500" /> : <Menu className="w-5 h-5 text-zinc-800 dark:text-zinc-100" />}
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 w-full max-w-6xl overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        isActive ? "text-emerald-500 font-extrabold" : "text-zinc-700 dark:text-zinc-300 hover:text-emerald-500"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-[10px] font-mono text-zinc-400">{link.index}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col gap-4">
              <a
                href={`https://wa.me/${DEBO_WHATSAPP}?text=${encodeURIComponent("أهلاً ديبو 👋 حابب استفسر عن خدمات SHIFT")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-xs font-bold text-zinc-950 uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 transition"
              >
                <span>Talk with Debo (CTO)</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </a>

              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                <span>Connect with us</span>
                <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
                  <a
                    href="https://www.facebook.com/profile.php?id=61591717865503"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-emerald-500 transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
