interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-red-100 bg-red-50 px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <span className="text-xl">!</span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-red-700">Something went wrong</p>
        <p className="text-xs text-red-500">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}