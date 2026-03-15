import { Trash2, AlertTriangle, LogOut, ShieldAlert, Rocket, Zap } from "lucide-react";

type IconType = "delete" | "warning" | "logout" | "shield" | "launch" | "power";
const ICON_MAP = { delete: Trash2, warning: AlertTriangle, logout: LogOut, shield: ShieldAlert, launch: Rocket, power: Zap };

const ICON_COLORS = {
  delete:  { inner: "from-red-600 via-red-500 to-rose-500",    glow: "rgba(239,68,68,0.15)",    shadow: "drop-shadow(0 2px 6px rgba(239,68,68,0.6))"   },
  warning: { inner: "from-amber-500 via-amber-400 to-yellow-400", glow: "rgba(245,158,11,0.15)", shadow: "drop-shadow(0 2px 6px rgba(245,158,11,0.6))"  },
  logout:  { inner: "from-slate-600 via-slate-500 to-slate-400",  glow: "rgba(100,116,139,0.12)",shadow: "drop-shadow(0 2px 6px rgba(100,116,139,0.5))" },
  shield:  { inner: "from-violet-600 via-violet-500 to-purple-500",glow: "rgba(139,92,246,0.15)",shadow: "drop-shadow(0 2px 6px rgba(139,92,246,0.6))"  },
  launch:  { inner: "from-emerald-600 via-emerald-500 to-teal-400",glow: "rgba(16,185,129,0.15)",shadow: "drop-shadow(0 2px 6px rgba(16,185,129,0.6))"  },
  power:   { inner: "from-blue-600 via-blue-500 to-sky-400",      glow: "rgba(59,130,246,0.15)", shadow: "drop-shadow(0 2px 6px rgba(59,130,246,0.6))"  },
};

interface Props {
  icon: IconType;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
    danger?: boolean;
    loading?: boolean;
     done?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({ icon, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", danger = false, onClose, onConfirm , loading, done = false,}: Props) {

 
  const Icon = ICON_MAP[icon];
  const c = ICON_COLORS[icon];

  const handleConfirm = () => {
   onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-md" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.92) translateY(10px) } to { opacity:1; transform:scale(1) translateY(0) } }`}</style>
      <div className="relative w-full max-w-md" style={{ animation: "modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
        <div className="relative rounded-2xl bg-white overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(99,102,241,0.1), 0 24px 64px rgba(15,23,42,0.14)" }}>
          {/* Glacier background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(147,197,253,0.35) 0%, transparent 70%)", filter: "blur(32px)" }} />
            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full" style={{ background: "radial-gradient(circle, rgba(167,243,208,0.3) 0%, transparent 70%)", filter: "blur(28px)" }} />
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(147,197,253,0.6), rgba(196,181,253,0.4), transparent)" }} />
          </div>

          <div className="relative z-10 p-6 sm:p-8">
            {/* 3D Icon */}
            <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-5">
              <div className="absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, filter: "blur(12px)", transform: "scale(1.4)" }} />
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${c.inner} overflow-hidden`} style={{ transform: "perspective(120px) rotateX(10deg) rotateY(-5deg)", boxShadow: "0 12px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.35)" }}>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-black/25 to-transparent" />
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                  <Icon className="w-7 h-7 text-white" style={{ filter: c.shadow }} />
                </div>
              </div>
            </div>

            <div className="text-center space-y-2.5 mb-7">
              <h2 className="text-xl sm:text-[22px] font-semibold tracking-tight text-slate-900">{title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{description}</p>
            </div>

            <div className="space-y-2.5">
              <button onClick={handleConfirm} disabled={loading || done} className="relative w-full h-11 rounded-xl text-sm font-medium text-white transition-all active:scale-[0.98] disabled:opacity-70" style={{ background: danger ? "linear-gradient(135deg,#ef4444,#dc2626)" : "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: danger ? "0 4px 14px rgba(220,38,38,0.3)" : "0 4px 14px rgba(99,102,241,0.3)" }}>
                {loading ? "Processing…" : done ? "✓ Done" : confirmLabel}
              </button>
              <button onClick={onClose} disabled={loading} className="w-full h-11 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all active:scale-[0.98]">
                {cancelLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}