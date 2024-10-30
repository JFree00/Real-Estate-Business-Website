// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
type Props = {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
  className?: string;
};

export function SectionDesignation({
  rows = 3,
  columns = 10,
  children,
  className,
}: Props) {
  return (
    <div
      className={"col-start-2 relative" + " " + className}
      style={{
        gridRow: `span ${rows} / span ${rows}`,
        gridColumn: ` ${12 - columns < 2 ? 0 : 2} / span ${columns}`,
      }}
    >
      <Button
        variant={"outline"}
        className={" absolute right-0 top-8 py-8 bg-sgrey-10 font-medium"}
      >
        View All Testimonials
      </Button>
      {children}
    </div>
  );
}
