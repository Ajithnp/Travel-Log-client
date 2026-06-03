import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface OfferFilterBarProps {
  activeFilter: "all" | boolean;
  onFilterChange: (filter: "all" | boolean) => void;
  counts: { all: number; active: number; inactive: number };
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FILTERS = [
  { key: "all" as const, label: "All" },
  { key: true as const, label: "Active" },
  { key: false as const, label: "Inactive / Expired" },
] as const;

export function OfferFilterBar({
  activeFilter,
  onFilterChange,
  counts,
  searchQuery,
  onSearchChange,
}: OfferFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
     
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <Button
            key={f.key.toString()}
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange(f.key)}
            className={cn(
              "rounded-full text-xs font-medium h-8 px-4 border transition-all",
              activeFilter === f.key
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "border-border text-muted-foreground hover:bg-accent"
            )}
          >
            {f.label}
            <span
              className={cn(
                "ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                activeFilter === f.key
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {f.key === true ? counts.active : f.key === false ? counts.inactive : counts.all}
            </span>
          </Button>
        ))}
      </div>

    
      <div className="relative w-full sm:w-64 shrink-0">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search offers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9 text-sm bg-card rounded-xl w-full border-border/50 shadow-sm"
        />
      </div>
    </div>
  );
}
