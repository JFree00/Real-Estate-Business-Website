// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
};

export function SectionDesignation({
  rows = 3,
  columns = 10,
  children,
}: Props) {
  return (
    <div
      className={"col-start-2"}
      style={{
        gridRow: `span ${rows} / span ${rows}`,
        gridColumn: ` ${12 - columns < 2 ? 0 : 2} / span ${columns}`,
      }}
    >
      {children}
    </div>
  );
}
