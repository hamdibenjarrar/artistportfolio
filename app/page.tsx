import HeroModern from "@/components/HeroModern";
import { P9Carousel } from "@/components/P9Carousel";
import { FeaturedWorks } from "@/components/FeaturedWorks";
import fs from 'fs';
import path from 'path';

// Currently unused - keeping for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function collectWorkImages(): string[] {
  const publicRoot = path.join(process.cwd(), 'public');
  const root = path.join(publicRoot, 'work');
  const allowed = new Set(['.jpg','.jpeg','.png','.webp']);
  const files: string[] = [];
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) stack.push(full); else {
        const ext = path.extname(full).toLowerCase();
        if (allowed.has(ext)) {
          const rel = '/' + path.relative(publicRoot, full).replace(/\\/g,'/');
          files.push(rel);
        }
      }
    }
  }
  return files.sort();
}

function collectP9Images(): string[] {
  const publicRoot = path.join(process.cwd(), 'public');
  const p9Root = path.join(publicRoot, 'work', 'p9');
  const allowed = new Set(['.jpg','.jpeg','.png','.webp']);
  const files: string[] = [];
  
  if (fs.existsSync(p9Root)) {
    const stack = [p9Root];
    while (stack.length) {
      const dir = stack.pop()!;
      for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) stack.push(full); else {
          const ext = path.extname(full).toLowerCase();
          if (allowed.has(ext)) {
            const rel = '/' + path.relative(publicRoot, full).replace(/\\/g,'/');
            files.push(rel);
          }
        }
      }
    }
  }
  return files.sort();
}

export default async function HomePage() {
  const p9Images = collectP9Images();

  return (
    <main className="min-h-screen bg-white">
      <HeroModern />
      <P9Carousel images={p9Images} />
      <FeaturedWorks />
    </main>
  );
}