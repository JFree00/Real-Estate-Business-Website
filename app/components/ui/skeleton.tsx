import { cn } from "@/lib/styles";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const skeletonVariant = cva("animate-pulse rounded-md bg-sgrey-40/10", {
  variants: {
    variant: {
      line: "min-h-[1rem]",
      title: "min-h-[1.7rem] w-3/5",
      paragraph: "min-h-[3rem] self-end",
      image: "aspect-[3/2]",
      badge: "min-h-[0.5rem] min-w-[6rem]",
      button: " min-w-full min-h-16",
    },
  },
  defaultVariants: {
    variant: "line",
  },
});
interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariant> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div className={cn(skeletonVariant({ variant }), className)} {...props} />
  );
}

export { Skeleton, skeletonVariant };
