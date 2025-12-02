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
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <HeroModern />
      <FeaturedWorks />
      <P9Carousel />
      <ProjectHighlightSection />
    </main>
  );
}