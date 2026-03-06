import React from "react";
import { motion } from "framer-motion";
import { Compass, Globe2, Plane, Sparkles } from "lucide-react";

interface PageLoadingProps {
  message?: string;
  variant?: "fullscreen" | "component";
}

export function PageLoading({
  message = "Preparing your journey...",
  variant = "fullscreen",
}: PageLoadingProps) {
  const isFullscreen = variant === "fullscreen";

  return (
    <div
      className={React.useMemo(() => {
        return isFullscreen
          ? "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-zinc-950"
          : "relative w-full py-12 flex flex-col items-center justify-center bg-transparent";
      }, [isFullscreen])}
    >
      {/* Background ambient glows for fullscreen */}
      {isFullscreen && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
        </div>
      )}

      <div className="relative flex flex-col items-center text-center space-y-8 max-w-xs w-full px-6">
        <div className="relative">
          {/* Floating Icons Animation */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 p-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-100 dark:border-zinc-800 text-primary"
          >
            <Globe2 className="h-5 w-5" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 p-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-100 dark:border-zinc-800 text-primary"
          >
            <Plane className="h-5 w-5" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -bottom-2 -left-2 p-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-100 dark:border-zinc-800 text-emerald-500"
          >
            <Compass className="h-5 w-5" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Text & Progress */}
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <Sparkles className="h-3 w-3 fill-current animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Syncing Explorer
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {message}
          </h3>

          {/* Premium Progress Bar */}
          <div className="relative h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent w-1/2"
            />
          </div>

          <p className="text-xs text-zinc-400 font-medium animate-pulse">
            Finding the best routes for you...
          </p>
        </div>
      </div>
    </div>
  );
}
