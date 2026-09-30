import LoginForm from "./LoginForm";
import { supabaseConfigured } from "@/lib/supabase/public";

export default function LoginPage() {
  if (!supabaseConfigured()) {
    return <p className="text-muted">Supabase isn&apos;t configured yet. See SETUP.md.</p>;
  }
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-display text-4xl font-bold uppercase">Sign in</h1>
      <LoginForm />
    </div>
  );
}
