// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
};

export function SectionDesignation({ rows = 2, columns = 2, children }: Props) {
  return (
    <div
      className={` w-full col-span-10 col-start-2 row-span-6`}
      style={{
        gridRow: `span ${rows} / span ${rows}`,
      }}
    >
      {children}
    </div>
  );
}
