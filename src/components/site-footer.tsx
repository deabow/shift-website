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
    <footer className="mt-20 border-t border-theme-border bg-theme-card/60 backdrop-blur-md py-14 z-10 relative transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F] rounded-lg w-fit p-1"
            >
              <span className="text-2xl font-changa font-bold text-theme-primary group-hover:text-[#9F0F1F] transition-colors">
                {language === "ar" ? "حضور" : "Hodour"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D1A] animate-pulse" />
            </Link>
            <p className="text-sm text-theme-secondary/80 max-w-xs leading-relaxed font-tajawal">
              {language === "ar"
                ? "شركة إعلانات وتسويق وإنتاج إعلامي متكاملة في مصر. بنبني لك حضور حقيقي ومكانة راسخة في السوق."
                : "A full-service advertising, marketing, and media production agency in Egypt. We build your real market presence."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-theme-primary mb-4 font-changa uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-theme-secondary/80 hover:text-[#9F0F1F] transition-colors font-tajawal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F] rounded p-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Follow */}
          <div>
            <h4 className="text-sm font-bold text-theme-primary mb-4 font-changa uppercase tracking-wider">
              {t.footer.followUs}
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61591717865503"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-theme-border bg-theme-surface text-theme-primary transition hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F]"
                aria-label="صفحة حضور على فيسبوك"
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
        <div className="mt-12 pt-6 border-t border-theme-border flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-xs text-theme-muted font-tajawal">
            © {new Date().getFullYear()} Hodour حضور. {t.footer.rights}
          </p>
          <p className="text-xs text-theme-muted font-tajawal">
            {language === "ar"
              ? "صُنع بـ ❤️ في مصر"
              : "Made with ❤️ in Egypt"}
          </p>
        </div>
      </div>
    </footer>
  );
}
