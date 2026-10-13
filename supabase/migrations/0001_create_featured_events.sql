create extension if not exists pgcrypto;

create table if not exists public.featured_events (
  id uuid primary key default gen_random_uuid(),
  luma_event_id text not null,
  is_active boolean not null default true,
  end_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.featured_events enable row level security;

drop policy if exists "featured_events_public_read" on public.featured_events;
create policy "featured_events_public_read"
  on public.featured_events
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

drop trigger if exists set_featured_events_updated_at on public.featured_events;
create trigger set_featured_events_updated_at
  before update on public.featured_events
  for each row execute function public.set_updated_at();
