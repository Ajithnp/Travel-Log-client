import { motion } from "framer-motion";

export function ProbabilityGauge({ value }: { value: number | null }) {
  const pct = value ?? 0;
  const clamped = Math.min(Math.max(pct, 0), 100);

  const color =
    clamped === 0
      ? "bg-slate-200"
      : clamped <= 20
      ? "bg-emerald-500"
      : clamped <= 50
      ? "bg-amber-500"
      : "bg-red-500";

  const label =
    clamped === 0
      ? "No chance set"
      : clamped <= 10
      ? "Very rare"
      : clamped <= 25
      ? "Rare"
      : clamped <= 50
      ? "Moderate"
      : clamped <= 75
      ? "High"
      : "Very high";

  return (
    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-500 font-medium">Win probability</span>
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs font-bold ${
              clamped === 0
                ? "text-slate-400"
                : clamped <= 20
                ? "text-emerald-600"
                : clamped <= 50
                ? "text-amber-600"
                : "text-red-600"
            }`}
          >
            {value !== null ? `${clamped}%` : "—"}
          </span>
          <span className="text-[10px] text-slate-400">· {label}</span>
        </div>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-slate-300">0%</span>
        <span className="text-[10px] text-slate-300">50%</span>
        <span className="text-[10px] text-slate-300">100%</span>
      </div>
    </div>
  );
}