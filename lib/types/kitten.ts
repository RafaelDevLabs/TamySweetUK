export type KittenAvailability = "available" | "reserved" | "sold";

export type KittenGender = "male" | "female";

export type Kitten = {
  id: string;
  name: string;
  slug: string;
  breed: string;
  gender: KittenGender;
  date_of_birth: string | null;
  age_label: string;
  colour: string;
  price: number;
  availability: KittenAvailability;
  health_status: string;
  temperament: string | null;
  short_description: string;
  description: string | null;
  vaccinated: boolean;
  wormed: boolean;
  litter_trained: boolean;
  microchipped: boolean;
  tica_registered: boolean;
  parents_can_be_seen: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type KittenImage = {
  id: string;
  kitten_id: string;
  url: string;
  storage_path: string | null;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
};

export type KittenWithImages = Kitten & {
  images: KittenImage[];
};

export type KittenCardData = Pick<
  Kitten,
  | "id"
  | "name"
  | "slug"
  | "breed"
  | "gender"
  | "age_label"
  | "colour"
  | "price"
  | "availability"
  | "short_description"
  | "sort_order"
  | "created_at"
> & {
  images: KittenImage[];
};
