import { CalendarIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

export type FilterTab = "all" | "active" | "inactive";

export interface TabItem<T extends string> {
  key: T;
  label: string;
  count?: number;
}

interface FilterWithDateSortProps<T extends string> {
  tabs?: TabItem<T>[];
  activeTab?: T;
  onTabChange?: (tab: T) => void;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDate: (date: Date | undefined) => void;
  onEndDate: (date: Date | undefined) => void;
}

export function FilterWithDateSort<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  startDate,
  endDate,
  onStartDate,
  onEndDate,
}: FilterWithDateSortProps<T>) {
  const hasDateFilter = startDate || endDate;

  const clearDates = () => {
    onStartDate(undefined);
    onEndDate(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-6 shadow-premium"
    >
      <div className="flex items-center gap-1.5 bg-muted/60 rounded-xl p-1.5 border border-border/50 shadow-premium">
        {tabs?.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Button
              key={tab.key}
              onClick={() => onTabChange?.(tab.key)}
              className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 outline-none cursor-pointer bg-orange-400 ${
                isActive
                  ? "text-foreground"
                  : "text-white hover:text-foreground hover:bg-card"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm border border-border/40"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              <span
                className={`relative z-10 text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                  isActive
                    ? "bg-foreground text-white"
                    : "bg-white text-foreground"
                }`}
              >
                {tab.count}
              </span>
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-heading font-medium text-muted-foreground">
          Sort by date
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-40 justify-start text-left text-sm h-9 rounded-sm border-foreground/10 bg-card",
                !startDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "MMM dd, yyyy") : "Start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 shadow-premium" align="end" >
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onStartDate}
              disabled={(date) => (endDate ? date > endDate : false)}
              initialFocus
              className="w-full border border-black rounded-md p-3"
              classNames={{
                months: "flex flex-col",
                month: "space-y-4",
                caption: "flex justify-between items-center",
                caption_label: "text-sm font-medium",
                nav: "flex justify-between gap-1",
                nav_button: "h-10 w-10 bg-foreground/70 p-0 rounded-md opacity-90 hover:opacity-100 flex items-center justify-center"  ,
                table: "w-full border-collapse",
                head_row: "flex justify-between",
                head_cell: "w-9 text-xs text-muted-foreground",
                row: "flex w-full mt-2 justify-between",
                cell: "h-9 w-9 text-center text-sm",
                day: "h-9 w-9 rounded-sm hover:bg-accent",
                day_selected: "bg-orange-600 text-white hover:bg-orange-600",
                day_today: "border border-primary",
                day_disabled: "text-muted-foreground opacity-40",
              }}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-40 justify-start text-left text-sm h-9 rounded-sm border-foreground/10 bg-card",
                !endDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "MMM dd, yyyy") : "End date"}
            </Button>
          </PopoverTrigger>
         <PopoverContent className="w-auto p-0 shadow-premium" align="end" >
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={onEndDate}
              disabled={(date) => (startDate ? date < startDate : false)}
              initialFocus
              className="w-full border border-black rounded-md p-3"
              classNames={{
                months: "flex flex-col",
                month: "space-y-4",
                caption: "flex justify-between items-center",
                caption_label: "text-sm font-medium",
                nav: "flex justify-between gap-1",
                nav_button: "h-10 w-10 bg-foreground/70 p-0 rounded-md opacity-90 hover:opacity-100 flex items-center justify-center"  ,
                table: "w-full border-collapse",
                head_row: "flex justify-between",
                head_cell: "w-9 text-xs text-muted-foreground",
                row: "flex w-full mt-2 justify-between",
                cell: "h-9 w-9 text-center text-sm",
                day: "h-9 w-9 rounded-sm hover:bg-accent",
                day_selected: "bg-orange-600 text-white hover:bg-orange-600",
                day_today: "border border-primary",
                day_disabled: "text-muted-foreground opacity-40",
              }}
            />
          </PopoverContent>
        </Popover>
        {hasDateFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearDates}
            className="h-9 px-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
