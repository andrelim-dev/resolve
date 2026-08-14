import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function Dropdown({ label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef}>
      {label && (
        <label className="mb-1.5 block font-inter text-xs font-semibold text-slate-600">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between rounded-lg border bg-slate-50 px-3 py-2.5 text-left font-inter text-sm text-slate-700 transition-colors cursor-pointer ${
            isOpen
              ? "border-[#2563eb] ring-2 ring-[#2563eb]/20"
              : "border-slate-300"
          }`}
        >
          <span className="truncate">{value}</span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
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
