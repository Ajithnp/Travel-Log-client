import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Info,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type React from "react";
import { Loader } from "./loader";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  destructive?: boolean;
  variant?: "danger" | "info" | "success";
  icon?: React.ReactNode;
  className?: string;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  destructive = false,
  variant = "danger",
  icon,
  className,
}: ConfirmDialogProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-500/10",
          iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
          iconColor: "text-emerald-600 dark:text-emerald-400",
          button:
            "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20",
          Icon: CheckCircle2,
        };
      case "info":
        return {
          bg: "bg-blue-50 dark:bg-blue-500/10",
          iconBg: "bg-blue-100 dark:bg-blue-500/20",
          iconColor: "text-blue-600 dark:text-blue-400",
          button:
            "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",
          Icon: Info,
        };
      default:
        return {
          bg: "bg-rose-50 dark:bg-rose-500/10",
          iconBg: "bg-rose-100 dark:bg-rose-500/20",
          iconColor: "text-rose-600 dark:text-rose-400",
          button:
            "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20",
          Icon: destructive ? Trash2 : AlertTriangle,
        };
    }
  };

  const styles = getVariantStyles();
  const IconComponent = styles.Icon;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          "sm:max-w-[440px] rounded-[2rem] p-0 overflow-hidden border-none bg-white dark:bg-zinc-950 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]",
          className,
        )}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Top Accent Bar */}
              <div className={cn("h-2 w-full", styles.iconBg)} />

              <div className="px-8 pt-10 pb-8 text-center">
                {/* Icon Section */}
                <div className="flex justify-center mb-6">
                  {icon ? (
                    <div className="relative">
                      <div
                        className={cn(
                          "absolute inset-0 blur-2xl opacity-20 rounded-full",
                          styles.bg,
                        )}
                      />
                      {icon}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="relative"
                    >
                      <div
                        className={cn(
                          "absolute inset-0 blur-2xl opacity-30 rounded-full animate-pulse",
                          styles.bg,
                        )}
                      />
                      <div
                        className={cn(
                          "relative flex items-center justify-center w-20 h-20 rounded-[2rem] shadow-sm rotate-3 hover:rotate-0 transition-transform duration-500",
                          styles.iconBg,
                        )}
                      >
                        <IconComponent
                          className={cn("w-10 h-10", styles.iconColor)}
                          strokeWidth={1.5}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Content Section */}
                <AlertDialogHeader className="space-y-3 mb-8">
                  <AlertDialogTitle className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                    {title}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed px-2">
                    {description}
                  </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Footer Actions */}
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-center">
                  <AlertDialogCancel
                    disabled={loading}
                    className="h-14 flex-1 rounded-2xl border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-base"
                  >
                    {cancelText}
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault();
                      onConfirm();
                    }}
                    disabled={loading}
                    className={cn(
                      "h-14 flex-1 rounded-2xl font-bold transition-all text-base group overflow-hidden relative",
                      destructive ? styles.button : styles.button,
                      loading && "opacity-80",
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <Loader message="Processing..."/>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="text"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {confirmText}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AlertDialogContent>
    </AlertDialog>
  );
}
