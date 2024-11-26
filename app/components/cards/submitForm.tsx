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
interface inputInfo {
  name: string;
  type: string;
  placeholder?: string;
  data?: string;
  className?: string;
}

const inputs: inputInfo[] = [
  {
    name: "first name",
    type: "text",
    placeholder: "Enter First Name",
  },
  {
    name: "last name",
    type: "text",
    placeholder: "Enter Last Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your Email",
  },
  {
    name: "phone",
    type: "tel",
    placeholder: "Enter Phone Number",
  },
  {
    name: "Preferred Location",
    type: "dropdown",
    placeholder: "Select Location",
    data: "location",
  },
  {
    name: "Property Type",
    type: "dropdown",
    placeholder: "Select Property Type",
    data: "property_type",
  },
  {
    name: "No. of Bathrooms",
    type: "text",
    placeholder: "Select no. of Bathrooms",
  },
  {
    name: "No. of Bedrooms",
    type: "text",
    placeholder: "Select no. of Bedrooms",
  },
  {
    name: "Budget",
    type: "number",
    placeholder: "Enter Budget",
    data: "price",
    className: "laptop:col-span-2",
  },
];
export function SubmitForm() {
  const filters = useOutletContext<rawFilterCursor>();
  const inputBlocks = inputs.map((input) => {
    return (
      <div key={input.name} className={cn("col-span-1 ", input.className)}>
        <Label
          className={"capitalize text-base pb-2.5 inline-block font-semibold"}
          htmlFor={input.name}
        >
          {input.name}
        </Label>
        {input.type === "dropdown" ? (
          <FilterInput
            filterName={input.name}
            placeholder={input.placeholder}
            className={" bg-sgrey-10 text-sm text-sgrey-40"}
            data={filters?.find((filter) => filter[0] === input.data)?.[1]}
          ></FilterInput>
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

          <div className={"grid grid-cols-subgrid  laptop:col-span-2"}>
            <div className={"grid grid-cols-subgrid"}>
              <Label
                className={"capitalize text-base pb-2.5 inline-block"}
                htmlFor={"contact"}
              >
                Preferred Contact Method
              </Label>
              <IconInput
                placeholder={"Enter your Phone Number"}
                className={""}
                id={"contact"}
                name={"contact"}
                type={"tel"}
              >
                <PhoneIcon />
              </IconInput>
            </div>
            <div className={"self-end"}>
              <Label
                className={"capitalize text-base pb-2.5 inline-block"}
                htmlFor={"em"}
              ></Label>
              <IconInput
                className={""}
                id={"contact"}
                name={"em"}
                type={"email"}
                placeholder={"Enter Your Email"}
              >
                <EnvelopeIcon />
              </IconInput>
            </div>
          </div>
          <div className={"overflow-visible col-span-full"}>
            <Label
              className={
                "capitalize text-base pb-2.5 inline-block font-semibold"
              }
              htmlFor={"message"}
            >
              Message
            </Label>
            <Textarea
              id={"message"}
              placeholder={"Enter your Message here.."}
            />
          </div>
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
