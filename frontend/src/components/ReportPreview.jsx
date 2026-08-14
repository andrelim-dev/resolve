import { FileStack, CheckCircle2, Clock, Loader2 } from "lucide-react";
import CategoryBarChart from "./CategoryBarChart";

export default function ReportPreview({
  period,
  generatedAt,
  summary,
  categories,
}) {
  const chartData = categories.map((c) => ({
    label: c.shortLabel,
    fullLabel: c.category,
    value: c.total,
    color: c.color,
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="font-plus-jakarta-sans text-xl font-bold text-slate-900">
          Report Preview: {period}
        </h2>
        <p className="mt-1 font-inter text-sm text-slate-500">
          Data accurate as of {generatedAt}.
        </p>
      </div>

      {/* Summary stat cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="flex items-center gap-2 font-inter text-xs font-medium text-slate-500">
            <FileStack size={14} />
            Total Complaints
          </p>
          <p className="mt-2 font-plus-jakarta-sans text-2xl font-extrabold text-slate-900">
            {summary.total.toLocaleString("en-US")}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <p className="flex items-center gap-2 font-inter text-xs font-medium text-slate-500">
            <CheckCircle2 size={14} />
            Completed
          </p>
          <p className="mt-2 font-plus-jakarta-sans text-2xl font-extrabold text-emerald-600">
            {summary.completed.toLocaleString("en-US")}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <p className="flex items-center gap-2 font-inter text-xs font-medium text-slate-500">
            <Clock size={14} />
            Pending
          </p>
          <p className="mt-2 font-plus-jakarta-sans text-2xl font-extrabold text-red-600">
            {summary.pending.toLocaleString("en-US")}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <p className="flex items-center gap-2 font-inter text-xs font-medium text-slate-500">
            <Loader2 size={14} />
            In Progress
          </p>
          <p className="mt-2 font-plus-jakarta-sans text-2xl font-extrabold text-[#2563eb]">
            {summary.processed.toLocaleString("en-US")}
          </p>
        </div>
      </div>

      {/* Category table + bar chart */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h3 className="font-plus-jakarta-sans text-base font-bold text-slate-900">
            Complaints by Category
          </h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-105 text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2.5 pr-4 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </th>
                  <th className="py-2.5 pr-4 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>
                  <th className="py-2.5 pr-4 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Completed
                  </th>
                  <th className="py-2.5 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Completion Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => {
                  const rate = c.total > 0 ? (c.completed / c.total) * 100 : 0;
                  const rateColor =
                    rate >= 80
                      ? "text-emerald-600"
                      : rate >= 60
                        ? "text-amber-600"
                        : "text-red-600";
                  return (
                    <tr
                      key={c.category}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-3 pr-4 font-inter text-sm text-slate-700">
                        {c.category}
                      </td>
                      <td className="py-3 pr-4 font-inter text-sm text-slate-700">
                        {c.total.toLocaleString("en-US")}
                      </td>
                      <td className="py-3 pr-4 font-inter text-sm text-slate-700">
                        {c.completed.toLocaleString("en-US")}
                      </td>
                      <td
                        className={`py-3 font-inter text-sm font-semibold ${rateColor}`}
                      >
                        {rate.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="font-plus-jakarta-sans text-base font-bold text-slate-900">
            Volume Distribution
          </h3>
          <div className="mt-7 h-56 rounded-xl border border-slate-200 p-4">
            <CategoryBarChart data={chartData} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-1 border-t border-slate-200 pt-4 font-inter text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>Resolve Internal Document - Confidential</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
}
