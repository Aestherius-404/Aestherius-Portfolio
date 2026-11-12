// src/app/projects/[slug]/page.tsx
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return <div className="p-20 text-center text-2xl">Ooops! We don't have that one yet.<br></br> <span>stay tuned for more!</span></div>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/projects" className="text-gray-500 mb-6 inline-block">← Back to projects</Link>
      <h1 className="text-4xl font-bold">{project.title}</h1>
      {project.imageUrl && <Image src={project.imageUrl} alt={project.title} width={900} height={500} className="w-full rounded mt-6" />}
      <p className="mt-6 text-lg">{project.description}</p>
      <div className="mt-8 flex gap-4">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" className="bg-black text-white px-5 py-2 rounded">Live Demo</a>}
        {project.githubUrl && <a href={project.githubUrl} target="_blank" className="border px-5 py-2 rounded">GitHub</a>}
      </div>
    </main>
  );
}
