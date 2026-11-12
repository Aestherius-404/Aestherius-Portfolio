"use client";
import { useActionState } from "react";
import { saveContactMessage } from "@/actions/contactAction";

const initialState = { ok: false, error: "" };

export default function ContactPage() {
  const [state, formAction] = useActionState(saveContactMessage, initialState);

  return (
    <main className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <form action={formAction} className="space-y-5">
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" required className="w-full border p-3 rounded" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input name="email" type="email" required className="w-full border p-3 rounded" />
        </div>
        <div>
          <label className="block mb-1">Message</label>
          <textarea name="message" rows={5} required className="w-full border p-3 rounded"></textarea>
        </div>
        <button type="submit" className="bg-black text-white px-6 py-3 rounded">Send Message</button>
      </form>
      {state.ok && <p className="mt-4 text-green-600">Message saved successfully!</p>}
      {state.error && <p className="mt-4 text-red-600">{state.error}</p>}
    </main>
  );
}
