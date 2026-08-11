import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrackSearchBar from "../components/TrackSearchBar";
import TicketCard from "../components/TicketCard";
import ResolutionTimeline from "../components/ResolutionTimeline";

// Contoh data dummy — pada implementasi nyata, ganti dengan hasil fetch API
// berdasarkan ticketId yang dicari.
const MOCK_TICKET = {
  ticketId: "CMP-20260810-001",
  status: "Processing",
  category: "Billing Issue",
  submittedDate: "Aug 11, 2026",
  lastUpdated: "2 hours ago",
  steps: [
    {
      title: "Submitted",
      description: "Complaint received by system.",
      meta: "Aug 10, 2026 - 09:00",
      state: "done",
    },
    {
      title: "Processing",
      description: "Investigating the issue.",
      meta: "In Progress", // INFO: jika state menjadi done, maka meta diganti menjadi tanggal state menjadi done
      state: "current",
    },
    {
      title: "Completed",
      description: "Resolution provided.",
      meta: "Pending",
      state: "upcoming",
    },
  ],
};

export default function TrackComplaintPage() {
  const [ticketNumber, setTicketNumber] = useState("CMP-20260810-001");
  const [ticket, setTicket] = useState(MOCK_TICKET);

  const handleTrack = () => {
    // TODO: ganti dengan pemanggilan API sesungguhnya berdasarkan ticketNumber
    if (ticketNumber.trim() === MOCK_TICKET.ticketId) {
      setTicket(MOCK_TICKET);
    } else {
      setTicket(null);
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
