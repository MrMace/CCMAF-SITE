import Link from "next/link";
import { logout } from "./actions";
import { supabaseConfigured } from "@/lib/supabase/public";
import { supabaseServer } from "@/lib/supabase/server";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let signedIn = false;
  if (supabaseConfigured()) {
    const db = await supabaseServer();
    signedIn = Boolean((await db.auth.getUser()).data.user);
  }
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5 text-sm">
          <Link href="/admin" className="font-display text-lg font-bold uppercase tracking-wide">
            Site <span className="text-accent">admin</span>
          </Link>
          <nav className="flex items-center gap-5 text-muted">
            <Link href="/" target="_blank" className="hover:text-ink">View site ↗</Link>
            {signedIn && (
              <>
                <Link href="/admin/messages" className="hover:text-ink">Messages</Link>
                <form action={logout}>
                  <button className="hover:text-ink">Sign out</button>
                </form>
              </>
            )}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-5 py-10">{children}</div>
    </div>
  );
}
