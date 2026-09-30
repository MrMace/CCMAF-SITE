import Link from "next/link";
import { notFound } from "next/navigation";
import { contentLabels, defaults, getContent, type ContentKey } from "@/lib/content";
import { requireAdmin } from "@/lib/supabase/server";
import Editor from "./Editor";

export default async function EditPage({ params }: PageProps<"/admin/edit/[key]">) {
  const { key } = await params;
  if (!(key in defaults)) notFound();
  await requireAdmin();
  const k = key as ContentKey;
  const value = await getContent(k);
  return (
    <>
      <Link href="/admin" className="text-sm text-muted hover:text-ink">← All sections</Link>
      <h1 className="mt-3 font-display text-4xl font-bold uppercase">{contentLabels[k].title}</h1>
      <p className="mt-1 text-muted">{contentLabels[k].hint}</p>
      <Editor contentKey={k} initial={value} template={defaults[k]} />
    </>
  );
}
