import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface HeaderAction {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline";
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-6 shadow-premium">
      <div>
        <h1
          className="text-2xl sm:text-3xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>

        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {secondaryAction && (
          <Button
            variant={secondaryAction.variant ?? "outline"}
            className="gap-2 text-sm shadow-premium text-white bg-zinc-600"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.icon}
            {secondaryAction.label}

            {typeof secondaryAction.badgeCount === "number" && (
              <Badge className="ml-1 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0 h-5 min-w-5 justify-center">
                {secondaryAction.badgeCount}
              </Badge>
            )}
          </Button>
        )}

        {primaryAction && (
          <Button
            variant={"outline"}
            className="gap-2 text-sm shadow-premium text-white bg-zinc-600 "
            onClick={primaryAction.onClick}
          >
            {primaryAction.icon}
            {primaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
