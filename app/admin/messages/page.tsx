import { requireAdmin } from "@/lib/supabase/server";
import { deleteMessage } from "../actions";

export default async function Messages() {
  const { db } = await requireAdmin();
  const { data } = await db.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(200);
  return (
    <>
      <h1 className="font-display text-4xl font-bold uppercase">Messages</h1>
      <div className="mt-8 grid gap-4">
        {!data?.length && <p className="text-muted">No messages yet.</p>}
        {data?.map((m) => (
          <article key={m.id} className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <b>{m.name}</b>{" "}
                <a href={`mailto:${m.email}`} className="text-accent">{m.email}</a>
                {m.phone && <span className="text-muted"> · {m.phone}</span>}
                <div className="text-xs text-muted">
                  {new Date(m.created_at).toLocaleString()} {m.interest && `· ${m.interest}`}
                </div>
              </div>
              <form action={deleteMessage.bind(null, m.id)}>
                <button className="text-xs text-muted hover:text-red-400">Delete</button>
              </form>
            </div>
            {m.message && <p className="mt-3 whitespace-pre-wrap text-muted">{m.message}</p>}
          </article>
        ))}
      </div>
    </>
  );
}
