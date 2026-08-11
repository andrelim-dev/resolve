import { Workflow } from "lucide-react";

const footerLinks = ["Privacy Policy", "Terms of Service", "Contact Support"];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#eef1fb]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-6 py-8 md:gap-40 md:flex-row md:justify-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Workflow size={24} />
          <span className="font-plus-jakarta-sans text-lg font-bold text-slate-800">
            Resolve
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-inter text-sm text-slate-600 hover:text-[#2563eb]"
            >
              {link}
            </a>
          ))}
        </nav>

        <p className="font-inter text-sm text-slate-500">
          © 2026 Resolve. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
