import type { ReactNode } from "react";

const supportItems: Array<{
  icon: ReactNode;
  title: string;
  description: string;
}> = [
  {
    icon: <HouseHeartIcon className="h-[38px] w-[38px] sm:h-12 sm:w-12" />,
    title: "Raised in Home",
    description: "Our kittens are raised in a loving family environment.",
  },
  {
    icon: <HealthHeartIcon className="h-[38px] w-[38px] sm:h-12 sm:w-12" />,
    title: "Health Guarantee",
    description: "Vet checked, vaccinated and cared for with attention.",
  },
  {
    icon: <CatSocialIcon className="h-[38px] w-[38px] sm:h-12 sm:w-12" />,
    title: "Well Socialised",
    description: "Handled daily and used to household life and affection.",
  },
  {
    icon: <SupportCalendarIcon className="h-[38px] w-[38px] sm:h-12 sm:w-12" />,
    title: "Ongoing Support",
    description: "We are here to help before and after your kitten goes home.",
  },
];

export default function HomeFeatures() {
  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div className="grid min-h-[150px] overflow-hidden rounded-[24px] border border-[#E8DDC7] bg-[#FAF7EF] px-8 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:grid-cols-2 xl:grid-cols-4">
          {supportItems.map((item, index) => (
            <div
              key={item.title}
              className="relative flex flex-col items-center justify-center px-6 py-[26px] text-center sm:px-8"
            >
              <div className="text-[#7A7F5C]">{item.icon}</div>
              <p className="mt-[14px] text-[15px] font-bold text-[#2F2A2A]">{item.title}</p>
              <p className="mt-2 max-w-[170px] text-[13px] leading-[1.45] text-[#5F5A5A]">
                {item.description}
              </p>
              {index !== supportItems.length - 1 ? (
                <span className="absolute right-0 top-1/2 hidden h-[52%] w-px -translate-y-1/2 bg-[#E8DDC7] xl:block" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HouseHeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M8 21.5 24 9l16 12.5v16A2.5 2.5 0 0 1 37.5 40h-27A2.5 2.5 0 0 1 8 37.5v-16Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 40V27.5h12V40"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 23.5c1.2-2.1 5-2.3 5.8.7.6 2.4-1.4 4.2-5.8 6.8-4.4-2.6-6.4-4.4-5.8-6.8.8-3 4.6-2.8 5.8-.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HealthHeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M24 39s-12-7.5-12-16.7A7.2 7.2 0 0 1 19.2 15c2 0 3.9.8 4.8 2.6.9-1.8 2.8-2.6 4.8-2.6a7.2 7.2 0 0 1 7.2 7.3C36 31.5 24 39 24 39Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 25h5l2.2-4.2L27 29l2.2-4H33"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CatSocialIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M15.5 20 12.5 12.5l6.2 4 5.3-2.7 5.3 2.7 6.2-4-3 7.5v8.5c0 5.1-4.1 9.2-9.2 9.2h-.6c-5.1 0-9.2-4.1-9.2-9.2V20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 24.8h.01M28.5 24.8h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M21 30c1.8 1.7 4.2 1.7 6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M24 27.2c-.8 0-1.4.5-1.4 1.1 0 .9 1.1 1.6 1.4 1.8.3-.2 1.4-.9 1.4-1.8 0-.6-.6-1.1-1.4-1.1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.8 14.6c.7-1.1 2.5-1.2 3 .3.4 1.2-.8 2.3-3 3.6-2.3-1.3-3.4-2.4-3-3.6.5-1.5 2.3-1.4 3-.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.4 10.6c.5-.8 1.8-.9 2.2.2.3 1-.5 1.7-2.2 2.8-1.7-1.1-2.5-1.8-2.2-2.8.4-1.1 1.7-1 2.2-.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportCalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 16.5A2.5 2.5 0 0 1 14.5 14h19A2.5 2.5 0 0 1 36 16.5v18A2.5 2.5 0 0 1 33.5 37h-19A2.5 2.5 0 0 1 12 34.5v-18Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11v6M32 11v6M12 21h24"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31.5" cy="30.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M31.5 27.5v3.3l2.2 1.5M19 29l2.5 2.5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
