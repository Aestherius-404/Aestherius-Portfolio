// src/app/projects/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-12">All Projects</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <Link href={`/projects/${p.slug}`} key={p.id} className="border rounded p-6 hover:shadow-lg transition">
            {p.imageUrl && <Image src={p.imageUrl} alt={p.title} width={500} height={280} className="w-full h-52 object-cover rounded" />}
            <h2 className="text-2xl font-semibold mt-4">{p.title}</h2>
            <p className="text-gray-600 mt-2">{p.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
