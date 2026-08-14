import { useEffect } from "react";
import { NavLink } from "react-router";
import { Home } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6fc] font-inter">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="text-center">
          {/* Big 404 */}
          <p className="font-plus-jakarta-sans text-7xl font-extrabold text-[#2563eb] md:text-8xl">
            404
          </p>

          <h1 className="mt-4 font-plus-jakarta-sans text-2xl font-bold text-slate-900 md:text-3xl">
            Page Not Found
          </h1>

          <p className="mx-auto mt-3 max-w-md font-inter text-sm leading-relaxed text-slate-500 md:text-base">
            Sorry, the page you're looking for is unavailable or may have been
            moved.
          </p>

          <NavLink
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3 font-inter text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Home size={16} />
            Back to Home
          </NavLink>
        </div>
      </main>

      <Footer />
    </div>
  );
}
