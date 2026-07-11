type AvailabilityBadgeProps = {
  availability: "Available" | "Reserved" | "Sold";
};

const badgeStyles = {
  Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Reserved: "bg-amber-50 text-amber-700 border-amber-200",
  Sold: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function AvailabilityBadge({ availability }: AvailabilityBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${badgeStyles[availability]}`}
    >
      {availability}
    </span>
  );
}
