import { User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import CategoryDonutChart from "../components/CategoryDonutChart";
import RecentComplaintsTable from "../components/RecentComplaintsTable";

// === DUMMY DATA ===
// TODO: ganti dengan hasil fetch dari API, misalnya:
// const { data } = await fetch("/api/dashboard/summary").then((res) => res.json());
const DUMMY_STATS = {
  total: 12,
  completed: 4,
  inProgress: 3,
  pending: 5,
};

// TODO: ganti dengan hasil agregasi complaint per kategori dari API, misalnya:
// const { data } = await fetch("/api/dashboard/complaints-by-category").then((res) => res.json());
const DUMMY_CATEGORY_BREAKDOWN = [
  { label: "Billing Issue", value: 4, color: "#2563eb" },
  { label: "Service Quality", value: 4, color: "#10b981" },
  { label: "Technical Problem", value: 4, color: "#f97316" },
  { label: "Product Defect", value: 0, color: "#8b5cf6" },
  { label: "Other", value: 0, color: "#64748b" },
];

// Data dummy sesuai yang diberikan.
// TODO: ganti dengan hasil fetch dari API, misalnya:
// const { data } = await fetch("/api/complaints?limit=5&sort=latest").then((res) => res.json());
const DUMMY_RECENT_COMPLAINTS = [
  {
    ticketId: "CMP-20241024-001",
    customer: "John Doe",
    category: "Billing Issue",
    dateSubmitted: "Oct 24, 2024",
    status: "Submitted",
  },
  {
    ticketId: "CMP-20241023-001",
    customer: "Alice Smith",
    category: "Service Quality",
    dateSubmitted: "Oct 23, 2024",
    status: "Processed",
  },
  {
    ticketId: "CMP-20241021-001",
    customer: "Michael Johnson",
    category: "Technical Problem",
    dateSubmitted: "Oct 21, 2024",
    status: "Completed",
  },
  {
    ticketId: "CMP-20241020-001",
    customer: "Emily Davis",
    category: "Billing Issue",
    dateSubmitted: "Oct 20, 2024",
    status: "Submitted",
  },
  {
    ticketId: "CMP-20241019-001",
    customer: "Robert Wilson",
    category: "Technical Problem",
    dateSubmitted: "Oct 19, 2024",
    status: "Processed",
  },
];

export default function DashboardPage() {
  const handleLogout = () => {
    // TODO: hapus session/token lalu redirect ke halaman login
    console.log("Logout (dummy)");
  };

  const handleViewComplaint = (complaint) => {
    // TODO: arahkan ke halaman detail complaint, misalnya navigate(`/staff/complaints/${complaint.ticketId}`)
    console.log("View complaint (dummy):", complaint);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6fc] font-inter md:flex-row">
      <Sidebar active="Dashboard" onLogout={handleLogout} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar — tanpa search & notifikasi sesuai permintaan */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-8">
          <h1 className="font-plus-jakarta-sans text-lg font-bold text-slate-900">
            Staff Dashboard
          </h1>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb] text-white">
            <User size={16} />
          </span>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Complaints" value={DUMMY_STATS.total} />
            <StatCard
              label="Completed"
              value={DUMMY_STATS.completed}
              valueColor="text-emerald-600"
            />
            <StatCard
              label="In Progress"
              value={DUMMY_STATS.inProgress}
              valueColor="text-[#2563eb]"
            />
            <StatCard
              label="Pending"
              value={DUMMY_STATS.pending}
              valueColor="text-red-600"
            />
          </div>

          {/* Chart + Recent complaints */}
          <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-[380px_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-plus-jakarta-sans text-base font-bold text-slate-900">
                Complaints by Category
              </h2>
              <div className="mt-5">
                <CategoryDonutChart data={DUMMY_CATEGORY_BREAKDOWN} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <h2 className="px-5 pt-5 font-plus-jakarta-sans text-base font-bold text-slate-900 sm:px-6 sm:pt-6">
                Recent Complaints
              </h2>
              <div className="mt-4">
                <RecentComplaintsTable
                  complaints={DUMMY_RECENT_COMPLAINTS}
                  onView={handleViewComplaint}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
