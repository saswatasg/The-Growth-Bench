import React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full border border-hairline dark:border-charcoal bg-canvas dark:bg-ink px-4 py-3 text-body-md text-ink dark:text-canvas ring-offset-background placeholder:text-stone dark:placeholder:text-mute focus-visible:outline-none focus-visible:border-ink dark:focus-visible:border-accent focus-visible:ring-0 transition-colors resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
