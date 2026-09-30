"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Brand from "./Brand";

const links = [
  { href: "/#classes", label: "Classes" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#pricing", label: "Membership" },
  { href: "/remembrance", label: "Remembrance" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="Home">
          <Brand name={name} />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-muted transition hover:text-ink">
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" className="gold-bg rounded-full px-5 py-2 text-sm font-bold transition hover:brightness-110">
            Free class
          </Link>
        </nav>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-line bg-bg px-5 py-6 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg text-ink">
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)} className="gold-bg rounded-full px-5 py-3 text-center font-bold">
            Free class
          </Link>
        </nav>
      )}
    </header>
  );
}
