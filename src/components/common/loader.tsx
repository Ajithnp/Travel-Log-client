import { Loader2 } from "lucide-react";

interface LoaderProps {
  message?: string;
  fullPage?: boolean; // ← controls which mode
}

export const Loader = ({ message, fullPage = false }: LoaderProps) => {
  return (
    <div className={fullPage
      ? "fixed inset-0 flex items-center justify-center z-50"  // covers full viewport
      : "min-h-[60vh] flex items-center justify-center"        // fills content area only
    }>
      <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50">
          <Loader2
            className="h-10 w-10 animate-spin text-zinc-900 dark:text-zinc-100"
            strokeWidth={1.5}
          />
        </div>
        <p className="text-sm font-medium tracking-widest uppercase text-zinc-500 animate-pulse">
          {message || "Loading..."}
        </p>
      </div>
    </div>
  );
};