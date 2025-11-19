import HeroModern from "@/components/HeroModern";
import { P9Carousel } from "@/components/P9Carousel";
import { FeaturedWorks } from "@/components/FeaturedWorks";

function getP9Images(): string[] {
  // Static array to prevent server-side bundling of images
  return [
    "/work/p9/IMG_8545_result.jpg",
    "/work/p9/IMG_8547_result.jpg",
    "/work/p9/IMG_8551_result.jpg",
    "/work/p9/IMG_8553_result.jpg",
    "/work/p9/IMG_8556_result.jpg",
    "/work/p9/IMG_8561_result.jpg",
    "/work/p9/IMG_8563_result.jpg",
    "/work/p9/IMG_8566_result.jpg",
    "/work/p9/IMG_8571_result.jpg",
    "/work/p9/IMG_8572_result.jpg",
    "/work/p9/IMG_8574_result.jpg",
    "/work/p9/IMG_8577_result.jpg",
    "/work/p9/IMG_8579_result.jpg",
    "/work/p9/IMG_8581_result.jpg",
    "/work/p9/IMG_8583_result.jpg",
    "/work/p9/IMG_8587_result.jpg",
    "/work/p9/IMG_8589_result.jpg",
    "/work/p9/IMG_8591_result.jpg",
    "/work/p9/IMG_8592_result.jpg",
    "/work/p9/IMG_8593_result.jpg",
    "/work/p9/IMG_8594_result.jpg",
    "/work/p9/IMG_8595_result.jpg",
    "/work/p9/IMG_8596_result.jpg",
    "/work/p9/IMG_8598_result.jpg",
    "/work/p9/IMG_8599_result.jpg",
    "/work/p9/IMG_8600_result.jpg",
    "/work/p9/IMG_8602_result.jpg",
    "/work/p9/IMG_8603_result.jpg",
    "/work/p9/IMG_8604_result.jpg",
    "/work/p9/IMG_8605_result.jpg",
    "/work/p9/IMG_8607_result.jpg",
    "/work/p9/IMG_8608_result.jpg",
    "/work/p9/IMG_8609_result.jpg",
    "/work/p9/IMG_8610_result.jpg",
    "/work/p9/IMG_8611_result.jpg",
    "/work/p9/IMG_8615_result.jpg",
    "/work/p9/IMG_8616_result.jpg",
    "/work/p9/IMG_8617_result.jpg",
    "/work/p9/IMG_8619_result.jpg",
    "/work/p9/IMG_8620_result.jpg",
    "/work/p9/IMG_8621_result.jpg"
  ];
}

export default function HomePage() {
  const p9Images = getP9Images();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <HeroModern />
      <P9Carousel images={p9Images} />
      <FeaturedWorks />
    </main>
  );
}