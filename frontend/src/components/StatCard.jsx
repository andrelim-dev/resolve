export default function StatCard({
  label,
  value,
  valueColor = "text-slate-900",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="font-inter text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p
        className={`mt-2 font-plus-jakarta-sans text-3xl font-extrabold ${valueColor}`}
      >
        {value}
      </p>
    </div>
  );
}
