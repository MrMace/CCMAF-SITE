"use client";

import { useState } from "react";

const field =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";

export default function ContactForm({ interests }: { interests: string[] }) {
  const [state, setState] = useState<{ kind: "idle" | "sending" | "ok" | "err"; msg?: string }>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (res.ok) {
        form.reset();
        setState({ kind: "ok", msg: "Thanks! We'll get back to you soon." });
      } else if (res.status === 429) {
        setState({ kind: "err", msg: "Too many attempts. Please try again in a few minutes." });
      } else {
        setState({ kind: "err", msg: "Something went wrong. Please check your details and try again." });
      }
    } catch {
      setState({ kind: "err", msg: "Network error. Please try again." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold">
          Name *
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Email *
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold">
          Phone
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Interested in
          <select name="interest" className={field} defaultValue="">
            <option value="">Not sure yet</option>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-semibold">
        Message
        <textarea name="message" rows={5} maxLength={4000} className={field} />
      </label>
      {/* Honeypot: hidden from people, bots fill it in */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
      <button
        type="submit"
        disabled={state.kind === "sending"}
        className="gold-bg rounded-full px-7 py-3.5 font-bold transition hover:brightness-110 disabled:opacity-60"
      >
        {state.kind === "sending" ? "Sending…" : "Send message"}
      </button>
      <p role="status" className={`min-h-6 text-sm ${state.kind === "ok" ? "text-emerald-400" : "text-red-400"}`}>
        {state.msg}
      </p>
    </form>
  );
}
