"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Menu, X, Globe, ArrowLeft, ArrowRight } from "lucide-react";

const CEO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

export default function SiteNavbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
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

  return (
    <header className="sticky top-0 z-50 px-4 pb-2 pt-4 md:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C]/85 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:px-6"
      >
        {/* Brand Logo — Text-based "حضور" */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-changa font-bold tracking-wide text-[#F2D3B1] group-hover:text-white transition-colors">
            {language === "ar" ? "حضور" : "Hodour"}
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-xl px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                    isActive
                      ? "text-[#0B0B0C]"
                      : "text-[#F2D3B1]/60 hover:text-[#F2D3B1]"
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

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-xl border border-[#F2D3B1]/10 bg-[#2E2A29]/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F2D3B1] backdrop-blur-md transition hover:border-[#9F0F1F]/40 hover:bg-[#9F0F1F]/10"
          >
            <Globe className="w-3.5 h-3.5 text-[#F2D3B1]" />
            <span>{language === "en" ? "عربي" : "EN"}</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-lg border border-[#F2D3B1]/15 bg-[#2E2A29]/80 px-2.5 py-1 text-[11px] font-bold uppercase text-[#F2D3B1] transition active:scale-95"
          >
            <Globe className="w-3 h-3 text-[#F2D3B1]" />
            <span>{language === "en" ? "عربي" : "EN"}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F2D3B1]/15 bg-[#2E2A29]/80 text-[#F2D3B1] backdrop-blur-md transition active:scale-95 hover:border-[#9F0F1F]/40"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-[#9F0F1F]" />
            ) : (
              <Menu className="w-5 h-5 text-[#F2D3B1]" />
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
            className="md:hidden overflow-hidden mt-2 mx-auto w-full max-w-6xl rounded-3xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C]/95 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
          >
            <div className="p-6 flex flex-col justify-between space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F2D3B1]/[0.06]">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9F0F1F]">
                  <span className="w-2 h-2 rounded-full bg-[#9F0F1F] animate-pulse" />
                  <span className="font-changa">
                    {language === "ar" ? "القائمة" : "Menu"}
                  </span>
                </div>
              </div>

              {/* Links */}
              <ul className="flex flex-col space-y-2">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between rounded-2xl p-3.5 transition-all ${
                          isActive
                            ? "bg-[#9F0F1F]/10 border border-[#9F0F1F]/20 text-[#F2D3B1] font-bold"
                            : "text-[#F2D3B1]/60 hover:text-[#F2D3B1] hover:bg-[#F2D3B1]/[0.04]"
                        }`}
                      >
                        <span className="text-base tracking-wide">
                          {link.label}
                        </span>
                        {isActive ? (
                          <span className="h-2 w-2 rounded-full bg-[#9F0F1F] shadow-[0_0_10px_#9F0F1F]" />
                        ) : (
                          <Arrow className="w-4 h-4 text-[#F2D3B1]/30" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* CTA */}
              <div className="pt-4 border-t border-[#F2D3B1]/[0.06] flex flex-col space-y-4">
                <a
                  href={`https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(
                    language === "ar"
                      ? "أهلاً حضور، محتاج أعرف أكتر عن خدماتكم."
                      : "Hello Hodour, I'd like to learn more about your services."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#9F0F1F] py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] shadow-[0_0_25px_rgba(159,15,31,0.3)] active:scale-[0.98] transition-transform"
                >
                  <span>
                    {language === "ar" ? "كلمنا على واتساب" : "Talk to Hodour"}
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
