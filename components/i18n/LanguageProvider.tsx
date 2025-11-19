"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "fr";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (map: { en: string; fr: string }) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Initialize language from localStorage or default to 'fr'
function getInitialLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const saved = localStorage.getItem("lang") as Lang | null;
  return (saved === "en" || saved === "fr") ? saved : "fr";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    // Sync with localStorage on mount in case it changed
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
    } else {
      // Set default to localStorage if not present
      localStorage.setItem("lang", "fr");
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  }, []);

  const t = useCallback(
    (map: { en: string; fr: string }) => {
      return lang === "fr" ? map.fr : map.en;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
