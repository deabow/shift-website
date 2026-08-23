"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

const Facebook = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function SiteFooter() {
  const { t, language } = useLanguage();

  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0a0a0a] py-8 z-10 relative">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
        <p className="text-sm text-zinc-400" dir={language === "ar" ? "rtl" : "ltr"}>
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=61591717865503"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/75 transition hover:text-violet-400"
          >
            <Facebook size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
