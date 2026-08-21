import { useEffect, useState } from "react";
import { User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import CategoryDonutChart from "../components/CategoryDonutChart";
import RecentComplaintsTable from "../components/RecentComplaintsTable";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });

  const [categoryBreakdown, setCategoryBreakdown] = useState([]);

  const [recentComplaints, setRecentComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Staff Portal | Dashboard";

    const fetchDashboardData = async () => {
      try {
        const [
          complaintStatisticResponse,
          categoryStatisticResponse,
          recentComplaintResponse,
        ] = await Promise.all([
          fetch("http://localhost:3000/complainStatistic", {
            method: "POST",
          }),

          fetch("http://localhost:3000/categoryStatistic", {
            method: "POST",
          }),

          fetch("http://localhost:3000/showComplain", {
            method: "POST",
          }),
        ]);

        const complaintStatistic =
          await complaintStatisticResponse.json();

        const categoryStatistic =
          await categoryStatisticResponse.json();

        const recentComplaint =
          await recentComplaintResponse.json();

        // Cek error
        if (!complaintStatisticResponse.ok) {
          throw new Error(
            complaintStatistic.message ||
              "Gagal mengambil statistik complaint"
          );
        }

        if (!categoryStatisticResponse.ok) {
          throw new Error(
            categoryStatistic.message ||
              "Gagal mengambil statistik category"
          );
        }

        if (!recentComplaintResponse.ok) {
          throw new Error(
            recentComplaint.message ||
              "Gagal mengambil complaint terbaru"
          );
        }

        // =========================
        // STATISTIK COMPLAINT
        // =========================

        setStats({
          total: complaintStatistic.data.total,
          completed: complaintStatistic.data.statistics.complete,
          inProgress: complaintStatistic.data.statistics.process,
          pending: complaintStatistic.data.statistics.pending,
        });

        // =========================
        // STATISTIK CATEGORY
        // =========================

        const category =
          categoryStatistic.data.statistics;

        setCategoryBreakdown([
          {
            label: "Billing Issue",
            value: category.billing_issue,
            color: "#2563eb",
          },
          {
            label: "Service Quality",
            value: category.service_quality,
            color: "#10b981",
          },
          {
            label: "Technical Problem",
            value: category.technical_problem,
            color: "#f97316",
          },
          {
            label: "Product Defect",
            value: category.product_defect,
            color: "#8b5cf6",
          },
          {
            label: "Other",
            value: category.other,
            color: "#64748b",
          },
        ]);

        // =========================
        // COMPLAINT TERBARU
        // =========================

        const complaints = recentComplaint.data.map(
          (complaint) => ({
            ticketId: complaint.cpm_code,
            customer: complaint.name,
            category: complaint.category,
            dateSubmitted: complaint.generate_at,
            status: complaint.status,
            id_complain: complaint.id_complain,
          })
        );

        setRecentComplaints(complaints);

      } catch (error) {
        console.error(
          "Gagal mengambil data dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  
  //sementara kek gini, supaya bisa run
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");

    window.location.href = "/login";
  };

  const handleViewComplaint = (complaint) => {
    console.log("View complaint:", complaint);
  };
  //sampe sini


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
            <StatCard label="Total Complaints" value={stats.total} />
            <StatCard
              label="Completed"
              value={stats.completed}
              valueColor="text-emerald-600"
            />
            <StatCard
              label="In Progress"
              value={stats.inProgress}
              valueColor="text-[#2563eb]"
            />
            <StatCard
              label="Pending"
              value={stats.pending}
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
                <CategoryDonutChart data={categoryBreakdown} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <h2 className="px-5 pt-5 font-plus-jakarta-sans text-base font-bold text-slate-900 sm:px-6 sm:pt-6">
                Recent Complaints
              </h2>
              <div className="mt-4">
                <RecentComplaintsTable
                  complaints={recentComplaints}
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
