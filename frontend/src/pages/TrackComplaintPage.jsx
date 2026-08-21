import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrackSearchBar from "../components/TrackSearchBar";
import TicketCard from "../components/TicketCard";
import ResolutionTimeline from "../components/ResolutionTimeline";

const formatWIB = (date) => {
    if (!date) return null;

    const utcDate = new Date(
        date.replace(" ", "T") + "Z"
    );

    return utcDate.toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }) + " WIB";
};

const formatDateWIB = (date) => {
    if (!date) return null;

    const utcDate = new Date(
        date.replace(" ", "T") + "Z"
    );

    return utcDate.toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

function getLastUpdated(ticket) {
  if (ticket.completed_at) {
    return formatDateTime(ticket.completed_at);
  }

  if (ticket.processing_at) {
    return formatDateTime(ticket.processing_at);
  }

  if (ticket.submitted_at) {
    return formatDateTime(ticket.submitted_at);
  }

  return "-";
}

function buildTimeline(ticket) {
  const steps = [];

  // =========================
  // SUBMITTED
  // =========================

  steps.push({
    title: "Submitted",
    description: "Complaint received by system.",
    meta: ticket.submitted_at
      ? formatDateTime(ticket.submitted_at)
      : "Pending",
    state: ticket.submitted_at ? "done" : "upcoming",
  });

  // =========================
  // PROCESSING
  // =========================

  if (ticket.completed_at) {
    steps.push({
      title: "Processing",
      description: "Complaint is being investigated.",
      meta: ticket.processing_at
        ? formatDateTime(ticket.processing_at)
        : "Completed",
      state: "done",
    });
  } else if (ticket.processing_at) {
    steps.push({
      title: "Processing",
      description: "Complaint is being investigated.",
      meta: "In Progress",
      state: "current",
    });
  } else {
    steps.push({
      title: "Processing",
      description: "Complaint is being investigated.",
      meta: "Pending",
      state: "upcoming",
    });
  }

  // =========================
  // COMPLETED
  // =========================

  if (ticket.completed_at) {
    steps.push({
      title: "Completed",
      description: "Resolution provided.",
      meta: formatDateTime(ticket.completed_at),
      state: "done",
    });
  } else {
    steps.push({
      title: "Completed",
      description: "Resolution provided.",
      meta: "Pending",
      state: "upcoming",
    });
  }

  return steps;
}

export default function TrackComplaintPage() {
  useEffect(() => {
    document.title = "Resolve | Track Complaint";
  }, []);

  const [ticketNumber, setTicketNumber] = useState("");
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

const handleTrack = async () => {
    try {
        const code = ticketNumber.trim();

        if (!code) {
            alert("Masukkan nomor CMP terlebih dahulu.");
            return;
        }

        console.log("TOMBOL TRACK DIKLIK");
        console.log("CMP:", code);

        const response = await fetch(
            "http://localhost:3000/trackComplain",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cpm_code: code,
                }),
            }
        );

        const result = await response.json();

        console.log("TRACK RESPONSE:", result);

        if (!response.ok) {
            throw new Error(
                result.message || "Gagal tracking complaint"
            );
        }

        const data = result.data;

        setTicket({
            ticketId: data.cpm_code,
            status: data.status,
            category: data.category,
            submittedDate: formatDateWIB(data.submitted_at),
            lastUpdated: data.completed_at
                ? formatDateWIB(data.completed_at)
                : data.processing_at
                    ? formatDateWIB(data.processing_at)
                    : data.submitted_at
                        ? formatDateWIB(data.submitted_at)
                        : "-",

            steps: [
                {
                    title: "Submitted",
                    description: "Complaint received by system.",
                    meta: data.submitted_at
                        ? formatWIB(data.submitted_at)
                        : "Pending",
                    state: data.submitted_at ? "done" : "upcoming",
                },
                {
                    title: "Processing",
                    description: "Complaint is being processed.",
                    meta: data.processing_at
                        ? formatWIB(data.processing_at)
                        : "Pending",
                    state: data.completed_at
                        ? "done"
                        : data.processing_at
                            ? "current"
                            : "upcoming",
                },
                {
                    title: "Completed",
                    description: "Resolution provided.",
                    meta: data.completed_at
                        ? formatWIB(data.completed_at)
                        : "Pending",
                    state: data.completed_at
                        ? "done"
                        : "upcoming",
                },
            ],
        });

    } catch (error) {
        console.error("Gagal tracking complaint:", error);

        setTicket(null);

        alert(error.message);
    }
};

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6fc] font-inter">
      <Navbar active="Track Complaint" />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pb-4 pt-14 text-center">
          <h1 className="font-plus-jakarta-sans text-3xl font-extrabold text-slate-900 md:text-4xl">
            Track Your Complaint
          </h1>
          <p className="mt-3 font-inter text-sm text-slate-500 md:text-base">
            Enter your ticket number below to check the real-time status of your
            request.
          </p>
        </section>

        <section className="mx-auto max-w-3xl space-y-6 px-6 pb-20 pt-8">
          <TrackSearchBar
            value={ticketNumber}
            onChange={setTicketNumber}
            onSubmit={handleTrack}
          />

          {ticket ? (
            <>
              <TicketCard
                ticketId={ticket.ticketId}
                status={ticket.status}
                category={ticket.category}
                submittedDate={ticket.submittedDate}
                lastUpdated={ticket.lastUpdated}
              />

              <ResolutionTimeline steps={ticket.steps} />
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center font-inter text-sm text-slate-500 shadow-sm">
              Tiket dengan nomor tersebut tidak ditemukan. Periksa kembali nomor
              tiket Anda.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
