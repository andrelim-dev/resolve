import { useEffect, useState } from "react";
import { User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ReportFilters, {
  REPORT_TYPE_OPTIONS,
  getMonthlyPeriodOptions,
  getYearlyPeriodOptions,
} from "../components/ReportFilters";
import ReportPreview from "../components/ReportPreview";


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
    try {
      setIsGenerating(true);

      let year;
      let month;

      if (reportType === "Monthly Summary") {
        const [monthName, yearValue] = period.split(" ");

        year = Number(yearValue);

        const monthNames = {
          January: 1,
          February: 2,
          March: 3,
          April: 4,
          May: 5,
          June: 6,
          July: 7,
          August: 8,
          September: 9,
          October: 10,
          November: 11,
          December: 12,
        };

        month = monthNames[monthName];

        if (!month || !year) {
          throw new Error("Format periode monthly tidak valid");
        }
      } else {
        year = Number(period);

        if (!year) {
          throw new Error("Format periode yearly tidak valid");
        }
      }

      const response = await fetch(
        "http://localhost:3000/complainReport",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type:
              reportType === "Monthly Summary"
                ? "monthly"
                : "yearly",

            year,

            ...(reportType === "Monthly Summary" && {
              month,
            }),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal membuat report"
        );
      }

      console.log("Report berhasil:", result);

      setReport(result.data);

    } catch (error) {
      console.error("Gagal membuat report:", error);
      alert(error.message);
    } finally {
      setIsGenerating(false);
    }
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
