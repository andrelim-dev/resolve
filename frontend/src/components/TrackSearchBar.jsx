import { Search } from "lucide-react";

export default function TrackSearchBar({ value, onChange, onSubmit }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="CMP-20260810-001"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-inter text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
        />
        <button
          onClick={onSubmit}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3 font-inter text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Search size={16} />
          Track
        </button>
      </div>
    </div>
  );
}
