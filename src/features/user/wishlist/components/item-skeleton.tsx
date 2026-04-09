import { Skeleton } from "@/components/ui/skeleton";

export function ItemSkeleton() {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-gray-100">
      <div className="relative w-24 h-20 flex-shrink-0">
        <Skeleton className="w-full h-full rounded-xl" />
        <Skeleton className="absolute top-1.5 left-1.5 w-10 h-4 rounded-md" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="h-5 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex flex-col items-end gap-2">
            
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-md" />
            </div>
            <Skeleton className="h-7 w-16 rounded-lg" />
          </div>

        </div>
      </div>
    </div>
  );
}