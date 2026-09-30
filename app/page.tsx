import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Dumbbell, MapPin, Shield, Swords, Users, Zap } from "lucide-react";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getContent } from "@/lib/content";

const icons = [Swords, Zap, Dumbbell, Shield, Users];

export default async function Home() {
  const [home, site, schedule, pricing] = await Promise.all([
    getContent("home"),
    getContent("site"),
    getContent("schedule"),
    getContent("pricing"),
  ]);

  return (
    <SiteFrame>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-32">
        {home.heroVideoId && (
          <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${home.heroVideoId}?autoplay=1&mute=1&loop=1&playlist=${home.heroVideoId}&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1`}
              title="Gym background video"
              tabIndex={-1}
              allow="autoplay; encrypted-media"
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/40" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_85%_0%,rgba(217,177,92,.18),transparent_60%),radial-gradient(700px_500px_at_0%_100%,rgba(217,177,92,.08),transparent_60%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_70%_30%,#000,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.2em] text-accent">{home.heroEyebrow}</span>
            <h1 className="mt-4 font-display text-[clamp(3.4rem,10vw,7.5rem)] font-extrabold uppercase leading-[.92]">
              {home.heroTitleLine1}
              <br />
              <span className="gold-text">{home.heroTitleLine2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{home.heroText}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#contact" className="gold-bg inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold transition hover:brightness-110">
                Book your free first class <ArrowRight size={18} />
              </Link>
              <Link href="#pricing" className="rounded-full border border-line px-7 py-3.5 font-semibold transition hover:border-muted">
                View memberships
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
              {home.stats.map((s) => (
                <div key={s.label}>
                  <b className="block font-display text-4xl font-extrabold">{s.value}</b>
                  <span className="text-sm text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[2rem] border border-line lg:block">
            <Image src="/img/front.png" alt={`${site.name} entrance`} fill priority sizes="40vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-sm text-ink">
              <MapPin size={16} className="text-accent" /> {site.address}
            </div>
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="border-y border-line bg-surface py-14">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-muted">Proud affiliate</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { src: "/img/10th-planet.jpg", alt: "10th Planet Jiu Jitsu Indianapolis" },
            ].map((a) => (
              <div key={a.src} className="relative h-28 w-44 overflow-hidden rounded-2xl border border-line bg-black sm:h-32 sm:w-52">
                <Image src={a.src} alt={a.alt} fill sizes="208px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes */}
      <section id="classes" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[.2em] text-accent">Classes</span>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase md:text-6xl">{home.programsTitle}</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">{home.programsText}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {home.programs.map((p, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={p.title} delay={i * 60}>
                  <article className="group h-full rounded-3xl border border-line bg-surface p-7 transition hover:-translate-y-1 hover:border-accent/50">
                    <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                      <Icon size={22} />
                    </span>
                    <h3 className="font-display text-2xl font-bold uppercase">{p.title}</h3>
                    <p className="mt-2 text-muted">{p.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="border-y border-line bg-surface py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[.2em] text-accent">Schedule</span>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase md:text-6xl">{schedule.title}</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">{schedule.text}</p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {schedule.days.map((d, i) => (
              <Reveal key={d.day} delay={i * 50}>
                <div className="h-full rounded-2xl border border-line bg-bg p-5">
                  <h3 className="mb-3 border-b border-line pb-3 font-display text-xl font-bold uppercase tracking-wide text-accent">
                    {d.day}
                  </h3>
                  <ul className="grid gap-2.5 text-sm">
                    {d.classes.map((c, j) => (
                      <li key={j} className="flex gap-3">
                        {c.time && <span className="w-16 shrink-0 font-semibold text-ink">{c.time}</span>}
                        <span className="text-muted">{c.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[.2em] text-accent">Membership</span>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase md:text-6xl">{pricing.title}</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">{pricing.text}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pricing.plans.map((p, i) => {
              const featured = Boolean(p.featured);
              return (
                <Reveal key={p.name} delay={i * 60}>
                  <article
                    className={`relative flex h-full flex-col rounded-3xl border p-7 ${
                      featured ? "border-accent bg-gradient-to-b from-accent/15 to-surface" : "border-line bg-surface"
                    }`}
                  >
                    {featured && (
                      <span className="gold-bg absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                        Best value
                      </span>
                    )}
                    <h3 className="font-display text-2xl font-bold uppercase">{p.name}</h3>
                    <div className="mt-2 font-display text-6xl font-extrabold">
                      {p.price}
                      <small className="font-sans text-base font-medium text-muted">/mo</small>
                    </div>
                    <p className="mb-6 mt-3 flex-1 text-muted">{p.text}</p>
                    <Link
                      href="#contact"
                      className={`rounded-full px-5 py-3 text-center font-bold transition ${
                        featured ? "gold-bg hover:brightness-110" : "border border-line hover:border-muted"
                      }`}
                    >
                      Get started
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-muted">{pricing.note}</p>
        </div>
      </section>

      {/* Free class banner */}
      <section className="gold-bg py-20 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-5xl font-extrabold uppercase md:text-6xl">{home.freeBannerTitle}</h2>
          <Link href="#contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-bg px-7 py-3.5 font-bold text-ink transition hover:opacity-90">
            {home.freeBannerButton} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[.2em] text-accent">Contact</span>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase md:text-6xl">{home.contactTitle}</h2>
            <p className="mt-3 max-w-md text-lg text-muted">{home.contactText}</p>
            <ul className="mt-8 grid gap-5 text-muted">
              <li>
                <b className="block text-ink">Visit us</b>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-accent"
                >
                  {site.address}
                </a>
              </li>
              {site.phone && (
                <li>
                  <b className="block text-ink">Call</b>
                  <a href={`tel:${site.phone}`} className="hover:text-accent">{site.phone}</a>
                </li>
              )}
              {site.email && (
                <li>
                  <b className="block text-ink">Email</b>
                  <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
                </li>
              )}
              <li>
                <b className="block text-ink">Follow along</b>
                <span className="flex gap-4">
                  {site.facebook && <a href={site.facebook} target="_blank" rel="noopener" className="hover:text-accent">Facebook</a>}
                  {site.instagram && <a href={site.instagram} target="_blank" rel="noopener" className="hover:text-accent">Instagram</a>}
                  {site.youtube && <a href={site.youtube} target="_blank" rel="noopener" className="hover:text-accent">YouTube</a>}
                </span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm interests={home.programs.map((p) => p.title)} />
          </Reveal>
        </div>
      </section>
    </SiteFrame>
  );
}
