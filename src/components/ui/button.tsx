"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-base font-semibold ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-target",
  {
    variants: {
      variant: {
        // Primary - Blue pill button (In4Care style)
        default:
          "bg-primary text-white hover:bg-black rounded-pill shadow-button hover:shadow-lg",
        // Secondary - Green pill button
        secondary:
          "bg-secondary text-white hover:bg-black rounded-pill shadow-sm hover:shadow-md",
        // Outline - Blue border
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white rounded-md",
        // Ghost - Subtle
        ghost:
          "text-primary hover:bg-primary-50 rounded-md",
        // Link style
        link:
          "text-primary underline-offset-4 hover:underline hover:text-primary-700 p-0 h-auto font-medium rounded-none",
        // Destructive
        destructive:
          "bg-error text-white hover:bg-red-700 rounded-md",
        // CTA - Orange accent (for special CTAs)
        cta:
          "bg-accent text-white hover:bg-black rounded-pill shadow-sm hover:shadow-md",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-6 py-2 text-sm",
        lg: "h-14 px-10 py-4 text-lg",
        xl: "h-16 px-12 py-5 text-xl",
        icon: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
