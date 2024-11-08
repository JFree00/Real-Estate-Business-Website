// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
  initial?: boolean;
};

export function SectionHeader({ columns = 12, children }: Props) {
  return (
    <div
      className={`font-semibold text-balance h-fit`}
      style={{ width: columns * 8.33333 + "%" }}
    >
      <p className={"title"}>{children}</p>
    </div>
  );
}
