"use client";
import { useLanguage } from "./i18n/LanguageProvider";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GeneratedArtwork = {
  src: string;
  title: { en: string; fr: string };
  bio: { en: string; fr: string };
  palette: string[]; // dominant colors
};

export default function GalleryP9Client({ imageSources }: { imageSources: string[] }) {
  const { lang } = useLanguage();
  const [artworks, setArtworks] = useState<GeneratedArtwork[]>([]);
  const [active, setActive] = useState<GeneratedArtwork | null>(null);

  useEffect(() => {
    // For each image, extract palette then generate title/bio
    let cancelled = false;
    Promise.all(imageSources.map(extractPalette)).then((palettes) => {
      if (cancelled) return;
      const generated = imageSources.map((src, i) => generateMetadata(src, palettes[i], i));
      setArtworks(generated);
    });
    return () => {
      cancelled = true;
    };
  }, [imageSources]);

  return (
    <section className="py-16 bg-white text-[#222]">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111]">{lang === 'fr' ? 'Galerie — Série IX' : 'Gallery — Series IX'}</h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-[#444]">
            {lang === 'fr'
              ? "Chaque image est titrée selon ses teintes dominantes et sa structure visuelle, révélant une émotion architecturale singulière."
              : "Each image is titled by its dominant tones and structural feel, revealing a singular architectural emotion."}
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artworks.map((a) => (
            <ArtworkCard key={a.src} art={a} lang={lang} onOpen={() => setActive(a)} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
              onClick={() => setActive(null)}
              className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-4xl rounded-xl shadow-xl border border-[#E6D8B4]/60 overflow-hidden bg-linear-to-br from-white via-[#F9F3E4] to-[#E6D8B4]/40"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:flex-1 max-h-[70vh]">
                  <Image
                    src={active.src}
                    alt={active.title.en}
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-contain bg-white"
                  />
                </div>
                <div className="md:w-[420px] p-6 flex flex-col bg-white/90">
                  <h3 className="text-xl font-semibold text-[#111]">{lang === 'fr' ? active.title.fr : active.title.en}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#333] flex-1">
                    {lang === 'fr' ? active.bio.fr : active.bio.en}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="flex items-center gap-2 text-xs font-medium text-[#0A7F38]">
                      <span className="inline-block size-2 rounded-full bg-emerald-500" />
                      {lang === 'fr' ? 'Disponible' : 'Available'}
                    </span>
                    <a
                      href="/contact"
                      className="text-xs font-medium text-[#111] underline underline-offset-4 hover:text-[#C9A86A]"
                    >
                      {lang === 'fr' ? 'Contact' : 'Contact'}
                    </a>
                  </div>
                  <PaletteStrip palette={active.palette} />
                  <button
                    onClick={() => setActive(null)}
                    className="mt-6 self-start text-xs tracking-wide text-[#555] hover:text-[#111]"
                  >
                    {lang === 'fr' ? 'Fermer' : 'Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ArtworkCard({ art, lang, onOpen }: { art: GeneratedArtwork; lang: string; onOpen: () => void }) {
  const gradient = useMemo(() => {
    const [c1 = '#F8F5EE', c2 = '#FFFFFF'] = art.palette;
    return `linear-gradient(135deg, ${c1} 0%, ${c2} 70%)`;
  }, [art.palette]);
  return (
    <button
      onClick={onOpen}
      className="group text-left rounded-lg border border-[#E6D8B4]/60 overflow-hidden shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C9A86A]"
      style={{ backgroundImage: gradient }}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={art.src}
          alt={art.title.en}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-4 backdrop-blur-[2px] bg-white/70">
        <h3 className="text-sm font-semibold text-[#111] leading-tight">
          {lang === 'fr' ? art.title.fr : art.title.en}
        </h3>
        <p className="mt-2 text-xs text-[#333] line-clamp-4">
          {lang === 'fr' ? art.bio.fr : art.bio.en}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] font-medium text-[#0A7F38]">
            <span className="inline-block size-2 rounded-full bg-emerald-500" />
            {lang === 'fr' ? 'Disponible' : 'Available'}
          </span>
          <span className="text-[10px] font-medium underline underline-offset-4 text-[#111]">
            {lang === 'fr' ? 'Contact' : 'Contact'}
          </span>
        </div>
      </div>
    </button>
  );
}

function PaletteStrip({ palette }: { palette: string[] }) {
  if (!palette.length) return null;
  return (
    <div className="mt-4 flex gap-1">
      {palette.slice(0, 5).map((c) => (
        <span key={c} className="h-5 w-5 rounded-sm border border-white/40 shadow" style={{ background: c }} />
      ))}
    </div>
  );
}

// Palette extraction & metadata generation ---------------------------------
async function extractPalette(src: string): Promise<string[]> {
  return new Promise((resolve) => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      resolve(['#C9A86A', '#E6D8B4', '#8B7355']); // fallback colors
      return;
    }
    
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const w = 120;
        const h = 120;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve([]);
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;
        const buckets: Record<string, number> = {};
        for (let i = 0; i < data.length; i += 4 * 4) { // stride for performance
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const key = `${Math.round(r / 24) * 24},${Math.round(g / 24) * 24},${Math.round(b / 24) * 24}`;
          buckets[key] = (buckets[key] || 0) + 1;
        }
        const sorted = Object.entries(buckets)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([k]) => {
            const [r, g, b] = k.split(",").map(Number);
            return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
          });
        resolve(sorted);
      } catch {
        resolve([]);
      }
    };
    img.onerror = () => resolve([]);
  });
}

function generateMetadata(src: string, palette: string[], index: number): GeneratedArtwork {
  const tone = pickTone(palette);
  const form = pickForm(index);
  const titleEn = `${tone.en} ${form.en}`;
  const titleFr = `${tone.fr} ${form.fr}`;
  const bioEn = `A ${tone.en.toLowerCase()} palette framing a subtle ${form.en.toLowerCase()} — light, material and silence in quiet balance.`;
  const bioFr = `Une palette ${tone.fr.toLowerCase()} encadrant une ${form.fr.toLowerCase()} subtile — lumière, matière et silence en équilibre discret.`;
  return { src, title: { en: titleEn, fr: titleFr }, bio: { en: bioEn, fr: bioFr }, palette };
}

function pickTone(palette: string[]): { en: string; fr: string } {
  if (!palette.length) return { en: "Neutral", fr: "Neutre" };
  // Use first dominant color hue
  const c = hexToRgb(palette[0]);
  const { h, l, s } = rgbToHsl(c.r, c.g, c.b);
  if (l > 0.85) return { en: "Ivory", fr: "Ivoire" };
  if (h >= 25 && h <= 55) return { en: "Golden", fr: "Dorée" };
  if (h >= 10 && h < 25) return { en: "Amber", fr: "Ambrée" };
  if (h >= 55 && h < 90) return { en: "Olive", fr: "Olive" };
  if (h >= 180 && h < 210) return { en: "Cerulean", fr: "Céruléenne" };
  if (h >= 200 && h < 250) return { en: "Aerial", fr: "Aérienne" };
  if (l < 0.25) return { en: "Charcoal", fr: "Charbon" };
  if (s < 0.15) return { en: "Muted", fr: "Sourde" };
  return { en: "Luminous", fr: "Lumineuse" };
}

function pickForm(index: number): { en: string; fr: string } {
  const forms: { en: string; fr: string }[] = [
    { en: "Intersection", fr: "Intersection" },
    { en: "Gradient", fr: "Gradient" },
    { en: "Plane", fr: "Plan" },
    { en: "Axis", fr: "Axe" },
    { en: "Contour", fr: "Contour" },
    { en: "Lattice", fr: "Treillis" },
    { en: "Resonance", fr: "Résonance" },
    { en: "Aperture", fr: "Ouverture" },
    { en: "Sequence", fr: "Séquence" },
    { en: "Fragment", fr: "Fragment" },
  ];
  return forms[index % forms.length];
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const v = hex.replace("#", "");
  return { r: parseInt(v.slice(0, 2), 16), g: parseInt(v.slice(2, 4), 16), b: parseInt(v.slice(4, 6), 16) };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}
