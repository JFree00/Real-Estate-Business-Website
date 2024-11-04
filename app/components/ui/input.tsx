// @flow
import * as React from "react";
import emailIcon from "@/assets/icons/email.svg";
import paperAirplane from "@/assets/icons/paperAirplane.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/styles";
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
};

export function Input({ placeholder, className }: Props) {
  return (
    <div
      className={cn(
        "border border-sgrey-15 bg-transparent text-lg flex items-center rounded-xl px-5  py-5 h-16",
        className,
      )}
    >
      <img src={emailIcon} className={"mr-4 "} />
      <input
        size={1}
        className={"bg-transparent focus:outline-0 grow shrink"}
        placeholder={placeholder}
      />
      <Button className={"flex-none"} size={"icon"} variant={"ghost"}>
        <img
          alt={"paper airplane icon"}
          className={"size-8"}
          src={paperAirplane}
        />
      </Button>
    </div>
  );
}
