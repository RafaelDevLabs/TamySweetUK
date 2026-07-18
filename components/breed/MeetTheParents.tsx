import Image from "next/image";

export type ParentProfile = {
  role: "Mother" | "Father";
  image: string;
  imagePosition: string;
  breed: string;
  colour: string;
  registration: string;
  healthTesting: string;
  temperament: string;
  note: string;
};

// TODO: Confirm the registration/testing details and parent profile names with the client.
const parentSectionIntro =
  "We are proud of our beautiful British Shorthair cats. Both parents are TICA and GCCF registered and have been genetically tested with clear results for hereditary conditions.";

const parentProfiles: ParentProfile[] = [
  {
    role: "Mother",
    image: "/breed/parents/mom.jpg",
    imagePosition: "object-[center_42%]",
    breed: "British Shorthair",
    colour: "Brown",
    registration: "TICA & GCCF",
    healthTesting: "Clear (negative) results",
    temperament: "Calm, affectionate and gentle",
    note: "Loving, caring and a wonderful mum",
  },
  {
    role: "Father",
    image: "/breed/parents/dad.jpg",
    imagePosition: "object-[center_38%]",
    breed: "British Shorthair",
    colour: "Brown",
    registration: "TICA & GCCF",
    healthTesting: "Clear (negative) results",
    temperament: "Calm, confident and friendly",
    note: "Gentle, confident and a beautiful boy",
  },
];

export default function MeetTheParents() {
  return (
    <section className="mt-16 w-full">
      <div className="rounded-[30px] border border-[#F3D6DE] bg-[#FFFDFC] px-4 py-8 shadow-[0_24px_70px_rgba(47,42,42,.05)] md:rounded-[30px] md:px-7 md:py-10 lg:px-12 lg:pb-12 lg:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">OUR CATS</p>
          <h2 className="mt-2.5 font-serif text-[34px] leading-[1.1] text-[#2F2A2A] md:text-[38px] lg:text-[44px]">Meet the Parents</h2>
          <div className="mt-3.5 mb-[22px] flex items-center justify-center gap-3 text-[#EF6F91]">
            <span className="h-px w-12 bg-[#EF6F91]" />
            <PawIcon className="h-5 w-5" />
            <span className="h-px w-12 bg-[#EF6F91]" />
          </div>
          <p className="mx-auto max-w-[720px] text-[14px] leading-[1.8] text-[#6B6363] lg:text-[15px]">
            {parentSectionIntro}
          </p>
        </div>

        <div className="mt-[42px] grid items-stretch gap-[22px] md:grid-cols-2 lg:gap-7">
          {parentProfiles.map((parent) => (
            <article
              key={parent.role}
              className="overflow-hidden rounded-[24px] border border-[#F3D6DE] bg-white shadow-[0_18px_45px_rgba(47,42,42,.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(239,111,145,0.12)]"
            >
              <div className="relative aspect-[1/1] w-full overflow-hidden bg-[#F8F3F1]">
                <Image
                  src={parent.image}
                  alt={`${parent.role} British Shorthair parent cat`}
                  fill
                  className={`object-cover ${parent.imagePosition}`}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 lg:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EF6F91]">{parent.role}</p>
                <dl className="mt-4 flex flex-col gap-3 border-t border-[#F3D6DE] pt-5 text-[14px] leading-[1.55]">
                  <Detail label="Breed" value={parent.breed} />
                  <Detail label="Colour" value={parent.colour} />
                  <Detail label="Registration" value={parent.registration} />
                  <Detail label="Health Testing" value={parent.healthTesting} />
                  <Detail label="Temperament" value={parent.temperament} />
                </dl>
                <div className="mt-10 flex items-center gap-2.5 text-[13px] text-[#6B6363]">
                  <HeartIcon className="h-[21px] w-[21px] shrink-0 text-[#EF6F91]" />
                  <span>{parent.note}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <PawIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#EF6F91]" />
      <div className="min-w-0">
        <dt className="inline font-semibold text-[#2F2A2A]">{label}:</dt>{" "}
        <dd className="inline text-[#5F5A5A]">{value}</dd>
      </div>
    </div>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M12 20s-7-4.4-7-9.8A4.2 4.2 0 0 1 9.2 6c1.2 0 2.3.5 2.8 1.5C12.5 6.5 13.6 6 14.8 6A4.2 4.2 0 0 1 19 10.2C19 15.6 12 20 12 20Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8.1 10.7c-1.2 0-2.2-1.2-2.2-2.7s1-2.7 2.2-2.7 2.2 1.2 2.2 2.7-1 2.7-2.2 2.7Zm7.8 0c-1.2 0-2.2-1.2-2.2-2.7s1-2.7 2.2-2.7 2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM5 15.3c-1 0-1.8-1-1.8-2.3s.8-2.3 1.8-2.3 1.8 1 1.8 2.3S6 15.3 5 15.3Zm14 0c-1 0-1.8-1-1.8-2.3s.8-2.3 1.8-2.3 1.8 1 1.8 2.3-.8 2.3-1.8 2.3Zm-7 4.4c-2.6 0-4.6-1.1-4.6-3 0-1.4 1.2-2.6 2.4-3.2.6-.3 1.3-.2 1.9.1.2.1.4.2.6.2s.4-.1.6-.2c.6-.3 1.3-.4 1.9-.1 1.2.6 2.4 1.8 2.4 3.2 0 1.9-2 3-4.6 3Z" />
    </svg>
  );
}
