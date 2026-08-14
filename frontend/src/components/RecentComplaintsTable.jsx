const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700",
  Processed: "bg-indigo-100 text-indigo-700",
  Completed: "bg-emerald-600 text-white",
};

export default function RecentComplaintsTable({ complaints, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              Ticket ID
            </th>
            <th className="px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              Customer
            </th>
            <th className="px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              Category
            </th>
            <th className="px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              Date
            </th>
            <th className="px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {complaints.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-8 text-center font-inter text-sm text-slate-400"
              >
                Belum ada complaint terbaru.
              </td>
            </tr>
          ) : (
            complaints.map((c) => (
              <tr
                key={c.ticketId}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                  <button
                    type="button"
                    onClick={() => onView?.(c)}
                    className="font-inter text-sm font-semibold text-[#2563eb] hover:underline"
                  >
                    #{c.ticketId}
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 font-inter text-sm text-slate-700 sm:px-6">
                  {c.customer}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 font-inter text-sm text-slate-600 sm:px-6">
                  {c.category}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 font-inter text-sm text-slate-600 sm:px-6">
                  {c.dateSubmitted}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                  <span
                    className={`rounded-full px-3 py-1 font-inter text-xs font-semibold ${STATUS_STYLES[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
