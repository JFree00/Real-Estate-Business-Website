// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
type Props = {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
  className?: string;
  buttonText?: string;
};

export function SectionDesignation({
  rows = 3,
  columns = 10,
  children,
  className,
  buttonText,
}: Props) {
  return (
    <div
      className={"col-start-2 relative py-20" + " " + className}
      style={{
        gridRow: `span ${rows} / span ${rows}`,
        gridColumn: ` ${12 - columns < 2 ? 0 : 2} / span ${columns}`,
      }}
    >
      <Button
        variant={"outline"}
        className={" absolute right-0 top-28 py-8 bg-sgrey-10 font-medium"}
      >
        {buttonText || "View All"}
      </Button>
      {children}
    </div>
  );
}
