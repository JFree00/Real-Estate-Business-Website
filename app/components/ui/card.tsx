import * as React from "react";

import { cn } from "@/lib/styles";
import { Slot } from "@radix-ui/react-slot";

export type ComponentProps<T> = T & {
  asChild?: boolean;
};
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn(
      "rounded-xl border border-sgrey-15 bg-sgrey-10 text-card-foreground shadow  w-full h-full",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  ComponentProps<React.HTMLAttributes<HTMLDivElement>>
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "header";
  return (
    <Comp ref={ref} className={cn(" space-y-1.5", className)} {...props} />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  ComponentProps<React.HTMLAttributes<HTMLDivElement>>
>(({ className, children, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "h3";
  return (
    <Comp
      ref={ref}
      className={cn("font-bold leading-none tracking-tight title", className)}
      {...props}
    >
      {children}
    </Comp>
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm laptop:text-lg w-full", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  ComponentProps<React.HTMLAttributes<HTMLDivElement>>
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return <Comp ref={ref} className={cn("", className)} {...props} />;
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(" items-center  text-sgrey-60", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
