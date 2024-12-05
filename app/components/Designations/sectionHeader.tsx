// @flow
import * as React from "react";
import { cn } from "@/lib/styles";
import { SparklesIcon } from "@heroicons/react/24/solid";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  columns?: number;
  initial?: boolean;
  icon?: boolean;
};

export function SectionHeader({
  columns = 12,
  children,
  className,
  icon = true,
}: Props) {
  return (
    <div
      className={cn(`font-semibold text-balance h-fit col-span-11`, className)}
    >
      {icon && <SparklesIcon className={"  size-6  font-medium mb-4"} />}

      <p className={cn(`font-semibold text-balance h-fit title`, className)}>
        {children}
      </p>
    </div>
  );
}
