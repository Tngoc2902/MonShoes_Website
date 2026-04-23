import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>

          <div className="space-y-4">
            <div>
              <Skeleton className="h-5 w-20 mb-2" />
              <div className="flex gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-12 rounded-md" />
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-12" />
          </div>

          <div className="space-y-4 pt-6 border-t">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}