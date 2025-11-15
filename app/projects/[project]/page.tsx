import { notFound } from "next/navigation";
import { PROJECTS_COPY } from "@/content/projects";
import { getProjectImages } from "@/lib/projects";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import ProjectDetailHeader from "@/components/ProjectDetailHeader";

type Params = { project: string };

export default function ProjectDetailPage({ params }: { params: Params }) {
  const id = params.project;
  const copy = PROJECTS_COPY.find((p) => p.id === id);
  const images = getProjectImages(id);
  if (!copy || images.length === 0) return notFound();
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <ProjectDetailHeader copy={copy} />
      <ProjectDetailClient images={images} blurb={copy.blurb} />
    </div>
  );
}
