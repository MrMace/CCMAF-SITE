import SiteFrame from "@/components/SiteFrame";
import { getContent } from "@/lib/content";

export const metadata = { title: "Remembrance | Circle City Martial Arts & Fitness" };

export default async function Remembrance() {
  const r = await getContent("remembrance");
  return (
    <SiteFrame>
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-40">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-accent">{r.eyebrow}</span>
        <h1 className="mt-4 font-display text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold uppercase leading-none">{r.title}</h1>
        <p className="mt-4 font-bold tracking-widest text-accent">{r.dates}</p>
        <div className="mt-8 grid gap-5 text-lg leading-relaxed text-muted">
          {r.paragraphs.map((p, i) => (
            <p key={i}>{p.text}</p>
          ))}
        </div>
      </article>
    </SiteFrame>
  );
}
