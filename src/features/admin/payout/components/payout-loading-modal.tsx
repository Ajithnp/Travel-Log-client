import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";

interface  LoadingModalProps{
    onComplete: () => void;
    amount: number;
    vendorName: string;
}

export function PayoutLoadingModal({ onComplete, amount, vendorName }: LoadingModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl text-center"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
     
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
            🏢
          </div>

        
          <div className="flex gap-1">
            {[0, 0.2, 0.4].map((d) => (
              <motion.div
                key={d}
                className="w-1.5 h-1.5 rounded-full bg-violet-400"
                animate={{ opacity: [0.2, 1, 0.2], x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: d }}
              />
            ))}
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
            🏪
          </div>
        </div>

        <p className="text-base font-semibold text-gray-900 mb-1">
          Transferring funds
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Sending {<IndianRupee className="w-3 h-3" />} {amount} to {vendorName}
          
        </p>

        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-violet-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            onAnimationComplete={() => setTimeout(onComplete, 300)}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
