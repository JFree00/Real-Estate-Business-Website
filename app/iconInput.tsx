// @flow
import * as React from "react";
import { cn } from "@/lib/styles";
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
};

export function IconInput({ placeholder, className, children }: Props) {
  return (
    <div
      className={cn(
        "border border-sgrey-15 bg-transparent text-lg flex items-center rounded-md px-5  py-5 h-16",
        className,
      )}
    >
      <div className={"mr-2 size-5"}>{children}</div>
      <input
        size={1}
        className={"bg-transparent focus:outline-0 grow shrink"}
        placeholder={placeholder}
      />
      <div className={"flex-none"}></div>
    </div>
  );
}
