import { iconVariants, modalVariants, policyBackdropVariants } from "@/animation/variants";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  PowerOff,
  Power,
  AlertTriangle,
  ShieldCheck,
  X,
  Loader2,
} from "lucide-react";

export type ToggleAction = "disable" | "enable";

export interface ConfirmToggleModalProps {
  isOpen: boolean;
  action: ToggleAction;
  policyName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}



const config = {
  disable: {
    icon: PowerOff,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    accentBar: "from-red-400 to-rose-500",
    title: "Disable Policy?",
    confirmBg: "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
    confirmText: "Yes, Disable",
    badgeBg: "bg-red-50 text-red-600 border-red-200",
    tagline: (name: string) => (
      <>
        You're about to disable <strong className="text-slate-900">"{name}"</strong>.
        Existing bookings won't be affected, but this policy will no longer be
        available for new bookings.
      </>
    ),
    warning: "This can be re-enabled at any time.",
    warningBg: "bg-amber-50 border-amber-100 text-amber-700",
    warningIcon: AlertTriangle,
  },
  enable: {
    icon: Power,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    accentBar: "from-emerald-400 to-teal-500",
    title: "Enable Policy?",
    confirmBg: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
    confirmText: "Yes, Enable",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    tagline: (name: string) => (
      <>
        You're about to re-enable <strong className="text-slate-900">"{name}"</strong>.
        This policy will become available again for new bookings immediately.
      </>
    ),
    warning: "This policy will go live right away.",
    warningBg: "bg-sky-50 border-sky-100 text-sky-700",
    warningIcon: ShieldCheck,
  },
};



export function ConfirmToggleModal({
  isOpen,
  action,
  policyName,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmToggleModalProps) {
  const c = config[action];
  const Icon = c.icon;
  const WarnIcon = c.warningIcon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          variants={policyBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,20,0.50)", backdropFilter: "blur(7px)" }}
          onClick={(e) => e.target === e.currentTarget && onCancel()}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-[0_32px_80px_-8px_rgba(0,0,0,0.26)] overflow-hidden"
          >
            {/* Accent stripe */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${c.accentBar}`} />

            {/* Close */}
            <Button
            onClick={onCancel}
            variant={"outline"}
            className="absolute top-4 right-4 w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5 text-slate-500" />
            </Button>

            <div className="px-7 pt-7 pb-6 flex flex-col items-center text-center gap-5">

              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className={`w-16 h-16 rounded-2xl ${c.iconBg} flex items-center justify-center shadow-sm`}
              >
                <Icon className={`w-7 h-7 ${c.iconColor}`} strokeWidth={2} />
              </motion.div>

              {/* Title + body */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{c.title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[260px] mx-auto">
                  {c.tagline(policyName)}
                </p>
              </div>

              <div className={`w-full flex items-center gap-2.5 rounded-xl border px-4 py-3 ${c.warningBg}`}>
                <WarnIcon className="w-4 h-4 flex-shrink-0" />
                <p className="text-xs font-medium">{c.warning}</p>
              </div>

              <div className="w-full flex items-center gap-3 pt-1">
                <Button
                 onClick={onCancel}
                 variant={"outline"}
                  disabled={isLoading}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </Button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md transition-all disabled:opacity-70 ${c.confirmBg}`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Icon className="w-3.5 h-3.5" />
                      {c.confirmText}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}