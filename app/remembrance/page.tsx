import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import VideoEmbed from "@/components/VideoEmbed";
import { getContent } from "@/lib/content";

export const metadata = { title: "Remembrance | Circle City Martial Arts & Fitness" };

export default async function Remembrance() {
  const r = await getContent("remembrance");
  return (
    <SiteFrame>
      <article className="mx-auto max-w-5xl px-5 pb-24 pt-40">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_320px]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.2em] text-accent">{r.eyebrow}</span>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold uppercase leading-none">{r.title}</h1>
            <p className="mt-4 font-bold tracking-widest text-accent">{r.dates}</p>
            <div className="mt-8 grid gap-5 text-lg leading-relaxed text-muted">
              {r.paragraphs.map((p, i) => (
                <p key={i}>{p.text}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line md:order-last">
            <Image src="/img/king-jones.jpg" alt={r.title} fill sizes="320px" className="object-cover" />
          </div>
        </div>
        {r.videoUrl && (
          <div className="mt-14">
            <VideoEmbed url={r.videoUrl} poster="/img/king-jones.jpg" title={`${r.title} tribute`} />
          </div>
        )}
      </article>
    </SiteFrame>
  );
}
