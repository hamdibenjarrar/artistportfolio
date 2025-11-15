"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "fr";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (map: { en: string; fr: string }) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "en" || saved === "fr") {
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => setLangState(saved), 0);
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
