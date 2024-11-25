// @flow
import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { MapPinIcon } from "@heroicons/react/24/solid";
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
import { Form } from "@remix-run/react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ExistingSearchParams } from "remix-utils/existing-search-params";
import { DialogTitle } from "@/components/ui/dialog";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  filterName: string;
  data?: string[];
  submit: (item: string) => void;
  selected: (item: string) => boolean;
};

export function FilterInput({
  icon,
  filterName,
  children,
  data,
  submit,
  selected,
}: Props) {
  const dataItems = data?.map((item) => {
    return (
      <CommandItem
        className={"justify-between"}
        onSelect={() => submit(item)}
        key={item}
      >
        {item}
        {selected(item) ? <CheckIcon /> : null}
      </CommandItem>
    );
  });
  const placeholder = filterName?.replace("_", " ");
  return (
    <div
      key={placeholder}
      className={
        "flex h-14 items-center bg-sgrey-8 rounded-lg border border-sgrey-20 w-full "
      }
    >
      <div className={"size-6 mx-4 text-sgrey-60 flex"}>
        {icon ?? <MapPinIcon />}
      </div>
      <Separator orientation={"vertical"} className={"w-px h-2/3"} />
      <input
        className={
          "bg-transparent w-full basis-full px-2 focus:outline-0 text-sgrey-60 capitalize"
        }
        placeholder={placeholder}
      />
      <Form method={"get"}>
        <ExistingSearchParams exclude={["page"]} />
        <div className={"hidden laptop:block"}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size={"icon"}
                className={
                  "rounded-full bg-sgrey-10 w-7  h-7 shrink-0 grow-0 mr-3 flex items-center border-0"
                }
              >
                <ChevronDownIcon className={"size-3/4"} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder={"Location"} />
                <CommandList>
                  <CommandEmpty>No Location Found</CommandEmpty>
                  <CommandGroup>{children ?? dataItems}</CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className={"laptop:hidden"}>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                size={"icon"}
                className={
                  "rounded-full bg-sgrey-10 w-7  h-7 shrink-0 grow-0 mr-3 flex items-center border-0"
                }
              >
                <ChevronDownIcon className={"size-3/4"} />
              </Button>
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
      </Form>
    </div>
  );
}
