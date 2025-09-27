import { cn } from "@/lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
  overlay?: boolean
  text?: string
}

export function Loader({ size = "md", className, overlay = false, text }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const LoaderContent = () => {
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-muted border-t-primary",
            sizeClasses[size],
            className,
          )}
          role="status"
          aria-label="Loading"
        ></div>
        {text && <p className="text-sm text-muted-foreground font-medium">{text}</p>}
      </div>
    )
  }

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <LoaderContent />
      </div>
    )
  }

  return <LoaderContent />
}
