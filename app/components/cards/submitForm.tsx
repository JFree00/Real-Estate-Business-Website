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
const inputs = [
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
  },
];
export function SubmitForm() {
  const filters = useOutletContext<rawFilterCursor>();
  console.log(filters);
  const inputBlocks = inputs.map((input) => {
    return (
      <div key={input.name} className={""}>
        <Label
          className={"capitalize text-base pb-2.5 inline-block"}
          htmlFor={input.name}
        >
          {input.name}
        </Label>
        {input.type === "dropdown" ? (
          <FilterInput
            filterName={input.name}
            className={" bg-sgrey-10 h-12 text-sm"}
            data={filters?.find((filter) => filter[0] === input.data)?.[1]}
          ></FilterInput>
        ) : (
          <Input
            className={"h-12 bg-sgrey-10 text-sm"}
            id={input.name}
            name={input.name}
            placeholder={input.placeholder}
          ></Input>
        )}
      </div>
    );
  });
  return (
    <div className={"w-full rounded-xl border border-sgrey-15 p-5"}>
      <Form method={"post"}>
        <div className={"flex flex-col flex-nowrap gap-5 shrink-0 grow "}>
          {inputBlocks}
          <div>
            <Label
              className={"capitalize text-base pb-2.5 inline-block"}
              htmlFor={"contact"}
            >
              Preferred Contact Method
            </Label>
            <IconInput
              placeholder={"Enter your Phone Number"}
              className={"h-12 bg-sgrey-10 text-sm my-2.5"}
              id={"contact"}
              name={"contact"}
              type={"tel"}
            >
              <PhoneIcon />
            </IconInput>
            <IconInput
              className={"h-12 bg-sgrey-10 text-sm my-2.5"}
              id={"contact"}
              name={"contact"}
              type={"email"}
              placeholder={"Enter Your Email"}
            >
              <EnvelopeIcon />
            </IconInput>
          </div>
          <div className={"overflow-visible"}>
            <Label
              className={"capitalize text-base pb-2.5 inline-block"}
              htmlFor={"message"}
            >
              Message
            </Label>
            <Textarea
              id={"message"}
              placeholder={"Enter your Message here.."}
            />
          </div>
          <CheckboxWithText>
            I agree to the <span className={"underline"}>Terms of Use</span> and{" "}
            <span className={"underline"}>Privacy Policy</span>
          </CheckboxWithText>
          <Button size={"responsive"} className={"bg-pprimary-60"}>
            <span>Send Your Message</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}
