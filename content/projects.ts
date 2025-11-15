export type Bilingual = { en: string; fr: string };

export type ProjectCopy = {
  id: string; // p1..p9
  title: Bilingual;
  blurb: Bilingual;
  availability: boolean; // true => available, false => archive
};

export const PROJECTS_COPY: ProjectCopy[] = [
  {
    id: "p1",
    title: { en: "Desert Light Pavilion", fr: "Pavillon de Lumière du Désert" },
    blurb: {
      en: "A study in shadows and thresholds — where sand, light, and brass lines define a silent geometry.",
      fr: "Une étude d'ombres et de seuils — où le sable, la lumière et des lignes de laiton dessinent une géométrie silencieuse.",
    },
    availability: true,
  },
  {
    id: "p2",
    title: { en: "Stone and Silence", fr: "Pierre et Silence" },
    blurb: {
      en: "Monolithic planes carve inhabitable calm; every edge breathes with measured intention.",
      fr: "Des plans monolithiques sculptent un calme habitable ; chaque arête respire une intention mesurée.",
    },
    availability: true,
  },
  {
    id: "p3",
    title: { en: "Atrium of Bronze", fr: "Atrium de Bronze" },
    blurb: {
      en: "Warm metal cuts through charcoal depth, framing a choreography of light.",
      fr: "Un métal chaud tranche la profondeur charbon, cadrant une chorégraphie de lumière.",
    },
    availability: false,
  },
  {
    id: "p4",
    title: { en: "Beige Horizon House", fr: "Maison des Horizons Beiges" },
    blurb: {
      en: "Minimal mass, maximal atmosphere — architecture as quiet sculpture.",
      fr: "Masse minimale, atmosphère maximale — l’architecture comme sculpture silencieuse.",
    },
    availability: true,
  },
  {
    id: "p5",
    title: { en: "Courtyard in Charcoal", fr: "Cour Intérieure en Charbon" },
    blurb: {
      en: "A cloister of textured walls and soft voids, balancing restraint and warmth.",
      fr: "Un cloître de murs texturés et de vides doux, équilibrant retenue et chaleur.",
    },
    availability: false,
  },
  {
    id: "p6",
    title: { en: "Golden Thresholds", fr: "Seuils Dorés" },
    blurb: {
      en: "Bronze accents score the plan like notes, turning circulation into rhythm.",
      fr: "Des accents de bronze marquent le plan comme des notes, transformant la circulation en rythme.",
    },
    availability: true,
  },
  {
    id: "p7",
    title: { en: "The Quiet Gallery", fr: "La Galerie Silencieuse" },
    blurb: {
      en: "White, charcoal, and beige converse in measured intervals of light.",
      fr: "Le blanc, le charbon et le beige conversent en intervalles mesurés de lumière.",
    },
    availability: true,
  },
  {
    id: "p8",
    title: { en: "Sandstone Lines", fr: "Lignes de Grès" },
    blurb: {
      en: "A linear promenade of textures, tuned by shadows.",
      fr: "Une promenade linéaire de textures, accordée par les ombres.",
    },
    availability: false,
  },
  {
    id: "p9",
    title: { en: "Architectural Still Life", fr: "Nature Morte Architecturale" },
    blurb: {
      en: "Frames within frames; an observatory for the poetics of structure.",
      fr: "Des cadres dans les cadres ; un observatoire pour la poétique de la structure.",
    },
    availability: true,
  },
];
