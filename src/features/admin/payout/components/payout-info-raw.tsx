import { CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";

export function InfoRow({
  icon: Icon,
  label,
  value,
  mono = false,
  accent = false,
  copyable = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="flex items-start sm:items-center justify-between gap-3 py-3 group">
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
          <Icon className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <span className="text-xs sm:text-sm text-slate-500 font-medium whitespace-nowrap">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className={`text-xs sm:text-sm font-semibold text-right break-all ${
            mono ? "font-mono text-slate-600" : accent ? "text-indigo-600" : "text-slate-800"
          }`}
        >
          {value}
        </span>
        {copyable && (
          <button onClick={copy} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            {copied
              ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              : <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
            }
          </button>
        )}
      </div>
    </div>
  );
}