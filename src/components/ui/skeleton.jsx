import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10 dark:bg-canvas/10", className)}
      {...props} />
  );
}

export { Skeleton }
