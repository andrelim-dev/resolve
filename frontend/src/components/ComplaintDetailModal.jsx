import {
  X,
  Ticket,
  User,
  Tag,
  Calendar,
  FileText,
  Download,
} from "lucide-react";

const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700",
  Processed: "bg-indigo-100 text-indigo-700",
  Completed: "bg-emerald-600 text-white",
};

async function downloadAttachment(attachment) {
  try {
    const response = await fetch(
      `http://localhost:3000/attachment/download/${attachment.id_complain}?file=${encodeURIComponent(
        attachment.file
      )}`
    );

    if (!response.ok) {
      const result = await response.json().catch(() => null);

      throw new Error(
        result?.message || "Gagal mendownload attachment"
      );
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = attachment.file;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Gagal download attachment:", error);
    alert(error.message);
  }
}

export default function ComplaintDetailModal({ complaint, onClose }) {
  if (!complaint) return null;

  const attachments = complaint.attachments || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="font-plus-jakarta-sans text-lg font-bold text-slate-900">
            Complaint Detail
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 cursor-pointer hover:text-slate-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-inter text-sm text-slate-500">
              <Ticket size={16} className="text-[#2563eb]" />
              Ticket ID
            </span>
            <span className="font-inter text-sm font-semibold text-slate-900">
              #{complaint.ticketId}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-inter text-sm text-slate-500">
              <User size={16} className="text-[#2563eb]" />
              Customer
            </span>
            <span className="font-inter text-sm font-semibold text-slate-900">
              {complaint.customer}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-inter text-sm text-slate-500">
              <Tag size={16} className="text-[#2563eb]" />
              Category
            </span>
            <span className="font-inter text-sm font-semibold text-slate-900">
              {complaint.category}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-inter text-sm text-slate-500">
              <Calendar size={16} className="text-[#2563eb]" />
              Date Submitted
            </span>
            <span className="font-inter text-sm font-semibold text-slate-900">
              {complaint.dateSubmitted}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-inter text-sm text-slate-500">Status</span>
            <span
              className={`rounded-full px-3 py-1 font-inter text-xs font-semibold ${STATUS_STYLES[complaint.status]}`}
            >
              {complaint.status}
            </span>
          </div>

          <div>
            <p className="mb-1.5 font-inter text-sm text-slate-500">
              Description
            </p>
            <p className="rounded-lg bg-slate-50 p-3 font-inter text-sm leading-relaxed text-slate-700">
              {complaint.description ||
                "Tidak ada deskripsi tambahan untuk complaint ini."}
            </p>
          </div>

          {/* Attachments */}
          <div>
            <p className="mb-1.5 font-inter text-sm text-slate-500">
              Attachments
            </p>

            {attachments.length === 0 ? (
              <p className="rounded-lg bg-slate-50 p-3 font-inter text-sm text-slate-400">
                There are no attachments for this complaint.
              </p>
            ) : (
              <ul className="space-y-2">
                {attachments.map((file, index) => (
                  <li
                    key={`${file.file}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <FileText size={16} className="shrink-0 text-slate-400" />
                      <span className="truncate font-inter text-sm text-slate-700">
                        {file.file}
                      </span>
                      {file.size && (
                        <span className="shrink-0 font-inter text-xs text-slate-400">
                          ({file.size})
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => downloadAttachment(file)}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-inter text-xs font-semibold text-[#2563eb] cursor-pointer hover:bg-[#2563eb]/10"
                      aria-label={`Download ${file.file}`}
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#2563eb] px-5 py-2 font-inter text-sm font-semibold text-white transition-colors cursor-pointer hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
