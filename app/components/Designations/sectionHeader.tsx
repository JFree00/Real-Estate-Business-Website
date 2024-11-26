// @flow
import * as React from "react";
import { cn } from "@/lib/styles";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  columns?: number;
  initial?: boolean;
};

export function SectionHeader({ columns = 12, children, className }: Props) {
  return (
    <div
      className={cn(`font-semibold text-balance h-fit`, className)}
      style={{ width: columns * 8.33333 + "%" }}
    >
      <p className={cn(`font-semibold text-balance h-fit title`, className)}>
        {children}
      </p>
    </div>
  );
}
