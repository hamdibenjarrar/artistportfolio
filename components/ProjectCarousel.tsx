"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useLanguage } from "./i18n/LanguageProvider";

type Props = {
  projectId: string;
  title: { en: string; fr: string };
  blurb: { en: string; fr: string };
  availability: boolean;
  images: string[]; // list of images (main first)
};

// Wheel plugin: enable horizontal wheel scrolling without blocking vertical page scroll
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WheelControls(slider: any) {
  const onWheel = (e: WheelEvent) => {
    // if horizontal intent is stronger than vertical, consume to slide
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    const horizontalIntent = absX > absY && absX > 2;
    if (!horizontalIntent) return; // allow vertical scroll normally

    e.preventDefault();
    const dir = e.deltaX > 0 || e.deltaY > 0 ? 1 : -1;
    slider.moveToIdx(slider.track.details.abs + dir, true);
  };
  slider.on("created", () => {
    slider.container.addEventListener("wheel", onWheel, { passive: false });
  });
  slider.on("destroyed", () => {
    slider.container.removeEventListener("wheel", onWheel);
  });
}

export default function ProjectCarousel({ projectId, title, blurb, availability, images }: Props) {
  const { lang } = useLanguage();

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      mode: "free",
      slides: { perView: 1.1, spacing: 16 },
      renderMode: "performance",
      rubberband: true,
      loop: false,
      drag: true,
      created() {
        // nothing
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 1.4, spacing: 20 },
        },
        "(min-width: 768px)": {
          slides: { perView: 2.1, spacing: 24 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3.1, spacing: 28 },
        },
      },
    },
    [WheelControls]
  );



  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-6 flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h2 className="divider-line text-2xl sm:text-3xl font-semibold text-white">{lang === 'fr' ? title.fr : title.en}</h2>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-white/70">{lang === 'fr' ? blurb.fr : blurb.en}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className={`flex items-center gap-2 text-xs uppercase tracking-wide ${availability ? 'text-[#C9A86A]' : 'text-white/40'}`}> 
                <span className={`inline-block size-2 rounded-full ${availability ? 'bg-emerald-400' : 'bg-white/30'}`}></span>
                {availability ? (lang === 'fr' ? 'Disponible' : 'Available') : (lang === 'fr' ? 'Archive' : 'Archive')}
              </span>
              <a href="/contact" className="text-xs font-medium text-white/80 hover:text-white underline underline-offset-4">{lang === 'fr' ? 'Contact' : 'Contact'}</a>
            </div>
          </div>
        </header>

        <PhotoProvider maskOpacity={0.9} speed={() => 350}>
          <div ref={sliderRef} className="keen-slider">
            {images.map((src, i) => (
              <div key={src} className="keen-slider__slide">
                <PhotoView src={src}>
                  <div className={`relative aspect-4/3 w-full overflow-hidden rounded bg-[#111] ${i===0 ? 'ring-2 ring-[#C9A86A]/60' : ''}`}> 
                    <Image
                      src={src}
                      alt={`${projectId} image ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 90vw"
                      loading="lazy"
                    />
                  </div>
                </PhotoView>
              </div>
            ))}
          </div>
        </PhotoProvider>
      </div>
    </section>
  );
}
