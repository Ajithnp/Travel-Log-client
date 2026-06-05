import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 6 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          className="flex items-center gap-1 text-xs text-red-500 overflow-hidden"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}