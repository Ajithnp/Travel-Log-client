import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "relative overflow-hidden bg-skeleton rounded-md",
  {
    variants: {
      variant: {
        default: "animate-shimmer",
        pulse: "animate-pulse",
        wave: "animate-skeleton-wave",
        static: "",
      },
      size: {
        sm: "h-3",
        md: "h-4", 
        lg: "h-6",
        xl: "h-8",
      },
      shape: {
        default: "rounded-md",
        circle: "rounded-full aspect-square",
        text: "rounded-sm",
        button: "rounded-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, shape, width, height, style, ...props }, ref) => {
    const shimmerOverlay = variant === "default" && (
      <div 
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-skeleton-highlight to-transparent animate-shimmer"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--skeleton-highlight)), transparent)"
        }}
      />
    );

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size, shape }), className)}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      >
        {shimmerOverlay}
      </div>
    );
  }
);
Skeleton.displayName = "Skeleton";

// Composed skeleton patterns
const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonProps & { lines?: number }>(
  ({ lines = 1, className, ...props }, ref) => {
    if (lines === 1) {
      return <Skeleton ref={ref} shape="text" className={className} {...props} />;
    }

    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            ref={i === 0 ? ref : undefined}
            shape="text"
            className={cn(
              i === lines - 1 && "w-3/4", // Last line is shorter
              className
            )}
            {...props}
          />
        ))}
      </div>
    );
  }
);
SkeletonText.displayName = "SkeletonText";

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4 p-4", className)} {...props}>
        <Skeleton className="h-48 w-full" shape="default" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" shape="text" />
          <SkeletonText lines={2} size="sm" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-20" shape="button" />
          <Skeleton className="h-6 w-16" shape="text" />
        </div>
      </div>
    );
  }
);
SkeletonCard.displayName = "SkeletonCard";

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-12 h-12", 
      lg: "w-16 h-16",
      xl: "w-20 h-20",
    };

    return (
      <Skeleton
        ref={ref}
        shape="circle"
        className={cn(sizeClasses[size as keyof typeof sizeClasses], className)}
        {...props}
      />
    );
  }
);
SkeletonAvatar.displayName = "SkeletonAvatar";

const SkeletonTable = React.forwardRef<HTMLDivElement, SkeletonProps & { rows?: number; cols?: number }>(
  ({ rows = 5, cols = 4, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {/* Header */}
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={`header-${i}`} className="h-4" shape="text" />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-4" shape="text" size="sm" />
            ))}
          </div>
        ))}
      </div>
    );
  }
);
SkeletonTable.displayName = "SkeletonTable";

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonAvatar, 
  SkeletonTable,
  skeletonVariants 
};
