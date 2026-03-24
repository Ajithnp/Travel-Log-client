import { Backpack } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PackingListProps {
  items: string[] | null | undefined;
}

export function PackingList({ items }: PackingListProps) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <div className="bg-card rounded-xl border animate-fade-up p-6 shadow-premium" style={{ animationDelay: "0.25s" }}>
      <h2 className="section-title mb-4 font-semibold text-lg">THINGS TO CARRY </h2>
        <div className="border-t border-gray-100 mx-5" />
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <Badge
            key={i}
            variant="outline"
            className="gap-1.5 px-3 py-1.5 bg-muted/50 text-foreground border-border font-normal text-sm"
          >
            <Backpack className="h-3.5 w-3.5 text-muted-foreground" />
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
