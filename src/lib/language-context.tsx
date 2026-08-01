"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "@/i18n/en";
import { ar } from "@/i18n/ar";

type Language = "en" | "ar";
type Dictionary = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage = "en",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    // Sync document HTML attributes on mount
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Persist to Cookies for Server-Side Rendering (SSR)
    document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    // Sync localStorage
    try {
      localStorage.setItem("language", lang);
    } catch {
      // Ignore if unavailable
    }
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = language === "ar" ? ar : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

