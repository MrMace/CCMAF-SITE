import { publicClient } from "@/lib/supabase/public";

// Best-effort per-instance rate limit: 5 submissions / 10 min / IP.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return Response.json({ error: "rate_limited" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: pretend success so bots move on.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const interest = clean(body.interest, 100);
  const message = clean(body.message, 4000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // 1) Save to the database so nothing is lost.
  let saved = false;
  const db = publicClient();
  if (db) {
    const { error } = await db.from("contact_messages").insert({ name, email, phone, interest, message });
    saved = !error;
    if (error) console.error("contact insert failed", error.message);
  }

  // 2) Email the gym via Resend.
  let emailed = false;
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || "onboarding@resend.dev",
        to: CONTACT_TO_EMAIL,
        reply_to: email,
        subject: `Website inquiry from ${name}`,
        html: `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone)}<br><b>Interested in:</b> ${esc(interest)}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
      }),
    });
    emailed = res.ok;
    if (!res.ok) console.error("resend failed", res.status, await res.text());
  }

  if (!saved && !emailed) {
    console.warn("Contact form: no Supabase or Resend configured. Message:", { name, email, phone, interest, message });
    // In local dev with nothing configured, still show success so the design can be reviewed.
    if (process.env.NODE_ENV === "production") {
      return Response.json({ error: "unavailable" }, { status: 503 });
    }
  }
  return Response.json({ ok: true });
}
