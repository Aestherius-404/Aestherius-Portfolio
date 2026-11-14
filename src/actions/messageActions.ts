'use server'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function markRead(id: string) {
  await requireAdmin()
  await prisma.contactMessage.update({ where: { id }, data: { read: true } })
  revalidatePath('/admin/messages')
}

export async function deleteMessage(id: string) {
  await requireAdmin()
  await prisma.contactMessage.delete({ where: { id } })
  revalidatePath('/admin/messages')
}
