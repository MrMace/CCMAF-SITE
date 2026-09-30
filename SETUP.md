# CCMAF site: setup

Stack: Next.js 16 · Tailwind 4 · Supabase (content + admin login) · Resend (form emails) · Vercel (hosting).

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
```
It works with no setup, showing the built-in content. The steps below turn on the admin and the form.

## 1. Supabase (admin + saved edits + saved messages), free
1. Create a project at supabase.com.
2. SQL Editor > paste `supabase/schema.sql` > Run.
3. Authentication > Users > **Add user** (email + password). This is the admin login.
   Authentication > Sign In / Providers > turn **off** "Allow new users to sign up".
4. Project Settings > API: copy the URL and anon key into `.env.local` (see `.env.example`).
5. Visit `/admin`.

## 2. Resend (emails the form to the gym), free tier
1. Create an API key at resend.com.
2. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (where messages go) and `CONTACT_FROM_EMAIL`.
   To send from your own address, verify the domain in Resend first. Until then use `onboarding@resend.dev`
   (it can only email the address you signed up with).
Messages are also saved in Supabase and visible at `/admin/messages`.

## 3. Deploy on Vercel
Push to GitHub, import the repo in Vercel, add the same env vars, deploy. Point the domain at Vercel.

## Rebranding
- Colors: the variables at the top of `app/globals.css`.
- Logo: `components/Brand.tsx` and `public/img/`.
- Name, address, links: `/admin` > Contact & social.
- Default text and the schedule live in `lib/content.ts`; anything saved in `/admin` overrides it.
