function BlogCardSkeleton() {
  return (
    <div className="space-y-4 rounded-none bg-slate-800 p-5">
      <div className="h-48 w-full rounded-none bg-slate-700" />

      <div className="space-y-2">
        <div className="h-5 w-3/4 rounded-none bg-slate-700" />
        <div className="h-4 w-1/2 rounded-none bg-slate-700" />
      </div>

      <div className="h-3 w-1/3 rounded-none bg-slate-700" />

      <div className="space-y-2">
        <div className="h-3 w-full rounded-none bg-slate-700" />
        <div className="h-3 w-5/6 rounded-none bg-slate-700" />
      </div>

      <div className="h-9 w-24 rounded-none bg-slate-700" />
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4">
        <div className="h-10 w-56 rounded-none bg-slate-700" />
        <div className="h-4 w-80 rounded-none bg-slate-800" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
