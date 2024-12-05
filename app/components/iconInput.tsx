// @flow
import * as React from "react";
import { cn } from "@/lib/styles";
import { Input } from "@/components/ui/input";
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
};

export function IconInput({ placeholder, className, children }: Props) {
  return (
    <div
      className={cn(
        "border border-sgrey-15 bg-transparent text-lg flex items-center rounded-md pl-5  py-0 h-12 desktop:h-[70px] bg-sgrey-10 desktop:text-sm my-2.5 laptop:my-0",
        className,
      )}
    >
      <div className={"mr-2 size-5"}>{children}</div>
      <Input
        size={1}
        className={
          "bg-transparent focus:outline-0 grow shrink desktop:placeholder:text-lg desktop:text-lg border-0 h-full px-0"
        }
        placeholder={placeholder}
      />
      <div className={"flex-none"}></div>
    </div>
  );
}
