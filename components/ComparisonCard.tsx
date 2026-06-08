interface ComparisonCardProps {
  icon: string;
  label: string;
  value: string;
  unit: string;
}

export default function ComparisonCard({
  icon,
  label,
  value,
  unit,
}: ComparisonCardProps) {
  return (
    <div className="rounded-xl border border-teal-900/50 bg-slate-900/80 p-5 transition-colors hover:border-teal-700/50">
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      <p className="mt-3 text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-coral">
        {value}
      </p>
      <p className="text-xs text-slate-500">{unit}</p>
    </div>
  );
}
