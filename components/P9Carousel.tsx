"use client";
import NextImage from "next/image";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

type Portrait = {
  src: string;
};

type Collection = {
  id: string;
  titleEn: string;
  titleFr: string;
  mainCover: string;
  portraits: Portrait[];
  size: string;
  medium: string;
};

// 7 Themed Collections
const collections: Collection[] = [
  {
    id: "theme1",
    titleEn: "Andalusian Poetry",
    titleFr: "Poésie Andalouse",
    mainCover: "/work/p9/1.1.jpg",
    portraits: [
      { src: "/work/p9/1.jpg" },
      { src: "/work/p9/2.jpg" },
      { src: "/work/p9/3.jpg" },
      { src: "/work/p9/4.jpg" },
      { src: "/work/p9/5.jpg" },
      { src: "/work/p9/6.jpg" },
      { src: "/work/p9/7.jpg" }
    ],
    size: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "theme2",
    titleEn: "I Walk to You",
    titleFr: "Je marche à toi",
    mainCover: "/work/p9/2.2.jpg",
    portraits: [
      { src: "/work/p9/8.jpg" },
      { src: "/work/p9/9.jpg" },
      { src: "/work/p9/10.jpg" },
      { src: "/work/p9/11.jpg" },
      { src: "/work/p9/12.jpg" },
      { src: "/work/p9/13.jpg" }
    ],
    size: "50 × 37 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "theme3",
    titleEn: "Oh the Days",
    titleFr: "Oh les jours",
    mainCover: "/work/p9/3.3.jpg",
    portraits: [
      { src: "/work/p9/14.jpg" },
      { src: "/work/p9/15.jpg" },
      { src: "/work/p9/16.jpg" },
      { src: "/work/p9/17.jpg" }
    ],
    size: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "theme4",
    titleEn: "We Talked a Lot",
    titleFr: "On a beaucoup parlé",
    mainCover: "/work/p9/4.4.jpg",
    portraits: [
      { src: "/work/p9/18.jpg" },
      { src: "/work/p9/19.jpg" },
      { src: "/work/p9/20.jpg" },
      { src: "/work/p9/21.jpg" },
      { src: "/work/p9/22.jpg" },
      { src: "/work/p9/23.jpg" }
    ],
    size: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "theme5",
    titleEn: "I Write to You",
    titleFr: "Je t'écris",
    mainCover: "/work/p9/5.5.jpg",
    portraits: [
      { src: "/work/p9/24.jpg" },
      { src: "/work/p9/25.jpg" },
      { src: "/work/p9/26.jpg" },
      { src: "/work/p9/27.jpg" },
      { src: "/work/p9/28.jpg" },
      { src: "/work/p9/29.jpg" }
    ],
    size: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "theme6",
    titleEn: "Your Eyes",
    titleFr: "Tes yeux",
    mainCover: "/work/p9/6.6.jpg",
    portraits: [
      { src: "/work/p9/30.jpg" },
      { src: "/work/p9/31.jpg" }
    ],
    size: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "theme7",
    titleEn: "My Beautiful Love",
    titleFr: "Mon bel amour",
    mainCover: "/work/p9/7.7.jpg",
    portraits: [
      { src: "/work/p9/32.jpg" },
      { src: "/work/p9/33.jpg" },
      { src: "/work/p9/34.jpg" },
      { src: "/work/p9/35.jpg" },
      { src: "/work/p9/36.jpg" },
      { src: "/work/p9/37.jpg" }
    ],
    size: "73 × 56 cm",
    medium: "Acrylique sur papier"
  }
];

// 4 Standalone portraits (remaining)
const standalonePortraits: Portrait[] = [
  { src: "/work/p9/1.jpg" },
  { src: "/work/p9/2.jpg" },
  { src: "/work/p9/3.jpg" },
  { src: "/work/p9/4.jpg" }
];

export function P9Carousel() {
  const { lang } = useLanguage();
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [currentPortraitIndex, setCurrentPortraitIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP animation when portrait changes
  useEffect(() => {
    if (!imageRef.current || !activeCollection) return;

    const tl = gsap.timeline();
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95, rotateY: 10 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 0.5, ease: "power2.out" }
    );

    return () => {
      tl.kill();
    };
  }, [currentPortraitIndex, activeCollection]);

  // GSAP stagger fade-in for cards on mount
  useEffect(() => {
    if (cardRefs.current.length === 0) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.08,
          ease: "power2.out"
        }
      );
    });
  }, []);

  const openCollection = (collection: Collection) => {
    setActiveCollection(collection);
    setCurrentPortraitIndex(0);
  };

  const closeCollection = () => {
    setActiveCollection(null);
    setCurrentPortraitIndex(0);
  };

  const nextPortrait = () => {
    if (!activeCollection) return;
    setCurrentPortraitIndex((prev) => (prev + 1) % activeCollection.portraits.length);
  };

  const prevPortrait = () => {
    if (!activeCollection) return;
    setCurrentPortraitIndex(
      (prev) => (prev - 1 + activeCollection.portraits.length) % activeCollection.portraits.length
    );
  };

  const currentPortrait = activeCollection?.portraits[currentPortraitIndex];

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#C9A86A] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#E6D8B4] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 text-[#111]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lang === 'fr' ? 'Collections' : 'Collections'}
          </h2>
          <p className="text-sm text-[#666] uppercase tracking-widest">
            {collections.length} {lang === 'fr' ? 'Thèmes' : 'Themes'}
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
              onClick={() => openCollection(collection)}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#E6D8B4] bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <NextImage
                  src={collection.mainCover}
                  alt={lang === 'fr' ? collection.titleFr : collection.titleEn}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <div className="text-xs opacity-70 mb-1">
                      {collection.portraits.length} {lang === 'fr' ? 'œuvres' : 'works'}
                    </div>
                    <div className="text-sm font-semibold">
                      {lang === 'fr' ? 'Voir la collection' : 'View collection'}
                    </div>
                  </div>
                </div>

                {/* Count Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#111] px-3 py-1 rounded-full text-xs font-bold">
                  {collection.portraits.length}
                </div>
              </div>

              {/* Collection Info */}
              <div className="mt-3 px-1">
                <h3
                  className="text-base md:text-lg font-bold text-[#111] leading-tight mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {lang === 'fr' ? collection.titleFr : collection.titleEn}
                </h3>
                <p className="text-xs text-[#666]">{collection.size}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Standalone Portraits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-[#E6D8B4] pt-16"
        >
          <h3
            className="text-2xl md:text-3xl font-bold text-[#111] mb-8 text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {lang === 'fr' ? 'Œuvres Individuelles' : 'Individual Works'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {standalonePortraits.map((portrait, index) => (
              <motion.div
                key={portrait.src}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-[#E6D8B4] bg-white shadow hover:shadow-xl transition-shadow duration-300"
              >
                <NextImage
                  src={portrait.src}
                  alt={`Standalone ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Collection Modal/Lightbox */}
      <AnimatePresence>
        {activeCollection && currentPortrait && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-6"
            onClick={closeCollection}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeCollection}
                className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white backdrop-blur-sm text-[#111] rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 shadow-lg"
                aria-label="Close"
              >
                <span className="text-2xl leading-none">×</span>
              </button>

              <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
                {/* Left: Image Display */}
                <div className="relative bg-gradient-to-br from-[#f5f5f5] to-white p-8 md:p-12 flex items-center justify-center">
                  <div ref={imageRef} className="relative w-full h-full max-h-[60vh] md:max-h-full">
                    <NextImage
                      src={currentPortrait.src}
                      alt={`${lang === 'fr' ? activeCollection.titleFr : activeCollection.titleEn} - ${currentPortraitIndex + 1}`}
                      fill
                      sizes="50vw"
                      className="object-contain"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  {activeCollection.portraits.length > 1 && (
                    <>
                      <button
                        onClick={prevPortrait}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm text-[#111] p-3 rounded-full transition-all duration-200 shadow-lg hover:scale-110"
                        aria-label="Previous"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <button
                        onClick={nextPortrait}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm text-[#111] p-3 rounded-full transition-all duration-200 shadow-lg hover:scale-110"
                        aria-label="Next"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#111]">
                        {currentPortraitIndex + 1} / {activeCollection.portraits.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Right: Collection Info */}
                <div className="p-8 md:p-10 overflow-y-auto bg-white">
                  <div className="space-y-6">
                    <div>
                      <h2
                        className="text-3xl md:text-4xl font-black leading-tight text-[#111] mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {lang === 'fr' ? activeCollection.titleFr : activeCollection.titleEn}
                      </h2>
                      <p className="text-sm text-[#666] uppercase tracking-wide">
                        {lang === 'fr' ? 'Collection' : 'Collection'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-[#f5f5f5] text-[#111] text-sm rounded-full border border-[#E6D8B4]">
                        {activeCollection.size}
                      </span>
                      <span className="px-4 py-2 bg-[#f5f5f5] text-[#111] text-sm rounded-full border border-[#E6D8B4]">
                        {activeCollection.medium}
                      </span>
                      <span className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-200 flex items-center gap-2">
                        <span className="inline-block size-2 rounded-full bg-emerald-500" />
                        {lang === 'fr' ? 'Disponible' : 'Available'}
                      </span>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-[#E6D8B4] to-transparent" />

                    <div>
                      <h4 className="text-sm font-bold text-[#666] uppercase tracking-wider mb-4">
                        {lang === 'fr' ? 'Œuvres dans cette collection' : 'Works in this collection'}
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {activeCollection.portraits.map((portrait, index) => (
                          <button
                            key={portrait.src}
                            onClick={() => setCurrentPortraitIndex(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                              currentPortraitIndex === index
                                ? 'border-[#C9A86A] shadow-lg scale-105'
                                : 'border-[#E6D8B4] hover:border-[#C9A86A]/50'
                            }`}
                          >
                            <NextImage
                              src={portrait.src}
                              alt={`Preview ${index + 1}`}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/21629123456?text=${encodeURIComponent(
                        (lang === 'fr' ? 'Intéressé par la collection: ' : 'Interested in collection: ') +
                        (lang === 'fr' ? activeCollection.titleFr : activeCollection.titleEn)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 bg-gradient-to-r from-[#C9A86A] to-[#E6D8B4] text-white text-center font-bold rounded-full transition-all duration-200 hover:shadow-xl"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {lang === 'fr' ? 'Contacter pour cette collection' : 'Contact About This Collection'}
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
