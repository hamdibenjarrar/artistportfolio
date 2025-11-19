"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function HeroModern() {
  const { lang, setLang } = useLanguage();
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden" aria-label="Hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/work/yas2.jpg"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/30 via-black/20 to-black/40"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20"></div>
      </div>

      {/* Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="absolute top-[60%] right-8 w-2 h-48 bg-linear-to-b from-[#C9A86A] to-transparent"
        ></motion.div>
      </div>

      {/* Language Toggle - Top Right - Smaller Size */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            aria-label="Language toggle"
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="group relative inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-[#C9A86A] to-[#E6D8B4] text-black font-bold text-xs tracking-wide uppercase hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-sm"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="flex items-center gap-1">
              <span className={`transition ${lang==='en'?'opacity-100':'opacity-60'}`}>EN</span>
              <span className="text-black/50">|</span>
              <span className={`transition ${lang==='fr'?'opacity-100':'opacity-60'}`}>FR</span>
            </span>
          </button>
        </motion.div>
      </div>

      {/* Content Container - Full height with bottom positioning */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end">
        
        {/* Desktop/Tablet Layout - Far Left Bottom Positioning */}
        <div className="hidden sm:block sm:absolute sm:left-12 md:left-16 lg:left-20 sm:bottom-16 md:bottom-20 lg:bottom-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-left w-[400px] md:w-[450px] lg:w-[500px]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight mb-4 md:mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-white via-[#C9A86A] to-white">
                YASSINE
              </span>
              <span className="block text-white" style={{ fontFamily: "var(--font-heading)" }}>
                RADHOUANI
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-3 mb-5 md:mb-6"
            >
              <div className="w-12 md:w-16 h-0.5 bg-linear-to-r from-[#C9A86A] to-[#E6D8B4]"></div>
              <p className="text-base md:text-lg lg:text-xl font-light tracking-widest uppercase text-[#C9A86A]" style={{ fontFamily: "var(--font-heading)" }}>
                ARTIST
              </p>
              <div className="w-12 md:w-16 h-0.5 bg-linear-to-r from-[#E6D8B4] to-[#C9A86A]"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="max-w-md text-base md:text-lg font-bold leading-relaxed text-transparent bg-clip-text bg-linear-to-r from-[#C9A86A] via-white to-[#E6D8B4]" 
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {lang === 'fr' ? 
                'Créant des œuvres qui explorent l\'intersection entre géométrie, espace et mouvement humain à travers l\'architecture et l\'art contemporain.' :
                'Creating works that explore the intersection of geometry, space, and human movement through architecture and contemporary art.'
              }
            </motion.p>
          </motion.div>
        </div>

        {/* Mobile Layout - Bottom positioning with larger text */}
        <div className="sm:hidden pb-20 px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-left"
          >
            <h1 
              className="text-5xl font-black tracking-tight leading-none mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-white via-[#C9A86A] to-white">
                YASSINE
              </span>
              <span className="block text-white" style={{ fontFamily: "var(--font-heading)" }}>
                RADHOUANI
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="h-1 bg-linear-to-r from-[#C9A86A] to-[#E6D8B4]"
              />
              <h2 
                className="text-lg font-light tracking-[0.15em] uppercase text-[#C9A86A]" 
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ARTIST
              </h2>
            </motion.div>

            <p 
              className="text-lg font-bold leading-relaxed max-w-md text-transparent bg-clip-text bg-linear-to-r from-[#C9A86A] via-white to-[#E6D8B4]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {lang === 'fr' ? 
                'Créant des œuvres qui explorent l\'intersection entre géométrie, espace et mouvement humain à travers l\'architecture et l\'art contemporain.' :
                'Creating works that explore the intersection of geometry, space, and human movement through architecture and contemporary art.'
              }
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
