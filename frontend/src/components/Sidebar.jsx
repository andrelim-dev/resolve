import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  AlertCircle,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/staff/dashboard", icon: LayoutDashboard },
  {
    label: "Complaints",
    href: "/staff/complaint-management",
    icon: AlertCircle,
  },
  { label: "Reports", href: "/staff/report-management", icon: BarChart3 },
];

export default function Sidebar({
  active = "Complaints",
  onNavigate,
  onLogout, // ini nanti hapus aja
}) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const closeMobileMenu = () => setIsOpen(false);

  // Nanti ganti dengan implementasi API
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Mobile top bar: hamburger + brand, only visible below md */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <span className="font-plus-jakarta-sans text-lg font-bold text-[#2563eb]">
          Resolve
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Buka menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Backdrop overlay, only shown when mobile menu is open */}
      {isOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
        />
      )}

      {/* Sidebar: static on desktop, slide-in drawer on mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex min-h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-6 pb-5 pt-6">
          <div>
            <span className="font-plus-jakarta-sans text-lg font-bold text-[#2563eb]">
              Resolve
            </span>
            <p className="mt-0.5 font-inter text-xs text-slate-400">
              Staff Portal
            </p>
          </div>
          {/* Close button, only visible on mobile drawer */}
          <button
            onClick={closeMobileMenu}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 md:hidden"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-3 px-3">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = label === active;
            return (
              <NavLink
                key={label}
                to={href}
                onClick={closeMobileMenu}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-200 px-3 py-4">
          <button
            // onClick={onLogout} // ini nanti hapus aja
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm font-medium text-slate-600 cursor-pointer transition-colors hover:bg-red-100 hover:text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
