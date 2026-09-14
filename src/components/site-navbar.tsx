"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import { Menu, X, Globe, Sun, Moon, ArrowLeft, ArrowRight } from "lucide-react";

const CEO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

export default function SiteNavbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = language === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/contact", label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const isLight = theme === "light";

  return (
    <header className="sticky top-0 z-50 px-4 pb-2 pt-4 md:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-theme-border bg-theme-bg/85 px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:px-6 transition-colors duration-300"
      >
        {/* Brand Logo — "حضور / Hodour" */}
        <Link
          href="/"
          className="flex items-center gap-2 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A] p-1"
          aria-label={language === "ar" ? "حضور - الصفحة الرئيسية" : "Hodour - Home"}
        >
          <span className="text-xl font-alexandria font-bold tracking-wide text-theme-primary group-hover:text-[#9F0F1F] dark:group-hover:text-white transition-colors">
            {language === "ar" ? "حضور" : "Hodour"}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D1A] animate-pulse" />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A] ${
                    isActive
                      ? "text-[#F2D3B1]"
                      : "text-theme-secondary/80 hover:text-theme-primary hover:bg-theme-card/40"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-xl bg-[#9F0F1F] shadow-[0_0_20px_rgba(159,15,31,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 430,
                        damping: 35,
                      }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Unified Header Controls — Guarantees exactly ONE Language & Theme button in the DOM */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 md:h-9 md:w-9 items-center justify-center rounded-xl border border-theme-border bg-theme-card text-theme-primary shadow-sm transition-colors hover:border-[#9F0F1F]/40 hover:bg-theme-surface/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
            aria-label={
              isLight
                ? language === "ar"
                  ? "التحويل للوضع الليلي"
                  : "Switch to Dark Mode"
                : language === "ar"
                ? "التحويل للوضع النهاري"
                : "Switch to Light Mode"
            }
            title={
              isLight
                ? language === "ar"
                  ? "الوضع الليلي"
                  : "Dark Mode"
                : language === "ar"
                ? "الوضع النهاري"
                : "Light Mode"
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLight ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4 text-[#9F0F1F]" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4 text-[#FF4D1A]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Language Switcher Pill (Single, strictly once in DOM) */}
          <button
            onClick={toggleLanguage}
            className="flex h-11 md:h-9 items-center gap-1.5 rounded-xl border border-theme-border bg-theme-card px-3 text-xs font-bold uppercase tracking-wider text-theme-primary shadow-sm transition-colors hover:border-[#9F0F1F]/40 hover:bg-[#9F0F1F]/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
            aria-label={
              language === "en" ? "تغيير اللغة إلى العربية" : "Switch language to English"
            }
          >
            <Globe className="w-4 h-4 text-[#9F0F1F] dark:text-[#FF4D1A]" />
            <span className="font-alexandria font-bold text-xs">{language === "en" ? "عربي" : "EN"}</span>
          </button>

          {/* Mobile Hamburger Toggle Button (Mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden h-11 w-11 items-center justify-center rounded-xl border border-theme-border bg-theme-card text-theme-primary backdrop-blur-md transition-colors active:scale-95 hover:border-[#9F0F1F]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-[#9F0F1F]" />
            ) : (
              <Menu className="w-5 h-5 text-theme-primary" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden mt-2 mx-auto w-full max-w-6xl rounded-3xl border border-theme-border bg-theme-card/95 shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
          >
            <div className="p-6 flex flex-col justify-between space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-theme-border">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9F0F1F]">
                  <span className="w-2 h-2 rounded-full bg-[#9F0F1F] animate-pulse" />
                  <span className="font-alexandria">
                    {language === "ar" ? "قائمة التنقل" : "Navigation"}
                  </span>
                </div>
                <span className="text-xs text-theme-muted font-alexandria">
                  {language === "ar" ? "حضور | Hodour" : "Hodour Agency"}
                </span>
              </div>

              {/* Navigation Links with 44px+ minimum height */}
              <ul className="flex flex-col space-y-1.5">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.08, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex min-h-[48px] items-center justify-between rounded-2xl px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A] ${
                          isActive
                            ? "bg-[#9F0F1F] text-[#F2D3B1] font-bold shadow-md"
                            : "text-theme-primary hover:bg-theme-surface/60 active:scale-[0.99]"
                        }`}
                      >
                        <span className="text-base font-medium font-alexandria tracking-wide">
                          {link.label}
                        </span>
                        {isActive ? (
                          <span className="h-2 w-2 rounded-full bg-[#F2D3B1] shadow-[0_0_10px_#F2D3B1]" />
                        ) : (
                          <Arrow className="w-4 h-4 text-theme-muted" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Quick WhatsApp Action (min-h 48px) */}
              <div className="pt-3 border-t border-theme-border flex flex-col space-y-3">
                <a
                  href={`https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(
                    language === "ar"
                      ? "أهلاً حضور، محتاج أعرف أكتر عن خدماتكم."
                      : "Hello Hodour, I'd like to learn more about your services."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#9F0F1F] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] shadow-[0_0_25px_rgba(159,15,31,0.3)] active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
                >
                  <span className="font-alexandria">
                    {language === "ar" ? "تواصل معنا مباشرة عبر واتساب" : "Chat on WhatsApp"}
                  </span>
                  <Arrow className="w-4 h-4 text-[#F2D3B1]" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
