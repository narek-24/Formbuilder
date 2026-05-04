import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded bg-gray-800/3 dark:bg-white/5",
        className,
      )}
      {...props}
    />
  );
}
