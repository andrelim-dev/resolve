import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPDF from "../pdf/ReportPDF";
import { FileSearch, FileDown } from "lucide-react";
import Dropdown from "./Dropdown";

export const REPORT_TYPE_OPTIONS = ["Monthly Summary", "Yearly Summary"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Opsi bulan untuk tahun berjalan (Monthly Summary)
export function getMonthlyPeriodOptions() {
  const currentYear = new Date().getFullYear();
  return MONTH_NAMES.map((month) => `${month} ${currentYear}`);
}

// Opsi tahun ini s.d. 7 tahun ke belakang (Yearly Summary)
export function getYearlyPeriodOptions() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 8 }, (_, i) => String(currentYear - i));
}

export default function ReportFilters({
  report,
  reportType,
  onReportTypeChange,
  period,
  onPeriodChange,
  periodOptions,
  onGenerate,
  isGenerating,
  isExportEnabled,
}) {
  return (
    <div className="space-y-4">
      {/* Header: title + actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-plus-jakarta-sans text-2xl font-extrabold text-slate-900">
            Report Management
          </h1>
          <p className="mt-1 font-inter text-sm text-slate-500">
            Generate and export system complaint analytics.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2.5 font-inter text-sm font-semibold text-white shadow-sm transition-colors cursor-pointer hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FileSearch size={20} />
            {isGenerating ? "Generating..." : "Generate Report"}
          </button>
          {report ? (
            <PDFDownloadLink
              document={<ReportPDF report={report} />}
              fileName={`complaint-report-${report.period}.pdf`}
              disabled={!isExportEnabled}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-700 transition-colors cursor-pointer hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileDown size={20} />
              Export PDF
            </PDFDownloadLink>
          ) : (
            <button
              type="button"
              disabled={!isExportEnabled}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-700 transition-colors cursor-pointer hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileDown size={20} />
              Export PDF
            </button>
          )}
        </div>
      </div>

      {/* Filter card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Dropdown
            label="Report Type"
            value={reportType}
            options={REPORT_TYPE_OPTIONS}
            onChange={onReportTypeChange}
          />
          <Dropdown
            label="Period"
            value={period}
            options={periodOptions}
            onChange={onPeriodChange}
          />
        </div>
      </div>
    </div>
  );
}
