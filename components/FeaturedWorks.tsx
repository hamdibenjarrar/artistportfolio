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
  medium?: string;
  collection?: string;
};

const artworks: Artwork[] = [
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
    titleEn: "Melodic Resonance",
    titleFr: "Résonance Mélodique",
    descEn: "An exploration of chromatic vibrations where color sings across the canvas. Inspired by the phrase 'It's with you that I want to sing,' this work captures the harmony between presence and expression, transforming emotion into visual rhythm.",
    descFr: "Une exploration des vibrations chromatiques où la couleur chante à travers la toile. Inspirée par la phrase 'C'est avec toi que je veux chanter', cette œuvre capture l'harmonie entre présence et expression, transformant l'émotion en rythme visuel.",
    dimensions: "100 × 130 cm",
    medium: "Acrylique sur toile"
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
    titleEn: "The Craziest Journey",
    titleFr: "Odyssée Intérieure",
    descEn: "A visual journey through abstract landscapes and shifting forms. This piece embodies the unpredictable path of artistic exploration, where structure dissolves into movement and discovery unfolds in layers of color and gesture.",
    descFr: "Un voyage visuel à travers des paysages abstraits et des formes mouvantes. Cette pièce incarne le chemin imprévisible de l'exploration artistique, où la structure se dissout dans le mouvement et la découverte se déploie en couches de couleur et de geste.",
    dimensions: "83 × 83 cm",
    medium: "Acrylique sur bois"
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
    titleEn: "Tribute to Hédi Habouba",
    titleFr: "Hommage au Roi Hédi Habouba",
    descEn: "A portrait that transcends representation to capture the spirit of Tunisian musical heritage. Through layered textures and vibrant tones, this work celebrates the legendary musician Hédi Habouba, transforming sound into visual poetry.",
    descFr: "Un portrait qui transcende la représentation pour capturer l'esprit du patrimoine musical tunisien. À travers des textures superposées et des tons vibrants, cette œuvre célèbre le légendaire musicien Hédi Habouba, transformant le son en poésie visuelle.",
    dimensions: "130 × 90 cm",
    medium: "Acrylique sur toile"
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
    titleEn: "The Soul of Days I",
    titleFr: "L'Âme des Jours I",
    descEn: "First piece of the trilogy 'The Soul of Days.' Arabic calligraphy of the word 'days' dissolves into abstract form, exploring the passage of time through gestural marks. Each stroke carries memory, each layer holds a moment suspended.",
    descFr: "Première pièce de la trilogie 'L'Âme des Jours'. La calligraphie arabe du mot 'jours' se dissout en forme abstraite, explorant le passage du temps à travers des marques gestuelles. Chaque trait porte la mémoire, chaque couche retient un instant suspendu.",
    dimensions: "83 × 83 cm",
    medium: "Acrylique sur bois",
    collection: "L'âme des jours"
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
    titleEn: "The Soul of Days II",
    titleFr: "L'Âme des Jours II",
    descEn: "Second piece of the trilogy. A refined interpretation of the same calligraphic theme, where delicate lines and subtle variations speak to the fragility and beauty of everyday existence. The writing becomes breath, the form becomes presence.",
    descFr: "Deuxième pièce de la trilogie. Une interprétation raffinée du même thème calligraphique, où des lignes délicates et des variations subtiles parlent de la fragilité et de la beauté de l'existence quotidienne. L'écriture devient souffle, la forme devient présence.",
    dimensions: "83 × 83 cm",
    medium: "Acrylique sur bois",
    collection: "L'âme des jours"
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
    titleEn: "The Soul of Days III",
    titleFr: "L'Âme des Jours III",
    descEn: "Final piece of the trilogy. 'Your soul is somewhere'—a contemplation on presence and absence. Layers of paint and gesture create a space where the visible and invisible meet, where the soul of time reveals itself in silence.",
    descFr: "Pièce finale de la trilogie. 'Ton âme est quelque part'—une contemplation sur la présence et l'absence. Des couches de peinture et de geste créent un espace où le visible et l'invisible se rencontrent, où l'âme du temps se révèle dans le silence.",
    dimensions: "83 × 83 cm",
    medium: "Acrylique sur toile",
    collection: "L'âme des jours"
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
    titleEn: "Infinity of Time and Space",
    titleFr: "L'Infini du Temps et de l'Espace",
    descEn: "An exploration of boundlessness through geometric abstraction. Forms expand and contract, suggesting cosmic rhythms and eternal cycles. This work invites contemplation on our place within the infinite dance of existence.",
    descFr: "Une exploration de l'illimité à travers l'abstraction géométrique. Les formes se dilatent et se contractent, suggérant des rythmes cosmiques et des cycles éternels. Cette œuvre invite à la contemplation sur notre place au sein de la danse infinie de l'existence.",
    dimensions: "83 × 83 cm",
    medium: "Acrylique sur toile"
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
              {lang === 'fr' ? 'Œuvres' : 'Work'}
            </h2>
            <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">
              {lang === 'fr' 
                ? 'Une collection de pièces explorant la matière, le geste et l\'émotion.'
                : 'A collection of pieces exploring material, gesture, and emotion.'}
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

                      {activeWork.collection && (
                        <p className="text-xs italic text-[#C9A86A] mb-2">
                          {lang === 'fr' ? 'Collection: ' : 'Collection: '}{activeWork.collection}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-3 text-sm text-white/60 mb-4">
                        <span>{activeWork.dimensions}</span>
                        {activeWork.medium && (
                          <>
                            <span>•</span>
                            <span>{activeWork.medium}</span>
                          </>
                        )}
                      </div>

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
