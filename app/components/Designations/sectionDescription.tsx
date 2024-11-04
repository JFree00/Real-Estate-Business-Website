// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
};

export function SectionDescription({ columns = 12, children }: Props) {
  return (
    <h5
      className={`self-center text-sgrey-60 text-sm 2xl:text-lg pt-4`}
      style={{ width: columns * 8.3333 + "%" }}
    >
      {children}
    </h5>
  );
}
