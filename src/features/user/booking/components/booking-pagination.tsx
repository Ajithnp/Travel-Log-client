import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  limit: number;                                         
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function BookingPagination({
  page,
  totalPages,
  total,
  limit,
  setPage,
}: Props) {
  const rangeStart = (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, total);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3"
    >
      <p className="text-xs text-gray-400">
        Showing {rangeStart}–{rangeEnd} of {total} 
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="h-8 w-8 p-0 border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <Button
            key={n}
            variant="outline"
            size="sm"
            onClick={() => setPage(n)}
            className={`h-8 w-8 p-0 text-xs font-medium transition-colors ${
              n === page
                ? "bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600"
                : "border-gray-200 text-gray-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
            }`}
          >
            {n}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="h-8 w-8 p-0 border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}