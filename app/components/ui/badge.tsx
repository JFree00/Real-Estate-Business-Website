import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/styles";

const badgeVariants = cva(
  "focus:ring-ring inline-flex items-center rounded-full border border-sgrey-15 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent shadow",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent shadow",
        outline: "text-foreground",
        card: "laptop:text-small gap-x-1.5  bg-sgrey-10 px-3 desktop:px-5 py-2 desktop:font-medium  desktop:text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <li className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
