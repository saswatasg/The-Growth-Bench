import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full border border-hairline dark:border-charcoal bg-canvas dark:bg-ink px-4 py-2 text-body-md text-ink dark:text-canvas ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone dark:placeholder:text-mute focus-visible:outline-none focus-visible:border-ink dark:focus-visible:border-accent focus-visible:ring-0 transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
