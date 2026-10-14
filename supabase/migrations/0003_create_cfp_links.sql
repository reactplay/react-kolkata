create extension if not exists pgcrypto;

create table if not exists public.cfp_links (
  id uuid primary key default gen_random_uuid(),
  google_form_link text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cfp_links enable row level security;

drop policy if exists "cfp_links_public_read" on public.cfp_links;
create policy "cfp_links_public_read"
  on public.cfp_links
  for select
  to anon, authenticated
  using (is_active = true);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_cfp_links_updated_at on public.cfp_links;
create trigger set_cfp_links_updated_at
  before update on public.cfp_links
  for each row execute function public.set_updated_at();
