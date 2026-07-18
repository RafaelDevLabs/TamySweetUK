with upserted_bella as (
  insert into public.kittens (
    name,
    slug,
    breed,
    gender,
    date_of_birth,
    age_label,
    colour,
    price,
    availability,
    health_status,
    temperament,
    short_description,
    description,
    vaccinated,
    wormed,
    litter_trained,
    microchipped,
    tica_registered,
    parents_can_be_seen,
    is_featured,
    sort_order
  )
  values (
    'Luna',
    'luna-british-shorthair',
    'British Shorthair',
    'female',
    null,
    '8 weeks',
    'Lilac',
    850,
    'available',
    'Vaccinated & health checked',
    'Sweet, calm & playful',
    'Luna is a gentle little kitten with a sweet nature and a calm, loving personality.',
    'Luna is a beautiful British Shorthair girl raised in our family home with daily care and affection. She is confident, cuddly, and already used to everyday household life. She would make a wonderful lifelong companion for a loving family.',
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    1
  )
  on conflict (slug) do update
  set
    name = excluded.name,
    breed = excluded.breed,
    gender = excluded.gender,
    date_of_birth = excluded.date_of_birth,
    age_label = excluded.age_label,
    colour = excluded.colour,
    price = excluded.price,
    availability = excluded.availability,
    health_status = excluded.health_status,
    temperament = excluded.temperament,
    short_description = excluded.short_description,
    description = excluded.description,
    vaccinated = excluded.vaccinated,
    wormed = excluded.wormed,
    litter_trained = excluded.litter_trained,
    microchipped = excluded.microchipped,
    tica_registered = excluded.tica_registered,
    parents_can_be_seen = excluded.parents_can_be_seen,
    is_featured = excluded.is_featured,
    sort_order = excluded.sort_order,
    updated_at = now()
  returning id
),
deleted_bella_images as (
  delete from public.kitten_images
  where kitten_id in (select id from upserted_bella)
)
insert into public.kitten_images (
  kitten_id,
  url,
  storage_path,
  alt_text,
  is_primary,
  sort_order
)
select
  id,
  '/kittens/1.jpg',
  null,
  'Luna kitten',
  true,
  1
from upserted_bella;

with upserted_milo as (
  insert into public.kittens (
    name,
    slug,
    breed,
    gender,
    date_of_birth,
    age_label,
    colour,
    price,
    availability,
    health_status,
    temperament,
    short_description,
    description,
    vaccinated,
    wormed,
    litter_trained,
    microchipped,
    tica_registered,
    parents_can_be_seen,
    is_featured,
    sort_order
  )
  values (
    'Milo',
    'milo-british-shorthair',
    'British Shorthair',
    'male',
    null,
    '9 weeks',
    'Blue',
    900,
    'reserved',
    'Vaccinated & health checked',
    'Sweet, calm & playful',
    'Milo is a handsome blue boy with a relaxed temperament and plenty of affection to give.',
    'Milo has been raised with warmth, routine, and lots of family interaction from day one. He is playful, calm, and loves curling up beside people once he settles in. He is already showing the lovely gentle temperament the breed is known for.',
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    2
  )
  on conflict (slug) do update
  set
    name = excluded.name,
    breed = excluded.breed,
    gender = excluded.gender,
    date_of_birth = excluded.date_of_birth,
    age_label = excluded.age_label,
    colour = excluded.colour,
    price = excluded.price,
    availability = excluded.availability,
    health_status = excluded.health_status,
    temperament = excluded.temperament,
    short_description = excluded.short_description,
    description = excluded.description,
    vaccinated = excluded.vaccinated,
    wormed = excluded.wormed,
    litter_trained = excluded.litter_trained,
    microchipped = excluded.microchipped,
    tica_registered = excluded.tica_registered,
    parents_can_be_seen = excluded.parents_can_be_seen,
    is_featured = excluded.is_featured,
    sort_order = excluded.sort_order,
    updated_at = now()
  returning id
),
deleted_milo_images as (
  delete from public.kitten_images
  where kitten_id in (select id from upserted_milo)
)
insert into public.kitten_images (
  kitten_id,
  url,
  storage_path,
  alt_text,
  is_primary,
  sort_order
)
select
  id,
  '/kittens/2.jpg',
  null,
  'Milo kitten',
  true,
  1
from upserted_milo;

with upserted_oliver as (
  insert into public.kittens (
    name,
    slug,
    breed,
    gender,
    date_of_birth,
    age_label,
    colour,
    price,
    availability,
    health_status,
    temperament,
    short_description,
    description,
    vaccinated,
    wormed,
    litter_trained,
    microchipped,
    tica_registered,
    parents_can_be_seen,
    is_featured,
    sort_order
  )
  values (
    'Oliver',
    'oliver-scottish-fold',
    'British Shorthair',
    'male',
    null,
    '10 weeks',
    'Silver tabby',
    1100,
    'available',
    'Vaccinated & health checked',
    'Sweet, calm & playful',
    'Oliver is a charming little boy with a soft expression and a wonderfully affectionate nature.',
    'Oliver has been lovingly raised in a busy family setting and is well socialised with daily cuddles and play. He is calm, curious, and enjoys being close to people. His sweet nature and striking colouring make him especially easy to adore.',
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    3
  )
  on conflict (slug) do update
  set
    name = excluded.name,
    breed = excluded.breed,
    gender = excluded.gender,
    date_of_birth = excluded.date_of_birth,
    age_label = excluded.age_label,
    colour = excluded.colour,
    price = excluded.price,
    availability = excluded.availability,
    health_status = excluded.health_status,
    temperament = excluded.temperament,
    short_description = excluded.short_description,
    description = excluded.description,
    vaccinated = excluded.vaccinated,
    wormed = excluded.wormed,
    litter_trained = excluded.litter_trained,
    microchipped = excluded.microchipped,
    tica_registered = excluded.tica_registered,
    parents_can_be_seen = excluded.parents_can_be_seen,
    is_featured = excluded.is_featured,
    sort_order = excluded.sort_order,
    updated_at = now()
  returning id
),
deleted_oliver_images as (
  delete from public.kitten_images
  where kitten_id in (select id from upserted_oliver)
)
insert into public.kitten_images (
  kitten_id,
  url,
  storage_path,
  alt_text,
  is_primary,
  sort_order
)
select
  id,
  '/kittens/3.jpg',
  null,
  'Oliver kitten',
  true,
  1
from upserted_oliver;

with upserted_daisy as (
  insert into public.kittens (
    name,
    slug,
    breed,
    gender,
    date_of_birth,
    age_label,
    colour,
    price,
    availability,
    health_status,
    temperament,
    short_description,
    description,
    vaccinated,
    wormed,
    litter_trained,
    microchipped,
    tica_registered,
    parents_can_be_seen,
    is_featured,
    sort_order
  )
  values (
    'Daisy',
    'daisy-british-longhair',
    'British Shorthair',
    'female',
    null,
    '11 weeks',
    'Cream',
    1150,
    'sold',
    'Vaccinated & health checked',
    'Sweet, calm & playful',
    'Daisy is a soft, fluffy girl with a calm presence and a very loving personality.',
    'Daisy has been raised with close attention, daily handling, and all the comforts of family life. She is gentle, affectionate, and already well prepared for the transition into a loving forever home. Her relaxed nature makes her a lovely match for a calm household.',
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    4
  )
  on conflict (slug) do update
  set
    name = excluded.name,
    breed = excluded.breed,
    gender = excluded.gender,
    date_of_birth = excluded.date_of_birth,
    age_label = excluded.age_label,
    colour = excluded.colour,
    price = excluded.price,
    availability = excluded.availability,
    health_status = excluded.health_status,
    temperament = excluded.temperament,
    short_description = excluded.short_description,
    description = excluded.description,
    vaccinated = excluded.vaccinated,
    wormed = excluded.wormed,
    litter_trained = excluded.litter_trained,
    microchipped = excluded.microchipped,
    tica_registered = excluded.tica_registered,
    parents_can_be_seen = excluded.parents_can_be_seen,
    is_featured = excluded.is_featured,
    sort_order = excluded.sort_order,
    updated_at = now()
  returning id
),
deleted_daisy_images as (
  delete from public.kitten_images
  where kitten_id in (select id from upserted_daisy)
)
insert into public.kitten_images (
  kitten_id,
  url,
  storage_path,
  alt_text,
  is_primary,
  sort_order
)
select
  id,
  '/kittens/4.jpg',
  null,
  'Daisy kitten',
  true,
  1
from upserted_daisy;
