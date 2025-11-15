export default function ProjectPage({ params }: { params: { project: string } }) {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold">Project: {params.project}</h1>
      <p>This project page is under construction.</p>
    </div>
  );
}