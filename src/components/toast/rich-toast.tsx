import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "warning" | "info";
export type ToastTheme = "dark" | "light";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface RichToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
  theme?: ToastTheme;
  className?: string;
}

interface ToastItem extends Required<Omit<RichToastOptions, "className">> {
  id: string;
  className?: string;
  createdAt: number;
}

// ── Icon map ───────────────────────────────────────────────────────────

const icons: Record<ToastVariant, React.ElementType> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const accentClass: Record<ToastVariant, string> = {
  success: "border-l-toast-success text-toast-success",
  error: "border-l-toast-error text-toast-error",
  warning: "border-l-toast-warning text-toast-warning",
  info: "border-l-toast-info text-toast-info",
};


const progressClass: Record<ToastVariant, string> = {
  success: "bg-toast-success",
  error: "bg-toast-error",
  warning: "bg-toast-warning",
  info: "bg-toast-info",
};

// ── Positioning ────────────────────────────────────────────────────────

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

const enterAnimation: Record<string, string> = {
  top: "animate-toast-slide-in-top",
  center: "animate-toast-slide-in-center",
  bottom: "animate-toast-slide-in-bottom",
};

const exitAnimation = "animate-toast-fade-out";

// ── Theme ──────────────────────────────────────────────────────────────

const themeClasses: Record<ToastTheme, string> = {
  dark: "bg-toast shadow-2xl",
  light: "bg-card border border-border shadow-lg",
};

const messageClasses: Record<ToastTheme, string> = {
  dark: "text-toast-foreground",
  light: "text-foreground",
};

const closeClasses: Record<ToastTheme, string> = {
  dark: "text-toast-muted hover:text-toast-foreground",
  light: "text-muted-foreground hover:text-foreground",
};

// ── Context ────────────────────────────────────────────────────────────

type ShowToastFn = (options: RichToastOptions) => void;

const RichToastContext = createContext<ShowToastFn | null>(null);

export const useRichToast = (): ShowToastFn => {
  const ctx = useContext(RichToastContext);
  if (!ctx) throw new Error("useRichToast must be used within <RichToastProvider>");
  return ctx;
};

// ── Single Toast ───────────────────────────────────────────────────────

const SingleToast: React.FC<{
  toast: ToastItem;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const Icon = icons[toast.variant];
  const direction = toast.position === "center"
    ? "center"
    : toast.position.startsWith("top") ? "top" : "bottom";

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(toast.id), 280);
  }, [onDismiss, toast.id]);

  useEffect(() => {
    timerRef.current = setTimeout(dismiss, toast.duration);
    return () => clearTimeout(timerRef.current);
  }, [dismiss, toast.duration]);

  return (
    <div
      role="alert"
      className={cn(
        "relative flex w-[360px] items-start gap-3 overflow-hidden rounded-lg border-l-4 px-4 py-3.5 backdrop-blur-md",
        themeClasses[toast.theme],
        accentClass[toast.variant],
        exiting ? exitAnimation : enterAnimation[direction],
        toast.className
      )}
      onMouseEnter={() => clearTimeout(timerRef.current)}
      onMouseLeave={() => {
        timerRef.current = setTimeout(dismiss, toast.duration);
      }}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />

      <p className={cn("flex-1 text-sm font-medium leading-snug", messageClasses[toast.theme])}>
        {toast.message}
      </p>

      <button
        onClick={dismiss}
        className={cn("shrink-0 rounded p-0.5 transition-colors", closeClasses[toast.theme])}
      >
        <X className="h-4 w-4" />
      </button>

      <span
        className={cn(
          "absolute bottom-0 left-0 h-[2px] animate-toast-progress",
          progressClass[toast.variant]
        )}
        style={{ animationDuration: `${toast.duration}ms` }}
      />
    </div>
  );
};

// ── Provider ───────────────────────────────────────────────────────────

export const RichToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show: ShowToastFn = useCallback((opts) => {
    const item: ToastItem = {
      id: crypto.randomUUID(),
      message: opts.message,
      variant: opts.variant ?? "info",
      duration: opts.duration ?? 4000,
      position: opts.position ?? "top-right",
      theme: opts.theme ?? "dark",
      className: opts.className,
      createdAt: Date.now(),
    };
    setToasts((prev) => [...prev, item]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const grouped = toasts.reduce<Record<string, ToastItem[]>>((acc, t) => {
    (acc[t.position] ??= []).push(t);
    return acc;
  }, {});

  return (
    <RichToastContext.Provider value={show}>
      {children}
      {Object.entries(grouped).map(([pos, items]) => (
        <div
          key={pos}
          className={cn(
            "fixed z-[9999] flex flex-col gap-2",
            positionClasses[pos as ToastPosition]
          )}
        >
          {items.map((t) => (
            <SingleToast key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </div>
      ))}
    </RichToastContext.Provider>
  );
};
