import { cn } from "@/lib/utils"
import { Plane, Truck } from "lucide-react"
import { motion } from "framer-motion"

interface LoadingProps {
  variant?: "spinner" | "skeleton" | "progress" | "airplane" | "van"
  className?: string
  text?: string
  fullscreen?: boolean
}

export function Loading({ variant = "spinner", className, text, fullscreen = false }: LoadingProps) {

  const containerClass = fullscreen
    ? "fixed inset-0 flex items-center justify-center bg-background/60 z-50"
    : "flex items-center justify-center"

  switch (variant) {
    case "airplane":
      return (
        <div className={cn(containerClass, className)}>
          <div className="relative w-24 h-8 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 60, 0],
                rotate: [10, -10, 10],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute left-0"
            >
              <Plane className="text-primary h-6 w-6" strokeWidth={2} />
            </motion.div>
          </div>
          {text && <span className="mt-2 text-sm text-muted-foreground">{text}</span>}
        </div>
      )

    case "van":
      return (
        <div className={cn(containerClass, className)}>
          <div className="relative w-28 h-8 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 80, 0],
                y: [0, -3, 0, 2, 0], // slight "road bump" movement
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute left-0 flex items-center"
            >
             
              <Truck className="text-primary h-6 w-6" strokeWidth={2} />

           
              <motion.div
                className="absolute -left-2 top-2 w-2 h-1 bg-primary/40 rounded-full blur-sm"
                animate={{ opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />

              <motion.div
                className="ml-1 w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
          {text && <span className="mt-2 text-sm text-muted-foreground">{text}</span>}
        </div>
      )

    case "spinner":
      return (
        <div className={cn(containerClass, className)}>
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
