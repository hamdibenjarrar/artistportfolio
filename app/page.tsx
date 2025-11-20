import HeroModern from "@/components/HeroModern";
import { P9Carousel } from "@/components/P9Carousel";
import { FeaturedWorks } from "@/components/FeaturedWorks";
import ProjectHighlightSection from "@/components/ProjectHighlightSection";

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