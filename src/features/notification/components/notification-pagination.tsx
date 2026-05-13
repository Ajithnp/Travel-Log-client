import { ChevronRight } from "lucide-react";

interface NotificationsPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  showing: number;
  onPrev: () => void;
  onNext: () => void;
}

export function NotificationsPagination({
  page,
  totalPages,
  total,
  showing,
  onPrev,
  onNext,
}: NotificationsPaginationProps) {
  return (
    <div className="px-4 sm:px-5 py-3 border-t border-gray-100 flex items-center justify-between">
      <p className="text-xs text-gray-400">
        {showing} of {total} notification{total !== 1 ? "s" : ""}
      </p>
      <div className="flex items-center gap-2">
        {page > 1 && (
          <button
            onClick={onPrev}
            className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors"
          >
            ← Prev
          </button>
        )}
        {page < totalPages && (
          <button
            onClick={onNext}
            className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors flex items-center gap-1"
          >
            Next <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}