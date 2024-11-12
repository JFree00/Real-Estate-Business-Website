// @flow
import * as React from "react";
import { cn } from "@/lib/styles";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  columns?: number;
};

export function SectionDescription({ children, className }: Props) {
  return (
    <h5
      className={cn(
        `self-center text-sgrey-60 text-sm 2xl:text-lg pt-4 w-full tablet:w-[75%]`,
        className,
      )}
    >
      {children}
    </h5>
  );
}
