function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 rounded-xl bg-slate-800 p-4 ${className}`}>
      <div className="h-40 w-full rounded-lg bg-slate-700" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-slate-700" />
        <div className="h-4 w-1/2 rounded bg-slate-700" />
      </div>
      <div className="h-3 w-1/3 rounded bg-slate-700" />
    </div>
  );
}

export default function EventsLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 lg:px-8">
      {/* Title Skeleton */}
      <div className="mb-10 space-y-3">
        <div className="h-8 w-56 rounded bg-slate-700" />
        <div className="h-4 w-80 rounded bg-slate-800" />
      </div>

      {/* Featured Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CardSkeleton className="h-full" />
        </div>

        <div className="flex flex-col gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>

      {/* Grid Section */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
