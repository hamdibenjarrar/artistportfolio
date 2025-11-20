"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Portrait = {
  src: string;
  number: number;
};

const allPortraits: Portrait[] = [
  { src: "/work/p9/1.jpg", number: 1 },
  { src: "/work/p9/2.jpg", number: 2 },
  { src: "/work/p9/3.jpg", number: 3 },
  { src: "/work/p9/4.jpg", number: 4 },
  { src: "/work/p9/5.jpg", number: 5 },
  { src: "/work/p9/6.jpg", number: 6 },
  { src: "/work/p9/7.jpg", number: 7 },
  { src: "/work/p9/8.jpg", number: 8 },
  { src: "/work/p9/9.jpg", number: 9 },
  { src: "/work/p9/10.jpg", number: 10 },
  { src: "/work/p9/11.jpg", number: 11 },
  { src: "/work/p9/12.jpg", number: 12 },
  { src: "/work/p9/13.jpg", number: 13 },
  { src: "/work/p9/14.jpg", number: 14 },
  { src: "/work/p9/15.jpg", number: 15 },
  { src: "/work/p9/16.jpg", number: 16 },
  { src: "/work/p9/17.jpg", number: 17 },
  { src: "/work/p9/18.jpg", number: 18 },
  { src: "/work/p9/19.jpg", number: 19 },
  { src: "/work/p9/20.jpg", number: 20 },
  { src: "/work/p9/21.jpg", number: 21 },
  { src: "/work/p9/22.jpg", number: 22 },
  { src: "/work/p9/23.jpg", number: 23 },
  { src: "/work/p9/24.jpg", number: 24 },
  { src: "/work/p9/25.jpg", number: 25 },
  { src: "/work/p9/26.jpg", number: 26 },
  { src: "/work/p9/27.jpg", number: 27 },
  { src: "/work/p9/28.jpg", number: 28 },
  { src: "/work/p9/29.jpg", number: 29 },
  { src: "/work/p9/30.jpg", number: 30 },
  { src: "/work/p9/31.jpg", number: 31 },
  { src: "/work/p9/32.jpg", number: 32 },
  { src: "/work/p9/33.jpg", number: 33 },
  { src: "/work/p9/34.jpg", number: 34 },
  { src: "/work/p9/35.jpg", number: 35 },
  { src: "/work/p9/36.jpg", number: 36 },
  { src: "/work/p9/37.jpg", number: 37 },
  { src: "/work/p9/IMG_8577_result.jpg", number: 38 },
  { src: "/work/p9/IMG_8602_result.jpg", number: 39 },
  { src: "/work/p9/IMG_8603_result.jpg", number: 40 },
  { src: "/work/p9/IMG_8604_result.jpg", number: 41 },
];

export function P9Carousel() {
  const [selectedPortrait, setSelectedPortrait] = useState<Portrait | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const openPortrait = (index: number) => {
    setCurrentIndex(index);
    setSelectedPortrait(allPortraits[index]);
  };

  const nextPortrait = () => {
    const newIndex = (currentIndex + 1) % allPortraits.length;
    setCurrentIndex(newIndex);
    setSelectedPortrait(allPortraits[newIndex]);
  };

  const prevPortrait = () => {
    const newIndex =
      (currentIndex - 1 + allPortraits.length) % allPortraits.length;
    setCurrentIndex(newIndex);
    setSelectedPortrait(allPortraits[newIndex]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextPortrait();
    }
    if (touchStart - touchEnd < -75) {
      prevPortrait();
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 text-[#111]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Collection
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="h-px bg-linear-to-r from-transparent via-[#C9A86A] to-transparent mx-auto"
          />
        </motion.div>

        {/* Horizontal Scroll Carousel - 2 Rows */}
        <div className="relative">
          {/* Left scroll indicator line */}
          <div className="absolute left-0 top-0 bottom-6 w-px bg-linear-to-b from-transparent via-[#C9A86A] to-transparent z-10 pointer-events-none" />
          
          {/* Left Arrow Button */}
          <motion.button
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm text-[#111] p-2 md:p-3 rounded-full shadow-lg transition-all duration-200"
            aria-label="Scroll Left"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          {/* Right scroll indicator line */}
          <div className="absolute right-0 top-0 bottom-6 w-px bg-linear-to-b from-transparent via-[#C9A86A] to-transparent z-10 pointer-events-none" />
          
          {/* Right Arrow Button */}
          <motion.button
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm text-[#111] p-2 md:p-3 rounded-full shadow-lg transition-all duration-200"
            aria-label="Scroll Right"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          
          <div ref={scrollContainerRef} className="overflow-x-auto overflow-y-hidden pb-6 scrollbar-hide">
            <div 
              className="inline-grid grid-rows-2 auto-cols-max grid-flow-col gap-3 md:gap-4"
              style={{ minHeight: "fit-content" }}
            >
          {allPortraits.map((portrait, index) => (
            <motion.div
              key={portrait.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01, duration: 0.3 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -4,
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              onClick={() => openPortrait(index)}
              className="relative w-40 sm:w-44 md:w-48 lg:w-52 aspect-3/4 rounded-lg overflow-hidden border border-[#E6D8B4] bg-white shadow-sm hover:shadow-xl hover:border-[#C9A86A] transition-all duration-300 group cursor-pointer"
            >
              <img
                src={portrait.src}
                alt={`Portrait ${portrait.number}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
          </div>
          </div>
        </div>
      </div>

      {/* Portrait Modal */}
      <AnimatePresence mode="wait">
        {selectedPortrait && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 md:p-4"
            onClick={() => setSelectedPortrait(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.26, 0.64, 1] }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedPortrait(null)}
                className="absolute top-2 right-2 md:top-3 md:right-3 z-20 bg-white/95 hover:bg-white backdrop-blur-sm text-[#111] rounded-full w-8 h-8 md:w-9 md:h-9 flex items-center justify-center transition-colors duration-200 shadow-lg"
                aria-label="Close"
              >
                <span className="text-xl leading-none">×</span>
              </motion.button>

              <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                {/* Left: Image Display with Navigation */}
                <div className="relative bg-linear-to-br from-[#fafafa] to-white p-4 md:p-6 flex items-center justify-center md:w-3/5 h-[60vh] md:h-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedPortrait.src}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <img
                        src={selectedPortrait.src}
                        alt={`Portrait ${selectedPortrait.number}`}
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <motion.button
                    whileHover={{ scale: 1.1, x: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevPortrait}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm text-[#111] p-2 md:p-2.5 rounded-full transition-all duration-200 shadow-lg"
                    aria-label="Previous"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextPortrait}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm text-[#111] p-2 md:p-2.5 rounded-full transition-all duration-200 shadow-lg"
                    aria-label="Next"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>

                  {/* Counter */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs md:text-sm font-medium text-[#111] shadow-md">
                    {currentIndex + 1} / {allPortraits.length}
                  </div>
                </div>

                {/* Right: Info Panel */}
                <div className="p-4 md:p-6 bg-white md:w-2/5 flex items-center">
                  <div className="w-full space-y-3 md:space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-[#f5f5f5] text-[#111] text-xs md:text-sm rounded-full border border-[#E6D8B4]">
                        73 × 56 cm
                      </span>
                      <span className="px-3 py-1.5 bg-[#f5f5f5] text-[#111] text-xs md:text-sm rounded-full border border-[#E6D8B4]">
                        Acrylique sur papier
                      </span>
                    </div>
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
