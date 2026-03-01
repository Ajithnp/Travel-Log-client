import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { motion } from 'framer-motion';

export type FilterTab = "all" | "active" | "inactive";

export interface TabItem<T extends string> {
  key: T;
  label: string;
  count: number;
}

interface FilterWithSearchProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
}

export function FilterWithSearch<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
}: FilterWithSearchProps<T>) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-6 shadow-premium"
    >
      <div className="flex items-center gap-1.5 bg-muted/60 rounded-xl p-1.5 border border-border/50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 outline-none cursor-pointer bg-zinc-700 ${
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

      <div className="relative w-full sm:w-72 group shadow-premium">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 h-auto rounded-xl border-border/60 bg-white/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all shadow-sm group-focus-within:shadow-md group-focus-within:bg-white"
        />
      </div>
    </motion.div>
  );
}