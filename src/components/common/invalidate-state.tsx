
import { motion } from "framer-motion";
import { 
  FileSearch, 
  ArrowLeft, 
  Home as HomeIcon, 
  AlertCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


interface InvalidStateProps {
  title?: string;
  message?: string;
  type?: "package" | "category" | "generic";
  onBack?: () => void;
}

export function InvalidState({
  title = "Resource Not Found",
  message = "We couldn't locate the specific details you're looking for. It might have been moved or deleted.",
  type = "package",
  onBack
}: InvalidStateProps) {
  const navigate = useNavigate()

  const handleGoHome = () => navigate("/vendor/profile");

  const typeLabels = {
    package: "Invalid Package",
    category: "Invalid Category",
    generic: "Missing Resource"
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-md w-full"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent blur-3xl rounded-full" />
        
        {/* Animated Icon Container */}
        <div className="relative mb-8 flex justify-center">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-150 animate-pulse" />
            <div className="relative h-24 w-24 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
              <FileSearch className="h-10 w-10 text-primary" strokeWidth={1.5} />
              
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 h-8 w-8 bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center border-2 border-white dark:border-zinc-900"
              >
                <AlertCircle className="h-4 w-4 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Sparkles className="h-3 w-3 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {typeLabels[type]}
            </span>
          </div>
          
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </h2>
          
          <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed max-w-sm mx-auto">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={onBack || (() => window.history.back())}
            className="h-12 px-8 rounded-xl font-bold border-zinc-200 dark:border-zinc-800 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          
          <Button
            onClick={handleGoHome}
            className="h-12 px-8 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </div>

        {/* Subtle decorative text */}
        <p className="mt-8 text-[10px] text-zinc-400 font-medium uppercase tracking-widest">
          Ref: ERR_RESOURCE_ID_MISSING
        </p>
      </motion.div>
    </div>
  );
}