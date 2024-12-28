import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/styles";

const buttonVariants = cva(
  "font-small focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 laptop:text-lg",
  {
    variants: {
      variant: {
        default: "bg-sgrey-8",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm",
        primary: " bg-pprimary-60 hover:bg-pprimary-60/80",
        secondary: " bg-sgrey-10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        permlink:
          "text-primary font-regular underline decoration-sgrey-50 underline-offset-1",
        active: " bg-sgrey-8",
      },
      size: {
        default: "h-11 px-6 py-2",
        section: "h-14 px-6 py-2",
        nav: "h-14 px-6 text-lg",
        sm: "h-8 rounded-md px-1 text-xs",
        lg: "rounded-md laptop:h-10 laptop:px-8",
        icon: "size-6 laptop:size-9",
        responsive:
          "h-12 w-full py-2 laptop:h-11 laptop:w-fit laptop:px-6 laptop:py-2",
      },
    },
    compoundVariants: [
      {
        variant: ["default", "outline", "secondary", "active"],
        size: ["default", "section", "nav", "responsive", "lg", "sm", "icon"],
        className: "border border-sgrey-15",
      },
      {
        variant: ["default", "outline", "secondary", "active", "permlink"],
        size: ["default", "section", "nav", "responsive", "lg", "sm", "icon"],
        className: "hover:bg-sgrey-10",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
