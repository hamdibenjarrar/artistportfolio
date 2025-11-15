"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./i18n/LanguageProvider";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 60]); // slow parallax
  const [dividerVisible, setDividerVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setDividerVisible(true);
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[90vh] w-full overflow-hidden" aria-label="Hero">
      {/* Background image preloaded */}
      <Image src="/work/yassine1.jpg" alt="Yassine portrait preload" width={1200} height={1600} priority className="hidden" />
      <div className="absolute inset-0 -z-10">
        <Image src="/work/yassine1.jpg" alt="Yassine Radhouani" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-transparent" />
      </div>

      <motion.div
        style={{ y }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl px-6 pt-[22vh] pb-[10vh] flex flex-col md:flex-row gap-12"
      >
        {/* Circular / geometric portrait */}
        <div className="shrink-0 w-56 h-56 md:w-72 md:h-72 rounded-full ring-2 ring-[#C9A86A]/70 overflow-hidden relative">
          <Image src="/work/yassine1.jpg" alt="Portrait of Yassine Radhouani" fill sizes="(min-width:768px) 18rem, 14rem" className="object-cover" priority />
        </div>
        {/* Text block */}
        <div className="flex flex-col justify-end md:pb-8 max-w-xl">
          <h1 className={`divider-line ${dividerVisible ? "is-visible" : ""} text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight`}>{t({ en: "Architect & Artist", fr: "Architecte & Artiste" })}</h1>
          <p className="mt-6 text-lg sm:text-xl text-[#E6D8B4] max-w-prose">
            {t({ en: "Yassine Radhouani — Where architecture becomes art.", fr: "Yassine Radhouani — Là où l’architecture devient art." })}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
