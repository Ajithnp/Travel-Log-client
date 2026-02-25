import { Skeleton } from "@/components/ui/skeleton"


export function PackageCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      {/* Image */}
      <Skeleton className="h-48 w-full" />

      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Location row */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Duration */}
        <Skeleton className="h-4 w-28" />

        {/* Divider */}
        <Skeleton className="h-px w-full" />

        {/* Footer */}
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export function PackageListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <PackageCardSkeleton key={i} />
      ))}
    </div>
  )
}