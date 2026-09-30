"use client";

import { useActionState } from "react";
import { login } from "../actions";

const field = "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-accent";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 grid gap-4">
      <input name="email" type="email" placeholder="Email" required autoComplete="email" className={field} />
      <input name="password" type="password" placeholder="Password" required autoComplete="current-password" className={field} />
      <button disabled={pending} className="gold-bg rounded-full px-6 py-3 font-bold disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
    </form>
  );
}
