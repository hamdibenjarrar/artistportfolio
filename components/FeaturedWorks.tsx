"use client";
import { useState, useRef } from "react";
import NextImage from "next/image";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";

type Artwork = {
  id: string;
  mainImage: string;
  detailImages: string[];
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
  dimensions: string;
};

const artworks: Artwork[] = [
  {
    id: "p1",
    mainImage: "/work/p1/p1.jpg",
    detailImages: ["/work/p1/detail/p1.detail1.jpg", "/work/p1/detail/p2.d2.jpg"],
    titleEn: "Intersected Circuit",
    titleFr: "Circuit Intersecté",
    descEn: "A minimalist exploration of geometric intersections, where linear pathways converge and diverge in architectural harmony.",
    descFr: "Une exploration minimaliste des intersections géométriques, où les voies linéaires convergent et divergent en harmonie architecturale.",
    dimensions: "40 × 60 cm"
  },
  {
    id: "p2",
    mainImage: "/work/p2/p2.jpg",
    detailImages: [
      "/work/p2/detail/IMG_8402_result.jpg",
      "/work/p2/detail/IMG_8404_result.jpg",
      "/work/p2/detail/IMG_8405_result.jpg",
      "/work/p2/detail/IMG_8406_result.jpg",
      "/work/p2/detail/IMG_8409_result.jpg"
    ],
    titleEn: "Silent Axis",
    titleFr: "Axe Silencieux",
    descEn: "Vertical and horizontal elements create a meditative balance, exploring the quietude found in perpendicular precision.",
    descFr: "Les éléments verticaux et horizontaux créent un équilibre méditatif, explorant la quiétude trouvée dans la précision perpendiculaire.",
    dimensions: "40 × 60 cm"
  },
  {
    id: "p3",
    mainImage: "/work/p3/p3.jpg",
    detailImages: [
      "/work/p3/detail/p3d1.jpg",
      "/work/p3/detail/p3d2.jpg",
      "/work/p3/detail/p3d3.jpg",
      "/work/p3/detail/p3d4.jpg",
      "/work/p3/detail/p3d5.jpg",
      "/work/p3/detail/p3d6.jpg"
    ],
    titleEn: "Layered Field",
    titleFr: "Champ Stratifié",
    descEn: "Overlapping planes and translucent forms evoke depth and spatial ambiguity in a constrained frame.",
    descFr: "Les plans superposés et les formes translucides évoquent la profondeur et l'ambiguïté spatiale dans un cadre contraint.",
    dimensions: "40 × 60 cm"
  },
  {
    id: "p4",
    mainImage: "/work/p4/IMG_8369_result.jpg",
    detailImages: [
      "/work/p4/detail/IMG_8341_result.jpg",
      "/work/p4/detail/IMG_8342_result.jpg",
      "/work/p4/detail/IMG_8343_result.jpg",
      "/work/p4/detail/IMG_8344_result.jpg",
      "/work/p4/detail/IMG_8346_result.jpg",
      "/work/p4/detail/IMG_8349_result.jpg"
    ],
    titleEn: "Fractal Transit",
    titleFr: "Transit Fractal",
    descEn: "Golden ratios and recursive patterns emerge from mathematical precision, celebrating the beauty of structured chaos.",
    descFr: "Les ratios d'or et les motifs récursifs émergent de la précision mathématique, célébrant la beauté du chaos structuré.",
    dimensions: "40 × 60 cm"
  },
  {
    id: "p5",
    mainImage: "/work/p5/p5.jpg",
    detailImages: [
      "/work/p5/detail/p5d1.jpg",
      "/work/p5/detail/p5d2.jpg",
      "/work/p5/detail/p5d3.jpg",
      "/work/p5/detail/p5d4.jpg",
      "/work/p5/detail/p5d5.jpg",
      "/work/p5/detail/p5d6.jpg"
    ],
    titleEn: "Measured Echo",
    titleFr: "Écho Mesuré",
    descEn: "Repetition with subtle variation creates rhythm and resonance, like architectural echoes across space.",
    descFr: "La répétition avec variation subtile crée rythme et résonance, comme des échos architecturaux à travers l'espace.",
    dimensions: "40 × 60 cm"
  },
  {
    id: "p6",
    mainImage: "/work/p6/p6.jpg",
    detailImages: [
      "/work/p6/detail/p6d1.jpg",
      "/work/p6/detail/p6d2.jpg",
      "/work/p6/detail/p6d3.jpg",
      "/work/p6/detail/p6d4.jpg",
      "/work/p6/detail/p6d5.jpg"
    ],
    titleEn: "Drifting Structure",
    titleFr: "Structure Flottante",
    descEn: "Rigid geometry meets organic flow, capturing the tension between order and movement.",
    descFr: "La géométrie rigide rencontre le flux organique, capturant la tension entre l'ordre et le mouvement.",
    dimensions: "40 × 60 cm"
  },
  {
    id: "p7",
    mainImage: "/work/p7/IMG_8209_result.jpg",
    detailImages: [
      "/work/p7/detail/IMG_8193_result.jpg",
      "/work/p7/detail/IMG_8196_result.jpg",
      "/work/p7/detail/IMG_8197_result.jpg",
      "/work/p7/detail/IMG_8200_result.jpg",
      "/work/p7/detail/IMG_8202_result.jpg",
      "/work/p7/detail/IMG_8203_result.jpg"
    ],
    titleEn: "Veiled Memory",
    titleFr: "Mémoire Voilée",
    descEn: "Obscured forms and layered transparencies invite interpretation, like fragments of remembered spaces.",
    descFr: "Les formes obscurcies et les transparences superposées invitent à l'interprétation, comme des fragments d'espaces mémorisés.",
    dimensions: "40 × 60 cm"
  },
  {
    id: "p8",
    mainImage: "/work/p8/IMG_8424_result.jpg",
    detailImages: [
      "/work/p8/detail/IMG_8426_result.jpg",
      "/work/p8/detail/IMG_8429_result.jpg",
      "/work/p8/detail/IMG_8431_result.jpg",
      "/work/p8/detail/IMG_8432_result.jpg",
      "/work/p8/detail/IMG_8435_result.jpg",
      "/work/p8/detail/IMG_8436_result.jpg"
    ],
    titleEn: "Ascendant Pulse",
    titleFr: "Pulsation Ascendante",
    descEn: "Rising elements and dynamic diagonals suggest upward motion and aspiration within stillness.",
    descFr: "Les éléments ascendants et les diagonales dynamiques suggèrent un mouvement ascendant et une aspiration dans l'immobilité.",
    dimensions: "40 × 60 cm"
  }
];

export function FeaturedWorks() {
  const { lang } = useLanguage();
  const [activeWork, setActiveWork] = useState<Artwork | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section className="relative py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#C9A86A] to-transparent"></div>
        
        <div className="mx-auto max-w-[1600px] px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {lang === 'fr' ? 'Œuvres Sélectionnées' : 'Featured Works'}
            </h2>
            <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">
              {lang === 'fr' 
                ? 'Une collection de pièces architecturales explorant la géométrie, l\'espace et le mouvement.'
                : 'A collection of architectural pieces exploring geometry, space, and movement.'}
            </p>
          </motion.div>

          <div 
            ref={scrollRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {artworks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setActiveWork(work)}
              >
                <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/10">
                  <NextImage
                    src={work.mainImage}
                    alt={lang === 'fr' ? work.titleFr : work.titleEn}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      <h3 className="text-white text-xs md:text-sm font-semibold line-clamp-2">
                        {lang === 'fr' ? work.titleFr : work.titleEn}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-white/90 text-xs md:text-sm font-medium mb-1">
                    {lang === 'fr' ? work.titleFr : work.titleEn}
                  </h3>
                  <p className="text-white/50 text-[10px] md:text-xs">{work.dimensions}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-medium text-emerald-400">
                      <span className="inline-block size-1.5 rounded-full bg-emerald-500"></span>
                      {lang === 'fr' ? 'Disponible' : 'Available'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#C9A86A] to-transparent opacity-50"></div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setActiveWork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl bg-[#1a1a1a] rounded-xl border-2 border-[#C9A86A]/30 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveWork(null)}
                className="absolute top-4 right-4 z-10 text-white/60 hover:text-white text-3xl bg-black/30 hover:bg-black/50 backdrop-blur rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                ×
              </button>

              <div className="flex flex-col md:flex-row max-h-[90vh]">
                {/* Left: Main Image */}
                <div className="md:w-1/2 bg-white p-6 md:p-8 flex items-center justify-center">
                  <div className="relative w-full aspect-2/3">
                    <NextImage
                      src={activeWork.mainImage}
                      alt={lang === 'fr' ? activeWork.titleFr : activeWork.titleEn}
                      fill
                      sizes="50vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right: Content + Detail Images */}
                <div className="md:w-1/2 p-6 md:p-8 bg-[#1a1a1a] text-white flex flex-col max-h-[90vh] overflow-y-auto">
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        {lang === 'fr' ? activeWork.titleFr : activeWork.titleEn}
                      </h2>

                      <p className="text-sm text-white/60 mb-4">{activeWork.dimensions}</p>

                      <p className="text-sm md:text-base leading-relaxed text-white/80 mb-6">
                        {lang === 'fr' ? activeWork.descFr : activeWork.descEn}
                      </p>

                      <div className="flex items-center gap-4 mb-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                          <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          {lang === 'fr' ? 'Disponible' : 'Available'}
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/21629123456?text=${encodeURIComponent(
                          (lang === 'fr' ? 'Intéressé par l\'œuvre: ' : 'Interested in artwork: ') +
                          (lang === 'fr' ? activeWork.titleFr : activeWork.titleEn)
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-[#C9A86A] text-white text-sm font-semibold rounded-lg hover:bg-[#B8976A] transition-colors duration-300"
                      >
                        {lang === 'fr' ? 'Contacter' : 'Contact'}
                      </a>

                      {/* Detail Images Gallery */}
                      {activeWork.detailImages.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-white/10">
                          <h3 className="text-sm font-semibold text-white/90 mb-3">
                            {lang === 'fr' ? 'Images détaillées' : 'Detail Images'}
                          </h3>
                          <div className="grid grid-cols-3 gap-2">
                            {activeWork.detailImages.map((detailImg, idx) => (
                              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/20 hover:border-[#C9A86A] transition-colors cursor-pointer group">
                                <NextImage
                                  src={detailImg}
                                  alt={`${lang === 'fr' ? 'Détail' : 'Detail'} ${idx + 1}`}
                                  fill
                                  sizes="150px"
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
