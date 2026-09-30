import Link from "next/link";
import { contentLabels, type ContentKey } from "@/lib/content";
import { supabaseConfigured } from "@/lib/supabase/public";
import { requireAdmin } from "@/lib/supabase/server";

export default async function AdminHome() {
  if (!supabaseConfigured()) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6">
        <h1 className="font-display text-3xl font-bold uppercase">Admin isn&apos;t set up yet</h1>
        <p className="mt-2 text-muted">
          Add your Supabase keys to <code>.env.local</code> (see <code>.env.example</code> and SETUP.md), then restart the server.
          Until then the site shows its built-in content.
        </p>
      </div>
    );
  }
  await requireAdmin();
  return (
    <>
      <h1 className="font-display text-4xl font-bold uppercase">Edit your site</h1>
      <p className="mt-2 text-muted">Pick a section. Changes go live as soon as you save.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {(Object.keys(contentLabels) as ContentKey[]).map((k) => (
          <Link key={k} href={`/admin/edit/${k}`} className="rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/60">
            <h2 className="font-display text-2xl font-bold uppercase">{contentLabels[k].title}</h2>
            <p className="mt-1 text-sm text-muted">{contentLabels[k].hint}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
