// @flow
import * as React from "react";
import { cn } from "@/lib/styles";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { ComponentProps } from "@/components/ui/card";

type Props = ComponentProps<React.HTMLAttributes<HTMLDivElement>> & {
  children: React.ReactNode;
  columns?: number;
  initial?: boolean;
  icon?: boolean;
};

export function SectionHeader({ children, className, icon = true }: Props) {
  return (
    <header
      className={cn(
        `font-semibold text-balance h-fit col-span-full`,
        className,
      )}
    >
      {icon && <SparklesIcon className={"  mb-4  size-6 font-medium"} />}

      <h2 className={cn(`font-semibold text-balance h-fit title`, className)}>
        {children}
      </h2>
    </header>
  );
}
