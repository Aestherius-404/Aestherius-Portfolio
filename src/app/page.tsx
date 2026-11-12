import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@prisma/client";

async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 3
  });
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <main className="min-h-screen">
      {/* i'm the hero */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold">Hi, I’m Jonas</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Full-stack developer building web apps with Next.js, Prisma & Supabase.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/projects" className="bg-black text-white px-6 py-3 rounded">
              View Projects
            </Link>
            <Link href="/contact" className="border border-black px-6 py-3 rounded">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* THE ones */}
      <section className="py-16 px-6 bg-gray-800 rounded-2xl hover:shadow-lg transition">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Featured Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project: Project) => (
              <Link href={`/projects/${project.slug}`} key={project.id} className="bg-white p-5 rounded shadow">
                {project.imageUrl && (
                  <Image src={project.imageUrl} alt={project.title} width={400} height={220} className="rounded w-full h-48 object-cover" />
                )}
                <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
