"use client";

import { useLanguage } from "./i18n/LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        aria-label="English"
        className={`px-2 py-1 rounded ${lang === "en" ? "bg-[#C9A86A] text-black" : "text-white/80 hover:text-white"}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span className="text-white/30">/</span>
      <button
        aria-label="Français"
        className={`px-2 py-1 rounded ${lang === "fr" ? "bg-[#C9A86A] text-black" : "text-white/80 hover:text-white"}`}
        onClick={() => setLang("fr")}
      >
        FR
      </button>
    </div>
  );
}
