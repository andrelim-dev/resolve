import { NavLink } from "react-router";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
      {/* Badge */}
      <div className="mx-auto mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#2563eb]/10 px-4 py-1.5">
        <ShieldCheck size={14} className="text-[#2563eb]" />
        <span className="font-inter text-xs font-semibold tracking-wide text-[#2563eb]">
          SECURE &amp; CONFIDENTIAL
        </span>
      </div>

      {/* Heading */}
      <h1 className="font-plus-jakarta-sans text-4xl font-extrabold text-slate-900 md:text-5xl">
        We're Here to Help
      </h1>

      {/* Subtext */}
      <p className="mx-auto mt-5 max-w-xl font-inter text-base leading-relaxed text-slate-500">
        Submit your complaint and track its progress easily through our
        complaint management system. Fast, transparent, and built for
        resolution.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <NavLink
          to="/submit-complaint"
          className="w-52 flex justify-center items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3 font-inter text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          Submit a Complaint
          <ArrowRight size={16} />
        </NavLink>
        <NavLink
          to="/track-complaint"
          className="w-52 flex justify-center items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-inter text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Track Complaint
          <Search size={16} />
        </NavLink>
      </div>
    </section>
  );
}
