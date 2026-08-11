import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = () => {
    onSubmit?.({ email, password, rememberMe });
  };

  return (
    <div className="space-y-5">
      {/* Email */}
      <div>
        <label className="mb-1.5 block font-inter text-sm font-semibold text-slate-700">
          Email Address
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20">
          <Mail size={18} className="text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username@example.com"
            className="w-full bg-transparent font-inter text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-1.5 block font-inter text-sm font-semibold text-slate-700">
          Password
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20">
          <Lock size={18} className="text-slate-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-transparent font-inter text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-slate-400 hover:text-slate-600"
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <label className="flex items-center gap-2 font-inter text-sm text-slate-600">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]/30"
        />
        Remember me
      </label>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full rounded-lg bg-[#2563eb] py-3 font-inter text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 cursor-pointer"
      >
        Login
      </button>
    </div>
  );
}
