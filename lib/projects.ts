import fs from "node:fs";
import path from "node:path";

export type ProjectId = `p${1|2|3|4|5|6|7|8|9}` | string;

function isImage(f: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(f);
}

export function getProjectDetailImages(project: ProjectId): string[] {
  const dir = path.join(process.cwd(), "public", "work", project, "detail");
  try {
    const files = fs.readdirSync(dir);
    return files.filter(isImage).sort().map((f) => `/work/${project}/detail/${f}`);
  } catch {
    return [];
  }
}

export function getProjectImages(project: ProjectId): string[] {
  // Special case p9: only detail images
  if (project === "p9") return getProjectDetailImages(project);
  const rootDir = path.join(process.cwd(), "public", "work", project);
  const detail = getProjectDetailImages(project);
  try {
    const files = fs.readdirSync(rootDir);
    const main = files.filter(isImage).filter((f) => f.startsWith(project)).sort();
    const mainPaths = main.map((f) => `/work/${project}/${f}`);
    return [...mainPaths, ...detail];
  } catch {
    return detail;
  }
}

export function getAllProjects(): string[] {
  const dir = path.join(process.cwd(), "public", "work");
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory() && /^p[1-9]$/.test(e.name)).map((e) => e.name).sort();
  } catch {
    return [];
  }
}
