import { useEffect, useMemo, useState } from "react";
import { User } from "lucide-react";

import Sidebar from "../components/Sidebar";
import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintsTable from "../components/ComplaintsTable";
import ComplaintDetailModal from "../components/ComplaintDetailModal";

const PAGE_SIZE = 5;

const EMPTY_FILTERS = {
  search: "",
  category: "",
  status: "",
};

export default function ComplaintManagementPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  const [page, setPage] = useState(1);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // =====================================================
  // FETCH COMPLAINT
  // =====================================================

  useEffect(() => {
    document.title = "Staff Portal | Complaint Management";

    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/showAllComplain",
          {
            method: "POST",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Gagal mengambil data complaint"
          );
        }

        console.log("SHOW ALL COMPLAINT RESPONSE:", result.data);

        const formattedComplaints = result.data.map((complaint) => ({
          ticketId: complaint.cpm_code,
          customer: complaint.name,
          category: complaint.category,
          dateSubmitted: complaint.generate_at,
          status: complaint.status,
          id_complain: complaint.id_complain,

          // Attachments
          attachments: complaint.attachments || [],
        }));

        console.log("FORMATTED COMPLAINTS:", formattedComplaints);

        setComplaints(formattedComplaints);
      } catch (error) {
        console.error("Gagal mengambil complaint:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = useMemo(() => {
    const { search, category, status } = appliedFilters;
    const keyword = search.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const matchesSearch =
        !keyword ||
        (complaint.ticketId || "").toLowerCase().includes(keyword) ||
        (complaint.customer || "").toLowerCase().includes(keyword);

      const matchesCategory =
        !category || complaint.category === category;

      const matchesStatus =
        !status || complaint.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [complaints, appliedFilters]);

  const paginatedComplaints = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;

    return filteredComplaints.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
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

  // =====================================================
  // STATUS UPDATE
  // =====================================================

  const handleStatusChange = async (complaint, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/complain/${complaint.id_complain}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal update status"
        );
      }

      console.log("Status berhasil diupdate:", data);

      // Update status di frontend
      setComplaints((prev) =>
        prev.map((item) =>
          item.id_complain === complaint.id_complain
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );

      // Kalau modal sedang terbuka untuk complaint ini,
      // ikut update statusnya
      setSelectedComplaint((prev) => {
        if (
          !prev ||
          prev.id_complain !== complaint.id_complain
        ) {
          return prev;
        }

        return {
          ...prev,
          status: newStatus,
        };
      });
    } catch (error) {
      console.error("Gagal update status:", error);
      alert(error.message);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
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
