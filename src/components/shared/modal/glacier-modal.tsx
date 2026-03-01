import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface GlacierModalProps {
  type: "success" | "pending" | "error" | "warning";
  title: string;
  description: string;
  primaryAction?: { label: string; onClick: () => void; disabled?: boolean };
  secondaryAction?: { label: string; onClick: () => void; disabled?: boolean };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const modalConfig = {
  success: {
    icon: <Check className="h-6 w-6 text-emerald-600" />,
    iconBg: "bg-emerald-100",
    glacierColor:
      "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
  },
  pending: {
    icon: <Clock className="h-6 w-6 text-indigo-600" />,
    iconBg: "bg-indigo-100",
    glacierColor:
      "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
  },
  error: {
    icon: <AlertCircle className="h-6 w-6 text-rose-600" />,
    iconBg: "bg-rose-100",
    glacierColor:
      "radial-gradient(circle, rgba(244, 63, 94, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
  },
  warning: {
    icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
    iconBg: "bg-amber-100",
    glacierColor:
      "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
  },
};

function GlacierModal({
  type,
  title,
  description,
  primaryAction,
  secondaryAction,
  open,
  onOpenChange,
}: GlacierModalProps) {
  const config = modalConfig[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        glacierColor={config.glacierColor}
        className="sm:max-w-[400px]"
      >
        <DialogHeader>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className={`w-14 h-14 ${config.iconBg} rounded-full flex items-center justify-center mb-6 shadow-sm border border-white/50`}
          >
            {config.icon}
          </motion.div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8 flex flex-col gap-3 w-full">
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="w-full bg-slate-950 text-white hover:bg-slate-800 h-12 rounded-2xl font-bold text-base shadow-lg transition-all active:scale-[0.98]"
              disabled={primaryAction.disabled}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="ghost"
              onClick={secondaryAction.onClick}
              className="w-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-12 rounded-2xl font-bold text-base transition-all"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GlacierModal;
