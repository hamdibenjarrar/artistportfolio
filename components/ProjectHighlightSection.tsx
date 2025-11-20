"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectHighlightSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const cta = ctaRef.current;

    if (!section || !quote || !cta) return;

    // GSAP entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(quote, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
      }).from(
        cta,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full min-h-[70vh] flex items-end justify-center overflow-hidden pb-16"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat scale-100"
          style={{ backgroundImage: "url(/book.jpg)" }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          {/* Quote */}
          <div ref={quoteRef}>
            <motion.blockquote
              className="font-display text-2xl md:text-3xl lg:text-4xl text-[#E6D8B4] mb-8 leading-relaxed italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {lang === "fr"
                ? "« Là où la mémoire devient lumière, une nouvelle page s'ouvre. »"
                : "« Where memory becomes light, a new page opens. »"}
            </motion.blockquote>
          </div>

          {/* CTA Button */}
          <div ref={ctaRef}>
            <Link href="/jardin-d-afrique">
              <motion.button
                className="
                  px-8 py-3 
                  bg-[#C9A86A] 
                  text-[#0a0a0a] 
                  font-heading 
                  text-base 
                  tracking-wide 
                  uppercase 
                  transition-all 
                  duration-300
                  hover:brightness-110
                  hover:scale-105
                  shadow-lg
                  hover:shadow-[0_0_30px_rgba(201,168,106,0.4)]
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {lang === "fr" ? "Découvrir" : "Discover"}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="w-full bg-[#0a0a0a] py-8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl h-px bg-linear-to-r from-transparent via-[#C9A86A] to-transparent"
        />
      </div>
    </>
  );
}
