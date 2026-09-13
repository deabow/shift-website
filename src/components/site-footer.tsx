"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function SiteFooter() {
  const { t, language } = useLanguage();

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="mt-16 border-t border-[#F2D3B1]/10 bg-[#0B0B0C] py-12 z-10 relative">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-changa font-bold text-[#F2D3B1]">
                {language === "ar" ? "حضور" : "Hodour"}
              </span>
            </Link>
            <p className="text-sm text-[#F2D3B1]/50 max-w-xs leading-relaxed">
              {language === "ar"
                ? "شركة إعلانات وتسويق متكاملة في مصر. بنبني لك حضور حقيقي في السوق."
                : "A full-service advertising and marketing company in Egypt. We build your real market presence."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#F2D3B1] mb-4 font-changa">
              {t.footer.quickLinks}
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F2D3B1]/50 hover:text-[#F2D3B1] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Follow */}
          <div>
            <h4 className="text-sm font-bold text-[#F2D3B1] mb-4 font-changa">
              {t.footer.followUs}
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61591717865503"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F2D3B1]/10 bg-[#2E2A29]/40 text-[#F2D3B1]/60 transition hover:text-[#F2D3B1] hover:border-[#9F0F1F]/30 hover:bg-[#9F0F1F]/10"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#F2D3B1]/[0.06] flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-xs text-[#F2D3B1]/40">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <p className="text-xs text-[#F2D3B1]/25">
            {language === "ar"
              ? "صُنع بـ ❤️ في مصر"
              : "Made with ❤️ in Egypt"}
          </p>
        </div>
      </div>
    </footer>
  );
}
