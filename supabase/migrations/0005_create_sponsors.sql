create extension if not exists pgcrypto;

do $$ begin
  create type public.sponsor_category as enum ('current', 'previous');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name varchar(250) not null,
  website_url text,
  logo_path text not null,
  category public.sponsor_category not null default 'current',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sponsors enable row level security;

drop policy if exists "sponsors_public_read" on public.sponsors;
create policy "sponsors_public_read"
  on public.sponsors
  for select
  to anon, authenticated
  using (is_active = true);

drop trigger if exists set_sponsors_updated_at on public.sponsors;
create trigger set_sponsors_updated_at
  before update on public.sponsors
  for each row execute function public.set_updated_at();

insert into storage.buckets (id, name, public)
values ('sponsors', 'sponsors', true)
on conflict (id) do nothing;

drop policy if exists "sponsors_storage_public_read" on storage.objects;
create policy "sponsors_storage_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'sponsors');
