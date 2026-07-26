"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { MagneticWrapper } from "./magnetic-wrapper";

const Facebook = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function SiteNavbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
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
        className="relative mx-auto flex w-full max-w-6xl flex-col md:flex-row items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.45)] backdrop-blur-xl md:px-6 gap-3 md:gap-0"
      >
        <div className="flex w-full items-center justify-between md:w-auto md:justify-start">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.25em] text-white md:text-base"
          >
            SHIFT
          </Link>
          
          {/* Mobile Language Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center rounded-lg border border-white/20 px-2 py-1 text-[10px] font-bold uppercase transition hover:bg-white/10 hover:text-emerald-400"
            >
              {language === "en" ? "عربي" : "EN"}
            </button>
          </div>
        </div>

        <ul className="flex w-full flex-wrap items-center justify-center gap-1 sm:gap-2 md:absolute md:left-1/2 md:-translate-x-1/2 md:w-auto md:flex-nowrap">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-lg px-2 py-1.5 text-[11px] transition-colors sm:px-3 sm:py-1.5 sm:text-sm ${
                    isActive ? "text-white" : "text-white/75 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-[#8B5CF6]/25"
                      transition={{ type: "spring", stiffness: 430, damping: 35 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden md:flex ml-auto items-center gap-4">
          <MagneticWrapper>
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center rounded-lg border border-white/20 px-2 py-1 text-xs font-bold uppercase transition hover:bg-white/10 hover:text-emerald-400"
            >
              {language === "en" ? "عربي" : "EN"}
            </button>
          </MagneticWrapper>
          
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61591717865503"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 transition hover:text-[#8B5CF6]"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 transition hover:text-[#8B5CF6]"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
