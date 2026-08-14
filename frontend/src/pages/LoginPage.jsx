import { useEffect } from "react";
import { NavLink } from "react-router";
import { Workflow, ArrowLeft } from "lucide-react";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  useEffect(() => {
    document.title = "Resolve | Login";
  }, []);

  const handleLogin = ({ email, password, rememberMe }) => {
    // TODO: ganti dengan pemanggilan API autentikasi sesungguhnya
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f6fc] px-6 font-inter">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-8 pb-8 pt-10">
          {/* Logo: nama saja, tanpa gambar */}
          <div className="mb-8 flex justify-center items-center">
            <div className="h-15 w-15 flex justify-center items-center rounded-md bg-white shadow-md">
              <Workflow className="text-[#2563eb]" size={24} />
            </div>
          </div>

          <h1 className="text-center font-plus-jakarta-sans text-2xl font-bold text-[#2563eb]">
            Welcome Back
          </h1>
          <p className="mt-2 text-center font-inter text-sm text-slate-500">
            Sign in to your staff dashboard to manage complaints.
          </p>

          <div className="mt-7">
            <LoginForm onSubmit={handleLogin} />
          </div>

          <NavLink
            to="/"
            className="mt-7 mb-3 flex justify-center items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-[#2563eb]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </NavLink>
        </div>

        <div className="bg-[#eef1fb] px-8 py-4 text-center font-inter text-sm text-slate-600">
          Secure access for authorized personnel only.
        </div>
      </div>
    </div>
  );
}
