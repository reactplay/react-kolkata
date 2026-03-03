function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 rounded-xl bg-slate-800 p-5 ${className}`}>
      {/* Image Placeholder */}
      <div className="h-44 w-full rounded-lg bg-slate-700" />

      {/* Title */}
      <div className="space-y-2">
        <div className="h-5 w-3/4 rounded bg-slate-700" />
        <div className="h-4 w-1/2 rounded bg-slate-700" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-slate-700" />
        <div className="h-3 w-5/6 rounded bg-slate-700" />
        <div className="h-3 w-2/3 rounded bg-slate-700" />
      </div>

      {/* Button */}
      <div className="h-9 w-28 rounded-lg bg-slate-700" />
    </div>
  );
}

export default function EventsLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 space-y-4">
        <div className="h-10 w-64 rounded bg-slate-700" />
        <div className="h-4 w-96 rounded bg-slate-800" />
      </div>

      {/* Featured Section */}
      <div className="mb-16 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CardSkeleton className="h-full" />
        </div>
        <CardSkeleton />
      </div>

      {/* Events Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
