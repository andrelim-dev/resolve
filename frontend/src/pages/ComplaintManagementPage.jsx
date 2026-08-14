import { useEffect, useMemo, useState } from "react";
import { User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintsTable from "../components/ComplaintsTable";
import ComplaintDetailModal from "../components/ComplaintDetailModal";

const PAGE_SIZE = 5;

// === DUMMY DATA ===
// TODO: ganti dengan hasil fetch dari API, misalnya:
// const { data } = await fetch("/api/complaints").then((res) => res.json());
const DUMMY_COMPLAINTS = [
  {
    ticketId: "CMP-20241024-001",
    customer: "John Doe",
    category: "Billing Issue",
    dateSubmitted: "Oct 24, 2024",
    status: "Submitted",
    description: "Customer was charged twice for the same invoice.",
    attachments: [
      { name: "invoice-oct-2024.pdf", size: "245 KB" },
      { name: "payment-receipt.jpg", size: "1.1 MB" },
    ],
  },
  {
    ticketId: "CMP-20241023-001",
    customer: "Alice Smith",
    category: "Service Quality",
    dateSubmitted: "Oct 23, 2024",
    status: "Processed",
    description: "Service was down for 3 hours in the customer's region.",
    attachments: [{ name: "outage-screenshot.png", size: "890 KB" }],
  },
  {
    ticketId: "CMP-20241021-001",
    customer: "Michael Johnson",
    category: "Technical Problem",
    dateSubmitted: "Oct 21, 2024",
    status: "Completed",
    description: "Login issue resolved after password reset.",
    attachments: [],
  },
  {
    ticketId: "CMP-20241020-001",
    customer: "Emily Davis",
    category: "Billing Issue",
    dateSubmitted: "Oct 20, 2024",
    status: "Submitted",
    description: "Refund request for cancelled subscription.",
  },
  {
    ticketId: "CMP-20241019-001",
    customer: "Robert Wilson",
    category: "Technical Problem",
    dateSubmitted: "Oct 19, 2024",
    status: "Processed",
    description: "App crashes when uploading attachments.",
  },
  {
    ticketId: "CMP-20241018-001",
    customer: "Sarah Brown",
    category: "Service Quality",
    dateSubmitted: "Oct 18, 2024",
    status: "Completed",
    description: "Outage traced to a regional network issue, now fixed.",
  },
  {
    ticketId: "CMP-20241017-001",
    customer: "David Miller",
    category: "Billing Issue",
    dateSubmitted: "Oct 17, 2024",
    status: "Submitted",
    description: "Invoice amount does not match the agreed plan.",
  },
  {
    ticketId: "CMP-20241016-001",
    customer: "Laura Garcia",
    category: "Technical Problem",
    dateSubmitted: "Oct 16, 2024",
    status: "Completed",
    description: "Guided customer through app reinstallation.",
  },
  {
    ticketId: "CMP-20241015-001",
    customer: "James Martinez",
    category: "Service Quality",
    dateSubmitted: "Oct 15, 2024",
    status: "Submitted",
    description: "Intermittent connectivity issues reported.",
  },
  {
    ticketId: "CMP-20241014-001",
    customer: "Olivia Anderson",
    category: "Billing Issue",
    dateSubmitted: "Oct 14, 2024",
    status: "Processed",
    description: "Requesting itemized billing breakdown.",
  },
  {
    ticketId: "CMP-20241013-001",
    customer: "Daniel Taylor",
    category: "Technical Problem",
    dateSubmitted: "Oct 13, 2024",
    status: "Submitted",
    description: "Unable to reset two-factor authentication.",
  },
  {
    ticketId: "CMP-20241012-001",
    customer: "Sophia Thomas",
    category: "Service Quality",
    dateSubmitted: "Oct 12, 2024",
    status: "Completed",
    description: "Confirmed service restored, customer notified.",
  },
];

const EMPTY_FILTERS = { search: "", category: "", status: "" };

export default function ComplaintManagementPage() {
  useEffect(() => {
    document.title = "Staff Portal | Complaint Management";
  }, []);

  const [complaints, setComplaints] = useState(DUMMY_COMPLAINTS);

  // draftFilters = nilai input yang sedang diketik/dipilih user (belum tentu diterapkan)
  // appliedFilters = nilai filter yang benar-benar aktif, baru berubah saat tombol "Filter" ditekan
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  const [page, setPage] = useState(1);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const filteredComplaints = useMemo(() => {
    const { search, category, status } = appliedFilters;
    const keyword = search.trim().toLowerCase();

    return complaints.filter((c) => {
      const matchesSearch =
        !keyword ||
        c.ticketId.toLowerCase().includes(keyword) ||
        c.customer.toLowerCase().includes(keyword);
      const matchesCategory = !category || c.category === category;
      const matchesStatus = !status || c.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [complaints, appliedFilters]);

  const paginatedComplaints = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return filteredComplaints.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredComplaints, page]);

  const handleApplyFilter = () => {
    setAppliedFilters(draftFilters);
    setPage(1);
  };

  const handleClearFilter = () => {
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setPage(1);
  };

  // === DUMMY STATUS UPDATE FUNCTION ===
  // TODO: ganti dengan pemanggilan API sesungguhnya, misalnya:
  // await fetch(`/api/complaints/${ticketId}/status`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ status: newStatus }),
  // });
  const handleStatusChange = (ticketId, newStatus) => {
    console.log("Updating status (dummy):", ticketId, "->", newStatus);
    setComplaints((prev) =>
      prev.map((c) =>
        c.ticketId === ticketId ? { ...c, status: newStatus } : c,
      ),
    );
  };

  const handleLogout = () => {
    // TODO: hapus session/token lalu redirect ke halaman login
    console.log("Logout (dummy)");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6fc] font-inter md:flex-row">
      <Sidebar active="Complaints" onLogout={handleLogout} />

      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-8">
          <h1 className="font-plus-jakarta-sans text-lg font-bold text-slate-900">
            Staff Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb] text-white">
              <User size={16} />
            </span>
          </div>
        </header>

        <main className="px-4 py-6 md:px-8 md:py-8">
          <h2 className="font-plus-jakarta-sans text-xl font-extrabold text-slate-900 md:text-2xl">
            Complaint Management
          </h2>
          <p className="mt-1 font-inter text-sm text-slate-500">
            Review and update customer tickets.
          </p>

          <div className="mt-6">
            <ComplaintFilters
              draftFilters={draftFilters}
              onDraftChange={setDraftFilters}
              onFilter={handleApplyFilter}
              onClear={handleClearFilter}
            />
          </div>

          <ComplaintsTable
            complaints={paginatedComplaints}
            totalCount={filteredComplaints.length}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            onStatusChange={handleStatusChange}
            onView={setSelectedComplaint}
          />
        </main>
      </div>

      <ComplaintDetailModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />
    </div>
  );
}
