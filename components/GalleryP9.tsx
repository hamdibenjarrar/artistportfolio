import { getProjectDetailImages } from "@/lib/projects";
import GalleryP9Client from "./GalleryP9Client";

export default function GalleryP9() {
  const imgs = getProjectDetailImages("p9");
  return <GalleryP9Client imageSources={imgs} />;
}
