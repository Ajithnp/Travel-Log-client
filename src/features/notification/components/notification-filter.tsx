import { Separator } from "@/components/ui/separator";
import { FILTERS, type Filter } from "../pages/notification-list";


interface NotificationsFilterProps {
  filter: Filter;
  unread: number;
  onFilterChange: (filter: Filter) => void;
}

export function NotificationsFilter({
  filter,
  unread,
  onFilterChange,
}: NotificationsFilterProps) {
  return (
    <>
      <div className="px-4 sm:px-5 pt-4 pb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-gray-100/70 rounded-lg p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                filter === f
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
              {f === "Unread" && unread > 0 && (
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                  {unread}
                </span>
              )}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
          {/* <FilterIcon className="w-3 h-3" /> Filter */}
        </button>
      </div>

      <Separator className="bg-gray-100" />
    </>
  );
}