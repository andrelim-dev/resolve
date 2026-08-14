import { useEffect, useState } from "react";
import { User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ReportFilters, {
  REPORT_TYPE_OPTIONS,
  getMonthlyPeriodOptions,
  getYearlyPeriodOptions,
} from "../components/ReportFilters";
import ReportPreview from "../components/ReportPreview";

// === DUMMY CATEGORY DATA ===
// TODO: ganti dengan hasil fetch dari API berdasarkan reportType & period, misalnya:
// const { data } = await fetch(`/api/reports?type=${reportType}&period=${period}`).then((res) => res.json());
const DUMMY_CATEGORIES = [
  {
    category: "Billing Issue",
    shortLabel: "Bill",
    total: 450,
    completed: 400,
    processed: 20,
    pending: 30,
    color: "#2563eb",
  },
  {
    category: "Technical Problem",
    shortLabel: "Tech",
    total: 320,
    completed: 250,
    processed: 50,
    pending: 20,
    color: "#f97316",
  },
  {
    category: "Product Defect",
    shortLabel: "Prod",
    total: 210,
    completed: 180,
    processed: 10,
    pending: 20,
    color: "#8b5cf6",
  },
  {
    category: "Service Quality",
    shortLabel: "Serv",
    total: 150,
    completed: 90,
    processed: 30,
    pending: 30,
    color: "#10b981",
  },
  {
    category: "Other",
    shortLabel: "Other",
    total: 118,
    completed: 62,
    processed: 38,
    pending: 18,
    color: "#64748b",
  },
];

function buildDummyReport(period) {
  // nanti ganti dengan data asli
  const total = DUMMY_CATEGORIES.reduce((sum, c) => sum + c.total, 0);
  const completed = DUMMY_CATEGORIES.reduce((sum, c) => sum + c.completed, 0);
  const processed = DUMMY_CATEGORIES.reduce((sum, c) => sum + c.processed, 0);
  const pending = DUMMY_CATEGORIES.reduce((sum, c) => sum + c.pending, 0);

  return {
    period,
    generatedAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    summary: { total, completed, processed, pending },
    categories: DUMMY_CATEGORIES,
  };
}

export default function ReportManagementPage() {
  useEffect(() => {
    document.title = "Staff Portal | Report Management";
  }, []);

  const [reportType, setReportType] = useState(REPORT_TYPE_OPTIONS[0]);

  const periodOptions =
    reportType === "Monthly Summary"
      ? getMonthlyPeriodOptions()
      : getYearlyPeriodOptions();

  const [period, setPeriod] = useState(periodOptions[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState(null);

  // Setiap kali Report Type berganti, reset Period ke opsi pertama yang sesuai
  // dan kosongkan report lama (harus generate ulang).
  useEffect(() => {
    const newOptions =
      reportType === "Monthly Summary"
        ? getMonthlyPeriodOptions()
        : getYearlyPeriodOptions();
    setPeriod(newOptions[0]);
    setReport(null);
  }, [reportType]);

  // === DUMMY GENERATE REPORT FUNCTION ===
  // TODO: ganti isi fungsi ini dengan pemanggilan API sesungguhnya, misalnya:
  // const res = await fetch(`/api/reports/generate`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ reportType, period }),
  // });
  // const data = await res.json();
  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 700)); // simulasi network delay
    setReport(buildDummyReport(period));
    setIsGenerating(false);
  };

  const handleLogout = () => {
    // TODO: hapus session/token lalu redirect ke halaman login
    console.log("Logout (dummy)");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6fc] font-inter md:flex-row">
      <Sidebar active="Reports" onLogout={handleLogout} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar — tanpa search & notifikasi */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-8">
          <h1 className="font-plus-jakarta-sans text-lg font-bold text-slate-900">
            Staff Dashboard
          </h1>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb] text-white">
            <User size={16} />
          </span>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <ReportFilters
            report={report}
            reportType={reportType}
            onReportTypeChange={setReportType}
            period={period}
            onPeriodChange={setPeriod}
            periodOptions={periodOptions}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            isExportEnabled={!!report}
          />

          <div className="mt-6">
            {report ? (
              <ReportPreview
                period={report.period}
                generatedAt={report.generatedAt}
                summary={report.summary}
                categories={report.categories}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="font-inter text-sm text-slate-500">
                  No report has been generated yet. Select a Report Type &amp;
                  Period, then click{" "}
                  <span className="font-semibold text-slate-700">
                    Generate Report
                  </span>
                  .
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
