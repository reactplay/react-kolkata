function BlogCardSkeleton() {
  return (
    <div className="space-y-4 rounded-xl bg-slate-800 p-5">
      {/* Image */}
      <div className="h-48 w-full rounded-lg bg-slate-700" />

      {/* Title */}
      <div className="space-y-2">
        <div className="h-5 w-3/4 rounded bg-slate-700" />
        <div className="h-4 w-1/2 rounded bg-slate-700" />
      </div>

      {/* Meta */}
      <div className="h-3 w-1/3 rounded bg-slate-700" />

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-slate-700" />
        <div className="h-3 w-5/6 rounded bg-slate-700" />
      </div>

      {/* Read More Button */}
      <div className="h-9 w-24 rounded-lg bg-slate-700" />
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 space-y-4">
        <div className="h-10 w-56 rounded bg-slate-700" />
        <div className="h-4 w-80 rounded bg-slate-800" />
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
