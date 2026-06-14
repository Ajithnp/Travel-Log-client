import {motion} from 'framer-motion';
import {CheckCircle2,IndianRupee,X} from 'lucide-react';

interface PayoutSuccessModalProps{
    onReset: () => void;
    amount: number;
    vendorName: string;
}

export function PayoutSuccessModal({ onReset, amount, vendorName }: PayoutSuccessModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl text-center"
        initial={{ y: 16, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <button
          onClick={onReset}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

       
        <motion.div
          className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.1 }}
        >
          <CheckCircle2 className="w-7 h-7 text-emerald-500" strokeWidth={2} />
        </motion.div>

        <motion.p
          className="text-base font-semibold text-gray-900 mb-1"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Payout Sent Successfully!
        </motion.p>
        <motion.div
          className="text-sm text-gray-500 mb-6 flex flex-wrap items-center justify-center gap-1.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
        >
          <span className="inline-flex items-center font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
            <IndianRupee className="w-3 h-3 mr-0.5" />
            {amount}
          </span>
          <span>transferred to</span>
          <span className="font-medium text-gray-900">{vendorName}</span>.
        </motion.div>

       
        <motion.div
          className="text-left space-y-2.5 mb-6 bg-gray-50 rounded-xl p-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
        >
        </motion.div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={onReset}
            className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="flex-1 h-10 rounded-xl bg-violet-600 text-sm font-medium text-white hover:bg-violet-700 transition-colors flex items-center justify-center gap-1.5">
            View Details 
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}