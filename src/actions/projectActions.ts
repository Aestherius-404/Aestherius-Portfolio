'use server'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createProject(formData: FormData) {
  await requireAdmin()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const imageUrl = formData.get('imageUrl') as string || null
  const liveUrl = formData.get('liveUrl') as string || null
  const githubUrl = formData.get('githubUrl') as string || null
  const featured = formData.get('featured') === 'on'

  await prisma.project.create({
    data: { title, slug, description, content, imageUrl, liveUrl, githubUrl, featured }
  })

  revalidatePath('/projects')
  revalidatePath('/admin/projects')
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const imageUrl = formData.get('imageUrl') as string || null
  const liveUrl = formData.get('liveUrl') as string || null
  const githubUrl = formData.get('githubUrl') as string || null
  const featured = formData.get('featured') === 'on'

  await prisma.project.update({
    where: { id },
    data: { title, slug, description, content, imageUrl, liveUrl, githubUrl, featured }
  })

  revalidatePath('/projects')
  revalidatePath('/admin/projects')
}

export async function deleteProject(id: string) {
  await requireAdmin()
  await prisma.project.delete({ where: { id } })
  revalidatePath('/projects')
  revalidatePath('/admin/projects')
}
