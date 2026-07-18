create extension if not exists pgcrypto;

create table if not exists public.kittens (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  breed text not null,
  gender text not null check (gender in ('male', 'female')),
  date_of_birth date,
  age_label text not null,
  colour text not null,
  price integer not null check (price >= 0),
  availability text not null default 'available' check (availability in ('available', 'reserved', 'sold')),
  health_status text not null default 'Vaccinated & health checked',
  temperament text,
  short_description text not null,
  description text,
  vaccinated boolean not null default true,
  wormed boolean not null default true,
  litter_trained boolean not null default true,
  microchipped boolean not null default false,
  tica_registered boolean not null default false,
  parents_can_be_seen boolean not null default false,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

update public.kittens
set breed = 'British Shorthair'
where breed is distinct from 'British Shorthair';

alter table public.kittens
alter column breed set default 'British Shorthair';

alter table public.kittens
drop constraint if exists kittens_breed_british_shorthair_check;

create table if not exists public.kitten_images (
  id uuid primary key default gen_random_uuid(),
  kitten_id uuid not null references public.kittens(id) on delete cascade,
  url text not null,
  storage_path text,
  alt_text text,
  is_primary boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create unique index if not exists kittens_slug_idx on public.kittens (slug);
create index if not exists kittens_availability_idx on public.kittens (availability);
create index if not exists kittens_is_featured_idx on public.kittens (is_featured);
create index if not exists kittens_sort_order_idx on public.kittens (sort_order);
create index if not exists kitten_images_kitten_id_idx on public.kitten_images (kitten_id);
create index if not exists kitten_images_is_primary_idx on public.kitten_images (is_primary);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists kittens_set_updated_at on public.kittens;

create trigger kittens_set_updated_at
before update on public.kittens
for each row
execute function public.set_updated_at();

alter table public.kittens enable row level security;
alter table public.kitten_images enable row level security;

drop policy if exists "Public can view kittens" on public.kittens;
create policy "Public can view kittens"
on public.kittens
for select
to public
using (true);

drop policy if exists "Authenticated can insert kittens" on public.kittens;
create policy "Authenticated can insert kittens"
on public.kittens
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated can update kittens" on public.kittens;
create policy "Authenticated can update kittens"
on public.kittens
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated can delete kittens" on public.kittens;
create policy "Authenticated can delete kittens"
on public.kittens
for delete
to authenticated
using (true);

drop policy if exists "Public can view kitten images" on public.kitten_images;
create policy "Public can view kitten images"
on public.kitten_images
for select
to public
using (true);

drop policy if exists "Authenticated can insert kitten images" on public.kitten_images;
create policy "Authenticated can insert kitten images"
on public.kitten_images
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated can update kitten images" on public.kitten_images;
create policy "Authenticated can update kitten images"
on public.kitten_images
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated can delete kitten images" on public.kitten_images;
create policy "Authenticated can delete kitten images"
on public.kitten_images
for delete
to authenticated
using (true);

-- Manual storage setup:
-- Bucket: kitten-images
-- The bucket should be public.
-- Storage policies:
-- 1. Public can view images.
-- 2. Authenticated users can upload images.
-- 3. Authenticated users can update images.
-- 4. Authenticated users can delete images.
