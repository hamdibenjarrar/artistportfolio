import HeroModern from "@/components/HeroModern";
import { P9Carousel } from "@/components/P9Carousel";
import { FeaturedWorks } from "@/components/FeaturedWorks";
import ProjectHighlightSection from "@/components/ProjectHighlightSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yassine Radhouani - Artist & Architect Portfolio",
  description: "Explore the works of Yassine Radhouani, a Tunisian artist and architect known for his abstract expressionism and Aga Khan Award-winning projects.",
  alternates: {
    canonical: "https://www.yassineradhouani.me",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yassine Radhouani",
    "url": "https://www.yassineradhouani.me",
    "jobTitle": "Artist & Architect",
    "sameAs": [
      "https://www.instagram.com/radhouaniyassine/",
      "https://www.linkedin.com/in/yassine-radhouani"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Yassine Radhouani Studio"
    },
    "description": "Tunisian artist and architect known for abstract expressionism and Aga Khan Award-winning projects."
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroModern />
      <FeaturedWorks />
      <P9Carousel />
      <ProjectHighlightSection />
    </main>
  );
}