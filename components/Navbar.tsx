"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./i18n/LanguageProvider";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: t({ en: "Home", fr: "Accueil" }) },
    { href: "/projects", label: t({ en: "Projects", fr: "Projets" }) },
    { href: "/contact", label: t({ en: "Contact", fr: "Contact" }) },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-backdrop-filter:bg-black/30 bg-black/70 border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-white tracking-wide font-semibold text-sm sm:text-base" aria-label="Yassine Radhouani">
          YASSINE RADHOUANI
        </Link>
        <div className="flex items-center gap-4">
          <button
            aria-label={t({ en: "Menu", fr: "Menu" })}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/40 transition"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="w-5 space-y-1">
              <span className={`block h-0.5 bg-current transition ${open ? 'translate-y-1.5 rotate-45' : ''}`}></span>
              <span className={`block h-0.5 bg-current transition ${open ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-current transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
            </div>
          </button>
          <ul className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium ${pathname === l.href ? "text-[#E6D8B4]" : "text-white/80 hover:text-white"}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>
      </nav>
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur border-t border-white/10">
          <ul className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-base font-medium block ${pathname === l.href ? "text-[#E6D8B4]" : "text-white/80 hover:text-white"}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
