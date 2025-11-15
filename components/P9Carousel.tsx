"use client";
import NextImage from "next/image";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";

type P9Art = {
  src: string;
  titleEn: string; titleFr: string;
  bioEn: string; bioFr: string;
};

export function P9Carousel({ images }: { images: string[] }) {
  const { lang } = useLanguage();
  const data = useMemo(() => generateMetadata(images), [images]);
  const [active, setActive] = useState<P9Art | null>(null);

  const rows = useMemo(() => {
    const perRow = Math.ceil(data.length / 2); // split into 2 rows
    return [data.slice(0, perRow), data.slice(perRow)];
  }, [data]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current; if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  }, []);

  useEffect(() => { updateScrollState(); }, [rows, updateScrollState]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current; if (!el) return;
    const first = el.querySelector('button[data-art-card]') as HTMLElement | null;
    const cardWidth = first ? first.offsetWidth : 220;
    el.scrollBy({ left: dir * (cardWidth * 3), behavior: 'smooth' });
  };

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setActive(null);
  }, []);

  return (
    <section className="mt-10 pb-8" aria-label="Gallery" onKeyDown={handleKey}>
      <div className="mx-auto max-w-[1400px] px-6">
        <header className="flex items-baseline justify-between mb-5">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight text-[#111]">{lang==='fr'? 'Collection' : 'Collection'}</h2>
          <span className="text-[11px] text-[#666]">{data.length} {lang==='fr'? 'œuvres':'works'}</span>
        </header>
        <div className="relative">
          <HorizontalScroll scrollRef={scrollRef} onScroll={updateScrollState}>
            <div className="flex flex-col gap-3 md:gap-4">
              {rows.map((row, ri) => (
                <div key={ri} className="flex gap-3 md:gap-4">
                  {row.map(art => (
                    <ArtCard key={art.src} art={art} lang={lang} onOpen={()=>setActive(art)} />
                  ))}
                </div>
              ))}
            </div>
          </HorizontalScroll>
          <CarouselNav canLeft={canLeft} canRight={canRight} onLeft={()=>scrollBy(-1)} onRight={()=>scrollBy(1)} />
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button aria-label="Close" onClick={()=>setActive(null)} className="absolute inset-0 bg-white/90 backdrop-blur" />
            <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }} transition={{ duration:0.3 }} className="relative w-full max-w-lg md:max-w-xl rounded-xl border-2 border-[#E6D8B4] bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="relative w-full shrink-0">
                <div className="relative aspect-square md:aspect-4/3 bg-white">
                  <NextImage src={active.src} alt={lang==='fr'? active.titleFr : active.titleEn} fill sizes="(min-width:768px) 50vw, 90vw" className="object-contain p-3 md:p-5" />
                </div>
              </div>
              <div className="px-5 md:px-7 py-4 md:py-6 bg-white shrink-0">
                <h3 className="text-lg md:text-xl font-semibold text-[#111]">{lang==='fr'? active.titleFr : active.titleEn}</h3>
                <p className="mt-1 text-sm text-[#666]">40 × 60 cm</p>
                <p className="mt-2 text-xs md:text-sm leading-relaxed text-[#555]">{lang==='fr'? active.bioFr : active.bioEn}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="relative flex items-center gap-1 text-[10px] font-medium text-[#0A7F38]">
                    <span className="absolute inline-block size-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="inline-block size-2 rounded-full bg-emerald-500 relative" /> {lang==='fr'? 'Disponible':'Available'}
                  </span>
                  <a href={`https://wa.me/21629123456?text=${encodeURIComponent((lang==='fr'? 'Intéressé par l\'œuvre: ' : 'Interested in artwork: ') + (lang==='fr'? active.titleFr : active.titleEn))}`} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold underline underline-offset-4 text-[#111] hover:text-[#C9A86A]">
                    {lang==='fr'? 'Contact':'Contact'}
                  </a>
                  <button onClick={()=>setActive(null)} className="ml-auto text-[11px] text-[#666] hover:text-[#111]">{lang==='fr'? 'Fermer':'Close'}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function HorizontalScroll({ children, scrollRef, onScroll }: { children: React.ReactNode; scrollRef: React.RefObject<HTMLDivElement | null>; onScroll: () => void }) {
  return (
    <div ref={scrollRef} onScroll={onScroll} className="overflow-x-auto scroll-snap-x" role="region" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {children}
    </div>
  );
}

function CarouselNav({ canLeft, canRight, onLeft, onRight }: { canLeft: boolean; canRight: boolean; onLeft: () => void; onRight: () => void }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
      <button disabled={!canLeft} onClick={onLeft} className="pointer-events-auto ml-1 rounded-full bg-white/80 backdrop-blur text-[#111] shadow px-2 py-2 disabled:opacity-30 hover:bg-white transition" aria-label="Previous" >
        <span className="text-xs font-semibold">◀</span>
      </button>
      <button disabled={!canRight} onClick={onRight} className="pointer-events-auto mr-1 rounded-full bg-white/80 backdrop-blur text-[#111] shadow px-2 py-2 disabled:opacity-30 hover:bg-white transition" aria-label="Next" >
        <span className="text-xs font-semibold">▶</span>
      </button>
    </div>
  );
}

function ArtCard({ art, lang, onOpen }: { art: P9Art; lang: string; onOpen: () => void }) {
  return (
    <button data-art-card onClick={onOpen} className="group relative rounded-xl border border-[#E6D8B4] bg-white shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#C9A86A] shrink-0 w-32 sm:w-36 md:w-40 lg:w-44">
      <div className="relative aspect-square w-full bg-white">
        <NextImage src={art.src} alt={lang==='fr'? art.titleFr : art.titleEn} fill sizes="176px" className="object-contain p-2 group-hover:scale-[1.04] transition duration-500" />
        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/0 transition" />
      </div>
      <div className="p-2.5 text-left">
        <h3 className="text-[10px] font-semibold text-[#111] leading-tight line-clamp-2">{lang==='fr'? art.titleFr : art.titleEn}</h3>
        <p className="mt-1 text-[8px] text-[#666]">40 × 60 cm</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="relative flex items-center gap-1 text-[9px] font-medium text-[#0A7F38]">
            <span className="absolute inline-block size-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="inline-block size-2 rounded-full bg-emerald-500 relative" /> {lang==='fr'? 'Disponible':'Available'}
          </span>
          <span className="text-[9px] font-medium underline underline-offset-4 text-[#111] group-hover:text-[#C9A86A]">{lang==='fr'? 'Voir':'View'}</span>
        </div>
      </div>
    </button>
  );
}

function generateMetadata(images: string[]): P9Art[] {
  const adjectivesEn = ["Silent","Layered","Fractal","Measured","Drifting","Ascendant","Veiled","Rhythmic","Harmonic","Compressed","Elevated","Intersected"]; // no color words
  const nounsEn = ["Axis","Field","Transit","Echo","Structure","Pulse","Memory","Plane","Threshold","Pattern","Module","Circuit"];
  const adjectivesFr = ["Silencieux","Stratifié","Fractal","Mesuré","Flottant","Ascendant","Voilé","Rythmique","Harmonique","Compressé","Élevé","Intersecté"];
  const nounsFr = ["Axe","Champ","Transit","Écho","Structure","Pulsation","Mémoire","Plan","Seuil","Motif","Module","Circuit"];
  return images.map((src, i) => {
    const aEn = adjectivesEn[i % adjectivesEn.length];
    const nEn = nounsEn[i % nounsEn.length];
    const aFr = adjectivesFr[i % adjectivesFr.length];
    const nFr = nounsFr[i % nounsFr.length];
    const titleEn = `${aEn} ${nEn}`;
    const titleFr = `${aFr} ${nFr}`;
    const bioEn = `${titleEn}. Geometric tension and spatial drift rendered as quiet rhythmic trace of motion.`;
    const bioFr = `${titleFr}. Tension géométrique et dérive spatiale rendues comme trace rythmique silencieuse du mouvement.`;
    return { src, titleEn, titleFr, bioEn, bioFr };
  });
}
