import { notFound } from "next/navigation";

import NewKittenForm from "@/components/admin/NewKittenForm";
import { KITTEN_SELECT } from "@/lib/supabase/queries/kittens";
import { createServerSupabaseClient, requireAdminSession } from "@/lib/supabase/server";
import type { KittenImage, KittenWithImages } from "@/lib/types/kitten";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditKittenPage({ params }: PageProps) {
  const { id } = await params;
  const session = await requireAdminSession();
  const supabase = createServerSupabaseClient(session.accessToken);

  const { data, error } = await supabase
    .from("kittens")
    .select(KITTEN_SELECT)
    .eq("id", id)
    .order("sort_order", { referencedTable: "kitten_images", ascending: true })
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch kitten for edit.", error);
  }

  if (!data) {
    notFound();
  }

  const kitten = data as KittenWithImages;
  const initialImages: KittenImage[] = [...kitten.images].sort((a, b) => a.sort_order - b.sort_order);

  return <NewKittenForm mode="edit" initialKitten={kitten} initialImages={initialImages} />;
}
