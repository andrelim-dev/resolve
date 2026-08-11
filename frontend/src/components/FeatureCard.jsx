export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]">
        {icon}
      </div>
      <h3 className="font-plus-jakarta-sans text-base font-bold text-slate-900">
        {title}
      </h3>
      <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  );
}
