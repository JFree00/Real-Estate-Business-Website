// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
};

export function SectionDescription({ columns = 8, children }: Props) {
  return (
    <h5
      className={`self-center text-sgrey-60 text-lg mt-4`}
      style={{ width: columns * 8.33333 + "%" }}
    >
      {children}
    </h5>
  );
}
