// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";
type Props = {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
  className?: string;
  buttonText?: string;
};

export function SectionDesignation({
  rows = 3,
  columns = 12,
  children,
  className,
  buttonText,
}: Props) {
  return (
    <div
      className={cn("offset relative py-20", className)}
      style={{
        gridRow: `span ${rows} / span ${rows}`,
        gridColumn: ` 1 / span ${columns}`,
      }}
    >
      <Button
        variant={"outline"}
        className={
          " absolute right-0 top-28 py-8 bg-sgrey-10 font-medium hidden lg:flex"
        }
      >
        {buttonText || "View All"}
      </Button>
      {children}
      <Separator className={"my-10"} />
      <Button
        variant={"outline"}
        className={" bg-sgrey-10 font-medium lg:hidden"}
      >
        {buttonText || "View All"}
      </Button>
    </div>
  );
}
