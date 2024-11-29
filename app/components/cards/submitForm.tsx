import { Form, useOutletContext } from "@remix-run/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { FilterInput } from "@/components/filterInput";
import { rawFilterCursor } from "../../../KV/filter";
import { Textarea } from "@/components/ui/textarea";
import { CheckboxWithText } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/iconInput";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/styles";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export interface submitInfoProps {
  name: string;
  type: "text" | "email" | "number" | "filter" | "dropdown" | "tel";
  placeholder?: string;
  data?: string | string[];
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}
type props = React.HTMLAttributes<HTMLDivElement> & {
  inputData: submitInfoProps[];
};

export function SubmitForm({ inputData, children }: props) {
  const filters = useOutletContext<rawFilterCursor>();
  const inputBlocks = inputData.map((input) => {
    return (
      <div key={input.name} className={cn("col-span-1 grow", input.className)}>
        <Label
          className={"capitalize text-base pb-2.5 inline-block font-semibold"}
          htmlFor={input.name}
        >
          {input.name}
        </Label>
        {input.type === "filter" ? (
          <FilterInput
            filterName={input.name}
            placeholder={input.placeholder}
            className={" bg-sgrey-10 text-sm text-sgrey-40"}
            data={filters?.find((filter) => filter[0] === input.data)?.[1]}
          ></FilterInput>
        ) : input.type === "dropdown" && Array.isArray(input.data) ? (
          <Select>
            <SelectTrigger>
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {input.data?.map((item) => {
                return <SelectValue>{item}</SelectValue>;
              })}
            </SelectContent>
          </Select>
        ) : (
          <Input
            className={
              "h-12 text-sgrey-40 bg-sgrey-10 desktop:placeholder:text-lg desktop:text-lg desktop:h-[70px]"
            }
            id={input.name}
            name={input.name}
            placeholder={input.placeholder}
          ></Input>
        )}
      </div>
    );
  });
  return (
    <div
      className={
        "w-full rounded-xl border border-sgrey-15 p-5 laptop:p-12 desktop:p-[100px]"
      }
    >
      <Form method={"post"}>
        <div
          className={
            "grid grid-cols-1 laptop:grid-cols-4 gap-5 laptop:gap-7 shrink-0 grow"
          }
        >
          {inputBlocks}
          {children}
          <div
            className={
              "laptop:col-span-full laptop:flex justify-between items-center"
            }
          >
            <CheckboxWithText>
              I agree to the <span className={"underline"}>Terms of Use</span>{" "}
              and <span className={"underline"}>Privacy Policy</span>
            </CheckboxWithText>
            <Button
              size={"responsive"}
              className={"bg-pprimary-60 laptop:h-14 mt-4"}
            >
              <span>Send Your Message</span>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
