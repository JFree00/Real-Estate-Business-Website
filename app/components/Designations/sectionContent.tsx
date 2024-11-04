// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
  gap?: number;
};

export function SectionContent({ children }: Props) {
  return (
    <div
      className={
        "flex basis-full overflow-hidden gap-x-5 flex-nowrap w-full pt-20 max-h-[700px]"
      }
    >
      {children}
    </div>
  );
}
