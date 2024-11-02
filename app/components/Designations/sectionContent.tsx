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
  gap = 2,
}: Props) {
  return (
    <div
      className={"grid w-full pt-20 max-h-[700px]"}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        //gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        columnGap: gap + "rem",
      }}
    >
      {children}
    </div>
  );
}
