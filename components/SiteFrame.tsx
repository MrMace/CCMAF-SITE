import Link from "next/link";
import { getContent } from "@/lib/content";
import Nav from "./Nav";

/** Nav + footer shared by the public pages. */
export default async function SiteFrame({ children }: { children: React.ReactNode }) {
  const site = await getContent("site");
  return (
    <>
      <Nav name={site.shortName} />
      <main>{children}</main>
      <footer className="border-t border-line py-10 text-sm text-muted">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.address}
          </p>
          <div className="flex gap-6">
            {site.facebook && <a href={site.facebook} target="_blank" rel="noopener" className="hover:text-ink">Facebook</a>}
            {site.instagram && <a href={site.instagram} target="_blank" rel="noopener" className="hover:text-ink">Instagram</a>}
            {site.youtube && <a href={site.youtube} target="_blank" rel="noopener" className="hover:text-ink">YouTube</a>}
            <Link href="/remembrance" className="hover:text-ink">Remembrance</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
