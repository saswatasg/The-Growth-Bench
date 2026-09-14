import React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full border border-hairline bg-canvas px-4 py-3 text-body-md text-ink ring-offset-background placeholder:text-stone focus-visible:outline-none focus-visible:border-ink focus-visible:ring-0 transition-colors resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
