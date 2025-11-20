"use client";
import { useState, useRef, useEffect } from "react";
import NextImage from "next/image";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

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
    id: "p9-1",
    mainImage: "/work/p9/1.1.jpg",
    detailImages: [
      "/work/p9/1.jpg",
      "/work/p9/2.jpg",
      "/work/p9/3.jpg",
      "/work/p9/4.jpg",
      "/work/p9/5.jpg",
      "/work/p9/6.jpg",
      "/work/p9/7.jpg"
    ],
    titleEn: "Andalusian Poetry",
    titleFr: "Poésie Andalouse",
    descEn: "A collection of seven portraits inspired by Andalusian poetry. Each piece captures the essence of poetic expression through abstract forms and vibrant colors, translating verse into visual rhythm.",
    descFr: "Une collection de sept portraits inspirés par la poésie andalouse. Chaque pièce capture l'essence de l'expression poétique à travers des formes abstraites et des couleurs vibrantes, traduisant les vers en rythme visuel.",
    dimensions: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "p9-2",
    mainImage: "/work/p9/2.2.jpg",
    detailImages: [
      "/work/p9/8.jpg",
      "/work/p9/9.jpg",
      "/work/p9/10.jpg",
      "/work/p9/11.jpg",
      "/work/p9/12.jpg",
      "/work/p9/13.jpg"
    ],
    titleEn: "I Walk to You",
    titleFr: "Je marche à toi",
    descEn: "A series exploring movement and connection. Each portrait represents a step in the journey toward presence, where gesture and color map the path of reaching out.",
    descFr: "Une série explorant le mouvement et la connexion. Chaque portrait représente une étape du voyage vers la présence, où le geste et la couleur tracent le chemin de la rencontre.",
    dimensions: "50 × 37 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "p9-3",
    mainImage: "/work/p9/3.3.jpg",
    detailImages: [
      "/work/p9/14.jpg",
      "/work/p9/15.jpg",
      "/work/p9/16.jpg",
      "/work/p9/17.jpg"
    ],
    titleEn: "Oh the Days",
    titleFr: "Oh les jours",
    descEn: "Four portraits contemplating the passage of time. Layers of paint and mark-making create a visual diary where each day leaves its trace in color and form.",
    descFr: "Quatre portraits contemplant le passage du temps. Des couches de peinture et de marques créent un journal visuel où chaque jour laisse sa trace en couleur et en forme.",
    dimensions: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "p9-4",
    mainImage: "/work/p9/4.4.jpg",
    detailImages: [
      "/work/p9/18.jpg",
      "/work/p9/19.jpg",
      "/work/p9/20.jpg",
      "/work/p9/21.jpg",
      "/work/p9/22.jpg",
      "/work/p9/23.jpg"
    ],
    titleEn: "We Talked a Lot",
    titleFr: "On a beaucoup parlé",
    descEn: "Six portraits capturing the essence of conversation and exchange. Abstract forms suggest dialogue, where words dissolve into color and gesture becomes language.",
    descFr: "Six portraits capturant l'essence de la conversation et de l'échange. Des formes abstraites suggèrent le dialogue, où les mots se dissolvent en couleur et le geste devient langage.",
    dimensions: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "p9-5",
    mainImage: "/work/p9/5.5.jpg",
    detailImages: [
      "/work/p9/24.jpg",
      "/work/p9/25.jpg",
      "/work/p9/26.jpg",
      "/work/p9/27.jpg",
      "/work/p9/28.jpg",
      "/work/p9/29.jpg"
    ],
    titleEn: "I Write to You",
    titleFr: "Je t'écris",
    descEn: "A collection exploring the act of writing and communication. Each piece translates written expression into visual form, where calligraphic gestures meet abstract composition.",
    descFr: "Une collection explorant l'acte d'écrire et de communiquer. Chaque pièce traduit l'expression écrite en forme visuelle, où les gestes calligraphiques rencontrent la composition abstraite.",
    dimensions: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "p9-6",
    mainImage: "/work/p9/6.6.jpg",
    detailImages: [
      "/work/p9/30.jpg",
      "/work/p9/31.jpg"
    ],
    titleEn: "Your Eyes",
    titleFr: "Tes yeux",
    descEn: "Two portraits focused on the gaze and perception. Through abstract representation, these works explore how we see and are seen, the window to presence.",
    descFr: "Deux portraits centrés sur le regard et la perception. À travers la représentation abstraite, ces œuvres explorent comment nous voyons et sommes vus, la fenêtre de la présence.",
    dimensions: "73 × 56 cm",
    medium: "Acrylique sur papier"
  },
  {
    id: "p9-7",
    mainImage: "/work/p9/7.7.jpg",
    detailImages: [
      "/work/p9/32.jpg",
      "/work/p9/33.jpg",
      "/work/p9/34.jpg",
      "/work/p9/35.jpg",
      "/work/p9/36.jpg",
      "/work/p9/37.jpg"
    ],
    titleEn: "My Beautiful Love",
    titleFr: "Mon bel amour",
    descEn: "Six portraits celebrating beauty and affection. Vibrant colors and flowing forms express the emotional landscape of love, where feeling becomes visible.",
    descFr: "Six portraits célébrant la beauté et l'affection. Des couleurs vibrantes et des formes fluides expriment le paysage émotionnel de l'amour, où le sentiment devient visible.",
    dimensions: "73 × 56 cm",
    medium: "Acrylique sur papier"
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
    titleEn: "Melodic Resonance",
    titleFr: "Résonance Mélodique",
    descEn: "An exploration of chromatic vibrations where color sings across the canvas. Inspired by the phrase 'It's with you that I want to sing,' this work captures the harmony between presence and expression, transforming emotion into visual rhythm.",
    descFr: "Une exploration des vibrations chromatiques où la couleur chante à travers la toile. Inspirée par la phrase 'C'est avec toi que je veux chanter', cette œuvre capture l'harmonie entre présence et expression, transformant l'émotion en rythme visuel.",
    dimensions: "100 × 30 cm",
    medium: "Acrylique sur toile"
  }
];

export function FeaturedWorks() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailView, setDetailView] = useState(false);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentWork = artworks[currentIndex];

  useEffect(() => {
    if (!imageRef.current || !titleRef.current || !descRef.current || !metaRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(imageRef.current, 
      { opacity: 0, scale: 0.9, rotateY: -15 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, x: -50, rotateX: -20 },
      { opacity: 1, x: 0, rotateX: 0, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(metaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const openDetailView = () => {
    setDetailImageIndex(0);
    setDetailView(true);
  };

  const handleDetailNext = () => {
    setDetailImageIndex((prev) => (prev + 1) % currentWork.detailImages.length);
  };

  const handleDetailPrev = () => {
    setDetailImageIndex((prev) => (prev - 1 + currentWork.detailImages.length) % currentWork.detailImages.length);
  };

  const isTrilogyArt = currentWork.collection === "L'âme des jours";
  const trilogyImage = "/3.jpg";

  return (
    <>
      <section className="relative min-h-screen py-20 md:py-32 bg-linear-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C9A86A]/10 blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/3 w-lg h-128 rounded-full bg-[#E6D8B4]/10 blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24 relative z-10"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-white via-[#C9A86A] to-[#E6D8B4]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {!mounted ? 'Work' : lang === 'fr' ? 'Œuvres' : 'Work'}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="h-px bg-linear-to-r from-transparent via-[#C9A86A] to-transparent mx-auto mt-4"
          />
        </motion.div>

        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            <div className="relative">
              <div 
                ref={imageRef}
                className="relative aspect-square group cursor-pointer"
                onClick={openDetailView}
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#C9A86A]/20 via-transparent to-[#E6D8B4]/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700" />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#C9A86A]/30 shadow-2xl shadow-[#C9A86A]/20"
                >
                  <NextImage
                    src={currentWork.mainImage}
                    alt={lang === 'fr' ? currentWork.titleFr : currentWork.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  priority
                />
                  
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-white text-6xl"
                  >
                    +
                  </motion.div>
                </div>
              </motion.div>                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#C9A86A]/80 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 border border-white/20"
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#C9A86A]/80 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 border border-white/20"
                  aria-label="Next"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {isTrilogyArt && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-8"
                >
                  <p className="text-xs text-[#C9A86A] mb-3 tracking-widest uppercase">
                    {lang === 'fr' ? 'Vue d\'ensemble de la trilogie' : 'Trilogy Overview'}
                  </p>
                  <div className="relative aspect-16/5 rounded-xl overflow-hidden border border-[#C9A86A]/30 cursor-pointer hover:border-[#C9A86A] transition-colors duration-300">
                    <NextImage
                      src={trilogyImage}
                      alt="L'âme des jours trilogy"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 
                  ref={titleRef}
                  className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#C9A86A] via-white to-[#E6D8B4]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {lang === 'fr' ? currentWork.titleFr : currentWork.titleEn}
                </h3>

                {currentWork.collection && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm italic text-[#C9A86A] mb-3 tracking-wide"
                  >
                    {lang === 'fr' ? 'Collection: ' : 'Collection: '}{currentWork.collection}
                  </motion.p>
                )}

                <div 
                  ref={metaRef}
                  className="flex flex-wrap gap-4 text-sm text-white/60 mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    {currentWork.dimensions}
                  </span>
                  {currentWork.medium && (
                    <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                      {currentWork.medium}
                    </span>
                  )}
                </div>
              </div>

              <motion.div
                animate={{ height: "auto" }}
                className="h-px w-full bg-linear-to-r from-transparent via-[#C9A86A] to-transparent"
              />

              <p 
                ref={descRef}
                className="text-base md:text-lg leading-relaxed text-white/80"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {lang === 'fr' ? currentWork.descFr : currentWork.descEn}
              </p>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {detailView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 md:p-4"
            onClick={() => setDetailView(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: -5 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-3xl max-h-[85vh] md:max-h-[80vh] bg-black/80 backdrop-blur-md rounded-2xl border border-[#C9A86A]/30 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDetailView(false)}
                className="absolute top-3 right-3 z-20 text-white/70 hover:text-white text-xl bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200"
                aria-label="Close"
              >
                ×
              </motion.button>

              <div className="flex flex-col h-full max-h-[85vh] md:max-h-[80vh] overflow-y-auto">
                {/* Image Section - Compact */}
                <div className="relative bg-black p-4 md:p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={detailImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full aspect-square md:aspect-4/3"
                    >
                      <NextImage
                        src={currentWork.id.startsWith('p9-') ? currentWork.mainImage : (currentWork.detailImages[detailImageIndex] || currentWork.mainImage)}
                        alt={`${lang === 'fr' ? 'Détail' : 'Detail'} ${detailImageIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {!currentWork.id.startsWith('p9-') && currentWork.detailImages.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.15, x: -4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDetailPrev}
                        className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#C9A86A]/90 backdrop-blur-sm text-white p-2.5 rounded-full transition-all duration-200"
                        aria-label="Previous detail"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.15, x: 4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDetailNext}
                        className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#C9A86A]/90 backdrop-blur-sm text-white p-2.5 rounded-full transition-all duration-200"
                        aria-label="Next detail"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>

                      {/* Image Counter */}
                      {!currentWork.id.startsWith('p9-') && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full">
                          <span className="text-white text-xs font-medium">
                            {detailImageIndex + 1} / {currentWork.detailImages.length}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Info Section - More Compact */}
                <div className="p-4 md:p-5 bg-linear-to-b from-[#0a0a0a] to-black space-y-3">
                  {/* Title and Collection */}
                  <div>
                    <h2 
                      className="text-xl md:text-2xl font-bold leading-tight text-[#C9A86A] mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {lang === 'fr' ? currentWork.titleFr : currentWork.titleEn}
                    </h2>

                    {currentWork.collection && (
                      <p className="text-[10px] md:text-xs text-[#C9A86A]/70 italic mb-2">
                        {currentWork.collection}
                      </p>
                    )}

                    {/* Metadata Badges - Compact */}
                    <div className="flex flex-wrap gap-1.5 text-[10px] md:text-xs">
                      <span className="px-2.5 py-1 bg-white/5 text-white/70 rounded-full border border-white/10">
                        {currentWork.dimensions}
                      </span>
                      {currentWork.medium && (
                        <span className="px-2.5 py-1 bg-white/5 text-white/70 rounded-full border border-white/10">
                          {currentWork.medium}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="h-px bg-linear-to-r from-transparent via-[#C9A86A]/30 to-transparent" />

                  {/* Description - Compact */}
                  <p 
                    className="text-xs md:text-sm leading-relaxed text-white/70"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {lang === 'fr' ? currentWork.descFr : currentWork.descEn}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
