create extension if not exists pgcrypto;

-- Ensure featured_events.id is uuid with auto-generated default.
alter table public.featured_events drop constraint if exists featured_events_pkey;
alter table public.featured_events drop column if exists id;
alter table public.featured_events
  add column id uuid primary key default gen_random_uuid();
