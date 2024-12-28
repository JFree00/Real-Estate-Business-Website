// @flow
import * as React from "react";
import { cn } from "@/lib/styles";
import { Input } from "@/components/ui/input";
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
};

export function IconInput({
  placeholder,
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "relative border border-sgrey-15 bg-transparent text-lg flex items-center rounded-md  py-0 h-12 desktop:h-[70px] bg-sgrey-10 desktop:text-sm my-2.5 laptop:my-0",
        className,
      )}
    >
      <div
        className={
          "pl-5 absolute h-full w-5 pointer-events-none flex items-center"
        }
      >
        {children}
      </div>
      <Input
        {...props}
        size={1}
        className={
          "capitalize pl-12 h-full shrink grow border-0 bg-transparent pr-0 focus:outline-0 desktop:text-lg desktop:placeholder:text-lg"
        }
        placeholder={placeholder}
      />
      <div className={"flex-none"}></div>
    </div>
  );
}
