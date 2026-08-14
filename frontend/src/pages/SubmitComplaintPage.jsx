import { useEffect, useState } from "react";
import { Ticket, Calendar, ChevronDown, SendHorizontal } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FileDropzone from "../components/FileDropzone";

const CATEGORIES = [
  "Billing Issue",
  "Service Quality",
  "Technical Problem",
  "Product Defect",
  "Other",
];

// Dummy generator — pada implementasi nyata, nomor tiket biasanya
// dibuat oleh backend saat draft complaint dibuat / setelah submit berhasil.
function generateTicketNumber() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `CMP-${y}${m}${d}-001`;
}

function formatDateGenerated() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SubmitComplaintPage() {
  useEffect(() => {
    document.title = "Resolve | Submit Complaint";
  }, []);

  const [ticketNumber] = useState(generateTicketNumber);
  const [dateGenerated] = useState(formatDateGenerated);

  const [customerName, setCustomerName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!customerName.trim()) newErrors.customerName = "Name is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // === DUMMY SUBMIT FUNCTION ===
  // TODO: ganti isi fungsi ini dengan pemanggilan API sesungguhnya, misalnya:
  //
  // const formData = new FormData();
  // formData.append("ticketNumber", ticketNumber);
  // formData.append("customerName", customerName);
  // formData.append("category", category);
  // formData.append("description", description);
  // files.forEach((file) => formData.append("attachments", file));
  //
  // const res = await fetch("/api/complaints", {
  //   method: "POST",
  //   body: formData,
  // });
  // if (!res.ok) throw new Error("Gagal mengirim complaint");
  const submitComplaint = async (payload) => {
    // console.log("Submitting complaint (dummy):", payload);

    // Simulasi delay network
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulasi response sukses dari server
    return {
      success: true,
      ticketNumber: payload.ticketNumber,
    };
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await submitComplaint({
        ticketNumber,
        customerName,
        category,
        description,
        files,
      });

      if (result.success) {
        alert(
          `Complaint submitted successfully. Ticket number: ${result.ticketNumber}`,
        );
        // TODO: redirect ke halaman Track Complaint / halaman sukses
      }
    } catch (err) {
      alert(
        "An error occurred while submitting the complaint. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setCustomerName("");
    setCategory("");
    setDescription("");
    setFiles([]);
    setErrors({});
    // TODO: bisa juga diarahkan navigate("/") kalau pakai React Router
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6fc] font-inter">
      <Navbar active="Submit Complaint" />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pb-2 pt-10">
          <h1 className="font-plus-jakarta-sans text-3xl font-extrabold text-slate-900">
            Submit a Complaint
          </h1>
          <p className="mt-2 font-inter text-sm text-slate-500">
            Please provide the details of your issue. We aim to resolve all
            matters swiftly.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-16 pt-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            {/* Ticket meta box */}
            <div className="flex flex-col gap-4 rounded-xl bg-[#eef1fb] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-inter text-xs font-medium text-slate-500">
                  Ticket Number
                </p>
                <p className="mt-1 flex items-center gap-2 font-inter text-sm font-bold text-slate-900">
                  <Ticket size={16} className="text-[#2563eb]" />
                  {ticketNumber}
                </p>
              </div>
              <div>
                <p className="font-inter text-xs font-medium text-slate-500">
                  Date Generated
                </p>
                <p className="mt-1 flex items-center gap-2 font-inter text-sm font-bold text-slate-900">
                  <Calendar size={16} className="text-[#2563eb]" />
                  {dateGenerated}
                </p>
              </div>
            </div>

            {/* Customer Name */}
            <div className="mt-6">
              <label className="mb-1.5 block font-inter text-sm font-semibold text-slate-700">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full rounded-lg border px-4 py-2.5 font-inter text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.customerName
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-300 focus:border-[#2563eb] focus:ring-[#2563eb]/20"
                }`}
              />
              {errors.customerName && (
                <p className="mt-1 font-inter text-xs text-red-500">
                  {errors.customerName}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="mt-6">
              <label className="mb-1.5 block font-inter text-sm font-semibold text-slate-700">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full appearance-none rounded-lg border bg-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:ring-2 ${
                    category ? "text-slate-700" : "text-slate-400"
                  } ${
                    errors.category
                      ? "border-red-400 focus:ring-red-200"
                      : "border-slate-300 focus:border-[#2563eb] focus:ring-[#2563eb]/20"
                  }`}
                >
                  <option value="" disabled>
                    Select an issue category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="text-slate-700">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
              {errors.category && (
                <p className="mt-1 font-inter text-xs text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="mb-1 block font-inter text-sm font-semibold text-slate-700">
                Description <span className="text-red-500">*</span>
              </label>
              <p className="mb-1.5 font-inter text-sm text-slate-500">
                Provide a detailed account of the issue, including dates,
                amounts, or specific errors encountered.
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your complaint here..."
                rows={5}
                className={`w-full resize-y rounded-lg border px-4 py-3 font-inter text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.description
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-300 focus:border-[#2563eb] focus:ring-[#2563eb]/20"
                }`}
              />
              {errors.description && (
                <p className="mt-1 font-inter text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Attachments */}
            <div className="mt-6">
              <label className="mb-1.5 block font-inter text-sm font-semibold text-slate-700">
                Attachments
              </label>
              <FileDropzone files={files} onFilesChange={setFiles} />
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-inter text-sm font-semibold text-slate-700 transition-colors cursor-pointer hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 font-inter text-sm font-semibold text-white shadow-sm transition-colors cursor-pointer hover:bg-blue-700 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
                <SendHorizontal size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
