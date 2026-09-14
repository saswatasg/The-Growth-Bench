import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full border border-hairline bg-canvas px-4 py-2 text-body-md text-ink ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone focus-visible:outline-none focus-visible:border-ink focus-visible:ring-0 transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
