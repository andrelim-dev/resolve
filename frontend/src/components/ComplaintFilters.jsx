import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

export const CATEGORY_OPTIONS = [
  "Billing Issue",
  "Service Quality",
  "Technical Problem",
  "Product Defect",
  "Other",
];

export const STATUS_OPTIONS = ["Submitted", "Processed", "Completed"];

function FilterDropdown({ label, value, placeholder, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Tutup dropdown saat klik di luar area komponen ini
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef}>
      <label className="mb-1.5 block font-inter text-xs font-semibold text-slate-600">
        {label}
      </label>
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between rounded-lg border bg-slate-50 px-3 py-2 text-left font-inter text-sm text-slate-700 transition-colors cursor-pointer ${
            isOpen
              ? "border-[#2563eb] ring-2 ring-[#2563eb]/20"
              : "border-slate-300"
          }`}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={() => handleSelect("")}
              className="flex w-full items-center justify-between px-3 py-2 text-left font-inter text-sm text-slate-700 hover:bg-slate-50"
            >
              {placeholder}
              {!value && <Check size={14} className="text-[#2563eb]" />}
            </button>

            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left font-inter text-sm hover:bg-slate-50 ${
                  value === option
                    ? "font-semibold text-[#2563eb]"
                    : "text-slate-700"
                }`}
              >
                {option}
                {value === option && (
                  <Check size={14} className="text-[#2563eb]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComplaintFilters({
  draftFilters,
  onDraftChange,
  onFilter,
  onClear,
}) {
  const { search, category, status } = draftFilters;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search: ID / Customer only */}
        <div>
          <label className="mb-1.5 block font-inter text-xs font-semibold text-slate-600">
            Search Ticket
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2">
            <Search size={16} className="shrink-0 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) =>
                onDraftChange({ ...draftFilters, search: e.target.value })
              }
              placeholder="ID, Customer..."
              className="w-full min-w-0 bg-transparent font-inter text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <FilterDropdown
          label="Category"
          value={category}
          placeholder="All Categories"
          options={CATEGORY_OPTIONS}
          onChange={(value) =>
            onDraftChange({ ...draftFilters, category: value })
          }
        />

        {/* Status */}
        <FilterDropdown
          label="Status"
          value={status}
          placeholder="All Statuses"
          options={STATUS_OPTIONS}
          onChange={(value) =>
            onDraftChange({ ...draftFilters, status: value })
          }
        />

        {/* Actions */}
        <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-1">
          <button
            onClick={onClear}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-inter text-sm font-semibold text-slate-700 transition-colors cursor-pointer hover:bg-slate-50"
          >
            Clear
          </button>
          <button
            onClick={onFilter}
            className="flex-1 rounded-lg bg-[#2563eb] px-4 py-2 font-inter text-sm font-semibold text-white shadow-sm transition-colors cursor-pointer hover:bg-blue-700"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
