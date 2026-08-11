import { Tag, RefreshCw, Clock } from "lucide-react";

const statusStyles = {
  Processing: "bg-amber-100 text-amber-700",
  Submitted: "bg-slate-100 text-slate-600",
  Completed: "bg-emerald-100 text-emerald-700",
};

const borderStatusStyles = {
  Processing: "border-l-amber-400",
  Submitted: "border-l-slate-300",
  Completed: "border-l-emerald-400",
};

export default function TicketCard({
  ticketId,
  status,
  category,
  submittedDate,
  lastUpdated,
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-slate-200 border-l-4 ${borderStatusStyles[status]} bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between`}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-plus-jakarta-sans text-lg font-bold text-slate-900">
            Ticket #{ticketId}
          </h2>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-inter text-xs font-semibold ${
              statusStyles[status] || "bg-slate-100 text-slate-600"
            }`}
          >
            <RefreshCw size={12} />
            {status}
          </span>
        </div>
        <p className="mt-2 flex items-center gap-1.5 font-inter text-sm text-slate-500">
          <Tag size={14} />
          {category}
        </p>
      </div>

      <div className="space-y-1 text-left font-inter text-sm text-slate-500 sm:text-right">
        <p>Submitted: {submittedDate}</p>
        <p className="flex items-center gap-1.5">
          <Clock size={14} className="text-[#2563eb]" />
          Last updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
}
