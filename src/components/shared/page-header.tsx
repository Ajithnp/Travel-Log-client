import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HeaderAction {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  badgeCount?: number;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  primaryAction?: HeaderAction;
  secondaryAction?: HeaderAction;
}

export function PageHeader({
  title,
  description,
  primaryAction,
  secondaryAction,
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/60 backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary/5 blur-[3rem] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-500/5 blur-[3rem] pointer-events-none" />

      <div className="relative z-10 flex-1">
        <h1
          className="text-2xl sm:text-[28px] font-bold text-foreground tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-display, inherit)" }}
        >
          {title}
        </h1>

        {description && (
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 relative z-10">
        {secondaryAction && (
          <Button
            variant={secondaryAction.variant ?? "outline"}
            className={cn(
              "gap-2 text-sm font-medium h-10 px-4 transition-all duration-300",
              "border-border/50 bg-background/50 hover:bg-muted/50 shadow-sm"
            )}
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.icon && (
               <span className="text-muted-foreground">{secondaryAction.icon}</span>
            )}
            {secondaryAction.label}

            {typeof secondaryAction.badgeCount === "number" && (
              <Badge className="ml-1.5 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0 h-5 min-w-[20px] flex items-center justify-center font-bold border-none">
                {secondaryAction.badgeCount}
              </Badge>
            )}
          </Button>
        )}

        {primaryAction && (
          <Button
            variant={primaryAction.variant ?? "default"}
            className={cn(
              "gap-2 text-sm font-medium h-10 px-5 transition-all duration-300 group",
              "bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0"
            )}
             onClick={primaryAction.onClick}
          >
            {primaryAction.icon && (
               <span className="opacity-80 group-hover:opacity-100 transition-opacity">{primaryAction.icon}</span>
            )}
            {primaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
