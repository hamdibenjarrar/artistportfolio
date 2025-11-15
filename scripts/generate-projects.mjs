import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'public', 'work');
const outFile = path.join(process.cwd(), 'data', 'projects.json');

function isImage(f){ return /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(f); }

function scan(){
  const dirs = fs.readdirSync(root, { withFileTypes: true }).filter(d=>d.isDirectory() && /^p[1-9]$/.test(d.name));
  const data = dirs.map(d=>{
    const project = d.name;
    const mainFiles = fs.readdirSync(path.join(root, project)).filter(isImage);
    let detail = [];
    const detailDir = path.join(root, project, 'detail');
    if(fs.existsSync(detailDir)) detail = fs.readdirSync(detailDir).filter(isImage);
    return {
      id: project,
      main: mainFiles.map(f=>`/work/${project}/${f}`),
      detail: detail.map(f=>`/work/${project}/detail/${f}`)
    };
  }).sort((a,b)=> a.id.localeCompare(b.id));
  return data;
}

function ensureOutDir(){
  const dir = path.dirname(outFile);
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureOutDir();
const projects = scan();
fs.writeFileSync(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), projects }, null, 2));
console.log('Generated', outFile, 'with', projects.length, 'projects');