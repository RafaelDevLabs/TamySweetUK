export default function AdminStatCard({
  label,
  value,
  hint,
  tone = "pink",
  icon,
}: {
  label: string;
  value: number;
  hint: string;
  tone?: "pink" | "mint" | "gold" | "slate";
  icon: React.ReactNode;
}) {
  const toneClasses = {
    pink: "bg-[#FFF4F7] text-[#EF6F91] border-[#F8D8E2]",
    mint: "bg-[#F2F8F2] text-[#6E8D68] border-[#DCEAD9]",
    gold: "bg-[#FFF8EE] text-[#B88C5B] border-[#F2DFC1]",
    slate: "bg-[#F6F4F5] text-[#81777A] border-[#E8E0E2]",
  };

  return (
    <div className="rounded-[28px] border border-[#F3E2E6] bg-white p-5 shadow-[0_18px_42px_rgba(0,0,0,0.04)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#8A7D7D]">{label}</p>
          <p className="mt-3 font-serif text-[44px] leading-none text-[#2F2A2A]">{value}</p>
          <p className="mt-3 text-sm leading-6 text-[#6F6666]">{hint}</p>
        </div>
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border ${toneClasses[tone]}`}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}
