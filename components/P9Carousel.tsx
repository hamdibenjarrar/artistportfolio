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
  { src: "/work/p9/IMG_8577_result.jpg" },
  { src: "/work/p9/IMG_8602_result.jpg" },
  { src: "/work/p9/IMG_8603_result.jpg" },
  { src: "/work/p9/IMG_8604_result.jpg" }
];

export function P9Carousel() {
  const { lang } = useLanguage();
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [currentPortraitIndex, setCurrentPortraitIndex] = useState(0);
  const [standaloneView, setStandaloneView] = useState<Portrait | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Enhanced GSAP animation when portrait changes
  useEffect(() => {
    if (!imageRef.current || !activeCollection) return;

    const tl = gsap.timeline();
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.92, rotateY: 15, x: -30 },
      { opacity: 1, scale: 1, rotateY: 0, x: 0, duration: 0.6, ease: "power3.out" }
    );

    return () => {
      tl.kill();
    };
  }, [currentPortraitIndex, activeCollection]);

  // GSAP stagger fade-in for cards on mount with parallax
  useEffect(() => {
    if (cardRefs.current.length === 0) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.06,
          ease: "power3.out"
        }
      );
    });
  }, []);

  // Enhanced modal entrance animation
  useEffect(() => {
    if (!modalRef.current || !activeCollection) return;

    const tl = gsap.timeline();
    tl.fromTo(
      modalRef.current,
      { scale: 0.85, opacity: 0, rotateX: -15 },
      { scale: 1, opacity: 1, rotateX: 0, duration: 0.5, ease: "back.out(1.4)" }
    );

    return () => {
      tl.kill();
    };
  }, [activeCollection]);

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
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.97 }}
              className="group cursor-pointer perspective-1000"
              onClick={() => openCollection(collection)}
            >
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden border-2 border-[#E6D8B4] bg-white shadow-lg hover:shadow-2xl hover:border-[#C9A86A] transition-all duration-500">
                <NextImage
                  src={collection.mainCover}
                  alt={lang === 'fr' ? collection.titleFr : collection.titleEn}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-5">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="text-xs opacity-80 mb-2 flex items-center gap-2"
                    >
                      <span className="inline-block w-8 h-px bg-[#C9A86A]" />
                      {collection.portraits.length} {lang === 'fr' ? 'œuvres' : 'works'}
                    </motion.div>
                    <div className="text-sm font-bold">
                      {lang === 'fr' ? 'Découvrir la collection' : 'Explore collection'}
                    </div>
                  </div>
                </div>

                {/* Animated Count Badge */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#111] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                >
                  {collection.portraits.length}
                </motion.div>

                {/* Availability Indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-medium">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block size-1.5 rounded-full bg-white"
                  />
                  {lang === 'fr' ? 'Disponible' : 'Available'}
                </div>
              </div>

              {/* Collection Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="mt-4 px-1"
              >
                <h3
                  className="text-base md:text-lg font-bold text-[#111] leading-tight mb-1.5 group-hover:text-[#C9A86A] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {lang === 'fr' ? collection.titleFr : collection.titleEn}
                </h3>
                <p className="text-xs text-[#666] flex items-center gap-2">
                  <span className="inline-block w-3 h-px bg-[#E6D8B4]" />
                  {collection.size}
                </p>
              </motion.div>
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  rotateZ: index % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.3 }
                }}
                onClick={() => setStandaloneView(portrait)}
                className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#E6D8B4] bg-white shadow hover:shadow-2xl hover:border-[#C9A86A] transition-all duration-500 group cursor-pointer"
              >
                <NextImage
                  src={portrait.src}
                  alt={`Standalone ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Availability badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-[9px] font-medium">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="inline-block size-1.5 rounded-full bg-white"
                  />
                  {lang === 'fr' ? 'Dispo' : 'Available'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Collection Modal/Lightbox - Compact & Enhanced */}
      <AnimatePresence>
        {activeCollection && currentPortrait && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 md:p-4"
            onClick={closeCollection}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCollection}
                className="absolute top-3 right-3 z-20 bg-white/95 hover:bg-white backdrop-blur-sm text-[#111] rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 shadow-lg"
                aria-label="Close"
              >
                <span className="text-xl leading-none">×</span>
              </motion.button>

              <div className="flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-[80vh]">
                {/* Left: Image Display - 60% */}
                <div className="relative bg-linear-to-br from-[#fafafa] to-white p-4 md:p-8 flex items-center justify-center md:w-3/5 h-[50vh] md:h-auto">
                  <div className="relative w-full h-full max-w-md md:max-w-none">
                    <img
                      key={currentPortrait.src}
                      src={currentPortrait.src}
                      alt={`${lang === 'fr' ? activeCollection.titleFr : activeCollection.titleEn} - ${currentPortraitIndex + 1}`}
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  {activeCollection.portraits.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.15, x: -4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevPortrait}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-sm text-[#111] p-2.5 md:p-3 rounded-full transition-all duration-200 shadow-lg"
                        aria-label="Previous"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.15, x: 4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextPortrait}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-sm text-[#111] p-2.5 md:p-3 rounded-full transition-all duration-200 shadow-lg"
                        aria-label="Next"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>

                      {/* Image Counter */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs md:text-sm font-medium text-[#111] shadow-lg">
                        {currentPortraitIndex + 1} / {activeCollection.portraits.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Right: Collection Info - 40% Compact */}
                <div className="p-5 md:p-6 overflow-y-auto bg-white md:w-2/5 max-h-[45vh] md:max-h-full">
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <h2
                        className="text-2xl md:text-3xl font-black leading-tight text-[#111] mb-1"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {lang === 'fr' ? activeCollection.titleFr : activeCollection.titleEn}
                      </h2>
                      <p className="text-xs text-[#666] uppercase tracking-wider">
                        {lang === 'fr' ? 'Collection' : 'Collection'}
                      </p>
                    </div>

                    {/* Metadata Badges - Compact */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-[#f5f5f5] text-[#111] text-xs rounded-full border border-[#E6D8B4]">
                        {activeCollection.size}
                      </span>
                      <span className="px-3 py-1.5 bg-[#f5f5f5] text-[#111] text-xs rounded-full border border-[#E6D8B4]">
                        {activeCollection.medium}
                      </span>
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200 flex items-center gap-1.5"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="inline-block size-1.5 rounded-full bg-emerald-500"
                        />
                        {lang === 'fr' ? 'Disponible' : 'Available'}
                      </motion.span>
                    </div>

                    <div className="h-px bg-linear-to-r from-transparent via-[#E6D8B4] to-transparent" />

                    {/* Thumbnail Grid - Compact */}
                    <div>
                      <h4 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-3">
                        {activeCollection.portraits.length} {lang === 'fr' ? 'œuvres' : 'works'}
                      </h4>
                      <div className="grid grid-cols-4 gap-1.5">
                        {activeCollection.portraits.map((portrait, index) => (
                          <motion.button
                            key={portrait.src}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPortraitIndex(index)}
                            className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${
                              currentPortraitIndex === index
                                ? 'border-[#C9A86A] shadow-lg ring-2 ring-[#C9A86A]/30'
                                : 'border-[#E6D8B4] hover:border-[#C9A86A]/50'
                            }`}
                          >
                            <NextImage
                              src={portrait.src}
                              alt={`Preview ${index + 1}`}
                              fill
                              sizes="60px"
                              className="object-cover"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Contact Button - Compact */}
                    <motion.a
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={`https://wa.me/21629123456?text=${encodeURIComponent(
                        (lang === 'fr' ? 'Intéressé par la collection: ' : 'Interested in collection: ') +
                        (lang === 'fr' ? activeCollection.titleFr : activeCollection.titleEn)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-5 py-3 bg-linear-to-r from-[#C9A86A] to-[#E6D8B4] text-white text-center font-bold rounded-full transition-all duration-200 hover:shadow-xl text-sm"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {lang === 'fr' ? 'Me contacter' : 'Contact Me'}
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standalone Portrait Modal */}
      <AnimatePresence>
        {standaloneView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 md:p-4"
            onClick={() => setStandaloneView(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: -5 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] md:max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setStandaloneView(null)}
                className="absolute top-3 right-3 z-20 bg-white/95 hover:bg-white backdrop-blur-sm text-[#111] rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 shadow-lg"
                aria-label="Close"
              >
                <span className="text-xl leading-none">×</span>
              </motion.button>

              <div className="flex flex-col h-full max-h-[85vh] md:max-h-[80vh]">
                {/* Image Section */}
                <div className="relative bg-linear-to-br from-[#fafafa] to-white p-6 md:p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-md aspect-square">
                    <NextImage
                      src={standaloneView.src}
                      alt="Standalone artwork"
                      fill
                      sizes="(max-width: 768px) 90vw, 600px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5 md:p-6 bg-white">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 flex items-center gap-1.5"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="inline-block size-1.5 rounded-full bg-emerald-500"
                        />
                        {lang === 'fr' ? 'Disponible' : 'Available'}
                      </motion.span>
                    </div>

                    <div className="h-px bg-linear-to-r from-transparent via-[#E6D8B4] to-transparent" />

                    <motion.a
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={`https://wa.me/21629123456?text=${encodeURIComponent(
                        (lang === 'fr' ? 'Intéressé par cette œuvre individuelle' : 'Interested in this individual work')
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-5 py-3 bg-linear-to-r from-[#C9A86A] to-[#E6D8B4] text-white text-center font-bold rounded-full transition-all duration-200 hover:shadow-xl text-sm"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {lang === 'fr' ? 'Me contacter' : 'Contact Me'}
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
