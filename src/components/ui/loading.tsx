import { cn } from "@/lib/utils"

interface LoadingProps {
  variant?: "spinner" | "skeleton" | "progress"
  className?: string
  text?: string
}

export function Loading({ variant = "spinner", className, text }: LoadingProps) {
  switch (variant) {
    case "spinner":
      return (
        <div className={cn("flex items-center justify-center", className)}>
          <svg
            className="animate-spin h-5 w-5 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {text && <span className="ml-2 text-sm text-muted-foreground">{text}</span>}
        </div>
      )
    case "skeleton":
      return (
        <div className={cn("animate-pulse bg-muted rounded-md", className)}>
          {text && <span className="sr-only">{text}</span>}
        </div>
      )
    case "progress":
      return (
        <div className={cn("w-full bg-muted rounded-full h-2.5", className)}>
          <div
            className="bg-primary h-2.5 rounded-full animate-progress"
            style={{ width: "75%" }} 
          ></div>
          {text && <span className="sr-only">{text}</span>}
        </div>
      )
    default:
      return null
  }
}
