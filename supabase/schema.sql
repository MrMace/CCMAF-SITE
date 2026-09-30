-- Run this once in Supabase: SQL Editor > New query > paste > Run.

create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  interest text,
  message text
);

alter table public.site_content enable row level security;
alter table public.contact_messages enable row level security;

-- Anyone can read page content.
create policy "public read content" on public.site_content
  for select using (true);

-- Only signed-in admins can edit content.
create policy "admin write content" on public.site_content
  for all to authenticated using (true) with check (true);

-- Anyone can submit the contact form; only admins can read the messages.
create policy "public insert messages" on public.contact_messages
  for insert to anon, authenticated with check (true);
create policy "admin read messages" on public.contact_messages
  for select to authenticated using (true);
create policy "admin delete messages" on public.contact_messages
  for delete to authenticated using (true);
