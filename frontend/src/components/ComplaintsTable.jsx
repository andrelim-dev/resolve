import { useEffect, useRef, useState } from "react";
import {
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { STATUS_OPTIONS } from "./ComplaintFilters";

const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700",
  Processed: "bg-indigo-100 text-indigo-700",
  Completed: "bg-emerald-600 text-white",
};

const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-slate-400",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
];

function initialsOf(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StatusDropdown({ ticketId, value, onChange }) {
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

  const handleSelect = (option) => {
    onChange(ticketId, option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-inter text-xs font-semibold transition-colors cursor-pointer ${STATUS_STYLES[value]}`}
      >
        {value}
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-50 mt-1 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {STATUS_OPTIONS.map((option) => (
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
  );
}

export default function ComplaintsTable({
  complaints,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onStatusChange,
  onView,
}) {
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ticket ID
              </th>
              <th className="px-6 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                Customer
              </th>
              <th className="px-6 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>
              <th className="px-6 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date Submitted
              </th>
              <th className="px-6 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-6 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center font-inter text-sm text-slate-400"
                >
                  No data matches the selected filters.
                </td>
              </tr>
            ) : (
              complaints.map((c, index) => (
                <tr
                  key={c.ticketId}
                  className="border-b border-slate-100 last:border-0"
                  style={{
                    borderLeft: `4px solid ${
                      c.status === "Pending"
                        ? "#f97316"
                        : c.status === "Processed"
                          ? "#6366f1"
                          : "#10b981"
                    }`,
                  }}
                >
                  <td className="px-6 py-4 font-inter text-sm font-semibold text-[#2563eb]">
                    #{c.ticketId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`hidden md:flex h-7 w-7 items-center justify-center rounded-full font-inter text-xs font-semibold text-white ${
                          AVATAR_COLORS[index % AVATAR_COLORS.length]
                        }`}
                      >
                        {initialsOf(c.customer)}
                      </span>
                      <span className="font-inter text-sm text-slate-700">
                        {c.customer}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-inter text-sm text-slate-600">
                    {c.category}
                  </td>
                  <td className="px-6 py-4 font-inter text-sm text-slate-600">
                    {c.dateSubmitted}
                  </td>
                  <td className="px-6 py-4">
                    <StatusDropdown
                      ticketId={c.ticketId}
                      value={c.status}
                      onChange={onStatusChange}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onView(c)}
                      className="text-[#2563eb] cursor-pointer hover:text-blue-700"
                      aria-label={`Lihat detail ${c.ticketId}`}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4">
        <p className="font-inter text-sm text-slate-500">
          {totalCount === 0
            ? "No entries found"
            : `Showing ${start} to ${end} of ${totalCount} entries`}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
