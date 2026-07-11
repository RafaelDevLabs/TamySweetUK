-- Run this once after creating the public Supabase Storage bucket: kitten-images
-- This file adds storage policies for viewing and managing kitten images.

drop policy if exists "Public can view kitten images" on storage.objects;
create policy "Public can view kitten images"
on storage.objects
for select
to public
using (bucket_id = 'kitten-images');

drop policy if exists "Authenticated users can upload kitten images" on storage.objects;
create policy "Authenticated users can upload kitten images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'kitten-images');

drop policy if exists "Authenticated users can update kitten images" on storage.objects;
create policy "Authenticated users can update kitten images"
on storage.objects
for update
to authenticated
using (bucket_id = 'kitten-images')
with check (bucket_id = 'kitten-images');

drop policy if exists "Authenticated users can delete kitten images" on storage.objects;
create policy "Authenticated users can delete kitten images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'kitten-images');
