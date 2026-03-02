import { AlertCircle, RefreshCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorProps {
  title?: string;
  message?: string;
  code?: number | string;
  onRetry?: () => void;
  onBack?: () => void;
  className?: string;
}

export function Error({
  title = "Something went wrong",
  message = "We encountered an unexpected error while communicating with our servers. Please try again later.",
  code,
  onRetry,
  onBack,
  className,
}: ErrorProps) {
  return (
    <div className="h-full flex items-center justify-center p-4">
    <div
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-2xl border border-destructive/20 bg-card/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all",
        "animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-8",
        className,
      )}
      data-testid="api-error-container"
    >
      {/* Decorative background glow */}
      <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-destructive/15 blur-3xl pointer-events-none" />
      <div className="absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-destructive/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive shadow-[inset_0_0_12px_rgba(220,38,38,0.2)] ring-1 ring-destructive/20">
          <AlertCircle
            className="h-8 w-8 animate-[pulse_3s_ease-in-out_infinite]"
            strokeWidth={1.5}
          />
        </div>

        <div className="space-y-2.5">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed balance">
            {message}
          </p>
          {code && (
            <div className="mt-3 inline-flex items-center rounded-md border border-destructive/20 bg-destructive/5 px-2.5 py-1 text-xs font-medium text-destructive tracking-widest uppercase">
              ERR_CODE: {code}
            </div>
          )}
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="default"
              className="w-full bg-destructive/10 text-destructive-foreground hover:bg-destructive/30 shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
              data-testid="button-retry-api"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          {onBack && (
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98] border-border/50 hover:bg-muted/50"
              data-testid="button-back-api"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
