import { TrendingUp, Check } from "lucide-react";

function StepIcon({ state }) {
  if (state === "done") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-white">
        <Check size={16} strokeWidth={3} />
      </div>
    );
  }
  if (state === "current") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#2563eb] bg-white">
        <div className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
      </div>
    );
  }
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-200 bg-white" />
  );
}

export default function ResolutionTimeline({ steps }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-8 flex items-center gap-2 font-plus-jakarta-sans text-lg font-bold text-slate-900">
        <TrendingUp size={18} className="text-[#2563eb]" />
        Resolution Progress
      </h2>

      <ol>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isMuted = step.state === "upcoming";

          return (
            <li
              key={step.title}
              className="relative flex items-center gap-6 pb-10 last:pb-0"
            >
              {/* Connector line */}
              {!isLast && (
                <span
                  className={`hidden sm:block absolute left-4 top-5 h-full w-0.5 -translate-x-1/2 ${
                    step.state === "done" ? "bg-[#2563eb]" : "bg-slate-200"
                  }`}
                />
              )}

              {/* Left: label + description */}
              <div className="flex-1 text-right">
                <p
                  className={`font-inter text-sm font-semibold ${
                    isMuted
                      ? "text-slate-400"
                      : step.state === "current"
                        ? "text-[#2563eb]"
                        : "text-slate-900"
                  }`}
                >
                  {step.title}
                </p>
                <p
                  className={`mt-0.5 font-inter text-sm ${
                    isMuted ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {step.description}
                </p>
              </div>

              {/* Center: icon */}
              <div className="relative z-10">
                <StepIcon state={step.state} />
              </div>

              {/* Right: date / status */}
              <div className="flex-1">
                <p
                  className={`font-inter text-sm ${
                    isMuted ? "text-slate-400" : "text-slate-700"
                  }`}
                >
                  {step.meta}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
