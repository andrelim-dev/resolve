import { Workflow } from "lucide-react";
import { NavLink } from "react-router";
import { useLocation } from "react-router";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Submit Complaint", href: "/submit-complaint" },
  { label: "Track Complaint", href: "/track-complaint" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <Workflow className="text-[#2563eb]" size={24} />
          <span className="font-plus-jakarta-sans text-lg font-bold text-[#2563eb]">
            Resolve
          </span>
        </NavLink>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={`font-inter text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "border-b-2 border-[#2563eb] pb-1 text-[#2563eb]"
                  : "text-slate-600 hover:text-[#2563eb]"
              }`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Sign in */}
        <NavLink
          to="/login"
          className="rounded-lg border border-slate-300 px-4 py-2 font-inter text-sm font-medium text-slate-700 transition-colors hover:bg-[#2563eb] hover:border-[#2563eb] hover:text-white"
        >
          Sign In
        </NavLink>
      </div>
    </header>
  );
}
