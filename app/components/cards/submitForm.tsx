import { Form, useOutletContext } from "react-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { FilterInput } from "@/components/filterInput";
import { rawFilterCursor } from "../../../KV/filter";
import { Textarea } from "@/components/ui/textarea";
import { CheckboxWithText } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
export interface submitInfoProps {
  name: string;
  type:
    | "text"
    | "email"
    | "number"
    | "filter"
    | "dropdown"
    | "tel"
    | "textArea";
  placeholder?: string;
  data?: string | string[];
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}
type props = React.HTMLAttributes<HTMLDivElement> & {
  inputData: submitInfoProps[];
};

export function SubmitForm({ inputData, children, className }: props) {
  const filters = useOutletContext<rawFilterCursor>();
  const inputBlocks = inputData.map((input) => {
    return (
      <div key={input.name} className={cn("col-span-1", input.className)}>
        <Label
          className={"inline-block pb-2.5 text-base font-semibold capitalize"}
          htmlFor={input.name}
        >
          {input.name}
        </Label>
        {input.type === "filter" ? (
          <FilterInput
            filterName={input.name}
            placeholder={input.placeholder}
            className={"h-12 bg-sgrey-10 text-sm "}
            data={filters?.find((filter) => filter[0] === input.data)?.[1]}
          ></FilterInput>
        ) : input.type === "dropdown" && Array.isArray(input.data) ? (
          <Select>
            <SelectTrigger
              id={input.name}
              name={input.name}
              className={
                "h-12 bg-sgrey-10 desktop:h-[70px] desktop:text-lg desktop:placeholder:text-lg"
              }
            >
              <SelectValue placeholder={input.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {input.data?.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        ) : input.type === "textArea" ? (
          <Textarea
            id={input.name}
            name={input.name}
            placeholder={input.placeholder}
          ></Textarea>
        ) : (
          <Input
            className={
              "muted- h-12 bg-sgrey-10 desktop:h-[70px] desktop:text-lg desktop:placeholder:text-lg"
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
    <Card
      className={cn(
        "w-full rounded-xl border  p-5 tablet:p-8 laptop:p-12 desktop:p-[100px] bg-transparent grid grid-cols-1 laptop:grid-cols-4 gap-5 laptop:gap-7 shrink-0",
        className,
      )}
    >
      <Form method={"post"} className={"contents"}>
        {inputBlocks}
        {children}
        <div
          className={
            "order-last items-center justify-between laptop:col-span-full laptop:flex"
          }
        >
          <CheckboxWithText>
            I agree to the <span className={"underline"}>Terms of Use</span> and{" "}
            <span className={"underline"}>Privacy Policy</span>
          </CheckboxWithText>
          <Button
            size={"responsive"}
            variant={"primary"}
            className={"mt-4 laptop:h-14"}
            disabled
          >
            <span>Send Your Message</span>
          </Button>
        </div>
      </Form>
    </Card>
  );
}
