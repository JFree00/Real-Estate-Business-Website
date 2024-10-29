// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
  gap?: number;
};

export function SectionContent({
  rows = 12,
  columns = 10,
  children,
  gap = 1,
}: Props) {
  return (
    <div
      className={"grid w-full h-full col-span-full grid-cols-6 mt-20"}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        columnGap: gap + "rem",
      }}
    >
      {children}
    </div>
  );
}
