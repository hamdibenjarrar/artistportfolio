"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function HeroModern() {
  const { lang, setLang } = useLanguage();
  return (
    <section className="relative pt-12 pb-16 bg-white text-[#111] overflow-hidden" aria-label="Hero">
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] select-none" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gridStroke" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#C9A86A" />
              <stop offset="100%" stopColor="#E6D8B4" />
            </linearGradient>
          </defs>
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" x2="100%" y1={i*32} y2={i*32} stroke="url(#gridStroke)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`v-${i}`} y1="0" y2="100%" x1={i*64} x2={i*64} stroke="url(#gridStroke)" strokeWidth="0.5" />
          ))}
        </svg>
      </div>
      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg mb-10 before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_30%_30%,#E6D8B4_0%,#fff_55%,transparent_70%)] before:opacity-70"
        >
          <Image
            src="/work/yas1.jpg"
            alt="Portrait of Yassine Radhouani"
            fill
            priority
            sizes="(min-width:768px) 16rem, 14rem"
            className="object-cover"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Yassine Radhouani
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          className="mt-3 text-lg font-medium text-[#333]"
        >
          {lang === 'fr' ? 'Architecte & Peintre' : 'Architect & Art Painter'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
          className="mt-5 flex items-center gap-3"
        >
          <button
            aria-label="Language toggle"
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="group relative inline-flex items-center rounded-full border border-[#E6D8B4] bg-white/70 backdrop-blur px-3 py-1 text-[11px] font-medium text-[#111] shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#C9A86A]"
          >
            <span className="flex items-center gap-1">
              <span className={`transition ${lang==='en'?'font-semibold text-[#111]':'text-[#666]'}`}>EN</span>
              <span className="text-[#aaa]">/</span>
              <span className={`transition ${lang==='fr'?'font-semibold text-[#111]':'text-[#666]'}`}>FR</span>
            </span>
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_20%,#fff,transparent_70%)] opacity-0 group-hover:opacity-100 transition" />
          </button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="mt-5 max-w-2xl text-sm leading-relaxed text-[#444]"
        >
          {lang==='fr' ? 'Architecte et peintre tunisien explorant les intersections entre structure lumineuse et matérialité poétique. Chaque œuvre cherche un équilibre entre espace, texture et silence contemplatif.' : 'Tunisian architect and painter exploring intersections of luminous structure and poetic materiality. Each work seeks equilibrium between space, texture, and contemplative silence.'}
        </motion.p>
      </div>
    </section>
  );
}
