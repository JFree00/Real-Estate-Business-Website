// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
  initial?: boolean;
};

export function SectionHeader({
  columns = 4,
  children,
  initial = false,
}: Props) {
  return (
    <div
      className={`font-semibold text-balance h-fit`}
      style={{ width: columns * 8.33333 + "%" }}
    >
      <p
        className={!initial ? `text-5xl` : "text-6xl"}
        style={{ lineHeight: "1.2" }}
      >
        {children}
      </p>
    </div>
  );
}
