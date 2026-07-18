export type Kitten = {
  id: string;
  slug: string;
  name: string;
  breed: string;
  gender: "Male" | "Female";
  age: string;
  colour: string;
  price: number;
  availability: "Available" | "Reserved" | "Sold";
  healthStatus: string;
  temperament: string;
  description: string;
  images: string[];
  included: string[];
};

export type KittenCard = Pick<
  Kitten,
  "id" | "slug" | "name" | "breed" | "gender" | "age" | "colour" | "price" | "availability" | "images"
>;

export const brandStory =
  "TamysweetUK began in 2020 with our first family cat. What started as love for one special pet grew into a passion for the breed. Today, we focus on raising healthy, well-socialised, affectionate kittens and helping families find lifelong companions.";

const creamKitten = ["/kittens/1.jpg", "/kittens/2.jpg"];
const chocolateKitten = ["/kittens/3.jpg", "/kittens/4.jpg"];

export const mockKittens: Kitten[] = [
  {
    id: "kitten-1",
    slug: "luna-british-shorthair",
    name: "Luna",
    breed: "British Shorthair",
    gender: "Female",
    age: "9 weeks",
    colour: "Lilac",
    price: 950,
    availability: "Available",
    healthStatus: "Vet checked, first vaccination completed, microchip booked.",
    temperament: "Gentle, cuddly, playful around children, and confident in a busy home.",
    description:
      "Luna is a calm little girl with a sweet expression and a very affectionate nature. She loves soft blankets, lap cuddles, and follows us from room to room.",
    images: [creamKitten[0], creamKitten[1], creamKitten[0]],
    included: [
      "Vaccination record",
      "Health check summary",
      "Starter food pack",
      "Comfort blanket with familiar scent",
    ],
  },
  {
    id: "kitten-2",
    slug: "milo-british-shorthair",
    name: "Milo",
    breed: "British Shorthair",
    gender: "Male",
    age: "10 weeks",
    colour: "Blue",
    price: 900,
    availability: "Reserved",
    healthStatus: "Vet checked, vaccinated, and thriving on a balanced kitten diet.",
    temperament: "Easy-going, curious, and very loving once he settles into your arms.",
    description:
      "Milo has a plush blue coat and a relaxed, teddy-bear personality. He enjoys exploring, gentle play, and curling up beside his siblings for naps.",
    images: [creamKitten[1], creamKitten[0], creamKitten[1]],
    included: [
      "Vaccination record",
      "Feeding routine guide",
      "Favourite toy",
      "Lifetime breeder support",
    ],
  },
  {
    id: "kitten-3",
    slug: "oliver-scottish-fold",
    name: "Oliver",
    breed: "British Shorthair",
    gender: "Male",
    age: "11 weeks",
    colour: "Silver tabby",
    price: 1100,
    availability: "Available",
    healthStatus: "Health checked, vaccinated, and monitored closely for ideal growth.",
    temperament: "Sweet, people-focused, and happiest when he can be part of family time.",
    description:
      "Oliver is a charming little boy with striking tabby markings and a gentle temperament. He loves being stroked and settles beautifully after playtime.",
    images: [chocolateKitten[0], chocolateKitten[1], chocolateKitten[0]],
    included: [
      "Vaccination record",
      "Health check summary",
      "Care sheet",
      "Ongoing WhatsApp support",
    ],
  },
  {
    id: "kitten-4",
    slug: "daisy-british-longhair",
    name: "Daisy",
    breed: "British Shorthair",
    gender: "Female",
    age: "12 weeks",
    colour: "Cream",
    price: 1150,
    availability: "Sold",
    healthStatus: "Fully checked, vaccinated, and settled well into a social home routine.",
    temperament: "Soft-natured, affectionate, and very fond of quiet cuddle time.",
    description:
      "Daisy has a beautiful fluffy coat and a very calm, feminine nature. She enjoys gentle brushing, warm laps, and supervised play with soft toys.",
    images: [creamKitten[0], creamKitten[1], creamKitten[0]],
    included: [
      "Vaccination record",
      "Grooming notes",
      "Starter food pack",
      "Comfort blanket",
    ],
  },
  {
    id: "kitten-5",
    slug: "archie-british-shorthair",
    name: "Archie",
    breed: "British Shorthair",
    gender: "Male",
    age: "8 weeks",
    colour: "Grey tabby",
    price: 875,
    availability: "Available",
    healthStatus: "First health check complete, developing beautifully, and already litter trained.",
    temperament: "Cheeky, playful, and very sociable with both adults and children.",
    description:
      "Archie is full of personality and has a confident little strut around the house. He adores feather teasers, warm beds, and being photographed.",
    images: [chocolateKitten[1], chocolateKitten[0], chocolateKitten[1]],
    included: [
      "Health check summary",
      "Kitten routine guide",
      "Starter litter sample",
      "Support after adoption",
    ],
  },
  {
    id: "kitten-6",
    slug: "luna-british-longhair",
    name: "Luna",
    breed: "British Shorthair",
    gender: "Female",
    age: "9 weeks",
    colour: "Blue cream",
    price: 1200,
    availability: "Available",
    healthStatus: "Vet checked, thriving well, and confidently eating and using the litter tray.",
    temperament: "Very loving, soft-hearted, and happiest when close to people.",
    description:
      "Luna is a fluffy little sweetheart with a gentle gaze and a beautifully soft coat. She is raised in our family home and is already used to everyday sounds and cuddles.",
    images: [creamKitten[1], creamKitten[0], creamKitten[1]],
    included: [
      "Vaccination record",
      "Care guide",
      "Starter food pack",
      "Lifetime breeder advice",
    ],
  },
];

export const breedCards = [
  {
    name: "British Shorthair",
    image: "/design/9.png",
    description:
      "A calm, plush-coated breed known for a round face, sweet nature, and steady temperament.",
    traits: ["Affectionate", "Easy-going", "Family friendly"],
  },
  {
    name: "British Longhair",
    image: "/design/6.png",
    description:
      "Elegant and fluffy with the same warm British temperament, perfect for families who love a softer coat.",
    traits: ["Gentle", "Fluffy coat", "Relaxed companion"],
  },
  {
    name: "Scottish Fold",
    image: "/design/4.png",
    description:
      "Known for their adorable folded ears and deeply loving personality, with a calm home-centred nature.",
    traits: ["Sweet", "Cuddly", "Quietly playful"],
  },
  {
    name: "Other Beautiful Breeds",
    image: "/design/173dbf98-285d-4cc0-8f8b-5bfa807d237f.jpg",
    description:
      "From time to time we may share kittens from other carefully raised bloodlines with the same family-first standard.",
    traits: ["Occasional litters", "Chosen carefully", "Raised with love"],
  },
];

export const testimonials = [
  {
    name: "Emily Carter",
    location: "Kent",
    quote:
      "Our little kitten settled in so quickly and was clearly raised with so much care. We felt supported from the first message onwards.",
    rating: 5,
    image: "/design/10.png",
  },
  {
    name: "Nathan Lewis",
    location: "Manchester",
    quote:
      "A warm, honest breeder and a beautiful kitten with such a calm temperament. We would happily recommend TamysweetUK to friends.",
    rating: 5,
    image: "/design/9.png",
  },
  {
    name: "Sophie Grant",
    location: "Bristol",
    quote:
      "Everything was handled so kindly and professionally. Our kitten arrived healthy, confident, and already used to family life.",
    rating: 5,
    image: "/design/6.png",
  },
  {
    name: "Rachel Moore",
    location: "Leeds",
    quote:
      "The updates while we waited made the whole experience feel personal and reassuring. You can really tell the kittens are loved.",
    rating: 5,
    image: "/design/4.png",
  },
  {
    name: "Hannah Reed",
    location: "Surrey",
    quote:
      "We were nervous first-time owners, but we had guidance before and after bringing our kitten home. That made such a difference.",
    rating: 5,
    image: "/design/7.png",
  },
  {
    name: "Oliver Bennett",
    location: "Birmingham",
    quote:
      "Our kitten is affectionate, healthy, and beautifully socialised. The whole process felt thoughtful and genuinely family-centred.",
    rating: 5,
    image: "/design/5.png",
  },
];

export const faqItems = [
  {
    question: "When can my kitten go to their new home?",
    answer:
      "Our kittens usually leave for their new homes between 10 and 12 weeks of age. By this time they are fully weaned, well socialised, confident, vet checked, vaccinated and ready to begin life with their new family.",
  },
  {
    question: "Can I meet the parents?",
    answer:
      "Yes. The parents can be seen, and you can also learn more about them on our British Shorthair page in the Meet the Parents section.",
  },
  {
    question: "Are the parents health tested?",
    answer:
      "Yes. Both parents are TICA and GCCF registered and have been genetically tested with clear negative results for hereditary conditions.",
  },
  {
    question: "Are the kittens vaccinated and health checked?",
    answer:
      "Yes. Before leaving, every kitten is vet checked, vaccinated as appropriate for their age, microchipped, flea treated and worm treated.",
  },
  {
    question: "Will my kitten come with registration papers?",
    answer:
      "Yes. Your kitten will leave with the relevant registration documentation and information provided for their new family.",
  },
  {
    question: "Are the kittens raised in a family home?",
    answer:
      "Yes. Our kittens are raised in a loving family home with lots of care and attention. They are well socialised and used to everyday household noises.",
  },
  {
    question: "Are the kittens litter trained?",
    answer:
      "Yes. Before leaving for their new homes, the kittens are litter trained and introduced to using a scratch post.",
  },
  {
    question: "What is included with my kitten?",
    answer:
      "Each kitten leaves with a kitten pack that includes food, a blanket carrying their mum's scent, and helpful care information for the first days in their new home.",
  },
  {
    question: "Can I choose my own kitten?",
    answer:
      "Absolutely. We are happy to help you choose the kitten that best matches your family and lifestyle. We always aim to find the right home for every kitten, ensuring a happy match for both the kitten and its new family.",
  },
  {
    question: "What do the kittens eat?",
    answer:
      "The kittens leave on a suitable diet they are already familiar with. Food is also included in the kitten pack to help make the transition to their new home as smooth as possible.",
  },
  {
    question: "Can I reserve a kitten?",
    answer:
      "Yes. A £300 non-refundable deposit is required to reserve your chosen kitten. Once reserved, the kitten is held exclusively for you until collection.",
  },
  {
    question: "Do you provide support after adoption?",
    answer:
      "Yes. We are always happy to offer advice and support after your kitten joins your family, including help with settling in, feeding and general care.",
  },
];
