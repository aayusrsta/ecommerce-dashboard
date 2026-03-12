export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden"
        >
          <div className="h-52 w-full animate-pulse bg-gray-100" />
          <div className="flex flex-col gap-3 p-4">
            <div className="h-4 w-20 animate-pulse rounded-full bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="mt-2 flex items-center justify-between">
              <div className="h-5 w-16 animate-pulse rounded bg-gray-100" />
              <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}