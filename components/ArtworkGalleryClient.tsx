"use client";
import NextImage from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type Artwork = {
  src: string;
  titleEn: string;
  titleFr: string;
  bioEn: string;
  bioFr: string;
  palette: string[];
};

export default function ArtworkGalleryClient({ initial }: { initial: string[] }) {
  const { lang } = useLanguage();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [active, setActive] = useState<Artwork | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(initial.map(extractPalette)).then((palettes) => {
      if (cancelled) return;
      const generated = initial.map((src, i) => generateMetadata(src, palettes[i], i));
      setArtworks(generated);
    });
    return () => { cancelled = true; };
  }, [initial]);

  // Currently unused - keeping for future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function addArtworks(newImages: string[]) {
    Promise.all(newImages.map(extractPalette)).then((palettes) => {
      const append = newImages.map((src, i) => generateMetadata(src, palettes[i], artworks.length + i));
      setArtworks((prev) => [...prev, ...append]);
    });
  }

  return (
    <section className="py-10 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#111]">
            {lang === 'fr' ? 'Œuvres' : 'Artworks'}
          </h2>
          <span className="text-[11px] text-[#666]">{lang==='fr'? 'Total':'Batch size'}: {artworks.length}</span>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {artworks.map((a) => (
            <ArtworkCard key={a.src} art={a} onOpen={() => setActive(a)} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Close" onClick={() => setActive(null)} className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3 }} className="relative w-full max-w-2xl rounded-2xl shadow-xl border border-[#E6D8B4] overflow-hidden bg-white">
              <div className="relative aspect-square w-full bg-white">
                <NextImage src={active.src} alt={lang==='fr'? active.titleFr : active.titleEn} fill sizes="(min-width:768px) 50vw, 100vw" className="object-contain p-4" />
              </div>
              <div className="px-6 pb-6 -mt-2">
                <h3 className="text-lg font-semibold text-[#111]">{lang==='fr'? active.titleFr : active.titleEn}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#444]">{lang==='fr'? active.bioFr : active.bioEn}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="relative flex items-center gap-1 text-[10px] font-medium text-[#0A7F38]">
                    <span className="absolute inline-block size-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="inline-block size-2 rounded-full bg-emerald-500 relative" /> {lang==='fr'? 'En stock':'In stock'}
                  </span>
                  <a href={`https://wa.me/21629123456?text=${encodeURIComponent((lang==='fr'? 'Intéressé par l\'œuvre: ' : 'Interested in artwork: ') + (lang==='fr'? active.titleFr : active.titleEn))}`} target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium underline underline-offset-4 text-[#111] hover:text-[#C9A86A]">
                    {lang==='fr'? 'Contact':'Contact'}
                  </a>
                </div>
                <PaletteStrip palette={active.palette} />
                <button onClick={() => setActive(null)} className="mt-5 text-[11px] text-[#555] hover:text-[#111]">{lang==='fr'? 'Fermer':'Close'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ArtworkCard({ art, onOpen }: { art: Artwork; onOpen: () => void }) {
  const { lang } = useLanguage();
  const gradient = useMemo(() => {
    const [c1 = '#F8F5EE', c2 = '#FFFFFF'] = art.palette;
    return `linear-gradient(135deg, ${c1} 0%, ${c2} 70%)`;
  }, [art.palette]);
  return (
    <button
      onClick={onOpen}
      className="group relative rounded-xl overflow-hidden border border-[#E6D8B4] shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A86A]"
      style={{ backgroundImage: gradient }}
    >
      <div className="relative aspect-square w-full">
        <NextImage src={art.src} alt={lang==='fr'? art.titleFr : art.titleEn} fill sizes="(min-width:1280px) 15vw, (min-width:1024px) 18vw, (min-width:640px) 30vw, 50vw" className="object-cover group-hover:scale-[1.03] transition duration-400" />
        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/0 transition" />
      </div>
      <div className="p-3">
        <h3 className="text-[11px] font-semibold text-[#111] leading-tight line-clamp-2">{lang==='fr'? art.titleFr : art.titleEn}</h3>
        <p className="mt-1 text-[10px] text-[#444] line-clamp-3">{lang==='fr'? art.bioFr : art.bioEn}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="relative flex items-center gap-1 text-[9px] font-medium text-[#0A7F38]">
            <span className="absolute inline-block size-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="inline-block size-2 rounded-full bg-emerald-500 relative" /> {lang==='fr'? 'En stock':'In stock'}
          </span>
          <a href={`https://wa.me/21629123456?text=${encodeURIComponent((lang==='fr'? 'Intéressé par l\'œuvre: ' : 'Interested in artwork: ') + (lang==='fr'? art.titleFr : art.titleEn))}`} target="_blank" rel="noopener noreferrer" className="text-[9px] font-medium underline underline-offset-4 text-[#111] hover:text-[#C9A86A]">
            {lang==='fr'? 'Contact':'Contact'}
          </a>
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
        <span key={c} className="h-5 w-5 rounded-sm border border-[#ddd]" style={{ background: c }} />
      ))}
    </div>
  );
}

async function extractPalette(src: string): Promise<string[]> {
  if (typeof window === 'undefined') return [];
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const w = 100; const h = 100;
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve([]);
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;
        const buckets: Record<string, number> = {};
        for (let i = 0; i < data.length; i += 20) {
          const r = data[i]; const g = data[i+1]; const b = data[i+2];
          const key = `${Math.round(r/32)*32},${Math.round(g/32)*32},${Math.round(b/32)*32}`;
          buckets[key] = (buckets[key]||0)+1;
        }
        const sorted = Object.entries(buckets).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([k])=>{
          const [r,g,b]=k.split(',').map(Number);
          return `#${[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')}`;
        });
        resolve(sorted);
      } catch { resolve([]); }
    };
    img.onerror = () => resolve([]);
  });
}

function generateMetadata(src: string, palette: string[], index: number): Artwork {
  const { titleEn, titleFr } = buildTitle(palette, index);
  const { bioEn, bioFr } = buildBio(titleEn, titleFr, palette);
  return { src, titleEn, titleFr, bioEn, bioFr, palette };
}

function buildTitle(palette: string[], index: number): { titleEn: string; titleFr: string } {
  const toneEn = pickTone(palette);
  const toneFr = toneToFr(toneEn);
  const formsEn = ["Intersection", "Gradient", "Plane", "Axis", "Contour", "Sequence", "Fragment", "Resonance", "Aperture", "Layer"];
  const formsFrMap: Record<string,string> = { Intersection:"Intersection", Gradient:"Dégradé", Plane:"Plan", Axis:"Axe", Contour:"Contour", Sequence:"Séquence", Fragment:"Fragment", Resonance:"Résonance", Aperture:"Ouverture", Layer:"Couche" };
  const formEn = formsEn[index % formsEn.length];
  const formFr = formsFrMap[formEn];
  return { titleEn: `${toneEn} ${formEn}`, titleFr: `${toneFr} ${formFr}` };
}

function buildBio(titleEn: string, titleFr: string, palette: string[]): { bioEn: string; bioFr: string } {
  const colorPhraseEn = palette.length ? `Dominant tones: ${palette.slice(0,3).join(', ')}` : "Subtle neutral palette";
  const colorPhraseFr = palette.length ? `Tons dominants : ${palette.slice(0,3).join(', ')}` : "Palette neutre subtile";
  return {
    bioEn: `${titleEn}. ${colorPhraseEn}. Architectural quiet translated into painterly texture and balanced light.`,
    bioFr: `${titleFr}. ${colorPhraseFr}. Silence architectural rendu en texture picturale et lumière équilibrée.`,
  };
}

function pickTone(palette: string[]): string {
  if(!palette.length) return "Neutral";
  const c = hexToRgb(palette[0]);
  const { h, l, s } = rgbToHsl(c.r,c.g,c.b);
  if(l>0.85) return "Ivory";
  if(h>=25 && h<=55) return "Golden";
  if(h>=10 && h<25) return "Amber";
  if(h>=55 && h<90) return "Olive";
  if(l<0.25) return "Charcoal";
  if(s<0.15) return "Muted";
  return "Luminous";
}

function toneToFr(tone: string): string {
  const map: Record<string,string> = { Ivory:"Ivoire", Golden:"Doré", Amber:"Ambre", Olive:"Olive", Charcoal:"Charbon", Muted:"Subtil", Luminous:"Lumineux", Neutral:"Neutre" };
  return map[tone] || tone;
}

function hexToRgb(hex: string){ const v=hex.replace('#',''); return { r:parseInt(v.slice(0,2),16), g:parseInt(v.slice(2,4),16), b:parseInt(v.slice(4,6),16)}; }
function rgbToHsl(r:number,g:number,b:number){ r/=255; g/=255; b/=255; const max=Math.max(r,g,b), min=Math.min(r,g,b); let h=0,s=0; const l=(max+min)/2; if(max!==min){ const d=max-min; s=l>0.5? d/(2-max-min): d/(max+min); switch(max){case r: h=(g-b)/d+(g<b?6:0); break; case g: h=(b-r)/d+2; break; case b: h=(r-g)/d+4; break;} h/=6;} return { h:h*360, s, l}; }
