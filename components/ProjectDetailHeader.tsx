"use client";
import { useLanguage } from "./i18n/LanguageProvider";
import { ProjectCopy } from "@/content/projects";

export default function ProjectDetailHeader({ copy }: { copy: ProjectCopy }) {
  const { lang } = useLanguage();
  return (
    <header className="mb-8">
      <h1 className="divider-line text-3xl md:text-4xl font-semibold">{lang === 'fr' ? copy.title.fr : copy.title.en}</h1>
      <div className="mt-4 flex items-center gap-6 text-sm">
        <span className={`flex items-center gap-2 ${copy.availability ? 'text-[#C9A86A]' : 'text-white/40'}`}>
          <span className={`inline-block size-2 rounded-full ${copy.availability ? 'bg-emerald-400' : 'bg-white/30'}`}></span>
          {copy.availability ? (lang === 'fr' ? 'Disponible' : 'Available') : (lang === 'fr' ? 'Archive' : 'Archive')}
        </span>
        <a href="/contact" className="text-white/80 hover:text-white underline underline-offset-4">{lang === 'fr' ? 'Contact' : 'Contact'}</a>
      </div>
      <p className="mt-4 max-w-2xl text-white/70">{lang === 'fr' ? copy.blurb.fr : copy.blurb.en}</p>
    </header>
  );
}
