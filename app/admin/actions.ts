"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { defaults, type ContentKey } from "@/lib/content";
import { requireAdmin, supabaseServer } from "@/lib/supabase/server";

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const db = await supabaseServer();
  const { error } = await db.auth.signInWithPassword({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (error) return { error: "Invalid email or password." };
  redirect("/admin");
}

export async function logout() {
  const db = await supabaseServer();
  await db.auth.signOut();
  redirect("/admin/login");
}

export async function saveContent(key: ContentKey, value: unknown) {
  if (!(key in defaults)) return { error: "Unknown section." };
  const { db } = await requireAdmin();
  const { error } = await db
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function resetContent(key: ContentKey) {
  const { db } = await requireAdmin();
  const { error } = await db.from("site_content").delete().eq("key", key);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteMessage(id: number) {
  const { db } = await requireAdmin();
  await db.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}
