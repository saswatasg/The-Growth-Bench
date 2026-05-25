import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-ink text-canvas hover:bg-ink/90',
        destructive: 'bg-sale text-canvas hover:bg-sale-deep',
        outline: 'border border-hairline bg-canvas text-ink hover:bg-soft-cloud',
        secondary: 'bg-soft-cloud text-ink hover:bg-hairline',
        ghost: 'text-ink hover:bg-soft-cloud',
        link: 'text-ink underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-5 py-2 rounded-full',
        sm: 'h-9 px-4 text-xs rounded-full',
        md: 'h-10 px-5 py-2 rounded-full',
        lg: 'h-12 px-8 text-base rounded-full',
        icon: 'h-10 w-10 rounded-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
