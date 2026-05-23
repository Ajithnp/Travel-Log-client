import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";


export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-28 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center mb-5 shadow-inner">
        <Heart className="w-9 h-9 text-rose-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Your wishlist is empty
      </h3>
      <p className="text-sm text-gray-400 max-w-xs">
        Browse our trips and save the ones that inspire you — they'll appear here.
      </p>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-6">
        <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl h-10 px-5 text-sm font-semibold shadow">
          Explore Trips <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </motion.div>
    </motion.div>
  );
}