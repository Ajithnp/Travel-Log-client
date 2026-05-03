import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Props {
  total: number;
}

const BookingHeader = ({ total }: Props) => {
  return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">My Bookings</h1>
            <p className="text-sm text-gray-400 mt-0.5">{total} trips </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 border-gray-200 text-gray-500 hover:bg-white text-xs gap-1.5">
              {/* <SlidersHorizontal className="w-3.5 h-3.5" /> Filter */}
            </Button>
            <Button variant="outline" size="sm" className="h-8 border-gray-200 text-gray-500 hover:bg-white text-xs gap-1.5">
              {/* <LayoutGrid className="w-3.5 h-3.5" /> Sort */}
            </Button>
          </div>
        </div>
      </motion.div>
  );
};

export default BookingHeader;