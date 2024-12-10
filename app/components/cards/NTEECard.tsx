// @flow
import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stepsProps } from "../../../KV/steps";
import { cn } from "@/lib/styles";

type props = React.HTMLAttributes<HTMLDivElement> & {
  data?: stepsProps;
};

export function NteeCard({ data, className }: props) {
  data = data!;
  return (
    <div className={cn("laptop:basis-1/4 flex flex-col grow", className)}>
      <div className={"flex h-12 items-center border-l border-l-pprimary-60"}>
        <p className={"px-7 text-base font-medium"}>Step 0{data.step}</p>
      </div>
      <div
        className={" size-full  rounded-full border border-transparent"}
        style={{
          padding: "1px, 1px, 1px, 1px",
          backgroundImage:
            "linear-gradient(#141414, #141414), linear-gradient(150deg, rgba(112,59,247, 1) 0%, rgba(153,153,153, .1) 30%)",
          borderRadius: "0 10px 10px 10px ",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <div
          className={
            "size-[99%]  bg-transparent bg-gradient-to-br from-pprimary-60/50 to-15%"
          }
        >
          <Card className={" rounded-none border-0 bg-transparent  p-7"}>
            <CardHeader className={"justify-center"}>
              <CardTitle className={"basis-1/3 py-4 text-lg font-semibold"}>
                {data.name}
              </CardTitle>
              <CardDescription className={"text-base text-sgrey-60"}>
                {data.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
