create extension if not exists pgcrypto;

create table if not exists public.community_partners (
  id uuid primary key default gen_random_uuid(),
  name varchar(250) not null,
  is_active boolean not null default true,
  logo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.community_partners enable row level security;

drop policy if exists "community_partners_public_read" on public.community_partners;
create policy "community_partners_public_read"
  on public.community_partners
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

drop trigger if exists set_community_partners_updated_at on public.community_partners;
create trigger set_community_partners_updated_at
  before update on public.community_partners
  for each row execute function public.set_updated_at();

insert into storage.buckets (id, name, public)
values ('community_partners', 'community_partners', true)
on conflict (id) do nothing;

drop policy if exists "community_partners_storage_public_read" on storage.objects;
create policy "community_partners_storage_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'community_partners');
