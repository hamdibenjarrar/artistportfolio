"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function JardinDAfrique() {
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Content sections animation
      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll(".fade-in"), {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
          },
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
        });
      }

      // Images gallery animation
      if (imagesRef.current) {
        gsap.from(imagesRef.current.querySelectorAll(".image-item"), {
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top 75%",
          },
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        });
      }
    });

    return () => ctx.revert();
  }, [mounted]);

  const content = {
    title: {
      fr: "Jardin d'Afrique",
      en: "Jardin d'Afrique",
    },
    subtitle: {
      fr: "Un parcours entre art, mémoire et rencontres exceptionnelles",
      en: "A journey between art, memory and exceptional encounters",
    },
    intro: {
      title: {
        fr: "Là où l'art rencontre la mémoire",
        en: "Where art meets memory",
      },
      p1: {
        fr: "Il existe des projets qui ne ressemblent à aucun autre. Des projets où l'art devient silence, lumière, humanité.",
        en: "There are projects like no other. Projects where art becomes silence, light, humanity.",
      },
      p2: {
        fr: "Jardin d'Afrique fait partie de ces œuvres rares. Un lieu pensé comme un sanctuaire pour les migrants disparus, imaginé et conçu par l'artiste Rachid Koraïchi.",
        en: "Jardin d'Afrique is one of these rare works. A place conceived as a sanctuary for missing migrants, imagined and designed by artist Rachid Koraïchi.",
      },
      p3: {
        fr: "Yassine y a trouvé un espace où son regard d'artiste pouvait rencontrer quelque chose de plus grand que lui : un projet qui touche, qui marque, qui transforme.",
        en: "Yassine found a space where his artist's eye could meet something greater than himself: a project that touches, marks, transforms.",
      },
    },
    presence: {
      title: {
        fr: "Une présence artistique au cœur d'une œuvre universelle",
        en: "An artistic presence at the heart of a universal work",
      },
      p1: {
        fr: "Le travail de Yassine dans ce projet n'était pas une simple participation. C'était une immersion profonde : observer, comprendre, traduire l'esprit du lieu, contribuer à la mise en valeur des installations et accompagner la réalisation de plusieurs éléments visuels liés au projet.",
        en: "Yassine's work on this project was not a simple participation. It was a deep immersion: observing, understanding, translating the spirit of the place, contributing to the enhancement of installations and accompanying the realization of several visual elements related to the project.",
      },
      p2: {
        fr: "À travers ce chemin, il a développé une sensibilité différente — un rapport plus humain, plus silencieux, plus responsable à l'art.",
        en: "Through this path, he developed a different sensitivity — a more human, more silent, more responsible relationship to art.",
      },
      p3: {
        fr: "Jardin d'Afrique est devenu un passage, une empreinte sur son parcours.",
        en: "Jardin d'Afrique became a passage, an imprint on his journey.",
      },
    },
    award: {
      title: {
        fr: "Aga Khan Award 2022 — Une reconnaissance mondiale",
        en: "Aga Khan Award 2022 — A worldwide recognition",
      },
      p1: {
        fr: "En 2022, Jardin d'Afrique reçoit l'une des distinctions les plus prestigieuses au monde :",
        en: "In 2022, Jardin d'Afrique received one of the most prestigious awards in the world:",
      },
      prize: {
        fr: "Aga Khan Award for Architecture – 2022",
        en: "Aga Khan Award for Architecture – 2022",
      },
      p2: {
        fr: "Une reconnaissance qui célèbre les projets alliant humanité, architecture, spiritualité et impact social.",
        en: "A recognition that celebrates projects combining humanity, architecture, spirituality and social impact.",
      },
      p3: {
        fr: "Lors des événements officiels liés au prix, Yassine est invité à représenter son travail au sein du projet. Ces moments ont donné naissance à des rencontres mémorables avec des architectes, musiciens, créateurs et penseurs venus du monde entier.",
        en: "During official events related to the award, Yassine was invited to represent his work within the project. These moments gave birth to memorable encounters with architects, musicians, creators and thinkers from around the world.",
      },
    },
    encounters: {
      title: {
        fr: "Rencontres — Quand l'art rassemble les voix du monde",
        en: "Encounters — When art brings together voices of the world",
      },
      p1: {
        fr: "Durant les cérémonies et expositions autour du prix, Yassine a eu l'occasion d'échanger avec des figures majeures de la scène artistique internationale :",
        en: "During the ceremonies and exhibitions around the award, Yassine had the opportunity to exchange with major figures of the international artistic scene:",
      },
      artists: {
        fr: "Rachid Koraïchi, Andra Matin, David García Martínez, Yahya Hussein Abdallah, Dhafer Youssef",
        en: "Rachid Koraïchi, Andra Matin, David García Martínez, Yahya Hussein Abdallah, Dhafer Youssef",
      },
      p2: {
        fr: "Ces rencontres ne sont pas de simples photos : ce sont des moments que l'on retient toute une vie. Des conversations, des rires, des instants suspendus où chacun partage ce qui fait la profondeur de son art.",
        en: "These encounters are not simple photos: they are moments that one remembers for a lifetime. Conversations, laughter, suspended moments where everyone shares what makes the depth of their art.",
      },
    },
    book: {
      title: {
        fr: "Une mémoire imprimée",
        en: "A printed memory",
      },
      p1: {
        fr: "Plusieurs pages du livre officiel du Aga Khan Music Award témoignent du passage de Yassine dans ce projet.",
        en: "Several pages of the official book of the Aga Khan Music Award testify to Yassine's passage in this project.",
      },
      p2: {
        fr: "Ces archives sont aujourd'hui une partie essentielle de son histoire artistique.",
        en: "These archives are today an essential part of his artistic history.",
      },
    },
    why: {
      title: {
        fr: "Pourquoi ce projet compte autant",
        en: "Why this project matters so much",
      },
      p1: {
        fr: "Jardin d'Afrique n'est pas une ligne dans un CV. Ce n'est pas un projet parmi d'autres.",
        en: "Jardin d'Afrique is not a line in a CV. It is not just another project.",
      },
      p2: {
        fr: "C'est une expérience profonde qui a façonné sa vision, qui a renforcé sa sensibilité à la compassion, à la mémoire, à la responsabilité de l'art.",
        en: "It is a profound experience that shaped his vision, that strengthened his sensitivity to compassion, memory, and the responsibility of art.",
      },
      p3: {
        fr: "Yassine raconte souvent que ce projet lui a appris une chose essentielle : l'art n'est pas seulement fait pour être vu — il est fait pour être transmis.",
        en: "Yassine often says that this project taught him one essential thing: art is not only made to be seen — it is made to be transmitted.",
      },
    },
    conclusion: {
      title: {
        fr: "Une histoire qui continue",
        en: "A story that continues",
      },
      p1: {
        fr: "Travailler au sein du projet de Rachid Koraïchi, être présent lors du Aga Khan Award, rencontrer des artistes d'exception… tout cela a construit un chapitre unique de son parcours.",
        en: "Working within Rachid Koraïchi's project, being present at the Aga Khan Award, meeting exceptional artists... all this built a unique chapter of his journey.",
      },
      p2: {
        fr: "Ce projet n'a jamais quitté Yassine. Il continue d'inspirer ses œuvres, ses choix, sa manière de regarder le monde.",
        en: "This project has never left Yassine. It continues to inspire his works, his choices, his way of looking at the world.",
      },
      p3: {
        fr: "Et cette page existe pour transmettre cette lumière.",
        en: "And this page exists to transmit this light.",
      },
    },
  };

  const portraitImages = [
    { src: "/yr.jpeg", name: "Rachid Koraïchii" },
    { src: "/yd.jpeg", name: "Dhafer Youssef" },
    { src: "/ya.jpeg", name: "Andra Matin" },
    { src: "/yy.jpeg", name: "Yahya Hussein Abdallah" },
    { src: "/ydd.jpeg", name: "David García Martínez" },
  ];
  const bookImages = ["/bookimage.jpeg", "/cover.jpeg", "/zoom.jpeg"];

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setLang("fr")}
          className={`px-4 py-2 font-heading text-sm tracking-wider uppercase transition-all duration-300 ${
            !mounted || lang === "fr"
              ? "bg-[#C9A86A] text-[#0a0a0a]"
              : "bg-transparent text-[#C9A86A] border border-[#C9A86A]"
          }`}
        >
          FR
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-4 py-2 font-heading text-sm tracking-wider uppercase transition-all duration-300 ${
            !mounted || lang === "fr"
              ? "bg-transparent text-[#C9A86A] border border-[#C9A86A]"
              : "bg-[#C9A86A] text-[#0a0a0a]"
          }`}
        >
          EN
        </button>
      </div>

      {/* Hero with Book Background */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/book.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 md:pb-16">
          <motion.h1
            className="font-display text-3xl md:text-5xl text-[#C9A86A] mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {content.title[lang]}
          </motion.h1>
          <motion.p
            className="font-body text-base md:text-lg text-[#E6D8B4] italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {content.subtitle[lang]}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-16 md:py-20 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="space-y-12 font-body text-base md:text-lg leading-relaxed text-white">
          {/* Introduction */}
          <div className="fade-in space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-[#C9A86A] mb-4">
              {content.intro.title[lang]}
            </h2>
            <p>{content.intro.p1[lang]}</p>
            <p>{content.intro.p2[lang]}</p>
            <p>{content.intro.p3[lang]}</p>
          </div>

          {/* Presence */}
          <div className="fade-in space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-[#C9A86A] mb-4">
              {content.presence.title[lang]}
            </h2>
            <p>{content.presence.p1[lang]}</p>
            <p>{content.presence.p2[lang]}</p>
            <p className="italic">{content.presence.p3[lang]}</p>
          </div>

          {/* Award */}
          <div className="fade-in space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-[#C9A86A] mb-4">
              {content.award.title[lang]}
            </h2>
            <p>{content.award.p1[lang]}</p>
            <motion.div
              className="my-8 p-8 overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: "url(/cover.jpeg)" }}
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#C9A86A]/20 to-transparent" />
              <div className="relative">
                <p className="text-3xl mb-4">🏆</p>
                <p className="text-xl font-heading text-[#C9A86A]">
                  {content.award.prize[lang]}
                </p>
              </div>
            </motion.div>
            <p>{content.award.p2[lang]}</p>
            <p>{content.award.p3[lang]}</p>
          </div>

          {/* Encounters */}
          <div className="fade-in space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-[#C9A86A] mb-4">
              {content.encounters.title[lang]}
            </h2>
            <p>{content.encounters.p1[lang]}</p>
            <p className="italic text-[#C9A86A]">{content.encounters.artists[lang]}</p>
            <p>{content.encounters.p2[lang]}</p>
          </div>
        </div>
      </section>

      {/* Portrait Gallery */}
      <section ref={imagesRef} className="relative py-12 px-6">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: "url(/memorie.jpeg)" }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {portraitImages.map((image, idx) => (
              <motion.div
                key={idx}
                className="image-item group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-square overflow-hidden mb-2">
                  <Image
                    src={image.src}
                    alt={image.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-xs md:text-sm font-heading text-transparent bg-clip-text bg-linear-to-r from-[#C9A86A] to-[#E6D8B4] text-center font-semibold">
                  {image.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Images - Moved Here */}
      <section className="relative py-12 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url(/door.jpeg)" }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {bookImages.map((src, idx) => (
              <motion.div
                key={idx}
                className="relative aspect-3/4 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={src}
                  alt={`Book ${idx + 1}`}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* More Content */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="space-y-12 font-body text-base md:text-lg leading-relaxed text-white">
          {/* Book */}
          <div className="fade-in space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-[#C9A86A] mb-4">
              {content.book.title[lang]}
            </h2>
            <p>{content.book.p1[lang]}</p>
            <p className="italic">{content.book.p2[lang]}</p>
          </div>
        </div>
      </section>

      {/* Final Content */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="space-y-12 font-body text-base md:text-lg leading-relaxed text-white">
          {/* Why */}
          <div className="fade-in space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-[#C9A86A] mb-4">
              {content.why.title[lang]}
            </h2>
            <p>{content.why.p1[lang]}</p>
            <p>{content.why.p2[lang]}</p>
            <p className="italic">{content.why.p3[lang]}</p>
          </div>

          {/* Conclusion */}
          <div className="fade-in space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-[#C9A86A] mb-4">
              {content.conclusion.title[lang]}
            </h2>
            <p>{content.conclusion.p1[lang]}</p>
            <p>{content.conclusion.p2[lang]}</p>
            <p className="italic">{content.conclusion.p3[lang]}</p>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <section className="py-16 px-6 text-center">
        <Link href="/">
          <motion.button
            className="px-12 py-4 bg-[#C9A86A] text-[#0a0a0a] font-heading text-base md:text-lg tracking-wide uppercase transition-all duration-300 hover:brightness-110 shadow-lg hover:shadow-[0_0_30px_rgba(201,168,106,0.4)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {!mounted || lang === "fr" ? "Retour à l'accueil" : "Back to Home"}
          </motion.button>
        </Link>
      </section>
    </main>
  );
}
