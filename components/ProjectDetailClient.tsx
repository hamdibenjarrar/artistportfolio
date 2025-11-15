"use client";

import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import { useLanguage } from "./i18n/LanguageProvider";

export default function ProjectDetailClient({ images, blurb }: { images: string[]; blurb: { en: string; fr: string } }) {
  const { lang } = useLanguage();
  return (
    <PhotoProvider maskOpacity={0.9}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <PhotoView key={src} src={src}>
            <div className="relative aspect-4/3 overflow-hidden rounded bg-[#111] group">
              <Image src={src} alt={`detail ${i + 1}`} fill className="object-cover" sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/40 flex items-end p-3 text-xs text-white/80">
                {lang === 'fr' ? blurb.fr : blurb.en}
              </div>
            </div>
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}
