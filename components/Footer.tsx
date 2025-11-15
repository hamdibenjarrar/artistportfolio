"use client";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Footer() {
  const { lang } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative text-white overflow-visible">
      {/* Background Image for Entire Footer */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image src="/work/yas2.jpg" alt="" fill className="object-cover object-[center_30%]" />
        </div>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative pt-6 md:pt-12 pb-3 md:pb-6"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-xl">
            <h2 className="text-lg md:text-2xl font-semibold tracking-tight mb-2 md:mb-3">{lang==='fr'?'À propos':'About'}</h2>
            <p className="text-[11px] md:text-sm leading-relaxed text-white/85 mb-3 md:mb-4">
              {lang==='fr'?
                'Né en Tunisie, diplômé de l\'École d\'Architecture de Nijni Novgorod en Russie, Yassine Radhouani est un architecte et artiste indépendant reliant espace, géométrie et mouvement humain.'
                :
                'Born in Tunisia, educated at the École d\'Architecture de Nijni Novgorod in Russia, Yassine Radhouani is an independent architect and artist bridging space, geometry, and human movement.'
              }
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 text-[11px] md:text-sm">
              <div>
                <h3 className="text-[9px] md:text-xs font-semibold tracking-widest uppercase text-[#C9A86A] mb-0.5 md:mb-1">{lang==='fr'?'Localisation':'Location'}</h3>
                <p className="text-white/85">Bab Bhar, Tunis</p>
              </div>
              <div>
                <h3 className="text-[9px] md:text-xs font-semibold tracking-widest uppercase text-[#C9A86A] mb-0.5 md:mb-1">{lang==='fr'?'Formation':'Education'}</h3>
                <p className="text-white/85">{lang==='fr'?'École d\'Architecture de Nijni Novgorod, Russie':'École d\'Architecture de Nijni Novgorod, Russia'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Let's Collaborate */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative py-8 md:py-12 lg:py-16 text-center"
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 md:mb-3">{lang==='fr'?'Collaborons':"Let's collaborate"}</h2>
        <p className="text-xs md:text-base text-white/70 max-w-xl mx-auto px-4 md:px-6 mb-6 md:mb-8">
          {lang==='fr'?'Prêt à explorer de nouveaux espaces et idées ?':'Ready to explore new spaces and ideas?'}
        </p>
        <motion.div 
          className="flex items-center justify-center gap-5 md:gap-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="https://www.instagram.com/yassine.radhouani" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram" 
            className="group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="size-11 md:size-14 lg:size-16 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-[#C9A86A] transition duration-300">
              <svg className="size-5 md:size-7 text-white/80 group-hover:text-[#C9A86A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>
              </svg>
            </div>
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/yassine-radhouani" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn" 
            className="group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="size-11 md:size-14 lg:size-16 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-[#C9A86A] transition duration-300">
              <svg className="size-5 md:size-7 text-white/80 group-hover:text-[#C9A86A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.06c.53-1 1.84-2.2 3.78-2.2 4.04 0 4.79 2.62 4.79 6.02V24h-4v-7.1c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.74 1.85-2.74 3.76V24h-4V8z"/>
              </svg>
            </div>
          </motion.a>
          <motion.a 
            href="https://wa.me/21629123456" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="WhatsApp" 
            className="group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="size-11 md:size-14 lg:size-16 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-[#C9A86A] transition duration-300">
              <svg className="size-5 md:size-7 text-white/80 group-hover:text-[#C9A86A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12 0C5.36 0 0 5.36 0 12c0 2.1.55 4.05 1.52 5.76L0 24l6.39-1.67A11.86 11.86 0 0 0 12 24c6.64 0 12-5.36 12-12 0-3.17-1.28-6.05-3.48-8.52zM12 21.5c-1.8 0-3.48-.48-4.95-1.36l-.35-.2-3.79.99 1.01-3.69-.23-.38A9.58 9.58 0 0 1 2.5 12C2.5 6.9 6.9 2.5 12 2.5S21.5 6.9 21.5 12 17.1 21.5 12 21.5zm5.02-6.78c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.15-1.35-.79-.7-1.32-1.56-1.47-1.82-.16-.27-.02-.41.11-.53.12-.11.27-.29.41-.43.14-.14.18-.23.27-.38.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.83-2.01-.22-.52-.44-.45-.61-.45h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26 0 1.33.97 2.6 1.11 2.78.14.18 1.9 2.9 4.63 4.06 2.73 1.16 2.73.78 3.22.74.5-.05 1.6-.65 1.83-1.29.23-.63.23-1.18.16-1.29-.07-.11-.25-.18-.52-.3z"/>
              </svg>
            </div>
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Copyright */}
      <div className="relative py-3 md:py-4 text-center text-[10px] md:text-xs text-white/50 border-t border-white/10">
        © {new Date().getFullYear()} Yassine Radhouani. {lang==='fr'?'Tous droits réservés':'All rights reserved'}.
      </div>
    </footer>
  );
}
