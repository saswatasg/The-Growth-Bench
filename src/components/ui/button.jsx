import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden relative',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-dark shadow-sm hover:shadow-md active:bg-primary-dark',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80',
        outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary-light active:bg-primary-light/80',
        secondary: 'bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/25',
        ghost: 'hover:bg-primary-light active:bg-primary-light/80',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-5 py-2 rounded-lg',
        sm: 'h-9 px-4 text-xs rounded-lg',
        md: 'h-10 px-5 py-2 rounded-lg',
        lg: 'h-12 px-8 text-base rounded-lg',
        icon: 'h-10 w-10 rounded-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const MotionComp = motion(React.forwardRef((props, ref) => {
  const { asChild, ...rest } = props;
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} {...rest} />;
}));

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <MotionComp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      asChild={asChild}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
