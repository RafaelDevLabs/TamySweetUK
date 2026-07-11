type TrustBadgeProps = {
  title: string;
  description?: string;
};

export default function TrustBadge({ title, description }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
      <span className="inline-block h-2 w-2 rounded-full bg-[var(--pink-deep)]/75" />
      <div>
        <span className="font-medium text-[var(--foreground)]">{title}</span>
        {description ? <span className="hidden">{description}</span> : null}
      </div>
    </div>
  );
}
