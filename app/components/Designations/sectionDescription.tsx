// @flow
import * as React from "react";

type Props = {
  children: React.ReactNode;
  columns?: number;
};

export function SectionDescription({ children }: Props) {
  return (
    <h5
      className={`self-center text-sgrey-60 text-sm 2xl:text-lg pt-4 tablet:w-[75%]`}
    >
      {children}
    </h5>
  );
}
