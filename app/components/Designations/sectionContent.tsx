// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
};

export function SectionContent({ rows = 12, columns = 10, children }: Props) {
  return (
    <div
      className={"grid w-full h-full col-span-full grid-cols-6 gap-x-8"}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
