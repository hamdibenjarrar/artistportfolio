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
          <Image src="/work/book.jpeg" alt="" fill className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90"></div>
      </div>
      
      {/* About Section - New Story */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative pt-12 md:pt-20 pb-8 md:pb-12"
      >
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tight mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C9A86A] to-[#E6D8B4]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lang==='fr'?'À propos':'About'}
          </motion.h2>
          
          <div className="space-y-6 md:space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-base md:text-xl leading-relaxed font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C9A86A] via-white to-[#E6D8B4]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {lang==='fr'?
                'Né en 1981 entre Gabès et El Kef, le regard s\'est forgé dans un univers de contrastes : le relief du Nord, la lumière du Sud. Le scoutisme a marqué l\'enfance : apprendre à écouter, à fabriquer, à créer avec les mains et à travailler en équipe. C\'est là que la curiosité pour la matière a commencé.'
                :
                'Born in 1981 between Gabès and El Kef, vision was forged in a universe of contrasts: the relief of the North, the light of the South. Scouting marked childhood: learning to listen, to build, to create with hands, and to work as a team. That\'s where curiosity for materials began.'
              }
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-base md:text-xl leading-relaxed font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E6D8B4] via-white to-[#C9A86A]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {lang==='fr'?
                'L\'adolescence a pris des couleurs nouvelles : dessins, ateliers, culture visuelle… jusqu\'à ce que la Russie ouvre un autre chapitre — un pays de culture, d\'art et de musique qui a profondément affiné son sens du rythme visuel, de la précision et de l\'espace.'
                :
                'Adolescence took on new colors: drawings, workshops, visual culture... until Russia opened another chapter—a country of culture, art, and music that profoundly refined the sense of visual rhythm, precision, and space.'
              }
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-1 w-32 md:w-48 bg-gradient-to-r from-[#C9A86A] to-[#E6D8B4]"
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-base md:text-xl leading-relaxed font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C9A86A] to-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {lang==='fr'?
                'Les années ont façonné une sensibilité particulière : une manière de donner une voix aux matériaux, de faire respirer les formes, de chercher la poésie dans la construction. Certains projets ont d\'ailleurs reçu une reconnaissance internationale, notamment un travail ayant figuré parmi les références saluées par la Directrice générale de l\'UNESCO, Audrey Azoulay, ainsi que par la Fondation Aga Khan en 2022.'
                :
                'The years have shaped a particular sensitivity: a way of giving voice to materials, making forms breathe, seeking poetry in construction. Some projects have received international recognition, notably work featured among the references praised by UNESCO Director-General Audrey Azoulay, as well as by the Aga Khan Foundation in 2022.'
              }
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="text-lg md:text-2xl font-black leading-relaxed text-[#C9A86A] italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang==='fr'?
                'Chaque création porte la même intention : transformer un lieu en expérience, et une vision en émotion. Le reste se découvre dans les projets.'
                :
                'Each creation carries the same intention: transforming a place into an experience, and a vision into emotion. The rest is discovered in the projects.'
              }
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-[#C9A86A]/30"
            >
              <div>
                <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#C9A86A] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {lang==='fr'?'Localisation':'Location'}
                </h3>
                <p className="text-sm md:text-base text-white/90 font-medium">Bab Bhar, Tunis</p>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#C9A86A] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {lang==='fr'?'Formation':'Education'}
                </h3>
                <p className="text-sm md:text-base text-white/90 font-medium">
                  {lang==='fr'?'École d\'Architecture de Nijni Novgorod, Russie':'École d\'Architecture de Nijni Novgorod, Russia'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Let's Collaborate */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative py-12 md:py-16 text-center border-t border-[#C9A86A]/20"
      >
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#C9A86A] via-white to-[#E6D8B4]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {lang==='fr'?'Collaborons':"Let's collaborate"}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-sm md:text-lg font-semibold text-white/80 max-w-2xl mx-auto px-6 mb-8 md:mb-12"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {lang==='fr'?'Prêt à explorer de nouveaux espaces et idées ?':'Ready to explore new spaces and ideas?'}
        </motion.p>
        <motion.div 
          className="flex items-center justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="https://www.instagram.com/yassine.radhouani" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram" 
            className="group"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="size-14 md:size-20 rounded-full border-2 border-[#C9A86A]/60 flex items-center justify-center group-hover:border-[#C9A86A] group-hover:bg-[#C9A86A]/10 transition-all duration-300">
              <svg className="size-6 md:size-10 text-[#C9A86A] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
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
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="size-14 md:size-20 rounded-full border-2 border-[#C9A86A]/60 flex items-center justify-center group-hover:border-[#C9A86A] group-hover:bg-[#C9A86A]/10 transition-all duration-300">
              <svg className="size-6 md:size-10 text-[#C9A86A] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
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
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="size-14 md:size-20 rounded-full border-2 border-[#C9A86A]/60 flex items-center justify-center group-hover:border-[#C9A86A] group-hover:bg-[#C9A86A]/10 transition-all duration-300">
              <svg className="size-6 md:size-10 text-[#C9A86A] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12 0C5.36 0 0 5.36 0 12c0 2.1.55 4.05 1.52 5.76L0 24l6.39-1.67A11.86 11.86 0 0 0 12 24c6.64 0 12-5.36 12-12 0-3.17-1.28-6.05-3.48-8.52zM12 21.5c-1.8 0-3.48-.48-4.95-1.36l-.35-.2-3.79.99 1.01-3.69-.23-.38A9.58 9.58 0 0 1 2.5 12C2.5 6.9 6.9 2.5 12 2.5S21.5 6.9 21.5 12 17.1 21.5 12 21.5zm5.02-6.78c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.15-1.35-.79-.7-1.32-1.56-1.47-1.82-.16-.27-.02-.41.11-.53.12-.11.27-.29.41-.43.14-.14.18-.23.27-.38.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.83-2.01-.22-.52-.44-.45-.61-.45h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26 0 1.33.97 2.6 1.11 2.78.14.18 1.9 2.9 4.63 4.06 2.73 1.16 2.73.78 3.22.74.5-.05 1.6-.65 1.83-1.29.23-.63.23-1.18.16-1.29-.07-.11-.25-.18-.52-.3z"/>
              </svg>
            </div>
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Copyright */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-6 md:py-8 text-center text-xs md:text-sm font-semibold text-[#C9A86A]/70 border-t border-[#C9A86A]/20"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        © {new Date().getFullYear()} Yassine Radhouani. {lang==='fr'?'Tous droits réservés':'All rights reserved'}.
      </motion.div>
    </footer>
  );
}
