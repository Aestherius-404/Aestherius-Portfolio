import Link from 'next/link'
import prisma from '@/lib/prisma'
import { createServerClient } from '@/lib/supabase'

export default async function AdminDashboard() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const projectCount = await prisma.project.count()
  const messageCount = await prisma.contactMessage.count()

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Logged in: {user?.email}</p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="border p-6 rounded-lg">
          <p className="text-gray-500">Total Projects</p>
          <p className="text-3xl font-bold">{projectCount}</p>
        </div>
        <div className="border p-6 rounded-lg">
          <p className="text-gray-500">Messages</p>
          <p className="text-3xl font-bold">{messageCount}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link href="/admin/projects/new" className="bg-black text-white px-5 py-3 rounded w-fit">
          Create New Project
        </Link>
        <Link href="/admin/projects" className="border px-5 py-3 rounded w-fit">
          Manage Projects
        </Link>
        <Link href="/admin/messages" className="border px-5 py-3 rounded w-fit">
          View Messages
        </Link>
      </div>
    </div>
  )
}
