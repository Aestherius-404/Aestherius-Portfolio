// src/actions/contactAction.ts
"use server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(10)
});

type ContactActionState = { ok: boolean; error?: string };

export async function saveContactMessage(
  _previousState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Invalid input" };

  await prisma.contactMessage.create({
    data: parsed.data
  });
  return { ok: true };
}
