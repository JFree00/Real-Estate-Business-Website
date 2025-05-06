// @flow
import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/styles";
import { Input } from "@/components/ui/input";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  filterName: string;
  data?: string[];
  submit?: (item: string) => void;
  selected?: (item: string) => boolean;
  placeholder?: string;
};

export function FilterInput({
  icon,
  filterName,
  children,
  data,
  submit,
  selected,
  className,
  placeholder,
}: Props) {
  const [input, setInput] = React.useState<string[]>([]);
  function changeInput(e: string) {
    if (input.includes(e)) {
      setInput(
        input.filter((item) => {
          return item !== e;
        }),
      );
    } else {
      setInput([...input, e]);
    }
    submit?.(e);
  }
  const dataItems = data?.map((item) => {
    return (
      <CommandItem
        className={"justify-between"}
        onSelect={() => changeInput(item)}
        key={item}
      >
        {item}
        {(selected?.(item) ?? input.includes(item)) ? <CheckIcon /> : null}
      </CommandItem>
    );
  });
  placeholder = placeholder ?? filterName?.replace("_", " ");
  return (
    <div
      key={placeholder}
      className={cn(
        "flex h-14  desktop:h-[70px] items-center bg-sgrey-8 rounded-lg border border-sgrey-15 w-full",
        icon && "pl-5",
        className,
      )}
    >
      {icon ? (
        <>
          <div className={"mr-2.5 flex size-5 text-sgrey-60 desktop:size-6"}>
            {icon}
          </div>
          <Separator orientation={"vertical"} className={"mr-2.5 h-1/3 w-px"} />
        </>
      ) : (
        <div className={"pl-5"} />
      )}
      <div className={"hidden h-full basis-full content-stretch laptop:block"}>
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={" flex h-full flex-nowrap items-center justify-start"}
            >
              <Input
                className={
                  "size-full border-0 bg-transparent pl-0 text-lg capitalize placeholder:text-sgrey-40 focus:outline-0 desktop:text-lg"
                }
                id={filterName}
                value={input.length ? input.join(", ") : ""}
                placeholder={placeholder}
                readOnly
              />
              <Button
                size={"icon"}
                className={
                  "mr-3 flex shrink-0 grow-0 items-center rounded-full border-0 bg-sgrey-10 laptop:size-8 desktop:size-7"
                }
                type={"button"}
              >
                <ChevronDownIcon className={"size-1/2"} />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput
                className={"capitalize"}
                placeholder={`${placeholder}`}
              />
              <CommandList>
                <CommandEmpty>No matching {placeholder} found</CommandEmpty>
                <CommandGroup>{children ?? dataItems}</CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className={"w-full basis-full laptop:hidden"}>
        <Drawer>
          <DrawerTrigger asChild>
            <div
              className={
                "flex h-full flex-nowrap items-center justify-items-stretch"
              }
            >
              <Input
                className={"h-full border-0 pl-0"}
                value={input.length ? input.join(", ") : ""}
                placeholder={placeholder}
                readOnly
              />
              <Button
                type={"button"}
                size={"icon"}
                className={
                  "mr-3 flex size-7  shrink-0 grow-0 items-center rounded-full border-0 bg-sgrey-10"
                }
              >
                <ChevronDownIcon className={"size-3/4"} />
              </Button>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className={"text-xl"}>
              <DialogTitle>Filter by {placeholder}</DialogTitle>
              <DrawerDescription>
                Sort through filters for specific results
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Command>
                <CommandInput placeholder={"Location"} />
                <CommandList>
                  <CommandEmpty>No Location Found</CommandEmpty>
                  <CommandGroup>{children ?? dataItems}</CommandGroup>
                </CommandList>
              </Command>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
