create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'TamysweetUK',
  tagline text not null default 'Healthy kittens, happy homes',
  whatsapp_number text not null default '+447700900000',
  email text not null default 'hello@tamysweetuk.co.uk',
  location text not null default 'Manchester, United Kingdom',
  opening_hours text not null default 'Mon - Sun, 9:00 AM - 8:00 PM',
  instagram_url text,
  facebook_url text,
  hero_title text not null default 'Adorable Kittens Looking for Loving Homes',
  hero_description text not null default 'Healthy, happy and raised with love.',
  kittens_page_title text not null default 'Our Kittens',
  kittens_page_description text not null default 'All of our kittens are raised in a loving home environment, health checked, vaccinated and well socialised.',
  updated_at timestamptz not null default now()
);

create unique index if not exists site_settings_singleton_idx on public.site_settings ((true));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_settings_set_updated_at on public.site_settings;

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "Public can view site settings" on public.site_settings;
create policy "Public can view site settings"
on public.site_settings
for select
to public
using (true);

drop policy if exists "Authenticated can insert site settings" on public.site_settings;
create policy "Authenticated can insert site settings"
on public.site_settings
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated can update site settings" on public.site_settings;
create policy "Authenticated can update site settings"
on public.site_settings
for update
to authenticated
using (true)
with check (true);

insert into public.site_settings (
  business_name,
  tagline,
  whatsapp_number,
  email,
  location,
  opening_hours,
  instagram_url,
  facebook_url,
  hero_title,
  hero_description,
  kittens_page_title,
  kittens_page_description
)
select
  'TamysweetUK',
  'Healthy kittens, happy homes',
  '+447700900000',
  'hello@tamysweetuk.co.uk',
  'Manchester, United Kingdom',
  'Mon - Sun, 9:00 AM - 8:00 PM',
  null,
  null,
  'Adorable Kittens Looking for Loving Homes',
  'Healthy, happy and raised with love.',
  'Our Kittens',
  'All of our kittens are raised in a loving home environment, health checked, vaccinated and well socialised.'
where not exists (
  select 1 from public.site_settings
);
