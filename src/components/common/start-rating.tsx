import { Star } from "lucide-react";

export function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <span className={`flex items-center gap-0.5 ${size === "md" ? "gap-1" : ""}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`fill-current ${size === "md" ? "w-4 h-4" : "w-3 h-3"} ${i <= Math.round(rating) ? "text-amber-400" : "text-muted-foreground/30"
            }`}
        />
      ))}
    </span>
  );
}