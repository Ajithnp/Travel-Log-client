import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TransactionPaginationProps {
  filteredLength: number;
  safePage: number;
  pageSize: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TransactionPagination({
  filteredLength,
  safePage,
  pageSize,
  totalPages,
  setPage
}: TransactionPaginationProps) {
  return (
    <div className="px-4 sm:px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-gray-400">
        {filteredLength > 0
          ? `Showing ${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, filteredLength)} of ${filteredLength}`
          : "No results"}
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <Button
            variant="outline" size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="h-7 w-7 p-0 border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Button
              key={n} variant="outline" size="sm"
              onClick={() => setPage(n)}
              className={`h-7 w-7 p-0 text-[11px] font-medium transition-colors ${
                n === safePage
                  ? "bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600"
                  : "border-gray-200 text-gray-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
              }`}
            >
              {n}
            </Button>
          ))}
          <Button
            variant="outline" size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="h-7 w-7 p-0 border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
