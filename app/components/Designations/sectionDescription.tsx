// @flow
import * as React from "react";
import { cn } from "@/lib/styles";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  columns?: number;
};

export function SectionDescription({ children, className }: Props) {
  return (
    <p
      className={cn(
        `text-sgrey-60 text-sm 2xl:text-lg pt-4 w-full col-span-full laptop:col-span-10`,
        className,
      )}
    >
      {children}
    </p>
  );
}
